import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getVisitorId = () => {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("visitor_id", id);
  }
  return id;
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;

    const trackView = async () => {
      await supabase.from("page_views").insert({
        page_path: location.pathname,
        visitor_id: getVisitorId(),
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    };

    trackView();
  }, [location.pathname]);
};
