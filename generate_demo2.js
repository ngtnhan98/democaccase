const fs = require('fs');

const indexHtml = fs.readFileSync('/Users/nguyentrongnhan/Downloads/tho/thodienmayxanh_mobile/thodmxmobile/index.html', 'utf8');

const styleMatches = indexHtml.match(/<style>[\\s\\S]*?<\\/style>/g);
const styles = styleMatches ? styleMatches.join('\\n') : '';

const cardMatch = indexHtml.match(/class=\"reminder-card\"[\\s\\S]*?<!-- DYNAMIC WEATHER CARD -->/);
let htmlSnippet = cardMatch ? cardMatch[0] : '';

htmlSnippet = htmlSnippet.replace(/ThoDMX_Weather_Card_Demo_Package/g, '../thodienmayxanh_mobile/thodmxmobile/ThoDMX_Weather_Card_Demo_Package');

const parts = htmlSnippet.split(/<!-- Item \\d+: [^>]+ -->/);
const headerPart = parts[0];

let baseItem = parts[1].split('</div>\\n          <!-- Scroll Cue Indicator -->')[0];

let fullHTML = `
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Demo Các Case - Reminder Card</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
${styles}
<style>
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f0f4f8;
    margin: 0;
    padding: 40px 20px;
  }
  .demo-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .demo-title {
    text-align: center;
    font-size: 28px;
    font-weight: 800;
    color: #1a2940;
    margin-bottom: 10px;
  }
  .demo-subtitle {
    text-align: center;
    font-size: 16px;
    color: #4a5b78;
    margin-bottom: 40px;
  }
  .cards-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
  }
  .case-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 340px;
  }
  .case-title {
    font-size: 16px;
    font-weight: 700;
    color: #1a2940;
    background: #e2e8f0;
    padding: 8px 20px;
    border-radius: 20px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }
  .case-desc {
    font-size: 14px;
    color: #4a5b78;
    text-align: center;
    margin-bottom: 10px;
    min-height: 40px;
  }
  .reminder-list-content {
    max-height: none !important;
    overflow: hidden !important;
  }
  .scroll-cue { display: none !important; }
  
  .status-label {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    justify-self: end;
    margin-top: 4px;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 600;
    color: #059669;
    background-color: #d1fae5;
    border-radius: 999px;
    border: 1px solid #10b981;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .status-label svg {
    width: 14px;
    height: 14px;
  }
</style>
</head>
<body>

<div class="demo-container">
  <div class="demo-title">Demo Các Case: Thợ DMX nhắc lịch thiết bị bảo dưỡng</div>
  <div class="demo-subtitle">Dựa theo Tài liệu Đặc tả (Mục 4.2 - 4.6)</div>
  
  <div class="cards-grid">
`;

// Case 1: 4.2 KH có thiết bị đến hạn
fullHTML += `
    <div class="case-wrapper">
      <div class="case-title">4.2. KH có thiết bị đến hạn</div>
      <div class="case-desc">Hiển thị bình thường với 2 nút [Nhắc tôi sau] và [Đặt lịch].</div>
      ${headerPart}
      ${baseItem}
      </div></div></div>
    </div>
`;

// Case 2: 4.4 Thiết bị đã có lịch hẹn
let case44Item = baseItem.replace(/<div class=\"btn-group\"[\\s\\S]*?<\\/div>/, `
  <div class="status-label">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
    Đã lập hẹn
  </div>
`);
fullHTML += `
    <div class="case-wrapper">
      <div class="case-title">4.4. Thiết bị đã có lịch hẹn</div>
      <div class="case-desc">Ẩn nút [Nhắc tôi sau]. Thay nút [Đặt lịch] bằng nhãn trạng thái "Đã lập hẹn".</div>
      ${headerPart}
      ${case44Item}
      </div></div></div>
    </div>
`;

// Case 3: 4.5 Bấm "Nhắc tôi sau"
let case45Item = baseItem;
fullHTML += `
    <div class="case-wrapper" id="case45">
      <div class="case-title">4.5. Hành động "Nhắc tôi sau"</div>
      <div class="case-desc">Bấm nút "Nhắc tôi sau" để ẩn thiết bị khỏi danh sách.</div>
      ${headerPart}
      ${case45Item}
      </div></div></div>
    </div>
`;

// Case 4: 4.6 Bấm "Đặt lịch"
let case46Item = baseItem;
fullHTML += `
    <div class="case-wrapper">
      <div class="case-title">4.6. Hành động "Đặt lịch"</div>
      <div class="case-desc">Bấm nút "Đặt lịch" để chuyển sang màn hình đặt lịch.</div>
      ${headerPart}
      ${case46Item}
      </div></div></div>
    </div>
`;

// Case 5: 4.3 Không có thiết bị
fullHTML += `
    <div class="case-wrapper">
      <div class="case-title">4.3. KH chưa có thiết bị</div>
      <div class="case-desc">Block nhắc lịch bị ẩn hoàn toàn (Không hiển thị).</div>
      <div style="width: 100%; max-width: 340px; height: 150px; border: 2px dashed #cbd5e1; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: #64748b; font-weight: 500; background: #f8fafc;">
        Block bị ẩn
      </div>
    </div>
`;

fullHTML += `
  </div>
</div>
<script>
  document.querySelectorAll('button').forEach(btn => {
      if(btn.textContent.trim() === 'Nhắc tôi sau') {
          btn.onclick = function(e) {
              e.preventDefault();
              const card = this.closest('.case-wrapper');
              if(card) {
                  if (card.id === 'case45') {
                      const item = this.closest('.reminder-item');
                      item.style.transition = 'all 0.3s ease';
                      item.style.opacity = '0';
                      item.style.transform = 'translateX(-20px)';
                      setTimeout(() => {
                          item.style.display = 'none';
                          alert('Hệ thống ghi nhận hoãn nhắc 7 ngày. Item đã bị ẩn.');
                      }, 300);
                  } else {
                      alert('Hệ thống ghi nhận hoãn nhắc (Demo).');
                  }
              }
          }
      }
      if(btn.textContent.trim() === 'Đặt lịch' || btn.classList.contains('ai-btn')) {
          btn.onclick = function(e) {
              e.preventDefault();
              alert('Chuyển hướng đến màn hình đặt lịch dịch vụ bảo dưỡng (Pre-fill DeviceID, Brand, Address,...)');
          }
      }
  });
</script>
</body>
</html>
`;

fs.writeFileSync('/Users/nguyentrongnhan/Downloads/tho/democaccase/index.html', fullHTML);
console.log('Demo page generated successfully.');
