// Xử lý khi chọn Peripheral Device
document.getElementById('device').addEventListener('change', function() {
  const device = this.value;
  const output = document.getElementById('output');
  const deviceArea = document.querySelector('.device-area');

  // Xóa ảnh cũ nếu có
  deviceArea.innerHTML = "";

  if (device === 'hc-sr04') {
    output.innerHTML = "<h2>HC-SR04 Simulation</h2><p>Ultrasonic sensor active...</p>";
    const img = document.createElement('img');
    img.src = "Image/HC-SR04.png";   // đường dẫn tương đối
    img.alt = "HC-SR04 Sensor";
    img.id = "hcImage";
    deviceArea.appendChild(img);
    makeDraggable(img);
  } else if (device === 'lcd') {
    output.innerHTML = "<h2>LCD Simulation</h2><p>LCD 16x2 Display initialized...</p>";
    const img = document.createElement('img');
    img.src = "Image/LCD_16x2.png";  // đường dẫn tương đối
    img.alt = "LCD 16x2 Display";
    img.id = "lcdImage";
    deviceArea.appendChild(img);
    makeDraggable(img);
  } else {
    output.innerHTML = "<h2>Simulation Output</h2><p>Select options above to configure simulation.</p>";
  }
});

// Hàm chuyển tab
function showTab(tabId) {
  document.querySelectorAll('.tabcontent').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Hàm kéo thả ảnh trong device-area
function makeDraggable(img) {
  let isDragging = false;
  let offsetX, offsetY;

  img.style.position = "absolute";
  img.style.top = "50px";
  img.style.left = "50px";
  img.style.cursor = "grab";

  img.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    img.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const parentRect = img.parentElement.getBoundingClientRect();
      img.style.left = (e.clientX - parentRect.left - offsetX) + 'px';
      img.style.top = (e.clientY - parentRect.top - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    img.style.cursor = 'grab';
  });
}
