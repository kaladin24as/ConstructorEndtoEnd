export type ToolCategory = 
  | 'cloud' 
  | 'ingestion' 
  | 'warehouse' 
  | 'transformation' 
  | 'orchestration' 
  | 'visualization' 
  | 'iac' 
  | 'container'
  | 'quality';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  icon: string;
  description: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  config: Partial<ProjectConfig['tools']>;
}

export interface ProjectConfig {
  projectName: string;
  description: string;
  author: string;
  tools: {
    cloud: string | null;
    ingestion: string | null;
    warehouse: string | null;
    transformation: string | null;
    orchestration: string | null;
    visualization: string | null;
    iac: string | null;
    container: string | null;
    quality: string | null;
  };
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}
