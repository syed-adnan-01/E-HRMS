import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import { employees } from "../../data/employees"

export default function Payroll() {
  const baseSalary = 50000
  const deduction = 5000

  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">Payroll</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employees.map(e => (
          <Card key={e.id}>
            <p><b>{e.name}</b></p>
            <p>Base: ₹{baseSalary}</p>
            <p>Deduction: ₹{deduction}</p>
            <p className="font-semibold">
              Net: ₹{baseSalary - deduction}
            </p>
          </Card>
        ))}
      </div>
    </MainLayout>
  )
}
