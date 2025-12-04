import React from "react"
import type { Issue } from "@/lib/types"
import { useDroppable } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { SortableIssue } from "./SortableIssue"
import { cn } from "@/lib/utils"

interface KanbanColumnProps {
  column: { id: string; title: string }
  issues: Issue[]
  onIssueClick?: (issue: Issue) => void
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  issues,
  onIssueClick,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div className="flex w-[280px] shrink-0 flex-col md:w-[300px]">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{column.title}</h3>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            {issues.length}
          </span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-1 flex-col gap-3 overflow-y-auto rounded-xl border border-transparent bg-gray-100/60 p-2 transition-colors dark:bg-gray-800/50 min-h-[400px]",
          isOver && "border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/20"
        )}
      >
        <SortableContext items={issues.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {issues.map((issue) => (
            <SortableIssue
              key={issue.id}
              issue={issue}
              onClick={() => onIssueClick?.(issue)}
            />
          ))}
        </SortableContext>
        {issues.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-300/80 p-4 text-sm font-medium text-gray-500 dark:border-gray-600/80">
            Drop issues here
          </div>
        )}
      </div>
    </div>
  )
}