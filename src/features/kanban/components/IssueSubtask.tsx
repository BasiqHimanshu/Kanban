import React, { useState } from "react"
import { useKanbanStore } from "@/store/kanbanStore"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Issue } from "@/lib/types"

export const IssueSubtasks: React.FC<{ issue: Issue }> = ({ issue }) => {
  const { subtasks, addSubtask, toggleSubtask } = useKanbanStore()
  const list = subtasks.filter((s) => s.issueId === issue.id)
  const [title, setTitle] = useState("")

  const handleAdd = () => {
    if (title.trim()) {
      addSubtask(issue.id, title)
      setTitle("")
    }
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">Subtasks</h4>

      {list.map((s) => (
        <div key={s.id} className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={s.completed}
            onCheckedChange={() => toggleSubtask(s.id)}
          />
          <span className={s.completed ? "line-through opacity-60" : ""}>
            {s.title}
          </span>
        </div>
      ))}

      <div className="flex gap-2">
        <Input
          placeholder="Add subtask"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  )
}