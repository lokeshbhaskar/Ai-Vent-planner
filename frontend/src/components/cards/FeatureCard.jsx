import React from 'react'

const FeatureCard = ({icon,title,desc}) => {
  return (
     <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}

export default FeatureCard