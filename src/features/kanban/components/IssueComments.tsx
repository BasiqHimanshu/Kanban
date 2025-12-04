import React, { useState, useMemo } from "react"
import { useKanbanStore } from "@/store/kanbanStore"
import { getPersonById } from "@/lib/people"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Issue, IssueComment } from "@/lib/types"

interface Props {
  issue: Issue
  currentUserId: string
}

export const IssueComments: React.FC<Props> = ({ issue, currentUserId }) => {
  const { addComment, comments: allComments } = useKanbanStore()
  const [text, setText] = useState("")

  const issueComments = useMemo(() => {
    return allComments
      .filter((c) => c.issueId === issue.id)
      .map((comment) => ({
        ...comment,
        authorName: getPersonById(comment.authorId)?.name || "Unknown",
      }))
  }, [allComments, issue.id])

  const handleSubmit = () => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const newComment: IssueComment = {
      id: crypto.randomUUID(),
      issueId: issue.id,
      authorId: currentUserId,
      message: trimmedText,
      createdAt: new Date().toISOString(),
    }

    addComment(newComment)
    setText("")
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">Comments</h4>

      <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
        {issueComments.length > 0 ? (
          issueComments.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {c.authorName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{c.authorName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{c.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>

      <div className="flex gap-2">
        <Textarea
          rows={2}
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-sm"
        />
        <Button onClick={handleSubmit} className="shrink-0">
          Send
        </Button>
      </div>
    </div>
  )
}