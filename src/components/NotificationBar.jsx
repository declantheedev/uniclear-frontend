import React from 'react'
import { Bell } from 'lucide-react';
const Notification = (props) => {
  return (
    <button
        onClick={props.toogleNotification}
        aria-label="Notifications"
        className="focus:outline-none"
    >
        <Bell className={`w-6 h-6 cursor-pointer transition-all duration-300 ${props.showNotification ? 'text-[#2600FF] rotate-12' : 'text-gray-700 hover:text-[#2600FF]'}`}/>
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">3</span>
    </button>
  )
}

export default Notification