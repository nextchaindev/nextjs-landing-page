-- Blog lưu trong Supabase (trang /blog, /ko/blog, /en/blog + trang quản trị /admin/blog).
-- Chạy file này trong Supabase SQL Editor TRƯỚC khi deploy code blog mới, rồi chạy supabase_blog_seed.sql
-- để chuyển các bài hiện có vào DB. Chạy lại nhiều lần vẫn an toàn.
--
-- BẢO MẬT: mọi tài khoản "authenticated" đều sửa được blog (giống bảng tư vấn). Kiểm tra
-- Authentication → Providers → Email: TẮT "Allow new users to sign up" để chỉ admin tạo tài khoản qua /admin/users.

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Gom các bản dịch của cùng một bài (thường là slug tiếng Việt lúc tạo bài).
  translation_key text NOT NULL,
  locale text NOT NULL CHECK (locale IN ('vi', 'ko', 'en')),
  slug text NOT NULL CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  title text NOT NULL,
  meta_title text,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  cover_url text,
  cover_width integer,
  cover_height integer,
  author text NOT NULL DEFAULT '',
  reading_minutes integer,
  -- Cấu trúc GEO: trả lời nhanh, ý chính, các mục (heading + đoạn văn/bullet/bảng), FAQ, liên kết nội bộ.
  answer text NOT NULL DEFAULT '',
  key_takeaways jsonb NOT NULL DEFAULT '[]'::jsonb,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  related_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- Ngày đăng hiển thị; bài "published" có ngày trong tương lai chỉ hiện từ ngày đó (hẹn giờ đăng).
  published_at date,
  -- Ngày "Cập nhật" hiển thị trên bài (để trống nếu chưa cập nhật nội dung đáng kể).
  content_updated_at date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  UNIQUE (locale, slug),
  UNIQUE (translation_key, locale)
);

CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON public.blog_posts (status, locale, published_at DESC);

CREATE OR REPLACE FUNCTION public.blog_posts_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_touch_updated_at ON public.blog_posts;
CREATE TRIGGER blog_posts_touch_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.blog_posts_touch_updated_at();

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Website (anon key) chỉ đọc được bài đã đăng.
DROP POLICY IF EXISTS "Public reads published blog posts" ON public.blog_posts;
CREATE POLICY "Public reads published blog posts"
ON public.blog_posts FOR SELECT TO anon
USING (status = 'published');

-- Admin đăng nhập: đọc/ghi mọi bài (kể cả nháp).
DROP POLICY IF EXISTS "Admins read blog posts" ON public.blog_posts;
CREATE POLICY "Admins read blog posts"
ON public.blog_posts FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Admins insert blog posts" ON public.blog_posts;
CREATE POLICY "Admins insert blog posts"
ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins update blog posts" ON public.blog_posts;
CREATE POLICY "Admins update blog posts"
ON public.blog_posts FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins delete blog posts" ON public.blog_posts;
CREATE POLICY "Admins delete blog posts"
ON public.blog_posts FOR DELETE TO authenticated
USING (true);

-- Ảnh bìa: bucket công khai "blog" (ai cũng xem được qua public URL), chỉ admin tải lên/xóa.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog', 'blog', true, 5242880, ARRAY['image/webp', 'image/jpeg', 'image/png'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Admins upload blog images" ON storage.objects;
CREATE POLICY "Admins upload blog images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog');

DROP POLICY IF EXISTS "Admins update blog images" ON storage.objects;
CREATE POLICY "Admins update blog images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog');

DROP POLICY IF EXISTS "Admins delete blog images" ON storage.objects;
CREATE POLICY "Admins delete blog images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog');
