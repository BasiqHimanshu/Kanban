export interface Project {
  id: string
  name: string
  description: string
}

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Marketing Site Redesign",
    description: "Redesign the marketing website",
  },
  {
    id: "proj-2",
    name: "Mobile App Development",
    description: "Build new mobile application",
  },
  {
    id: "proj-3",
    name: "API Integration",
    description: "Integrate third-party APIs",
  },
]