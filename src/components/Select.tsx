import { IconType } from 'react-icons'

export interface Option {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  icon: IconType
  options: Option[]
  onChange: (value: string) => void
  selected: string
  defaultValue?: string
}

export const Select = ({
  icon: Icon,
  options,
  onChange,
  selected,
  defaultValue,
}: SelectProps) => {
  return (
    <div className="flex h-14 w-full items-center rounded-lg border border-neutral-300 bg-transparent">
      <div
        className="flex h-full w-14 items-center justify-center bg-neutral-200"
        style={{ borderRadius: '0.42rem 0 0 0.42rem' }}
      >
        <Icon size={16} />
      </div>
      <select
        className="h-full grow cursor-pointer bg-transparent px-4 outline-none"
        onChange={(e) => onChange(e.target.value)}
        value={selected}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
