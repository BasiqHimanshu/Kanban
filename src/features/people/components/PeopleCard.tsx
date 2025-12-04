
import type { Person2 } from "@/mock/people"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Search, UserPlus2 } from "lucide-react"
import { ChatDrawer } from "./MessageDrawer"

interface Props {
  person: Person2
}

export function PeopleCard({ person }: Props) {
  return (
    <Card className="border border-border/60 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <div className="flex items-center gap-3">
          <img
            src={person.avatar}
            alt={person.name}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold leading-tight">
              {person.name}
            </h3>
            <p className="text-sm text-muted-foreground">@{person.username}</p>
          </div>
        </div>

        
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {person.bio}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs">
          <span className="font-medium">
            {person.role}
          </span>
          <span className="text-muted-foreground">
            {person.team} Team
          </span>
          <span className="text-muted-foreground">
            Joined {person.joinedAt}
          </span>
        </div>

        <div className="pt-2">
          <ChatDrawer person={person} triggerVariant="default" />
        </div>
      </CardContent>
    </Card>
  )
}
