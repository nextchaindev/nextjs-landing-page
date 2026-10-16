# Growth — phân phối nội dung & backlink Nextchain.site

Cập nhật: 2026-10-15. Chạy theo master prompt (bộ quy tắc do chủ doanh nghiệp cung cấp).

## Kết quả audit quyền truy cập ( researched 2026-10-15 bằng browser)

| Nền tảng | Trạng thái | Cần gì để đăng | Rủi ro/ghi chú |
|---|---|---|---|
| KenhRao — Dịch vụ doanh nghiệp | **READY (cần tài khoản)** | Đăng ký/đăng nhập tài khoản | Banner "SPAM = cấm vĩnh viễn". Tối đa 1 bài trong pilot, đúng category .52 |
| Việt Designer — box Quảng cáo | **READY (cần tài khoản)** | Đăng ký thành viên | Box cho phép PR dịch vụ design; bài ngoài design = xoá + ban vĩnh viễn |
| Trang Vàng | **BLOCKED-TOUCH** | Bạn tự làm thủ công | Cloudflare chặn bot — quy tắc không được vượt. Đăng ký tay tại /dang-ky |
| LinkedIn / Facebook / TikTok / YouTube / Instagram | **READY (cần tài khoản company)** | Đăng nhập tài khoản công ty trong phiên trình duyệt | Đăng tự động chỉ khi đã có quyền admin sẵn |
| Behance | **READY (cần tài khoản)** | Đăng nhập | 3 project/tháng, ảnh screenshot thật của demo |
| Brands Vietnam / OCD.vn | **PREPARE_ONLY** | Gửi theo editorial process | Submission ≠ bài đã đăng; không nhận bài PR thuần |

## Lỗi nội dung đã sửa trong bản draft (quan trọng)

**Cập nhật 2026-10-16:** từ 15/10 site đã BỎ cam kết tối thiểu 6 tháng — gói tháng không ràng
buộc thời hạn tối thiểu (khớp master prompt ban đầu). Draft trong `content/week1-drafts.md` đã sửa lại.
Tin K01 trên KenhRao (đăng 16/10) vẫn ghi "cam kết tối thiểu 6 tháng" → cần sửa tin.
Trước mỗi bài: đối chiếu giá/điều khoản với https://www.nextchain.site/bang-gia tại thời điểm đăng.

## Quy trình mỗi bài đăng

1. A1 kiểm tra nội quy mới nhất ngay trước khi đăng (nội quy forum đổi thường xuyên).
2. A3 dùng bản draft trong `content/`, chỉnh giọng theo nền tảng.
3. A6+A7 audit (số liệu khớp site? đúng category? link đích sống? disclosure?).
4. A5 đăng bằng tài khoản công ty đã đăng nhập trong phiên.
5. A8 ghi `live_url` + `link_rel` vào `publication_log.csv`; kiểm tra lại ngày 7/14/30.

## Bạn cần làm để tôi đăng được (chọn một)

- **Cách A (khuyên dùng)**: mở tab trình duyệt trong phiên này, đăng nhập tài khoản
  công ty của nền tảng bạn muốn bắt đầu (KenhRao + Việt Designer là 2 mục khả thi nhất
  trong tuần 1), rồi bảo tôi — tôi tự đăng theo draft đã audit.
- **Cách B**: tôi xuất nội dung cuối dạng text + hướng dẫn từng bước, bạn tự dán và đăng.

Tài khoản nào chưa có thì bạn phải tự đăng ký (tôi không tạo hộ — quy tắc chống danh tính giả).
