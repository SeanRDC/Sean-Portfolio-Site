import { useLayoutEffect } from "react";

// Layout effect so the title is already updated when AnalyticsTracker reports the page view
export function usePageTitle(title: string) {
  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
}
