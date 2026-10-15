-- Nguồn truy cập của lead (gclid/gbraid/wbraid, UTM, trang đáp, referrer).
-- Chạy một lần trong Supabase SQL Editor. Code đã tự lưu lead không kèm nguồn
-- nếu cột này chưa tồn tại, nên có thể deploy trước rồi chạy sau.
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS attribution jsonb;

-- Tra cứu nhanh lead đến từ Google Ads khi nhập conversion offline.
CREATE INDEX IF NOT EXISTS consultations_gclid_idx
  ON consultations ((attribution ->> 'gclid'))
  WHERE attribution ? 'gclid';
