'use client'

type NextButtonProps = {
  label: string
  onClick?: () => void
}

function NextButton(props: NextButtonProps) {
  return (
    <button
      onClick={props.onClick}
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
      {props.label}
    </button>
  )
}

export default NextButton
