
import { Button } from "@/components/ui/button"
import { LayoutList, Grid3x3 } from "lucide-react"

interface Props {
  view: "grid" | "list"
  setView: (v: "grid" | "list") => void
}

export function PeopleViewToggle({ view, setView }: Props) {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => setView("list")}
      >
        <LayoutList className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="icon"
        onClick={() => setView("grid")}
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>
    </div>
  )
}
