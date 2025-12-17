import React, { useContext, useEffect } from 'react'

export const Toggle = ({ flipped, toggleFlip }) => {
    return (
        <label className="group relative inline-flex cursor-pointer flex-col items-center">
            <input className="peer sr-only" type="checkbox" checked={flipped} onChange={toggleFlip} />
            <div className="relative h-6 w-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-500 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-gradient-to-br after:from-gray-100 after:to-gray-300 after:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] after:transition-all after:duration-500 peer-checked:bg-gradient-to-r peer-checked:from-violet-600 peer-checked:to-fuchsia-600 peer-checked:after:translate-x-6 peer-checked:after:from-white peer-checked:after:to-gray-100 hover:after:scale-95 active:after:scale-90">
                <span className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent"></span>
                <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 peer-checked:animate-glow peer-checked:opacity-100 [box-shadow:0_0_15px_rgba(167,139,250,0.5)]"></span>
            </div>
        </label>
    )
}
