import { onCLS, onINP, onLCP } from 'web-vitals';

function sendToGoogleAnalytics({ name, delta, id }: any) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta), 
      non_interaction: true,
    });
  }
}

export function reportWebVitals() {
  onCLS(sendToGoogleAnalytics);
  onINP(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
}