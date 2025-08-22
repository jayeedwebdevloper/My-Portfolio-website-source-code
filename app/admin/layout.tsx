import AdminMenu from '@/components/Admin/AdminMenu'
import React from 'react'

const AdminLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>

            <div className="fixed inset-0 -z-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90"></div>
            </div>
            
            <div className="col-span-1">
                <AdminMenu />
            </div>
            <div className="col-span-4 h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout