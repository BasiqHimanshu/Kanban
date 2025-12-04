import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LeftSidebar from "./components/layout/LeftSideBar"
import KanbanPage from "./components/layout/KanbanPage"
import PeoplePage from "./components/layout/PeoplePage"
import { useAuthStore } from "./store/authStore"
import TopNavigation from "./components/layout/TopNavigation"
import AuthContainer from "./features/auth/authContainer"

function App() {
  const token = useAuthStore((state) => state.token)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (!token) {
    return <AuthContainer />
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 dark:bg-zinc-900">
        <LeftSidebar isCollapsed={isSidebarCollapsed} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ml-${
            isSidebarCollapsed ? "[72px]" : "56"
          }`}
        >
          <TopNavigation onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />
          <main className="flex-1 p-4 overflow-y-auto mt-16">
            <Routes>
              <Route path="/" element={<KanbanPage />} />
              <Route path="/people" element={<PeoplePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App