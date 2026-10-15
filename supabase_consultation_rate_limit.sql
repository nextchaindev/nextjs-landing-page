CREATE TABLE IF NOT EXISTS public.consultation_rate_limits (
  rate_key text NOT NULL,
  window_start timestamptz NOT NULL,
  attempts integer NOT NULL DEFAULT 1,
  PRIMARY KEY (rate_key, window_start)
);

ALTER TABLE public.consultation_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.consultation_rate_limits FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.check_consultation_rate_limit(
  p_key text,
  p_window_seconds integer,
  p_max_attempts integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  allowed boolean;
  bucket timestamptz;
BEGIN
  IF length(p_key) <> 64 OR p_window_seconds NOT BETWEEN 60 AND 86400
     OR p_max_attempts NOT BETWEEN 1 AND 100 THEN
    RAISE EXCEPTION 'Invalid rate limit parameters';
  END IF;

  bucket := to_timestamp(floor(extract(epoch FROM now()) / p_window_seconds) * p_window_seconds);
  INSERT INTO public.consultation_rate_limits (rate_key, window_start, attempts)
  VALUES (p_key, bucket, 1)
  ON CONFLICT (rate_key, window_start)
  DO UPDATE SET attempts = consultation_rate_limits.attempts + 1
  RETURNING attempts <= p_max_attempts INTO allowed;

  RETURN allowed;
END;
$$;

REVOKE ALL ON FUNCTION public.check_consultation_rate_limit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_consultation_rate_limit(text, integer, integer) TO service_role;

-- Schedule a daily cleanup in Supabase SQL Editor if pg_cron is enabled:
-- SELECT cron.schedule('consultation-rate-limits-cleanup', '0 3 * * *',
--   $$DELETE FROM public.consultation_rate_limits WHERE window_start < now() - interval '2 days'$$);
