// Ensure common elements exist so injected scripts don't fail when they try to access them
export function installDomPlaceholders() {
  if (typeof window === 'undefined') return;
  if (window.__domPlaceholdersInstalled) return;
  window.__domPlaceholdersInstalled = true;

  function ensurePlaceholders() {
    try {
      if (!document.getElementById('shareBtn')) {
        const btn = document.createElement('button');
        btn.id = 'shareBtn';
        btn.style.display = 'none';
        btn.setAttribute('aria-hidden', 'true');
        document.body.appendChild(btn);
      }
    } catch (e) {
      // ignore if DOM not available or append fails
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensurePlaceholders);
  } else {
    ensurePlaceholders();
  }
}

export default installDomPlaceholders;
