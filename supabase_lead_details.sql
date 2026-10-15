-- Ngành và loại website khách chọn trong form tư vấn.
-- Chạy một lần trong Supabase SQL Editor. Code vẫn lưu lead (không kèm 2 cột này)
-- nếu chưa chạy, nên có thể deploy trước.
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS industry text;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS website_type text;

-- Kiểm tra lead trùng số điện thoại trong 24 giờ.
CREATE INDEX IF NOT EXISTS consultations_phone_created_idx
  ON consultations (phone, created_at DESC);
