import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers'

export function useAuthSafeRoute() {
  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])
}
