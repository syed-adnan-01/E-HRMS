export default function EmployeeStatus() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
      <h3 className="text-sm font-semibold mb-4">
        Employee Status
      </h3>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm">
            <span>Active</span>
            <span>90%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded">
            <div className="h-2 bg-green-500 rounded w-[90%]" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm">
            <span>Inactive</span>
            <span>10%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded">
            <div className="h-2 bg-red-500 rounded w-[10%]" />
          </div>
        </div>
      </div>
    </div>
  )
}
