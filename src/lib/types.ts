export type Priority = "Low" | "Medium" | "High" | "Critical"
export type IssueStatus = "To Do" | "In Progress" | "Blocked" | "Done"
export type IssueType = "Bug" | "Feature" | "Task" | "Story"

export interface Issue {
  id: string
  title: string
  description?: string
  status: IssueStatus
  priority: Priority
  type: IssueType
  projectId: string
  assigneeId: string | null
  storyPoints?: number
  estimateHours?: number
  dueDate?: string
  labels?: string[]
  createdAt: string
  updatedAt: string
}

export interface Person {
  id: string
  name: string
  email: string
  role: string
  team: string
  location?: string
  imageURL?: string
  avatarUrl?: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: string
  ownerId: string
  team: string
  endDate: string
  color: string
  imageURL: string
}

export interface KanbanColumn {
  id: string
  title: string
  status: IssueStatus | string
  order: string[]
}

export interface IssueComment {
  id: string
  issueId: string
  authorId: string
  message: string
  createdAt: string
}

export interface Subtask {
  id: string
  issueId: string
  title: string
  completed: boolean
}

export interface ActivityLog {
  id: string
  issueId: string
  action: string
  authorId: string
  timestamp: string
}

export interface Comment {
  id: string
  issueId: string
  authorId: string
  message: string
  createdAt: string
}