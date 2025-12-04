import {
  LayoutDashboard,
  Users,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "People", href: "/people" },
]

const currentSprint = {
  name: "Sprint 24",
  startDate: "2024-01-15",
  endDate: "2024-01-29",
  daysTotal: 14,
  daysRemaining: 5,
  progress: 64,
}

interface LeftSidebarProps {
  isCollapsed: boolean;
}

export default function LeftSidebar( { isCollapsed }: LeftSidebarProps) {
  // Replace this with router state later if needed
  const currentPath = "/" // Mock selected path

  const getEncouragingMessage = (daysRemaining: number) => {
    if (daysRemaining > 7) return "Great pace! 🚀"
    if (daysRemaining > 3) return "Keep it up! 💪"
    if (daysRemaining > 1) return "Final push! ⚡"
    return "Last day! 🎯"
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transition-all duration-300 z-40 flex flex-col",
        isCollapsed ? "w-[72px]" : "w-56"
      )}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href

            return (
              <button
                key={item.href}
                className={cn(
                  "w-full flex items-center p-2 rounded-lg transition-all",
                  isCollapsed
                    ? "justify-center" // Center icons when collapsed
                    : "space-x-3 justify-start",
                  isActive
                    ? isCollapsed
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    isCollapsed && "hover:bg-blue-100 dark:hover:bg-blue-900",
                    isActive && "bg-blue-200 dark:bg-blue-800"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>

            )
          })}
        </nav>



        {!isCollapsed ? null : (
          <div className="p-2 border-t border-gray-200 dark:border-zinc-800">
            <div className="flex flex-col items-center gap-1">
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <div className="w-8 bg-blue-100 dark:bg-blue-900 rounded-full h-1">
                <div
                  className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${currentSprint.progress}%` }}
                />
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {currentSprint.daysRemaining}d
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
