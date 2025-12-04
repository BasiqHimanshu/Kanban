import { useState } from "react"
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  Monitor,
  Settings,
  User,
  LogOut,
  Users,
  FolderPlus,
  Bug,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/providers/ThemeProvider"
import Logo from "@/assets/logo.png"
import { getCurrentUser } from "@/mock/current-user"

// Mock notifications
const notifications = [
  {
    id: "1",
    title: "Project deadline approaching",
    description: "Marketing Site Redesign is due in 2 days",
    type: "critical",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "New issue assigned to you",
    description: "Fix login redirect flow",
    type: "high",
    timestamp: "4 hours ago",
    read: false,
  },
]

interface TopNavigationProps {
  onToggleSidebar: () => void
}

export default function TopNavigation({ onToggleSidebar }: TopNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const currentUser = getCurrentUser()
  const { theme, setTheme } = useTheme()

  const unreadCount = notifications.filter((n) => !n.read).length
  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">

          {/* Sidebar Toggle */}
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* LOGO */}
          <img src={Logo} className="w-40 hidden md:block" />
        </div>

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects, issues, people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
            />
          </div>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center space-x-2 md:space-x-3">

          {/* CREATE DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white hidden md:flex">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Bug className="h-4 w-4 mr-2" /> New Issue</DropdownMenuItem>
              <DropdownMenuItem><FolderPlus className="h-4 w-4 mr-2" /> New Project</DropdownMenuItem>
              <DropdownMenuItem><Users className="h-4 w-4 mr-2" /> New Team</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* THEME SWITCHER */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ThemeIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}><Sun className="mr-2 h-4 w-4" /> Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}><Moon className="mr-2 h-4 w-4" /> Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}><Monitor className="mr-2 h-4 w-4" /> System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 🔔 NOTIFICATIONS DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                
                  <Badge className="absolute -top-1 -right-1 h-3 w-3 text-xs p-0 bg-red-500"></Badge>
                
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80 p-0 rounded-lg shadow-lg bg-white dark:bg-zinc-900">
              
              <div className="flex items-center justify-between p-3 border-b dark:border-zinc-800">
                <h3 className="font-semibold text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">Mark all as read</span>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <DropdownMenuItem key={n.id} className="flex flex-col items-start space-y-1 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{n.description}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{n.timestamp}</p>
                  </DropdownMenuItem>
                ))}
              </div>

            </DropdownMenuContent>
          </DropdownMenu>

          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8">
                <Avatar>
                  <AvatarImage src={currentUser.imageURL} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="h-4 w-4 mr-2" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogOut className="h-4 w-4 mr-2" /> Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  )
}
