import React from 'react'
import { Bell } from 'lucide-react';
const Notification = () => {
  return (
    <button
        aria-label="Notifications"
        className="relative p-2 rounded-full hover:bg-gray-100"
    >
        <Bell className="w-5 h-5 text-gray-700" />
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">3</span>
    </button>
  )
}

export default Notification