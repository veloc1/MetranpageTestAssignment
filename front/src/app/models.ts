export type Project = {
  id: number;
};

export type Template = {
  id: number;
  arg1: string;
  arg2: string;
};

export type TemplateResponse = {
  templates: Template[];
};

export type ProjectResponse = {
  projects: Project[];
};

export type BuildResponse = {
  buildedProject: string;
}
