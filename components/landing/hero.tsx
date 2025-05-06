import Link from 'next/link'
import React from 'react'

const hero = () => {
  return (
    <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Create Beautiful Forms with Ease
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build, customize, and deploy forms in minutes with AI features.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800"
            >
              Get Started
            </Link>
            <Link
              href="/demo"
              className="border border-gray-300 px-8 py-3 rounded-md hover:bg-gray-50"
            >
              View Demo
            </Link>
          </div>
        </div>
  )
}

export default hero
