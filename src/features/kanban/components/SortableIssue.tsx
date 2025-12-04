import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import type { Issue } from "@/lib/types"
import { getPersonById } from "@/lib/people"
import { getProjectById } from "@/lib/projects"
import { IssueCard } from "./IssueCard"
import { cn } from "@/lib/utils"

interface SortableIssueProps {
  issue: Issue
  onClick: () => void
}

export const SortableIssue: React.FC<SortableIssueProps> = ({ issue, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: issue.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn("cursor-grab active:cursor-grabbing", isDragging && "opacity-50")}
    >
      <IssueCard
        issue={issue}
        assignee={getPersonById(issue.assigneeId)}
        project={getProjectById(issue.projectId)}
      />
    </div>
  )
}