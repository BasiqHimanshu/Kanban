export interface Person {
  id: string
  name: string
  email: string
}

export const people: Person[] = [
  { id: "person-1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "person-2", name: "Bob Smith", email: "bob@example.com" },
  { id: "person-3", name: "Carol Davis", email: "carol@example.com" },
  { id: "person-4", name: "David Wilson", email: "david@example.com" },
]