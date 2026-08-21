/**
 * generateCv.js
 * Generates an elegant, 1-Page PDF Resume for Lê Diên Hiếu with full Vietnamese UTF-8 font support
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '../public/cv/Le-Dien-Hieu-CV.pdf');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 28, bottom: 28, left: 36, right: 36 },
  info: {
    Title: 'Lê Diên Hiếu - CV Resume',
    Author: 'Lê Diên Hiếu',
    Subject: 'Software Developer & IT Support Resume',
    Keywords: 'Software Developer, Web Developer, IT Support, IT Helpdesk, Node.js, PHP, Python, Next.js',
  },
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// ─── Register System Unicode Fonts (Full Vietnamese Support) ─────────────────
const fontRegular = 'C:/Windows/Fonts/arial.ttf';
const fontBold = 'C:/Windows/Fonts/arialbd.ttf';
const fontItalic = 'C:/Windows/Fonts/ariali.ttf';

const hasUnicodeFont = fs.existsSync(fontRegular) && fs.existsSync(fontBold);
if (hasUnicodeFont) {
  doc.registerFont('AppFont', fontRegular);
  doc.registerFont('AppFont-Bold', fontBold);
  doc.registerFont('AppFont-Italic', fs.existsSync(fontItalic) ? fontItalic : fontRegular);
}

const FONT_REG = hasUnicodeFont ? 'AppFont' : 'Helvetica';
const FONT_BOLD = hasUnicodeFont ? 'AppFont-Bold' : 'Helvetica-Bold';
const FONT_ITALIC = hasUnicodeFont ? 'AppFont-Italic' : 'Helvetica-Oblique';

// ─── Colors ──────────────────────────────────────────────────────────────────
const PRIMARY = '#0284C7';    // Sky Blue
const DARK = '#0F172A';       // Dark Navy Header
const TEXT = '#334155';       // Slate Body Text
const MUTED = '#64748B';      // Gray Muted
const LIGHT_BG = '#F8FAFC';   // Soft Slate Box
const BORDER_COL = '#E2E8F0'; // Divider Border

// ─── Header Banner ───────────────────────────────────────────────────────────
doc.rect(0, 0, doc.page.width, 82).fill(DARK);

// Header Name
doc.fillColor('#FFFFFF')
   .fontSize(20)
   .font(FONT_BOLD)
   .text('LÊ DIÊN HIẾU', 36, 18);

// Title
doc.fillColor(PRIMARY)
   .fontSize(11)
   .font(FONT_BOLD)
   .text('SOFTWARE DEVELOPER & IT SUPPORT', 36, 42);

// Contact Info Bar
doc.fillColor('#CBD5E1')
   .fontSize(8.5)
   .font(FONT_REG)
   .text('Điện thoại: 0328821260   |   Email: lehieu2900.in@gmail.com   |   GitHub: github.com/hieule52', 36, 60);

doc.y = 94;

// ─── Helper Functions ─────────────────────────────────────────────────────────
function drawSectionHeading(title) {
  const currentY = doc.y;
  doc.rect(36, currentY, doc.page.width - 72, 16).fill(LIGHT_BG);
  doc.rect(36, currentY, 3, 16).fill(PRIMARY);
  
  doc.fillColor(DARK)
     .fontSize(9.5)
     .font(FONT_BOLD)
     .text(title.toUpperCase(), 44, currentY + 3.5);

  doc.y = currentY + 20;
}

// ─── 1. PROFESSIONAL SUMMARY ─────────────────────────────────────────────────
drawSectionHeading('1. Tóm Tắt Năng Lực (Professional Summary)');
doc.fillColor(TEXT)
   .fontSize(8.5)
   .font(FONT_REG)
   .text(
     'Cử nhân Công nghệ Thông tin (Chuyên ngành Thiết kế phần mềm) có nền tảng vững chắc về phát triển website & ứng dụng web (JavaScript, PHP, Python, Next.js, Node.js) kết hợp năng lực hỗ trợ kỹ thuật IT Helpdesk và tự lắp ráp máy tính (Build PC) hoàn chỉnh. Tinh thần trách nhiệm cao, chăm chỉ, sẵn sàng đóng góp hiệu quả cho công việc phát triển phần mềm và vận hành hệ thống IT.',
     { align: 'justify', lineGap: 2 }
   );

doc.moveDown(0.5);

// ─── 2. EDUCATION & CERTIFICATIONS ───────────────────────────────────────────
drawSectionHeading('2. Học Vấn & Chứng Chỉ (Education & Certifications)');

// Degree
doc.fillColor(DARK)
   .fontSize(9)
   .font(FONT_BOLD)
   .text('Cử nhân Công nghệ Thông tin (B.Sc. in IT)', 36, doc.y, { continued: true })
   .font(FONT_ITALIC)
   .fillColor(MUTED)
   .text(' — Chuyên ngành: Thiết kế phần mềm', { align: 'left' });

doc.fillColor(TEXT)
   .fontSize(8)
   .font(FONT_REG)
   .text('• Môn học trọng tâm: Thiết kế phần mềm, Lập trình hướng đối tượng (OOP), Cơ sở dữ liệu (SQL), Công nghệ Web, Debug.')
   .moveDown(0.25);

// English Cert
doc.fillColor(DARK)
   .fontSize(9)
   .font(FONT_BOLD)
   .text('Chứng chỉ Tiếng Anh APTIS B1', 36, doc.y, { continued: true })
   .font(FONT_ITALIC)
   .fillColor(MUTED)
   .text(' — Hội đồng Anh (British Council)', { align: 'left' });

doc.fillColor(TEXT)
   .fontSize(8)
   .font(FONT_REG)
   .text('• Đọc hiểu tài liệu kỹ thuật chuyên ngành và giao tiếp tốt trong môi trường làm việc công nghệ.')
   .moveDown(0.5);

// ─── 3. TECHNICAL & IT SKILLS ────────────────────────────────────────────────
drawSectionHeading('3. Kỹ Năng Kỹ Thuật (Technical Skills)');

const colWidth = (doc.page.width - 84) / 2;
const startY = doc.y;

// Left Column: Software Development
doc.fillColor(PRIMARY)
   .fontSize(8.5)
   .font(FONT_BOLD)
   .text('LẬP TRÌNH & PHÁT TRIỂN WEB', 36, startY);

doc.fillColor(TEXT)
   .fontSize(8)
   .font(FONT_REG)
   .text('• Ngôn ngữ: JavaScript (ES6+), PHP, Python, Java', 36, doc.y + 2)
   .text('• Frameworks: Next.js, Node.js, Express.js, HTML5, CSS3')
   .text('• Cơ sở dữ liệu: MySQL, SQL Queries')
   .text('• Công cụ: Git, GitHub, Docker, VS Code, Postman')
   .text('• Kiến trúc: RESTful API, MVC, Responsive Design');

const leftEndY = doc.y;

// Right Column: IT Helpdesk & Hardware
doc.fillColor(PRIMARY)
   .fontSize(8.5)
   .font(FONT_BOLD)
   .text('IT SUPPORT & PHẦN CỨNG PC', 36 + colWidth + 12, startY);

doc.fillColor(TEXT)
   .fontSize(8)
   .font(FONT_REG)
   .text('• Phần cứng: Tự lắp ráp PC hoàn chỉnh, nhận biết linh kiện & tính tương thích, vệ sinh & thay thế linh kiện', 36 + colWidth + 12, startY + 12, { width: colWidth })
   .text('• Hệ điều hành: Cài đặt & cấu hình Windows OS, xử lý sự cố phần mềm cơ bản', 36 + colWidth + 12, doc.y + 2, { width: colWidth })
   .text('• Thiết bị ngoại vi: Cài đặt Driver, kết nối máy in & thiết bị văn phòng', 36 + colWidth + 12, doc.y + 2, { width: colWidth })
   .text('• Mạng máy tính: Kiểm tra & xử lý kết nối mạng LAN / Wi-Fi cơ bản', 36 + colWidth + 12, doc.y + 2, { width: colWidth });

const rightEndY = doc.y;

doc.y = Math.max(leftEndY, rightEndY) + 8;

// ─── 4. FEATURED PROJECTS ────────────────────────────────────────────────────
drawSectionHeading('4. Dự Án Thực Tế (Featured Projects)');

doc.fillColor(DARK)
   .fontSize(9)
   .font(FONT_BOLD)
   .text('Tiến Quốc Auto Spa — Website Giới Thiệu & Chăm Sóc Ô Tô', 36, doc.y);

doc.fillColor(PRIMARY)
   .fontSize(8)
   .font(FONT_BOLD)
   .text('Trực tiếp (Live Demo): https://tienquoc-autospa.vercel.app', 36, doc.y + 1.5);

doc.fillColor(TEXT)
   .fontSize(8)
   .font(FONT_REG)
   .text('• Công nghệ sử dụng: HTML5, CSS3, JavaScript, Tối ưu hóa hiển thị Responsive Mobile-First.')
   .text('• Mô tả: Xây dựng website hiện đại cho trung tâm chăm sóc và làm đẹp ô tô với danh mục dịch vụ chi tiết.')
   .text('• Tính năng: Giao diện trực quan, luồng kêu gọi đặt lịch tiện lợi, tốc độ tải trang nhanh và chuẩn SEO.')
   .moveDown(0.5);

// ─── 5. HARDWARE & IT SUPPORT EXPERIENCE ─────────────────────────────────────
drawSectionHeading('5. Kinh Nghiệm Thực Tế Về Lắp Ráp PC & Hỗ Trợ IT');

doc.fillColor(DARK)
   .fontSize(8.5)
   .font(FONT_BOLD)
   .text('Tự Lắp Ráp Máy Tính (Build PC) & Cài Đặt Hệ Thống', 36, doc.y);

doc.fillColor(TEXT)
   .fontSize(8)
   .font(FONT_REG)
   .text('• Lựa chọn linh kiện phù hợp với nhu cầu và ngân sách (CPU, GPU, Mainboard, RAM, SSD, Nguồn PSU, Case).')
   .text('• Trực tiếp lắp ráp hoàn chỉnh nhiều bộ case PC để bàn, đi dây gọn gàng và kiểm tra nhiệt độ hoạt động.')
   .text('• Cài đặt hệ điều hành Windows bản mới, cập nhật Driver chính hãng và cài đặt phần mềm làm việc cần thiết.')
   .text('• Hỗ trợ bạn bè và người dùng chẩn đoán, khắc phục các sự cố phần mềm và máy tính thường gặp.')
   .moveDown(0.5);

// ─── 6. KEY STRENGTHS & LIFESTYLE ────────────────────────────────────────────
drawSectionHeading('6. Phẩm Chất & Lối Sống (Key Strengths & Lifestyle)');

doc.fillColor(TEXT)
   .fontSize(8)
   .font(FONT_REG)
   .text('• Kỹ năng mềm: Làm việc nhóm, tư duy giải quyết vấn đề, lắng nghe tích cực, tự học nhanh, tinh thần trách nhiệm.')
   .text('• Thể thao & Đời sống: Thường xuyên tham gia bóng đá (Đoạt cúp vô địch giải bóng đá phong trào & tinh thần đồng đội), Đạp xe và rèn luyện thể chất — rèn giũa tính kỷ luật, sự kiên trì và năng lượng làm việc tích cực.');

// ─── Footer ──────────────────────────────────────────────────────────────────
doc.fontSize(7)
   .fillColor(MUTED)
   .text('Lê Diên Hiếu — Portfolio: http://localhost:3000   |   CV Cập nhật 2026', 36, doc.page.height - 22, { align: 'center' });

doc.end();

writeStream.on('finish', () => {
  console.log('✓ Successfully generated 1-Page Vietnamese-supported Le-Dien-Hieu-CV.pdf');
});
