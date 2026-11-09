/**
 * generateCv.js — Professional 1-Page CV for Lê Diên Hiếu
 * Design: 2-column, clean sidebar, full Vietnamese support, avatar
 */

const PDFDocument = require('pdfkit');
const fs   = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, '../public/cv/Le-Dien-Hieu-CV.pdf');
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  info: {
    Title:    'Lê Diên Hiếu — CV',
    Author:   'Lê Diên Hiếu',
    Subject:  'Software Developer & IT Support',
    Keywords: 'CNTT, Software Engineer, Web Developer, IT Support, Đại học Khoa học Huế',
  },
  autoFirstPage: true,
});

doc.pipe(fs.createWriteStream(OUTPUT));

// ── Fonts ─────────────────────────────────────────────────────────────────────
const F_REG  = 'C:/Windows/Fonts/arial.ttf';
const F_BOLD = 'C:/Windows/Fonts/arialbd.ttf';
const F_ITAL = 'C:/Windows/Fonts/ariali.ttf';

if (fs.existsSync(F_REG))  doc.registerFont('R', F_REG);
if (fs.existsSync(F_BOLD)) doc.registerFont('B', F_BOLD);
if (fs.existsSync(F_ITAL)) doc.registerFont('I', fs.existsSync(F_ITAL) ? F_ITAL : F_REG);

const R = fs.existsSync(F_REG)  ? 'R' : 'Helvetica';
const B = fs.existsSync(F_BOLD) ? 'B' : 'Helvetica-Bold';
const I = fs.existsSync(F_ITAL) ? 'I' : 'Helvetica-Oblique';

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  // Sidebar
  sideBg   : '#1A2744',   // Deep navy
  sideText : '#E8EDF5',   // Near-white
  sideMuted: '#8FA3C8',   // Muted blue
  sideDiv  : '#2D4070',   // Divider line
  sideAcct : '#60A5FA',   // Sky blue accent
  sideGold : '#FCD34D',   // Gold highlight

  // Main area
  mainBg   : '#FFFFFF',
  headerBg : '#1A2744',   // Same deep navy for header
  headText : '#FFFFFF',
  headAcct : '#93C5FD',   // Light blue
  headSub  : '#CBD5E1',

  // Body text
  h1       : '#0F172A',   // Section title dark
  h2       : '#1E3A8A',   // Sub-heading blue
  body     : '#1E293B',   // Normal text
  muted    : '#475569',   // Gray text
  link     : '#2563EB',   // Link blue

  // Accents
  accent1  : '#1D4ED8',   // Primary blue bar
  accent2  : '#0EA5E9',   // Cyan accent
  gold     : '#D97706',   // Amber / gold
  greenDot : '#10B981',   // Status green
  barBg    : '#DBEAFE',   // Light bar track
  barFill  : '#3B82F6',   // Bar fill
  rowAlt   : '#F8FAFC',   // Alternating row
  border   : '#E2E8F0',   // Border line
};

// ── Layout constants ──────────────────────────────────────────────────────────
const PW     = doc.page.width;   // 595.28
const PH     = doc.page.height;  // 841.89
const SW     = 176;               // Sidebar width
const MX     = SW + 16;          // Main content X
const MW     = PW - SW - 28;     // Main content width

// ═══════════════════════════════════════════════════════════════════════════════
//  SIDEBAR BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════════
doc.rect(0, 0, SW, PH).fill(C.sideBg);

// ── Avatar ────────────────────────────────────────────────────────────────────
const avatarFile = path.join(__dirname, '../public/images/avatar_cv.png');
const AV_CX = SW / 2;
const AV_CY = 62;
const AV_R  = 42;

// Gold ring
doc.circle(AV_CX, AV_CY, AV_R + 3).fill(C.sideGold);
// White ring
doc.circle(AV_CX, AV_CY, AV_R + 1).fill('#FFFFFF');

if (fs.existsSync(avatarFile)) {
  try {
    doc.save();
    doc.circle(AV_CX, AV_CY, AV_R).clip();
    const dim = AV_R * 2;
    doc.image(avatarFile, AV_CX - AV_R, AV_CY - AV_R,
      { width: dim, height: dim, cover: [dim, dim] });
    doc.restore();
  } catch (_) {
    doc.circle(AV_CX, AV_CY, AV_R).fill(C.sideAcct);
  }
} else {
  doc.circle(AV_CX, AV_CY, AV_R).fill(C.sideAcct);
}

// ── Name block under avatar ───────────────────────────────────────────────────
let sy = AV_CY + AV_R + 10;

doc.font(B).fontSize(13).fillColor('#FFFFFF')
   .text('LÊ DIÊN HIẾU', 6, sy, { width: SW - 12, align: 'center' });
sy += 16;

doc.font(R).fontSize(7.2).fillColor(C.sideAcct)
   .text('SOFTWARE DEVELOPER', 6, sy, { width: SW - 12, align: 'center' });
sy += 10;
doc.font(R).fontSize(7.2).fillColor(C.sideAcct)
   .text('& IT SUPPORT', 6, sy, { width: SW - 12, align: 'center' });
sy += 12;

// ── Sidebar section heading helper ────────────────────────────────────────────
function sSec(title, y) {
  doc.rect(12, y, 2, 10).fill(C.sideGold);
  doc.font(B).fontSize(7.8).fillColor(C.sideGold)
     .text(title.toUpperCase(), 18, y + 1, { width: SW - 24 });
  doc.rect(12, y + 12, SW - 24, 0.5).fill(C.sideDiv);
  return y + 17;
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
doc.rect(12, sy, SW - 24, 0.5).fill(C.sideDiv);
sy += 6;
sy = sSec('Liên Hệ', sy);

const contacts = [
  { icon: '☎', val: '0328 821 260' },
  { icon: '✉', val: 'lehieu2900.in@gmail.com' },
  { icon: '⌨', val: 'github.com/hieule52' },
  { icon: '⌂', val: 'Thừa Thiên Huế' },
];
for (const c of contacts) {
  doc.font(B).fontSize(8.5).fillColor(C.sideAcct).text(c.icon, 12, sy);
  doc.font(R).fontSize(7.4).fillColor(C.sideText)
     .text(c.val, 24, sy + 0.5, { width: SW - 30 });
  sy += 13.5;
}
sy += 2;

// ── EDUCATION ─────────────────────────────────────────────────────────────────
sy = sSec('Học Vấn', sy);

doc.font(B).fontSize(8.2).fillColor('#FFFFFF')
   .text('Cử nhân CNTT', 12, sy, { width: SW - 24 });
sy += 11;
doc.font(I).fontSize(7.2).fillColor(C.sideAcct)
   .text('CN: Công nghệ phần mềm', 12, sy, { width: SW - 24 });
sy += 10;
doc.font(R).fontSize(7).fillColor(C.sideMuted)
   .text('Khoa Công nghệ Thông tin', 12, sy, { width: SW - 24 });
sy += 9.5;
doc.font(B).fontSize(7.2).fillColor(C.sideGold)
   .text('Đại học Khoa học', 12, sy, { width: SW - 24 });
sy += 9.5;
doc.font(R).fontSize(7).fillColor(C.sideGold)
   .text('Đại học Huế', 12, sy, { width: SW - 24 });
sy += 14;

// ── CERTIFICATIONS ───────────────────────────────────────────────────────────
sy = sSec('Chứng Chỉ', sy);

doc.font(B).fontSize(8.2).fillColor('#FFFFFF').text('APTIS B1', 12, sy);
sy += 10;
doc.font(I).fontSize(7.2).fillColor(C.sideAcct).text('English Proficiency', 12, sy, { width: SW - 24 });
sy += 9.5;
doc.font(R).fontSize(7).fillColor(C.sideMuted).text('British Council', 12, sy, { width: SW - 24 });
sy += 14;

// ── TECH SKILLS WITH BARS ────────────────────────────────────────────────────
sy = sSec('Kỹ Năng Lập Trình', sy);

const skills = [
  { name: 'JavaScript (ES6+)', pct: 82 },
  { name: 'PHP',               pct: 75 },
  { name: 'Python',            pct: 68 },
  { name: 'Node.js / Express', pct: 78 },
  { name: 'Next.js',           pct: 70 },
  { name: 'HTML5 / CSS3',      pct: 88 },
  { name: 'MySQL / SQL',       pct: 72 },
  { name: 'Git / GitHub',      pct: 80 },
];
const barW = SW - 24;
for (const sk of skills) {
  doc.font(R).fontSize(7.2).fillColor(C.sideText).text(sk.name, 12, sy, { width: barW });
  sy += 9.5;
  // Track
  doc.rect(12, sy, barW, 4.5).fillOpacity(0.25).fill(C.sideAcct);
  // Fill
  doc.fillOpacity(1).rect(12, sy, Math.round(barW * sk.pct / 100), 4.5).fill(C.sideAcct);
  sy += 9;
}
sy += 2;

// ── IT SKILLS ────────────────────────────────────────────────────────────────
sy = sSec('IT Support & Hardware', sy);

const itSkills = [
  'Build PC hoàn chỉnh',
  'Cài Windows & Driver',
  'Xử lý sự cố phần mềm',
  'Mạng LAN / Wi-Fi',
  'Hỗ trợ thiết bị văn phòng',
];
for (const s of itSkills) {
  doc.font(R).fontSize(7.2).fillColor(C.sideAcct).text('▸', 12, sy);
  doc.fillColor(C.sideText).text(s, 22, sy, { width: barW - 10 });
  sy += 12;
}
sy += 2;

// ── SOFT SKILLS ───────────────────────────────────────────────────────────────
sy = sSec('Kỹ Năng Mềm', sy);

const softSkills = ['Làm việc nhóm', 'Tự học & nghiên cứu', 'Tinh thần trách nhiệm', 'Tư duy giải quyết vấn đề', 'Giao tiếp cởi mở'];
for (const s of softSkills) {
  doc.font(R).fontSize(7.2).fillColor(C.sideGold).text('✦', 12, sy);
  doc.fillColor(C.sideText).text(s, 22, sy, { width: barW - 10 });
  sy += 12;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN CONTENT — white area
// ═══════════════════════════════════════════════════════════════════════════════
doc.rect(SW, 0, PW - SW, PH).fill(C.mainBg);

// ── HEADER ────────────────────────────────────────────────────────────────────
const HEADER_H = 72;
doc.rect(SW, 0, PW - SW, HEADER_H).fill(C.headerBg);

// Name
doc.font(B).fontSize(22).fillColor(C.headText)
   .text('LÊ DIÊN HIẾU', MX, 11, { width: MW });

// Title with colored separator
doc.font(B).fontSize(9.5).fillColor(C.headAcct)
   .text('SOFTWARE DEVELOPER  ·  IT SUPPORT', MX, 35, { width: MW });

// Thin divider
doc.rect(MX, 47, 180, 1.2).fill(C.headAcct);

// Contact row
doc.font(R).fontSize(7.6).fillColor(C.headSub)
   .text('☎ 0328 821 260   ✉ lehieu2900.in@gmail.com   ⌨ github.com/hieule52', MX, 52, { width: MW });

// ── Main body starts ──────────────────────────────────────────────────────────
let cy = HEADER_H + 8;

// ── Section heading helper ────────────────────────────────────────────────────
function mSec(icon, title) {
  doc.rect(SW, cy, PW - SW, 16).fill('#EEF2FF');
  doc.rect(SW, cy, 3.5, 16).fill(C.accent1);
  doc.font(B).fontSize(8.5).fillColor(C.accent1)
     .text(`${icon}  ${title.toUpperCase()}`, MX, cy + 3.5, { width: MW });
  cy += 19;
}

function bullet(text, x, y, w) {
  doc.font(R).fontSize(7.8).fillColor(C.accent1).text('•', x, y);
  doc.fillColor(C.body).text(text, x + 9, y, { width: (w || MW) - 9, lineGap: 1.2 });
  return doc.y + 1.5;
}

// ── 1. PROFESSIONAL SUMMARY ──────────────────────────────────────────────────
mSec('▶', 'Tóm Tắt Năng Lực');

doc.font(R).fontSize(7.8).fillColor(C.body)
   .text(
     'Cử nhân Công nghệ Thông tin (Chuyên ngành Công nghệ phần mềm) tốt nghiệp tại Khoa Công nghệ Thông tin, Đại học Khoa học — Đại học Huế. Có nền tảng vững chắc về phát triển website & ứng dụng web (JavaScript, PHP, Python, Next.js, Node.js), kết hợp năng lực hỗ trợ kỹ thuật IT Helpdesk và tự lắp ráp máy tính (Build PC) hoàn chỉnh. Tinh thần trách nhiệm cao, chăm chỉ, sẵn sàng đóng góp hiệu quả cho công việc phát triển phần mềm và vận hành hệ thống IT.',
     MX, cy,
     { align: 'justify', width: MW, lineGap: 1.5 }
   );
cy = doc.y + 7;

// ── 2. EDUCATION & CERTIFICATIONS ───────────────────────────────────────────
mSec('▶', 'Học Vấn & Chứng Chỉ');

const degCardY = cy;
doc.font(B).fontSize(8.8).fillColor(C.h1)
   .text('Cử nhân Công nghệ Thông tin (B.Sc. in IT)', MX + 6, cy + 4, { width: MW - 10 });
cy = doc.y + 2;

doc.font(I).fontSize(7.8).fillColor(C.h2)
   .text('Chuyên ngành: Công nghệ phần mềm', MX + 6, cy, { width: MW - 10 });
cy = doc.y + 3;

doc.font(R).fontSize(7.6).fillColor(C.muted)
   .text('Khoa Công nghệ Thông tin  |  Đại học Khoa học — Đại học Huế', MX + 6, cy, { width: MW - 10 });
cy = doc.y + 3;

doc.font(R).fontSize(7.6).fillColor(C.accent1).text('•', MX + 6, cy);
doc.fillColor(C.body)
   .text('Môn học trọng tâm: Lập trình hướng đối tượng (OOP), Cơ sở dữ liệu (SQL), Thiết kế phần mềm, Công nghệ Web, Mạng máy tính.', MX + 14, cy, { width: MW - 18, lineGap: 1.2 });
cy = doc.y + 2.5;

doc.font(R).fontSize(7.6).fillColor(C.accent1).text('•', MX + 6, cy);
doc.fillColor(C.body)
   .text('Dự án tốt nghiệp: Xây dựng ứng dụng web đáp ứng yêu cầu thực tế bằng công nghệ hiện đại.', MX + 14, cy, { width: MW - 18, lineGap: 1.2 });
cy = doc.y + 5;

const degCardH = cy - degCardY;
doc.rect(MX - 6, degCardY, MW + 6, degCardH).fillOpacity(0.03).fill(C.accent1);
doc.fillOpacity(1);
doc.rect(MX - 6, degCardY, 2.5, degCardH).fill(C.gold);
cy += 4;

const certCardY = cy;
doc.font(B).fontSize(8.8).fillColor(C.h1)
   .text('Chứng chỉ Tiếng Anh APTIS B1', MX + 6, cy + 4, { width: MW - 10, continued: true });
doc.font(I).fontSize(7.8).fillColor(C.muted)
   .text('  —  Hội đồng Anh (British Council)', { width: MW - 10 });
cy = doc.y + 3;

doc.font(R).fontSize(7.6).fillColor(C.accent1).text('•', MX + 6, cy);
doc.fillColor(C.body)
   .text('Đọc hiểu tài liệu kỹ thuật chuyên ngành, giao tiếp công việc bằng tiếng Anh trong môi trường IT.', MX + 14, cy, { width: MW - 18, lineGap: 1.2 });
cy = doc.y + 5;

const certCardH = cy - certCardY;
doc.rect(MX - 6, certCardY, MW + 6, certCardH).fillOpacity(0.03).fill(C.accent2);
doc.fillOpacity(1);
doc.rect(MX - 6, certCardY, 2.5, certCardH).fill(C.accent2);
cy += 7;

// ── 3. TECHNICAL SKILLS ──────────────────────────────────────────────────────
mSec('▶', 'Kỹ Năng Kỹ Thuật');

const c1x = MX,       c1w = MW / 2 - 8;
const c2x = MX + MW / 2 + 4, c2w = MW / 2 - 4;
const colY = cy;

doc.font(B).fontSize(8.2).fillColor(C.accent1)
   .text('💻  LẬP TRÌNH & PHÁT TRIỂN WEB', c1x, colY);

const devList = [
  'JavaScript (ES6+), PHP, Python, Java',
  'Next.js, Node.js, Express.js',
  'HTML5, CSS3, Responsive Design',
  'MySQL, SQL Queries, RESTful API',
  'Git, GitHub, Docker, Postman',
];
let ly = colY + 12;
for (const item of devList) {
  doc.font(R).fontSize(7.6).fillColor(C.accent1).text('▸', c1x, ly);
  doc.fillColor(C.body).text(item, c1x + 9, ly, { width: c1w - 9 });
  ly += 11.5;
}

doc.font(B).fontSize(8.2).fillColor(C.accent2)
   .text('🖥  IT SUPPORT & PHẦN CỨNG PC', c2x, colY);

const itList = [
  'Tự lắp ráp PC hoàn chỉnh (Build PC)',
  'Cài đặt & cấu hình Windows OS',
  'Quản lý Driver & thiết bị ngoại vi',
  'Xử lý sự cố phần mềm & mạng LAN/Wi-Fi',
  'Hỗ trợ kỹ thuật người dùng cuối',
];
let ry = colY + 12;
for (const item of itList) {
  doc.font(R).fontSize(7.6).fillColor(C.accent2).text('▸', c2x, ry);
  doc.fillColor(C.body).text(item, c2x + 9, ry, { width: c2w - 9 });
  ry += 11.5;
}

cy = Math.max(ly, ry) + 7;

// ── 4. FEATURED PROJECTS ─────────────────────────────────────────────────────
mSec('▶', 'Dự Án Thực Tế');

function drawProjectCard(title, link, bullets, borderColor) {
  const cardStartY = cy;
  
  doc.font(B).fontSize(8.6).fillColor(C.h1)
     .text(title, MX + 6, cy + 3.5, { width: MW - 10 });
  cy = doc.y + 2;

  if (link) {
    doc.font(R).fontSize(7.4).fillColor(C.link)
       .text(`🔗  ${link}`, MX + 6, cy);
    cy = doc.y + 2.5;
  }

  for (const b of bullets) {
    doc.font(R).fontSize(7.5).fillColor(C.accent1).text('•', MX + 6, cy);
    doc.fillColor(C.body).text(b, MX + 14, cy, { width: MW - 18, lineGap: 1.1 });
    cy = doc.y + 2;
  }
  cy += 2;

  const cardH = cy - cardStartY;
  doc.rect(MX - 6, cardStartY, MW + 6, cardH).fillOpacity(0.03).fill(borderColor);
  doc.fillOpacity(1);
  doc.rect(MX - 6, cardStartY, 2.5, cardH).fill(borderColor);
  cy += 4;
}

// 1. Tiến Quốc Auto Spa
drawProjectCard(
  'Tiến Quốc Auto Spa — Website Giới Thiệu & Chăm Sóc Ô Tô',
  'https://tienquoc-autospa.vercel.app',
  [
    'Công nghệ: HTML5, CSS3, JavaScript — Tối ưu Responsive Mobile-First, chuẩn SEO.',
    'Website hiện đại cho trung tâm chăm sóc ô tô với danh mục dịch vụ chi tiết và luồng đặt lịch thuận tiện.'
  ],
  C.accent1
);

// 2. Nhật Jewelry
drawProjectCard(
  'Nhật Jewelry — Website Thương Mại Điện Tử Trang Sức',
  'https://nhat-jewerly.vercel.app',
  [
    'Công nghệ: HTML5, CSS3, JavaScript — Thiết kế sang trọng, gallery sản phẩm phong phú.',
    'Trình bày bộ sưu tập trang sức cao cấp với giao diện tinh tế, mượt mà trên mọi thiết bị.'
  ],
  C.gold
);

// 3. DH Tech
drawProjectCard(
  'DH Tech — Website Dịch Vụ Công Nghệ & Giải Pháp IT',
  'https://www.dhtech.io.vn',
  [
    'Công nghệ: HTML5, CSS3, JavaScript, Responsive Design — Thiết kế corporate chuyên nghiệp.',
    'Giới thiệu giải pháp công nghệ, dịch vụ IT, danh mục sản phẩm và hồ sơ năng lực doanh nghiệp chuẩn SEO.'
  ],
  C.accent2
);
cy += 3;

// ── 5. IT EXPERIENCE ─────────────────────────────────────────────────────────
mSec('▶', 'Kinh Nghiệm Thực Tế — IT Support & Build PC');

doc.font(B).fontSize(8.5).fillColor(C.h1)
   .text('Tự Lắp Ráp Máy Tính (Build PC) & Hỗ Trợ Kỹ Thuật', MX, cy);
cy += 11;

const itExp = [
  'Lựa chọn & tư vấn linh kiện phù hợp nhu cầu và ngân sách (CPU, GPU, RAM, SSD, PSU, Case).',
  'Trực tiếp lắp ráp hoàn chỉnh nhiều bộ PC để bàn, đi dây gọn gàng và kiểm tra nhiệt độ hoạt động.',
  'Cài đặt Windows, cập nhật Driver chính hãng, cài phần mềm làm việc và bảo mật cần thiết.',
  'Hỗ trợ chẩn đoán, khắc phục sự cố phần mềm và phần cứng thường gặp cho bạn bè và người dùng.',
];
for (const item of itExp) {
  cy = bullet(item, MX, cy, MW);
}
cy += 5;

// ── 6. KEY STRENGTHS & LIFESTYLE ─────────────────────────────────────────────
mSec('▶', 'Phẩm Chất & Lối Sống');

const qx1 = MX,       qw = MW / 2 - 8;
const qx2 = MX + MW / 2 + 4;
const qY  = cy;

doc.font(B).fontSize(8.2).fillColor(C.accent1).text('Kỹ Năng Mềm', qx1, qY);
const softs = ['Làm việc nhóm hiệu quả', 'Tự học & nghiên cứu độc lập', 'Tinh thần trách nhiệm cao', 'Tư duy giải quyết vấn đề logic'];
let sl = qY + 11;
for (const s of softs) {
  doc.font(R).fontSize(7.6).fillColor(C.gold).text('✦', qx1, sl);
  doc.fillColor(C.body).text(s, qx1 + 10, sl, { width: qw - 10 });
  sl += 11;
}

doc.font(B).fontSize(8.2).fillColor(C.accent2).text('Thể Thao & Đời Sống', qx2, qY);
const life = [
  'Bóng đá (Đoạt cúp vô địch giải phong trào)',
  'Đạp xe & rèn luyện thể chất thường xuyên',
  'Gym — rèn giũa tính kỷ luật & kiên trì',
  'Đam mê công nghệ, phần cứng & PC Building',
];
let sr = qY + 11;
for (const s of life) {
  doc.font(R).fontSize(7.6).fillColor(C.accent2).text('⚡', qx2, sr);
  doc.fillColor(C.body).text(s, qx2 + 10, sr, { width: qw - 10 });
  sr += 11;
}

cy = Math.max(sl, sr) + 6;

// ── FOOTER ────────────────────────────────────────────────────────────────────
const FY = PH - 20;
doc.rect(SW, FY - 4, PW - SW, 24).fill(C.headerBg);
doc.font(R).fontSize(7).fillColor('#94A3B8')
   .text(
     'Lê Diên Hiếu  —  Đại học Khoa học, Đại học Huế  |  lehieu2900.in@gmail.com  |  github.com/hieule52  |  Cập nhật 11/2026',
     MX, FY + 2, { width: MW, align: 'center' }
   );

doc.end();

doc.on('end', () => {
  console.log('✅  Le-Dien-Hieu-CV.pdf generated successfully!');
});
