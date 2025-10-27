export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: keyof typeof import("lucide-astro");
}
