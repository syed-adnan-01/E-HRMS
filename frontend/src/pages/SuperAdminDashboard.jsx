import { useState, useEffect } from "react"
import api from "../api/axios"
import Loader from "../components/ui/Loader"

export default function SuperAdminDashboard() {
    const [registrations, setRegistrations] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(null)

    useEffect(() => {
        fetchRegistrations()
    }, [])

    const fetchRegistrations = async () => {
        try {
            const response = await api.get("/superadmin/registrations")
            setRegistrations(response.data.data)
        } catch (error) {
            console.error("Failed to fetch registrations:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (id) => {
        if (!window.confirm("Are you sure you want to approve this workspace?")) return
        
        setActionLoading(id)
        try {
            const response = await api.post(`/superadmin/approve/${id}`)
            alert(response.data.message)
            fetchRegistrations()
        } catch (error) {
            alert(error.response?.data?.message || "Approval failed")
        } finally {
            setActionLoading(null)
        }
    }

    const handleReject = async (id) => {
        if (!window.confirm("Are you sure you want to reject this registration?")) return

        setActionLoading(id)
        try {
            const response = await api.post(`/superadmin/reject/${id}`)
            alert(response.data.message)
            fetchRegistrations()
        } catch (error) {
            alert(error.response?.data?.message || "Rejection failed")
        } finally {
            setActionLoading(null)
        }
    }

    if (loading) return <Loader fullScreen={true} />

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                            SuperAdmin Portal
                        </h1>
                        <p className="text-gray-400 mt-2">Manage incoming company workspace registrations</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-blue-400">
                        System Online
                    </div>
                </header>

                <div className="grid gap-6">
                    {registrations.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                            <p className="text-gray-500">No registration requests found.</p>
                        </div>
                    ) : (
                        registrations.map((reg) => (
                            <div 
                                key={reg._id}
                                className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white/[0.07] transition-all"
                            >
                                <div className="space-y-4 w-full">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold">
                                            {reg.companyName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{reg.companyName}</h3>
                                            <p className="text-gray-400 text-sm">Requested by {reg.name}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            {reg.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            {new Date(reg.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        reg.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                        reg.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                        'bg-red-500/10 text-red-500'
                                    }`}>
                                        {reg.status}
                                    </div>

                                    {reg.status === 'Pending' && (
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <button 
                                                onClick={() => handleApprove(reg._id)}
                                                disabled={actionLoading === reg._id}
                                                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
                                            >
                                                {actionLoading === reg._id ? '...' : 'Approve'}
                                            </button>
                                            <button 
                                                onClick={() => handleReject(reg._id)}
                                                disabled={actionLoading === reg._id}
                                                className="flex-1 sm:flex-none px-6 py-2.5 bg-white/5 hover:bg-red-600/20 hover:text-red-500 border border-white/10 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
