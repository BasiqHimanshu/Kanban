import React, { useState, useMemo } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

import { useKanbanStore } from "@/store/kanbanStore"
import { getPersonById } from "@/lib/people"
import { getProjectById } from "@/lib/projects"
import type { Issue } from "@/lib/types"

import { KanbanColumn } from "./components/KanbanColumn"
import { IssueCard } from "./components/IssueCard"
import { IssueDetailsDrawer } from "./components/IssueDetailsDrawer"
import { IssueDialog } from "./components/IssueDialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const columns = [
  { id: "To Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Blocked", title: "Blocked" },
  { id: "Done", title: "Done" },
]

export default function KabanBoard() {
  const { issues, setIssues, setIssueStatus, addIssue } = useKanbanStore()
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const issuesByColumn = useMemo(() => {
    const group: Record<string, Issue[]> = {}
    for (const col of columns) {
      group[col.id] = issues.filter((issue) => issue.status === col.id)
    }
    return group
  }, [issues])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const issue = issues.find((i) => i.id === event.active.id)
    if (issue) {
      setActiveIssue(issue)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveIssue(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string
    const activeIssue = issues.find((i) => i.id === activeId)

    if (!activeIssue) return

    const overIsColumn = columns.some((c) => c.id === overId)
    const overIssue = issues.find((i) => i.id === overId)
    const newStatus = overIsColumn ? overId : overIssue?.status

    if (newStatus && newStatus !== activeIssue.status) {
      setIssueStatus(activeId, newStatus)
      return
    }

    if (activeId !== overId && activeIssue.status === overIssue?.status) {
      const currentColumnIssues = issuesByColumn[activeIssue.status]
      const oldIndex = currentColumnIssues.findIndex((i) => i.id === activeId)
      const newIndex = currentColumnIssues.findIndex((i) => i.id === overId)

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedIssues = arrayMove(currentColumnIssues, oldIndex, newIndex)
        const otherIssues = issues.filter((i) => i.status !== activeIssue.status)
        setIssues([...otherIssues, ...reorderedIssues])
      }
    }
  }

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue)
    setIsDetailsOpen(true)
  }

  const handleCreateIssue = (data: any) => {
    const newIssue: Issue = {
      id: crypto.randomUUID(),
      ...data,
      status: "To Do",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addIssue(newIssue)
  }

  return (
    <>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Kanban Board</h1>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Create Issue
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex h-full w-full gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                issues={issuesByColumn[column.id] || []}
                onIssueClick={handleIssueClick}
              />
            ))}
          </div>

          <DragOverlay>
            {activeIssue ? (
              <IssueCard
                issue={activeIssue}
                assignee={getPersonById(activeIssue.assigneeId)}
                project={getProjectById(activeIssue.projectId)}
                isOverlay
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <IssueDetailsDrawer
        issue={selectedIssue}
        open={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false)
          setSelectedIssue(null)
        }}
      />

      <IssueDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateIssue}
      />
    </>
  )
}