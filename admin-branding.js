(() => {
  const KEY = 'petroAdminConfig';
  const original = 'my%20logo.png';
  const tabs = document.querySelector('.tabs');
  const firstPanel = document.querySelector('.panel');
  const button = document.createElement('button');
  button.dataset.tab = 'branding';
  button.textContent = 'الهوية واللوجو';
  tabs.prepend(button);

  const panel = document.createElement('section');
  panel.className = 'panel';
  panel.id = 'branding';
  panel.innerHTML = `
    <h2>تغيير اللوجو</h2>
    <div class="grid">
      <div class="field">
        <span>لوجو الهيدر</span>
        <div class="brandPreview"><img id="headerPreview" alt="معاينة لوجو الهيدر"></div>
        <input id="headerLogoInput" type="file" accept="image/png,image/jpeg,image/webp">
        <button class="danger" type="button" id="resetHeaderLogo">استخدام اللوجو الأصلي</button>
      </div>
      <div class="field">
        <span>لوجو شاشة التحميل</span>
        <div class="brandPreview"><img id="loaderPreview" alt="معاينة لوجو التحميل"></div>
        <input id="loaderLogoInput" type="file" accept="image/png,image/jpeg,image/webp">
        <button class="danger" type="button" id="resetLoaderLogo">استخدام اللوجو الأصلي</button>
      </div>
    </div>
    <button class="save" type="button" id="saveBranding">حفظ اللوجوهات</button>
    <p class="brandHint">استخدم PNG بخلفية شفافة لأفضل نتيجة. يتم تصغير الملف تلقائيًا للحفاظ على سرعة الموقع.</p>`;
  firstPanel.before(panel);

  const style = document.createElement('style');
  style.textContent = `.brandPreview{height:190px;background:#090c0a;border:1px solid var(--line);display:grid;place-items:center;overflow:hidden}.brandPreview img{width:100%;height:100%;object-fit:contain;filter:invert(1);mix-blend-mode:screen}.brandHint{color:var(--muted);font-size:12px}.field .danger{margin-top:0}`;
  document.head.append(style);

  const readConfig = () => JSON.parse(localStorage.getItem(KEY) || 'null') || {};
  let config = readConfig();
  config.branding ||= {};
  let headerLogo = config.branding.headerLogo || original;
  let loaderLogo = config.branding.loaderLogo || original;
  const headerPreview = document.getElementById('headerPreview');
  const loaderPreview = document.getElementById('loaderPreview');
  const refresh = () => { headerPreview.src = headerLogo; loaderPreview.src = loaderLogo; };
  refresh();

  const compress = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const max = 1400;
        const scale = Math.min(1, max / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/webp', .9));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  headerLogoInput.onchange = async () => { if (headerLogoInput.files[0]) { headerLogo = await compress(headerLogoInput.files[0]); refresh(); } };
  loaderLogoInput.onchange = async () => { if (loaderLogoInput.files[0]) { loaderLogo = await compress(loaderLogoInput.files[0]); refresh(); } };
  resetHeaderLogo.onclick = () => { headerLogo = original; headerLogoInput.value = ''; refresh(); };
  resetLoaderLogo.onclick = () => { loaderLogo = original; loaderLogoInput.value = ''; refresh(); };
  saveBranding.onclick = () => {
    config = readConfig();
    config.branding = { headerLogo, loaderLogo };
    localStorage.setItem(KEY, JSON.stringify(config));
    const notice = document.getElementById('notice');
    notice.classList.add('show'); setTimeout(() => notice.classList.remove('show'), 1600);
  };
  button.onclick = () => {
    document.querySelector('.tabs .active')?.classList.remove('active');
    document.querySelector('.panel.active')?.classList.remove('active');
    button.classList.add('active'); panel.classList.add('active');
  };
})();
