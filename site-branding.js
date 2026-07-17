(() => {
  const config = JSON.parse(localStorage.getItem('petroAdminConfig') || 'null');
  if (!config?.branding) return;
  const { headerLogo, loaderLogo } = config.branding;
  const colors = config.branding.colors || {};
  if (colors.accent) document.documentElement.style.setProperty('--acid', colors.accent);
  if (colors.dark) document.documentElement.style.setProperty('--ink', colors.dark);
  if (colors.light) document.documentElement.style.setProperty('--paper', colors.light);
  if (colors.text) document.documentElement.style.setProperty('--site-text', colors.text);
  if (headerLogo) {
    const header = document.querySelector('.petroLogo img');
    if (header) header.src = headerLogo;
  }
  if (loaderLogo) {
    const loader = document.querySelector('.loaderLogo img');
    if (loader) loader.src = loaderLogo;
  }
})();
