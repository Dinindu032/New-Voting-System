import { onAuthStateChanged, User } from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth } from '../config'

export interface AuthContext {
  user: User | undefined
}

export const AuthContext = createContext<AuthContext>({ user: undefined })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>()

  const handleAuthStateChange = (u: User | null) => {
    if (u) {
      setUser(u)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange)
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
