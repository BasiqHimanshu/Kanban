
import type { Person2 } from "@/mock/people"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChatDrawer } from "./MessageDrawer"

interface Props {
  people: Person2[]
}

export function PeopleTable({ people }: Props) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="pt-4">
          {people.length} member{people.length !== 1 && "s"} in this view
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-14 text-left">Name</TableHead>
            <TableHead className="text-left">Team</TableHead>
            <TableHead className="text-left">Role</TableHead>
            <TableHead className="text-left">Username</TableHead>
            <TableHead className="text-left">Joined</TableHead>
            <TableHead className="text-right pr-10">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium">{person.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {person.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm">{person.team}</TableCell>
              <TableCell className="text-sm">{person.role}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                @{person.username}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {person.joinedAt}
              </TableCell>
              <TableCell className="text-right">
                <ChatDrawer person={person} compact />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
