import React from 'react'

const Loader = () => {
    return (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-gray-100 " />
        </div>
    )
}

export default Loader
