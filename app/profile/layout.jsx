import React from 'react'
import Header from './_components/Header'

// Add metadata configuration for dashboard
export const metadata = {
    title: 'Job Ready | Dashboard',
    description: 'Job Ready dashboard',
}

function DashBoardLayout({ children }) {
    return (
        <div>
            <Header />
            <div style={{ background: '#F7F5EF', width: '100%' }} className="px-4 sm:px-2 lg:px-2">
                {children}
            </div>
        </div>
    )
}

export default DashBoardLayout