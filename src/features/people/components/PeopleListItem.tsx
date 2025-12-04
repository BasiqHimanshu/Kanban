import { Card } from "@/components/ui/card"

export default function PeopleListItem({ person }: any) {
  return (
    <Card className="flex items-center gap-4 p-4 shadow-sm">
      <img src={person.avatar} className="w-12 h-12 rounded-full object-cover" />

      <div className="flex-1">
        <h3 className="font-medium">{person.name}</h3>
        <p className="text-sm text-muted-foreground">{person.role}</p>
      </div>

      <span className="text-xs font-medium text-primary">
        {person.team}
      </span>
    </Card>
  )
}
