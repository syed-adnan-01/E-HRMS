export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Admin
        </span>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  )
}
