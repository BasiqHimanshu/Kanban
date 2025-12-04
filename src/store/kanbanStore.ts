import { create } from "zustand"
import type { Issue, IssueStatus, IssueComment, Subtask, ActivityLog } from "@/lib/types"
import { issues as mockIssues } from "@/lib/issues"

export interface KanbanState {
  issues: Issue[]
  comments: IssueComment[]
  subtasks: Subtask[]
  activity: ActivityLog[]
  searchTerm: string
  selectedProject: string

  setIssues: (issues: Issue[]) => void
  addIssue: (issue: Issue) => void
  updateIssue: (updated: Issue) => void
  setIssueStatus: (issueId: string, newStatus: string) => void
  
  addComment: (comment: IssueComment) => void
  getCommentsByIssue: (issueId: string) => IssueComment[]
  
  addSubtask: (parentId: string, title: string) => void
  toggleSubtask: (subtaskId: string) => void
  
  addActivity: (log: ActivityLog) => void
  getActivityByIssue: (issueId: string) => ActivityLog[]
  
  setSearchTerm: (term: string) => void
  setSelectedProject: (projectId: string) => void
}

export const useKanbanStore = create<KanbanState>((set, get) => ({
  issues: mockIssues,
  comments: [],
  subtasks: [],
  activity: [],
  searchTerm: "",
  selectedProject: "all",

  setIssues: (issues) => set({ issues }),

  setSearchTerm: (searchTerm) => set({ searchTerm }),
  
  setSelectedProject: (selectedProject) => set({ selectedProject }),

  addIssue: (issue) =>
    set((state) => {
      const now = new Date().toISOString()
      return {
        issues: [...state.issues, issue],
        activity: [
          ...state.activity,
          {
            id: crypto.randomUUID(),
            issueId: issue.id,
            action: `Issue created: "${issue.title}"`,
            authorId: issue.assigneeId ?? "system",
            timestamp: now,
          },
        ],
      }
    }),

  updateIssue: (updatedIssue) =>
    set((state) => {
      const existing = state.issues.find((i) => i.id === updatedIssue.id)
      if (!existing) return {}

      const logs: string[] = []

      if (existing.title !== updatedIssue.title) {
        logs.push(`Title changed: "${existing.title}" → "${updatedIssue.title}"`)
      }
      if (existing.priority !== updatedIssue.priority) {
        logs.push(`Priority changed: ${existing.priority} → ${updatedIssue.priority}`)
      }
      if (existing.status !== updatedIssue.status) {
        logs.push(`Status changed: ${existing.status} → ${updatedIssue.status}`)
      }
      if (existing.assigneeId !== updatedIssue.assigneeId) {
        logs.push(`Assignee changed`)
      }

      const newActivityEntries = logs.map((action) => ({
        id: crypto.randomUUID(),
        issueId: updatedIssue.id,
        action,
        authorId: updatedIssue.assigneeId ?? "system",
        timestamp: new Date().toISOString(),
      }))

      return {
        issues: state.issues.map((i) =>
          i.id === updatedIssue.id ? updatedIssue : i
        ),
        activity: [...state.activity, ...newActivityEntries],
      }
    }),

  setIssueStatus: (issueId, newStatus) =>
    set((state) => {
      const issue = state.issues.find((i) => i.id === issueId)
      if (!issue) return {}

      return {
        issues: state.issues.map((i) =>
          i.id === issueId
            ? { ...i, status: newStatus as IssueStatus, updatedAt: new Date().toISOString() }
            : i
        ),
        activity: [
          ...state.activity,
          {
            id: crypto.randomUUID(),
            issueId,
            action: `Status changed to "${newStatus}"`,
            authorId: issue.assigneeId ?? "system",
            timestamp: new Date().toISOString(),
          },
        ],
      }
    }),

  addComment: (comment) =>
    set((state) => ({ comments: [...state.comments, comment] })),

  getCommentsByIssue: (issueId) =>
    get().comments.filter((c) => c.issueId === issueId),

  addSubtask: (parentId, title) =>
    set((state) => ({
      subtasks: [
        ...state.subtasks,
        {
          id: crypto.randomUUID(),
          issueId: parentId,
          title,
          completed: false,
        },
      ],
    })),

  toggleSubtask: (subtaskId) =>
    set((state) => ({
      subtasks: state.subtasks.map((s) =>
        s.id === subtaskId ? { ...s, completed: !s.completed } : s
      ),
    })),

  addActivity: (log) =>
    set((state) => ({
      activity: [...state.activity, log],
    })),

  getActivityByIssue: (issueId) =>
    get().activity.filter((a) => a.issueId === issueId),
}))