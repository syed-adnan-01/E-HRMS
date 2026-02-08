export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}
