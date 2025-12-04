import { useState } from "react"
import './App.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import KabanBoard from './features/kanban/KabanBoard'
import TopNavigation from './components/layout/TopNavigation'
import LeftSidebar from './components/layout/LeftSideBar'
import { cn } from "./lib/utils"
import { useAuthStore } from "@/store/authStore"
import AuthContainer from "./features/auth/authContainer" // Login + Signup holder

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev)

  return (
    <ThemeProvider>
      {/* Check Auth */}
      {isLoggedIn ? (
        <div className="min-h-screen dark:bg-zinc-950">
          <TopNavigation onToggleSidebar={toggleSidebar} />
          <div className="flex">
            <LeftSidebar isCollapsed={isSidebarCollapsed} />
            <main
              className={cn(
                "flex-1 pt-16 transition-all duration-300 ease-in-out",
                isSidebarCollapsed ? "ml-[72px]" : "ml-56"
              )}
            >
              <KabanBoard />
            </main>
          </div>
        </div>
      ) : (
        <AuthContainer />
      )}
    </ThemeProvider>
  )
}

export default App
