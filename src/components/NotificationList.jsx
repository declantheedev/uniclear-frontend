import React from 'react'
import { Link } from 'react-router-dom'

const NotificationList = () => {
    return (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200 animate-fadeIn">
            <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
            </div>
            <div className="max-h-60 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">New document uploaded</p>
                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">Your document was approved</p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-800">System maintenance scheduled</p>
                    <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                </div>
            </div>
            <div className="px-4 py-2 border-t border-gray-100">
                <Link to="/notifications" className="text-xs text-[#2600FF] hover:text-[#3419FF] font-medium">
                    View all notifications
                </Link>
            </div>
        </div>
    )
}

export default NotificationList