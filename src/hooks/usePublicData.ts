import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      return data as DBProject[];
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
        .eq("is_featured", true)
        .order("featured_order", { ascending: true })
        .limit(6);
      if (error) throw error;
      return data as DBProject[];
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
        .single();
      if (error) throw error;
      return data as DBProject;
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
      return data;
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
      // Convert to a key-value map
      const map: Record<string, string> = {};
      data?.forEach((item) => {
        map[`${item.section}.${item.content_key}`] = item.content_value || "";
      });
      return map;
    },
  });
};
