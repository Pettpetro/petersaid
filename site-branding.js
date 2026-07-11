(() => {
  const config = JSON.parse(localStorage.getItem('petroAdminConfig') || 'null');
  if (!config?.branding) return;
  const { headerLogo, loaderLogo } = config.branding;
  if (headerLogo) {
    const header = document.querySelector('.petroLogo img');
    if (header) header.src = headerLogo;
    document.querySelectorAll('.logo3d img').forEach(image => image.src = headerLogo);
  }
  if (loaderLogo) {
    const loader = document.querySelector('.loaderLogo img');
    if (loader) loader.src = loaderLogo;
  }
})();
