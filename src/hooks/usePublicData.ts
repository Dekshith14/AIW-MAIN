import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  fallbackProjects,
  fallbackTestimonials,
  getFallbackSiteContentMap,
} from "@/data/adminFallbacks";

export interface DBProject {
  id: string;
  title: string;
  slug: string;
  domain: string;
  description: string | null;
  client: string | null;
  location: string | null;
  year: string | null;
  area: string | null;
  duration: string | null;
  style: string | null;
  cover_image: string | null;
  status: string;
  is_featured: boolean;
  featured_order: number | null;
  sort_order: number;
  tags: string[] | null;
  highlights: string[] | null;
  category_id: string | null;
}

export interface DBProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
}

export interface DBTestimonial {
  id: string;
  author: string;
  quote: string;
  role: string | null;
  is_active: boolean;
  sort_order: number;
}

const mergeProjects = (dbProjects: DBProject[] | null | undefined) => {
  const bySlug = new Map<string, DBProject>();

  fallbackProjects.forEach((project) => {
    bySlug.set(project.slug, project);
  });

  (dbProjects || []).forEach((project) => {
    bySlug.set(project.slug, project);
  });

  return Array.from(bySlug.values()).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
};

export const usePublishedProjects = () => {
  return useQuery({
    queryKey: ["published-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return mergeProjects(data as DBProject[]);
    },
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return mergeProjects(data as DBProject[])
        .filter((project) => project.is_featured)
        .sort((a, b) => (a.featured_order ?? Number.MAX_SAFE_INTEGER) - (b.featured_order ?? Number.MAX_SAFE_INTEGER))
        .slice(0, 6);
    },
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as DBProject | null;
    },
    enabled: !!slug,
  });
};

export const useProjectImages = (projectId: string) => {
  return useQuery({
    queryKey: ["project-images", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as DBProjectImage[];
    },
    enabled: !!projectId,
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      const byKey = new Map<string, DBTestimonial>();

      fallbackTestimonials.forEach((testimonial) => {
        byKey.set(`${testimonial.author}-${testimonial.sort_order}`, testimonial);
      });

      (data as DBTestimonial[] | null)?.forEach((testimonial) => {
        byKey.set(`${testimonial.author}-${testimonial.sort_order}`, testimonial);
      });

      return Array.from(byKey.values()).sort((a, b) => a.sort_order - b.sort_order);
    },
  });
};

export const useSiteContent = (page: string) => {
  return useQuery({
    queryKey: ["site-content", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", page)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      const map: Record<string, string> = getFallbackSiteContentMap(page);
      data?.forEach((item) => {
        map[`${item.section}.${item.content_key}`] = item.content_value || "";
      });
      return map;
    },
  });
};
