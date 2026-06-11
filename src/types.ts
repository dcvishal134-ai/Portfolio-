export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  tech: string[];
  dashboardType: 'ai-dashboard' | 'travel-route' | 'workflow-nodes';
  demoColor: string;
}

export interface Skill {
  name: string;
  category: 'core' | 'framework' | 'tools';
  proficiency: number;
  glowColor: string;
  description: string;
}

export interface CommandItem {
  key: string;
  label: string;
  shortcut?: string;
  action: () => void;
  category: 'navigation' | 'social' | 'contact';
  description?: string;
}
