import React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useKanbanStore } from "@/store/kanbanStore"
import { people } from "@/lib/people"
import { projects } from "@/lib/projects"
import type { Issue, Priority, IssueType } from "@/lib/types"
import { IssueComments } from "./IssueComments"
import { IssueSubtasks } from "./IssueSubtask"
import { IssueActivity } from "./IssueActivity"

interface Props {
  issue: Issue | null
  open: boolean
  onClose: () => void
}

export const IssueDetailsDrawer: React.FC<Props> = ({
  issue,
  open,
  onClose,
}) => {
  const updateIssue = useKanbanStore((s) => s.updateIssue)

  if (!issue) return null

  const update = (partial: Partial<Issue>) => {
    updateIssue({
      ...issue,
      ...partial,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()} >
      <DrawerContent
        className="
          fixed bottom-0 right-0 
          translate-x-0 !left-auto
          w-[450px] max-w-full h-auto
          rounded-t-lg shadow-xl border
          data-[state=open]:animate-in data-[state=open]:fade-in-90
          data-[state=open]:animate-slide-up data-[state=closed]:animate-out
        "
      >


        <DrawerHeader>
          <DrawerTitle>Issue Details</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              value={issue.title}
              onChange={(e) => update({ title: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              value={issue.description || ""}
              rows={4}
              onChange={(e) => update({ description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Priority</Label>
              <Select
                value={issue.priority}
                onValueChange={(value: any) =>
                  update({ priority: value as Priority })
                }
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
                value={issue.type}
                onValueChange={(value: any) =>
                  update({ type: value as IssueType })
                }
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
                value={issue.assigneeId ?? "unassigned"}
                onValueChange={(v: any) => update({ assigneeId: v === "unassigned" ? null : v })}
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
                value={issue.projectId}
                onValueChange={(v: any) => update({ projectId: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Story Points</Label>
              <Input
                type="number"
                min={1}
                value={issue.storyPoints ?? ""}
                onChange={(e) =>
                  update({ storyPoints: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>Estimate (hrs)</Label>
              <Input
                type="number"
                min={0}
                value={issue.estimateHours ?? ""}
                onChange={(e) =>
                  update({ estimateHours: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>Due Date</Label>
              <Input
                type="date"
                value={issue.dueDate ?? ""}
                onChange={(e) => update({ dueDate: e.target.value })}
              />
            </div>
          </div>

          <hr className="my-4" />

          <IssueSubtasks issue={issue} />

          <hr className="my-4" />

          <IssueComments issue={issue} currentUserId="person-1" />

          <hr className="my-4" />

          <IssueActivity issue={issue} />

          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}