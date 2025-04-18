// import { Spinner } from './Spinner'

// export interface ButtonProps {
//   label: string
//   onClick?(): void
//   showProgress?: boolean
//   className?: string
// }

// export const Button = ({
//   label,
//   onClick,
//   showProgress,
//   className,
// }: ButtonProps) => {
//   return (
//     <button
//       className={`h-12 w-full rounded-lg bg-blue-500 font-semibold text-white ${className}`}
//       onClick={showProgress ? undefined : onClick}
//     >
//       {showProgress ? <Spinner /> : label}
//     </button>
//   )
// }

import { Spinner } from './Spinner'

export interface ButtonProps {
  label: string
  onClick?(): void
  showProgress?: boolean
  className?: string
  disabled?: boolean // Add the disabled property
}

export const Button = ({
  label,
  onClick,
  showProgress,
  className,
  disabled, // Include disabled in the destructured props
}: ButtonProps) => {
  return (
    <button
      className={`h-12 w-full rounded-lg font-semibold text-white ${
        disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'
      } ${className}`}
      onClick={showProgress || disabled ? undefined : onClick} // Prevent clicks if disabled or showing progress
      disabled={disabled} // Pass the disabled prop to the button
    >
      {showProgress ? <Spinner /> : label}
    </button>
  )
}
