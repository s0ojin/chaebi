'use client'

import { useState, useCallback } from 'react'

type CodeInputProps = {
  mode: 'code' | 'answer'
  value: string
  onChange: (value: string) => void
}

function CodeInput({ mode, value, onChange }: CodeInputProps) {
  const [isComposing, setIsComposing] = useState(false)

  const validateAndSetValue = useCallback(
    (value: string) => {
      let filteredValue = value

      if (mode === 'code') {
        const upperValue = value.toUpperCase()
        filteredValue = upperValue.replace(/[^A-Z0-9]/g, '').slice(0, 6)
      } else if (mode === 'answer') {
        filteredValue = value.slice(0, 20)
      }

      onChange(filteredValue)
    },
    [mode, onChange],
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    validateAndSetValue(value)
  }

  function handleCompositionStart() {
    setIsComposing(true)
  }

  function handleCompositionEnd(e: React.CompositionEvent<HTMLInputElement>) {
    setIsComposing(false)
    validateAndSetValue(e.currentTarget.value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (mode === 'answer' && e.key === 'Backspace' && !isComposing) {
      e.preventDefault()
      onChange(value.slice(0, -1))
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      className="
        w-[23.25rem] 
        h-[3.75rem]
        md:w-[25rem] 
        md:h-[4.5rem]
        rounded-xl
        py-5
        text-2xl
        text-center
        focus:outline-none
        bg-_gray-100
      "
      maxLength={mode === 'code' ? 6 : 20}
    />
  )
}

export default CodeInput
