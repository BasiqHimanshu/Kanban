import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { IssueType, Priority } from "@/lib/types"
import { people } from "@/lib/people"
import { projects } from "@/lib/projects"

export interface IssueFormData {
  title: string
  description: string
  priority: Priority
  type: IssueType
  assigneeId: string | null
  projectId: string | null
  storyPoints: number | null
  dueDate?: string
  estimateHours?: number | null
}

interface IssueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: IssueFormData) => void
}

export const IssueDialog: React.FC<IssueDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [form, setForm] = useState<IssueFormData>({
    title: "",
    description: "",
    priority: "Medium",
    type: "Task",
    assigneeId: null,
    projectId: null,
    storyPoints: null,
    dueDate: "",
    estimateHours: null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSubmit(form)
    onOpenChange(false)
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      type: "Task",
      assigneeId: null,
      projectId: null,
      storyPoints: null,
      dueDate: "",
      estimateHours: null,
    })
  }

  const update = (key: keyof IssueFormData, value: any) =>
    setForm({ ...form, [key]: value })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Issue</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label>Title *</Label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Enter issue title"
              required
            />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the issue..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Priority</Label>
              <Select
                value={form.priority}
                onValueChange={(v: any) => update("priority", v as Priority)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Type</Label>
              <Select
                value={form.type}
                onValueChange={(v: any) => update("type", v as IssueType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
                  <SelectItem value="Story">Story</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Assignee</Label>
              <Select
                value={form.assigneeId ?? "unassigned"}
                onValueChange={(v: any) => update("assigneeId", v === "unassigned" ? null : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {people.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Project</Label>
              <Select
                value={form.projectId ?? "none"}
                onValueChange={(v: any) => update("projectId", v === "none" ? null : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Project</SelectItem>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Story Points</Label>
              <Input
                type="number"
                min={1}
                value={form.storyPoints ?? ""}
                onChange={(e) =>
                  update("storyPoints", e.target.value ? Number(e.target.value) : null)
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-1">
              <Label>Estimate (hrs)</Label>
              <Input
                type="number"
                min={0}
                value={form.estimateHours ?? ""}
                onChange={(e) =>
                  update("estimateHours", e.target.value ? Number(e.target.value) : null)
                }
                placeholder="0"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Issue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}