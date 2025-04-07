import { Spinner } from './Spinner'

export interface ButtonProps {
  label: string
  onClick?(): void
  showProgress?: boolean
  className?: string
}

export const Button = ({
  label,
  onClick,
  showProgress,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`h-12 w-full rounded-lg bg-blue-500 font-semibold text-white ${className}`}
      onClick={showProgress ? undefined : onClick}
    >
      {showProgress ? <Spinner /> : label}
    </button>
  )
}
