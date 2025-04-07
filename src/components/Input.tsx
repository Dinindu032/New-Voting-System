import { ChangeEvent } from 'react'
import { IconType } from 'react-icons'

export interface InputProps {
  icon: IconType
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  value?: string
  type?: 'text' | 'password' | 'email'
  name?: string
}

export const Input = ({
  icon: Icon,
  onChange,
  placeholder,
  value,
  name,
  type = 'text',
}: InputProps) => {
  return (
    <div className="flex h-12 w-full items-center rounded-lg border border-neutral-300 bg-transparent">
      <div
        className="flex h-full w-12 items-center justify-center bg-neutral-200"
        style={{ borderRadius: '0.42rem 0 0 0.42rem' }}
      >
        <Icon size={16} />
      </div>
      <input
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        className="h-full grow bg-transparent px-4 outline-none"
        placeholder={placeholder}
      />
    </div>
  )
}
