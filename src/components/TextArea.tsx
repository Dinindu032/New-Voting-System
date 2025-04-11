import React from 'react'
import { IconType } from 'react-icons'

type TextAreaProps = {
  placeholder?: string
  iconLeft?: IconType
  iconRight?: IconType
  rows?: number
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder = '',
  iconLeft: IconLeft,
  iconRight: IconRight,
  rows = 4,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {IconLeft && <IconLeft className="absolute left-3 top-3 text-gray-400" />}
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none rounded border border-gray-300 px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {IconRight && (
        <IconRight className="absolute right-3 top-3 cursor-pointer text-gray-400" />
      )}
    </div>
  )
}
