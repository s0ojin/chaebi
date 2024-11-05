'use client'

import { useState, useCallback } from 'react'

type CodeInputProps = {
  mode: 'code' | 'answer'
}

function CodeInput({ mode }: CodeInputProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const [isComposing, setIsComposing] = useState(false)

  const validateAndSetValue = useCallback(
    (value: string) => {
      if (mode === 'code') {
        const upperValue = value.toUpperCase()
        const filtered = upperValue.replace(/[^A-Z0-9]/g, '').slice(0, 6)
        setInputValue(filtered)
      } else if (mode === 'answer') {
        const truncated = value.slice(0, 20)
        setInputValue(truncated)
      }
    },
    [mode],
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
      setInputValue((prev) => prev.slice(0, -1))
    }
  }

  return (
    <input
      type="text"
      value={inputValue}
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
