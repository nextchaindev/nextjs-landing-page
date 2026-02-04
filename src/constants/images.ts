/**
 * IMAGE CONFIGURATION FILE
 * ========================
 * 
 * File này chứa tất cả URL hình ảnh được sử dụng trong trang landing page NextChain.
 * Bạn có thể dễ dàng thay đổi bất kỳ hình ảnh nào bằng cách cập nhật URL tại đây.
 * 
 * HƯỚNG DẪN THAY ĐỔI HÌNH ẢNH:
 * ---------------------------
 * 
 * CÁCH 1: SỬ DỤNG HÌNH ẢNH TỪ MÁY TÍNH (LOCAL)
 * --------------------------------------------
 * 1. Copy file hình ảnh của bạn vào thư mục /public/images/
 *    Ví dụ: /public/images/hero-mockup.jpg
 * 
 * 2. Thay đổi URL trong file này:
 *    heroMockup: "/images/hero-mockup.jpg"
 * 
 * 3. Lưu file → Website sẽ tự động hiển thị hình ảnh của bạn!
 * 
 * LƯU Ý:
 * - Đường dẫn bắt đầu bằng /images/ (KHÔNG CÓ /public/)
 * - Hỗ trợ: .jpg, .jpeg, .png, .webp, .svg
 * - Tên file không nên có dấu tiếng Việt
 * - Nên tối ưu kích thước < 500KB
 * 
 * VÍ DỤ HÌNH LOCAL:
 * heroMockup: "/images/my-hero.jpg"
 * project1: "/images/restaurant-website.png"
 * 
 * ============================================
 * 
 * CÁCH 2: SỬ DỤNG URL TỪNG UNSPLASH/INTERNET
 * -------------------------------------------
 * 1. Tìm hình ảnh trên https://unsplash.com
 * 2. Click chuột phải → Copy image address
 * 3. Thay URL trong file này
 * 
 * VÍ DỤ URL ONLINE:
 * heroMockup: "https://images.unsplash.com/photo-123456..."
 * 
 * ============================================
 * 
 * GỢI Ý CHỌN HÌNH:
 * - Hero section: Ảnh mockup website, thiết kế UI/UX (1920x1080px+)
 * - Dự án: Ảnh ngang (landscape), tỷ lệ 16:9 hoặc 3:2
 * - Chất lượng: Sáng, rõ nét, chuyên nghiệp
 */

export const IMAGES = {
  // ============================================
  // HERO SECTION (Phần đầu trang)
  // ============================================
  
  /**
   * Hình ảnh mockup chính ở Hero section
   * Gợi ý: Ảnh thiết kế website, giao diện web hiện đại
   * Kích thước khuyến nghị: 1920x1080px trở lên
   */
  heroMockup: "https://cdn.dribbble.com/userupload/19610210/file/original-0dff3a1063dee2a211f8198c7d05d087.png?resize=1024x768&vertical=center",
  
  // ============================================
  // DỰ ÁN TIÊU BIỂU (Projects Section) 
  // ============================================
  
  /**
   * Dự án 1: Website đặt bàn nhà hàng
   * Gợi ý: Ảnh giao diện đặt bàn, booking system, nhà hàng
   */
  project1: "https://images.unsplash.com/photo-1588560107833-167198a53677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwYm9va2luZyUyMHdlYnNpdGUlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY5NzQxNzA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  
  /**
   * Dự án 2: Website thương mại điện tử
   * Gợi ý: Ảnh ecommerce, cửa hàng online, giỏ hàng
   */
  project2: "https://images.unsplash.com/photo-1648134859177-66e35b61e106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2OTc0MTcwNXww&ixlib=rb-4.1.0&q=80&w=1080",
  
  /**
   * Dự án 3: Ứng dụng mobile
   * Gợi ý: Ảnh giao diện mobile app, màn hình điện thoại
   */
  project3: "https://images.unsplash.com/photo-1669850850090-54237ab4a4a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB1aSUyMGRlc2lnbiUyMHNjcmVlbnxlbnwxfHx8fDE3Njk3MzQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  
  /**
   * Dự án 4: Landing page bán hàng
   * Gợi ý: Ảnh landing page, trang đích, sales page
   */
  project4: "https://images.unsplash.com/photo-1760008486593-a85315610136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMHdlYiUyMGRlc2lnbnxlbnwxfHx8fDE3Njk3NDE3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  
  /**
   * Dự án 5: SaaS Dashboard
   * Gợi ý: Ảnh dashboard, analytics, data visualization
   */
  project5: "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlJTIwZGVzaWdufGVufDF8fHx8MTc2OTc0MTcwNnww&ixlib=rb-4.1.0&q=80&w=1080",
  
  /**
   * Dự án 6: Web Application
   * Gợi ý: Ảnh web app hiện đại, enterprise software
   */
  project6: "https://images.unsplash.com/photo-1717996563514-e3519f9ef9f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGludGVyZmFjZSUyMG1vZGVybnxlbnwxfHx8fDE3Njk3NDE3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

/**
 * ALT TEXT - Văn bản thay thế cho hình ảnh (quan trọng cho SEO và accessibility)
 * Bạn cũng nên cập nhật alt text khi thay đổi hình ảnh
 */
export const IMAGE_ALT_TEXTS = {
  heroMockup: "Website Xà phòng - Giao diện website bán xà phòng handmade tự nhiên",
  project1: "Website đặt bàn nhà hàng",
  project2: "Website thương mại điện tử",
  project3: "Ứng dụng mobile",
  project4: "Landing page bán hàng",
  project5: "SaaS Dashboard",
  project6: "Web Application",
};
