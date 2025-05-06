import Link from 'next/link'
import React from 'react'

const cta = () => {
  return (
    <div className="max-w-7xl mx-auto text-center px-4">
    <h2 className="text-3xl font-bold mb-6">
      Ready to Get Started?
    </h2>
    <p className="text-xl text-gray-600 mb-8">
      Join thousands of users who trust EZForm for their form building needs.
    </p>
    <Link
      href="/signup"
      className=" text-white bg-black px-8 py-3 rounded-md hover:bg-gray-800"
    >
      Create Your First Form
    </Link>
  </div>
  )
}

export default cta
