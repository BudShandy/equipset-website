(function () {
  var GA_ID = 'G-DJSRYKH7W9';
  var KEY = 'equipset_cookie_consent';

  function loadGA() {
    if (window.__equipsetGaLoaded) return;
    window.__equipsetGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a || !a.href) return;
      if (/^https:\/\/equipset\.app\/?/.test(a.href)) {
        gtag('event', 'app_link_click', {
          link_text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
          page_path: location.pathname
        });
      }
    });
  }

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function setConsent(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#0F2340;border-top:1px solid rgba(255,255,255,0.1);padding:16px 32px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;';
    banner.innerHTML =
      '<p style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.6;margin:0;flex:1;min-width:260px;">' +
      'We use cookies to analyse site traffic (Google Analytics). By clicking Accept, you agree to our use of analytics cookies. ' +
      '<a href="/privacy.html" style="color:#FBBF24;text-decoration:underline;margin-left:4px;">Privacy Policy</a></p>' +
      '<div style="display:flex;gap:10px;flex-shrink:0;">' +
      '<button id="cookie-decline" style="padding:9px 20px;border-radius:7px;border:1.5px solid rgba(255,255,255,0.25);background:transparent;color:rgba(255,255,255,0.7);font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;">Decline</button>' +
      '<button id="cookie-accept" style="padding:9px 20px;border-radius:7px;border:none;background:#F59E0B;color:#fff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;">Accept</button>' +
      '</div>';
    document.body.appendChild(banner);
    document.getElementById('cookie-accept').addEventListener('click', function () {
      setConsent('accepted');
      banner.remove();
      loadGA();
    });
    document.getElementById('cookie-decline').addEventListener('click', function () {
      setConsent('declined');
      banner.remove();
    });
  }

  var consent = getConsent();
  if (consent === 'accepted') { loadGA(); return; }
  if (consent === 'declined') return;
  if (document.body) { showBanner(); }
  else { document.addEventListener('DOMContentLoaded', showBanner); }
})();
