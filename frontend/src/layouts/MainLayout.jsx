import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-4 md:p-6 flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

