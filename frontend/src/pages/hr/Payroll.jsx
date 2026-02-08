import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"

export default function Payroll() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">Payroll</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>Total Salary</Card>
        <Card>Deductions</Card>
        <Card>Net Pay</Card>
      </div>
    </MainLayout>
  )
}
