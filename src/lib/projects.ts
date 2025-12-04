import type { Project } from "./types"

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Marketing Site Redesign",
    description: "Modernize the marketing website with new design",
    status: "In Progress",
    ownerId: "person-1",
    team: "Frontend",
    endDate: "2024-03-31",
    color: "bg-blue-500",
    imageURL: "https://api.dicebear.com/7.x/icons/svg?seed=project1",
  },
  {
    id: "proj-2",
    name: "Mobile App Development",
    description: "Build a new mobile application",
    status: "Planning",
    ownerId: "person-3",
    team: "Mobile",
    endDate: "2024-06-30",
    color: "bg-green-500",
    imageURL: "https://api.dicebear.com/7.x/icons/svg?seed=project2",
  },
  {
    id: "proj-3",
    name: "API Integration",
    description: "Integrate third-party APIs",
    status: "In Progress",
    ownerId: "person-4",
    team: "Backend",
    endDate: "2024-02-28",
    color: "bg-purple-500",
    imageURL: "https://api.dicebear.com/7.x/icons/svg?seed=project3",
  },
]

export function getProjectById(id: string | null): Project | null {
  if (!id) return null
  return projects.find((p) => p.id === id) ?? null
}

export function getAllProjects(): Project[] {
  return projects
}