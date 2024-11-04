'use client'

import React from 'react'

type ButtonProps = {
  label: string
}

function NextButton({ label }: ButtonProps) {
  return (
    <button
      className={`
          w-[23.25rem] 
          h-[3.75rem]
          md:w-[25rem] 
          md:h-[4.5rem]
          rounded-xl
          py-5
          text-2xl
          text-center
					text-_white
          bg-_white
					bg-opacity-10
					shadow-inner
					flex
          items-center
          justify-center
          leading-none
        `}
    >
      {label}
    </button>
  )
}

export default NextButton
