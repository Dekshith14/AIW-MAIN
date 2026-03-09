
-- Tighten page_views: add a check to prevent abuse (limit text length)
DROP POLICY "Anyone can insert page views" ON public.page_views;
CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT
  WITH CHECK (
    length(page_path) < 500
    AND (visitor_id IS NULL OR length(visitor_id) < 100)
    AND (referrer IS NULL OR length(referrer) < 1000)
  );
