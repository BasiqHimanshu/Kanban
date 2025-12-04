export interface Person {
  id: string | number
  name: string
  email?: string
  role?: string
  team?: string
  avatar?: string
}

export const people: Person[] = [
  { id: "person-1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "person-2", name: "Bob Smith", email: "bob@example.com" },
  { id: "person-3", name: "Carol Davis", email: "carol@example.com" },
  { id: "person-4", name: "David Wilson", email: "david@example.com" },
]

// src/data/peopleData.ts
export type Person2 = {
  id: number
  name: string
  username: string
  role: string
  team: string
  avatar: string
  bio: string
  joinedAt: string // e.g. "Apr 2020"
  email: string
}

export const peopleData: Person2[] = [
  {
    id: 1,
    name: "Aditi Sharma",
    username: "aditi.s",
    role: "Product Manager",
    team: "Product",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Product manager shaping user-centric features for web & mobile apps.",
    joinedAt: "Apr 2020",
    email: "aditi.sharma@example.com",
  },
  {
    id: 2,
    name: "Rohit Singh",
    username: "rohit.dev",
    role: "Frontend Engineer",
    team: "Engineering",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Engineer who loves clean UI, performance, and accessible design.",
    joinedAt: "Jan 2021",
    email: "rohit.singh@example.com",
  },
  {
    id: 3,
    name: "Neha Gupta",
    username: "neha.qa",
    role: "QA Engineer",
    team: "Quality",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Ensuring every release ships with confidence and zero surprises.",
    joinedAt: "Aug 2019",
    email: "neha.gupta@example.com",
  },
  {
    id: 4,
    name: "Kunal Verma",
    username: "kunal.lead",
    role: "Engineering Lead",
    team: "Engineering",
    avatar: "https://i.pravatar.cc/150?img=4",
    bio: "Leading high-performing engineering teams and complex delivery.",
    joinedAt: "Dec 2018",
    email: "kunal.verma@example.com",
  },
  {
    id: 5,
    name: "Simran Kaur",
    username: "simran.hr",
    role: "HR Specialist",
    team: "HR",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Building culture, supporting people, and driving engagement.",
    joinedAt: "Jul 2022",
    email: "simran.kaur@example.com",
  },
]
