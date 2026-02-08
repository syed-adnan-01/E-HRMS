export default function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  )
}
