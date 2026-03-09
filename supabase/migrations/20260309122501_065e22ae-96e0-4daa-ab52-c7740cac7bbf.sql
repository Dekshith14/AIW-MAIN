
-- ============================================
-- 1. USER ROLES (admin / editor)
-- ============================================
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- 2. SITE CONTENT (key-value CMS store)
-- ============================================
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_value TEXT,
  content_type TEXT NOT NULL DEFAULT 'text',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page, section, content_key)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins/editors can insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update site content" ON public.site_content FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete site content" ON public.site_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- 3. PROJECT CATEGORIES
-- ============================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins/editors can insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update categories" ON public.categories FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- 4. PROJECTS
-- ============================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  domain TEXT NOT NULL DEFAULT 'Commercial',
  description TEXT,
  client TEXT,
  location TEXT,
  year TEXT,
  area TEXT,
  duration TEXT,
  style TEXT,
  cover_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  featured_order INT DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  tags TEXT[],
  highlights TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published projects" ON public.projects FOR SELECT USING (status = 'published' OR (auth.uid() IS NOT NULL AND public.is_admin_or_editor(auth.uid())));
CREATE POLICY "Admins/editors can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update projects" ON public.projects FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete projects" ON public.projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- 5. PROJECT IMAGES (gallery)
-- ============================================
CREATE TABLE public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Admins/editors can insert project images" ON public.project_images FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update project images" ON public.project_images FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can delete project images" ON public.project_images FOR DELETE TO authenticated USING (public.is_admin_or_editor(auth.uid()));

-- ============================================
-- 6. TESTIMONIALS
-- ============================================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active testimonials" ON public.testimonials FOR SELECT USING (is_active = true OR (auth.uid() IS NOT NULL AND public.is_admin_or_editor(auth.uid())));
CREATE POLICY "Admins/editors can insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.is_admin_or_editor(auth.uid()));

-- ============================================
-- 7. MEDIA LIBRARY
-- ============================================
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  folder TEXT DEFAULT 'general',
  alt_text TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Admins/editors can insert media" ON public.media FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update media" ON public.media FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can delete media" ON public.media FOR DELETE TO authenticated USING (public.is_admin_or_editor(auth.uid()));

-- ============================================
-- 8. SEO SETTINGS
-- ============================================
CREATE TABLE public.seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  keywords TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read SEO settings" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Admins/editors can insert seo" ON public.seo_settings FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update seo" ON public.seo_settings FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete seo" ON public.seo_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- 9. PAGE VIEWS (analytics)
-- ============================================
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  visitor_id TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read page views" ON public.page_views FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));

-- ============================================
-- 10. STORAGE BUCKET for media
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Anyone can view media files" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
CREATE POLICY "Authenticated users can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');

-- ============================================
-- 11. INVITE CODES (for admin registration)
-- ============================================
CREATE TABLE public.invite_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  role app_role NOT NULL DEFAULT 'editor',
  used_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.invite_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage invite codes" ON public.invite_codes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can validate invite codes" ON public.invite_codes FOR SELECT USING (used_by IS NULL AND (expires_at IS NULL OR expires_at > now()));

-- ============================================
-- 12. UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_seo_settings_updated_at BEFORE UPDATE ON public.seo_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 13. INDEXES
-- ============================================
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_domain ON public.projects(domain);
CREATE INDEX idx_projects_is_featured ON public.projects(is_featured);
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_page_views_page_path ON public.page_views(page_path);
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at);
CREATE INDEX idx_media_folder ON public.media(folder);
CREATE INDEX idx_site_content_page ON public.site_content(page);
CREATE INDEX idx_categories_slug ON public.categories(slug);

-- ============================================
-- 14. SEED DEFAULT INVITE CODE (for first admin)
-- ============================================
INSERT INTO public.invite_codes (code, role) VALUES ('AIW-ADMIN-2024', 'admin');
