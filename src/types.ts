export interface DashboardLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

export interface LinkSection {
  title: string;
  links: DashboardLink[];
  collapsed?: boolean;
}

export interface SearchEngine {
  name: string;
  url: string;
  icon: string;
}

export interface LinkFormData {
  section: string;
  name: string;
  url: string;
  icon: string;
  color: string;
} 