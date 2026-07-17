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
    <h2 style="margin-top:40px">ألوان الموقع</h2>
    <div class="colorGrid">
      <label><span>لون الهوية</span><input type="color" id="accentColor" value="#c9ff35"><code id="accentValue">#c9ff35</code></label>
      <label><span>الخلفية الداكنة</span><input type="color" id="darkColor" value="#070b0a"><code id="darkValue">#070b0a</code></label>
      <label><span>الخلفية الفاتحة</span><input type="color" id="lightColor" value="#f1efe6"><code id="lightValue">#f1efe6</code></label>
      <label><span>لون النص الأساسي</span><input type="color" id="textColor" value="#f1efe6"><code id="textValue">#f1efe6</code></label>
    </div>
    <button class="danger" type="button" id="resetColors">استعادة الألوان الأصلية</button>
    <button class="save" type="button" id="saveBranding">حفظ الهوية والألوان</button>
    <p class="brandHint">استخدم PNG بخلفية شفافة لأفضل نتيجة. يتم تصغير الملف تلقائيًا للحفاظ على سرعة الموقع.</p>`;
  firstPanel.before(panel);

  const style = document.createElement('style');
  style.textContent = `.brandPreview{height:190px;background:#090c0a;border:1px solid var(--line);display:grid;place-items:center;overflow:hidden}.brandPreview img{width:100%;height:100%;object-fit:contain;filter:invert(1);mix-blend-mode:screen}.brandHint{color:var(--muted);font-size:12px}.field .danger{margin-top:0}.colorGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.colorGrid label{background:#090c0a;border:1px solid var(--line);padding:15px;display:flex;flex-direction:column;gap:10px}.colorGrid input{height:58px;padding:3px;cursor:pointer}.colorGrid code{direction:ltr;color:var(--muted)}@media(max-width:700px){.colorGrid{grid-template-columns:1fr 1fr}}`;
  document.head.append(style);

  const readConfig = () => JSON.parse(localStorage.getItem(KEY) || 'null') || {};
  let config = readConfig();
  config.branding ||= {};
  let headerLogo = config.branding.headerLogo || original;
  let loaderLogo = config.branding.loaderLogo || original;
  const defaultColors = { accent:'#c9ff35', dark:'#070b0a', light:'#f1efe6', text:'#f1efe6' };
  let colors = { ...defaultColors, ...(config.branding.colors || {}) };
  const headerPreview = document.getElementById('headerPreview');
  const loaderPreview = document.getElementById('loaderPreview');
  const refresh = () => { headerPreview.src = headerLogo; loaderPreview.src = loaderLogo; };
  refresh();
  const colorInputs = { accent:accentColor, dark:darkColor, light:lightColor, text:textColor };
  const colorValues = { accent:accentValue, dark:darkValue, light:lightValue, text:textValue };
  const refreshColors = () => Object.keys(colorInputs).forEach(key => { colorInputs[key].value = colors[key]; colorValues[key].textContent = colors[key]; });
  refreshColors();
  Object.keys(colorInputs).forEach(key => colorInputs[key].oninput = event => { colors[key] = event.target.value; colorValues[key].textContent = colors[key]; document.documentElement.style.setProperty(key === 'accent' ? '--acid' : key === 'dark' ? '--bg' : key === 'light' ? '--panel' : '--text', colors[key]); });

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
  resetColors.onclick = () => { colors = { ...defaultColors }; refreshColors(); };
  saveBranding.onclick = () => {
    config = readConfig();
    config.branding = { headerLogo, loaderLogo, colors };
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
