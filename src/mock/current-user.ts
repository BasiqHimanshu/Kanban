export interface User {
  id: string
  name: string
  email: string
  imageURL: string
}

export function getCurrentUser(): User {
  return {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    imageURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  }
}