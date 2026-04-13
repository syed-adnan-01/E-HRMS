import { BadgeCheck, BriefcaseBusiness, Building2, CircleDot, Mail, Phone, IndianRupee } from "lucide-react"

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

const detailItems = (employee) => [
  {
    label: "Employee ID",
    value: employee.employeeId || "Not assigned",
    icon: BadgeCheck
  },
  {
    label: "Department",
    value: employee.department || "Not specified",
    icon: Building2
  },
  {
    label: "Role",
    value: employee.role || "Not specified",
    icon: BriefcaseBusiness
  },
  {
    label: "Email",
    value: employee.email || "Not available",
    icon: Mail
  },
  {
    label: "Phone Number",
    
    icon: Phone
  },
  {
    label: "Salary Details",
    
    icon: IndianRupee
  }]

export default function EmployeeProfileModal({ employee, open, onClose }) {
  if (!open || !employee) return null

  const status = employee.status || "Unknown"
  const isActive = ["active", "present"].includes(status.toLowerCase())

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f172ae6] shadow-2xl"
        onClick={event => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-profile-title"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-primary/20 via-cyan-400/10 to-emerald-400/20" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
        >
          Close
        </button>

        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-primary/25 to-cyan-500/10 text-2xl font-black text-primary shadow-lg shadow-primary/10">
              {getInitials(employee.name)}
            </div>

            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-slate-300">
                <CircleDot size={12} className={isActive ? "text-emerald-400" : "text-amber-400"} />
                {status}
              </p>
              <h2 id="employee-profile-title" className="text-2xl font-black tracking-tight text-white">
                {employee.name || "Unnamed Employee"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {employee.role || "Role pending"} in {employee.department || "Unknown department"}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {detailItems(employee).map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4 shadow-inner shadow-black/10"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-primary">
                    <Icon size={18} />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
                    {label}
                  </p>
                </div>
                <p className="break-words text-sm font-semibold text-slate-100">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-gradient-to-r from-white/[0.03] to-white/[0.06] p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
              Snapshot
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {employee.name || "This employee"} is currently marked as{" "}
              <span className={isActive ? "text-emerald-300" : "text-amber-300"}>{status}</span>.
              Reach them at <span className="text-white">{employee.email || "no email on file"}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
