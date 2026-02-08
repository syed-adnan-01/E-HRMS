export default function AttendanceSummary() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
      <h3 className="text-sm font-semibold mb-3">
        Today's Attendance
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Present</span>
          <span className="text-green-600 font-medium">42</span>
        </div>
        <div className="flex justify-between">
          <span>Absent</span>
          <span className="text-red-600 font-medium">3</span>
        </div>
        <div className="flex justify-between">
          <span>On Leave</span>
          <span className="text-yellow-600 font-medium">5</span>
        </div>
      </div>
    </div>
  )
}
