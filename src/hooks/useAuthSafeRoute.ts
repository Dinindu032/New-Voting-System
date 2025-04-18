// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../providers'

// export function useAuthSafeRoute() {
//   const { user } = useAuth()

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!user) {
//       navigate('/')
//     }
//   }, [user])
// }


import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider' // adjust path if needed

export const useAuthSafeRoute = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Add any necessary logic here if needed
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])
}
