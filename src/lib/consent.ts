export const GTM_ID = "GTM-PDMKT3W6";
export const CONSENT_STORAGE_KEY = "fitlist-consent";

export type ConsentChoice = "granted" | "denied";

type ConsentState = "granted" | "denied";

export type ConsentUpdate = {
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  analytics_storage: ConsentState;
};

export function consentUpdate(choice: ConsentChoice): ConsentUpdate {
  return {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function applyConsent(choice: ConsentChoice) {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // GTM reads the Arguments object by index, matching Google's snippet.
      window.dataLayer?.push(arguments);
    };
  }
  window.gtag("consent", "update", consentUpdate(choice));
}

export function gtmBootstrapScript() {
  const granted = JSON.stringify(consentUpdate("granted"));
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') {
    gtag('consent', 'update', ${granted});
  }
} catch (e) {}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`.trim();
}
