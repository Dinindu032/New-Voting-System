import { FiHash, FiImage, FiUser, FiX } from 'react-icons/fi'
import { Button, Input } from '../components'
import { useAuthSafeRoute } from '../hooks'

export const CreateVoting = () => {
  useAuthSafeRoute()

  return (
    <div className="content full-page flex flex-col">
      <div className="mt-4 flex w-full grow flex-col rounded-lg bg-white">
        <div className="flex items-center border-b px-6 py-3 text-lg font-bold">
          <div className="grow">Create voting process</div>
          <Button label="Create" className="max-w-48" />
        </div>
        <div className="flex grow flex-row items-stretch">
          <div
            style={{ minWidth: '500px', maxWidth: '500px' }}
            className="flex h-full flex-col items-center gap-6 p-8"
          >
            <div className="mb-8 flex aspect-square w-2/3 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-500 text-neutral-600">
              <FiImage size={40} />
              <div className="mt-2">Please select an image</div>
            </div>
            <Input icon={FiUser} placeholder="First Name" />
            <Input icon={FiUser} placeholder="Last Name" />
            <Input icon={FiHash} placeholder="Age" />
            <Button label="Add" />
          </div>
          <div className="grid grow auto-rows-min grid-cols-3 gap-6 border-l p-6">
            <div className="relative rounded-lg border">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/TrumpPortrait.jpg/800px-TrumpPortrait.jpg"
                className="aspect-square w-full rounded-t-lg object-cover"
              />
              <div className="flex items-center p-3 text-lg font-semibold">
                <div className="grow">Donald Trump</div>
                <div>24</div>
              </div>
              <div className="absolute right-3 top-3 cursor-pointer rounded-full bg-red-500 p-2 text-white">
                <FiX />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
