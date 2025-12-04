

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { peopleData } from "@/mock/people"
import { PeopleViewToggle } from "./components/PeopleViewToggle"
import { PeopleCard } from "./components/PeopleCard"
import { PeopleTable } from "./components/PeopleTable"

const teams = ["All", "Engineering", "Product", "Quality", "HR"]

export default function People() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [search, setSearch] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<string>("All")

  const filteredPeople = useMemo(
    () =>
      peopleData.filter((person) => {
        const matchesNameOrUser =
          person.name.toLowerCase().includes(search.toLowerCase()) ||
          person.username.toLowerCase().includes(search.toLowerCase())
        const matchesTeam =
          selectedTeam === "All" || person.team === selectedTeam
        return matchesNameOrUser && matchesTeam
      }),
    [search, selectedTeam]
  )

  return (
    <div className="space-y-6">
      {/* Header & controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Organization Directory</h2>
          <p className="text-sm text-muted-foreground">
            Browse teammates by team, role, or name.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <Input
            placeholder="Search by name or username..."
            className="md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={selectedTeam}
            onValueChange={(value) => setSelectedTeam(value)}
          >
            <SelectTrigger className="md:w-40">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <PeopleViewToggle view={view} setView={setView} />
        </div>
      </div>

      {/* Content */}
      {filteredPeople.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          No team members found with this search/filter.
        </p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPeople.map((person) => (
            <PeopleCard key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <PeopleTable people={filteredPeople} />
      )}
    </div>
  )
}
