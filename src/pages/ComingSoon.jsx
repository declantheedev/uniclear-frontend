import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Rocket, Clock, Home } from 'lucide-react'

const ComingSoon = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-blue-800 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative icons with high contrast colors */}
      <Rocket className="absolute top-10 left-10 text-4xl text-blue-400 opacity-80 animate-pulse" />
      <Clock className="absolute bottom-10 right-10 text-5xl text-cyan-400 opacity-80 animate-bounce" />

      <div className="text-center max-w-xl z-10">
        <div className="flex justify-center mb-6">
          <Clock className="text-6xl text-yellow-400 animate-pulse drop-shadow-lg" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-xl">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Something amazing is on the way. Stay tuned!
        </p>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-8 drop-shadow-md"></div>
        
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900-400 text-white font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >

          <Home />
          Go back home
        </button>
      </div>

      {/* Additional decorative elements with high contrast */}
      <div className="absolute top-20 right-20 w-32 h-32 border-4 border-yellow-400 opacity-60 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 border-4 border-cyan-400 opacity-60 rounded-full animate-ping delay-1000"></div>
    </div>
  )
}

export default ComingSoon