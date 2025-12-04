import type { Person } from "./types"

export const people: Person[] = [
  {
    id: "person-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Developer",
    team: "Frontend",
    location: "San Francisco",
    imageURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    id: "person-2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Designer",
    team: "Design",
    location: "New York",
    imageURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
  {
    id: "person-3",
    name: "Carol Davis",
    email: "carol@example.com",
    role: "Product Manager",
    team: "Product",
    location: "Austin",
    imageURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
  },
  {
    id: "person-4",
    name: "David Wilson",
    email: "david@example.com",
    role: "Backend Developer",
    team: "Backend",
    location: "Seattle",
    imageURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
]

export function getPersonById(id: string | null): Person | null {
  if (!id) return null
  return people.find((p) => p.id === id) ?? null
}

export function getAllPeople(): Person[] {
  return people
}