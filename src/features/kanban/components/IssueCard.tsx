import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Issue, Person, Project } from "@/lib/types"
import { cn } from "@/lib/utils"

interface IssueCardProps {
  issue: Issue
  assignee?: Person | null
  project?: Project | null
  isOverlay?: boolean
}

const priorityColors = {
  Low: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Medium: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  Critical: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

export const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  assignee,
  project,
  isOverlay,
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-zinc-900 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-zinc-800 cursor-grab active:cursor-grabbing",
        isOverlay && "shadow-lg rotate-2"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-semibold text-sm flex-1">{issue.title}</p>
        <Badge className={cn("text-xs", priorityColors[issue.priority])}>
          {issue.priority}
        </Badge>
      </div>
      
      {issue.description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {issue.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {project && (
            <Badge className="text-xs">
              {project.name}
            </Badge>
          )}
          <span className="text-xs text-gray-500">
            {issue.storyPoints && `${issue.storyPoints} SP`}
          </span>
        </div>
        
        {assignee && (
          <Avatar className="h-6 w-6">
            <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
            <AvatarFallback className="text-xs">{assignee.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  )
}