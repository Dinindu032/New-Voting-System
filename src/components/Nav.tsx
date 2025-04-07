import { signOut } from 'firebase/auth'
import { FaUser } from 'react-icons/fa6'
import { FiCheck, FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { auth } from '../config'
import { useAuth } from '../providers'

export const Nav = () => {
  const { user } = useAuth()

  return (
    <div className="content flex h-20 w-full items-center border-b border-neutral-300 bg-white px-8">
      <Link to="/" className="grow">
        <div className="flex items-center gap-2 text-xl font-semibold tracking-wide text-blue-500">
          <FiCheck size={24} />
          <div>Right</div>
        </div>
      </Link>
      {user && (
        <>
          <div className="mr-8 flex items-center gap-8">
            <Link to="/create-voting">
              <div className="text-sm font-semibold text-blue-500 hover:underline">
                Create Voting
              </div>
            </Link>
            <Link to="/create-voting">
              <div className="text-sm font-semibold text-blue-500 hover:underline">
                View Votings
              </div>
            </Link>
          </div>
        </>
      )}
      {user ? (
        <div
          className="flex cursor-pointer items-center gap-2 rounded-full border border-blue-500 p-2 text-sm text-blue-500"
          onClick={async () => {
            await signOut(auth)
            window.location.reload()
          }}
        >
          <FiLogOut />
          <div>Logout</div>
        </div>
      ) : (
        <Link to="/login">
          <div className="flex cursor-pointer items-center gap-2 rounded-full border border-blue-500 p-2 text-sm text-blue-500">
            <FaUser />
            <div>Login</div>
          </div>
        </Link>
      )}
    </div>
  )
}
