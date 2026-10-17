-- Ngôn ngữ của trang mà khách gửi form (vi | ko) và kênh liên hệ khách ưu tiên (phone | email | kakao).
-- Chạy một lần trong Supabase SQL Editor. Code vẫn lưu lead (không kèm 2 cột này)
-- nếu chưa chạy, nên có thể deploy trước.
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS locale text NOT NULL DEFAULT 'vi';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS preferred_contact text;

-- Lọc lead theo ngôn ngữ trong trang quản trị.
CREATE INDEX IF NOT EXISTS consultations_locale_created_idx
  ON consultations (locale, created_at DESC);
