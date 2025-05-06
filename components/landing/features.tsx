import React from 'react'

const features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="p-6">
        <h3 className="text-xl text-black font-semibold mb-4">Drag & Drop Builder</h3>
        <p className="text-black">
          Create forms effortlessly with our intuitive drag and drop interface.
        </p>
      </div>
      <div className="p-6">
        <h3 className="text-xl text-black font-semibold mb-4">Customizable Templates</h3>
        <p className="text-black">
          Choose from a variety of pre-built templates or create your own.
        </p>
      </div>
      <div className="p-6">
        <h3 className="text-xl text-black font-semibold mb-4">Real-time Preview</h3>
        <p className="text-black">
          See your changes instantly as you build your form.
        </p>
      </div>
    </div>
  </div>
  )
}

export default features
