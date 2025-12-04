import React from "react"
import { useKanbanStore } from "@/store/kanbanStore"
import type { Issue } from "@/lib/types"

export const IssueActivity: React.FC<{ issue: Issue }> = ({ issue }) => {
  const getActivityByIssue = useKanbanStore((s) => s.getActivityByIssue)
  const logs = getActivityByIssue(issue.id)

  if (logs.length === 0) {
    return <p className="text-xs opacity-60">No activity yet...</p>
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">Activity</h4>
      {logs.map((log) => (
        <div key={log.id} className="text-xs flex flex-col gap-1">
          <div className="font-medium">{log.action}</div>
          <span className="text-[10px] opacity-60">
            {new Date(log.timestamp).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}