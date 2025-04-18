// import { onAuthStateChanged, User } from 'firebase/auth'
// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from 'react'
// import { auth } from '../config'

// export interface AuthContext {
//   user: User | undefined
// }

// export const AuthContext = createContext<AuthContext>({ user: undefined })

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User>()

//   const handleAuthStateChange = (u: User | null) => {
//     if (u) {
//       setUser(u)
//     }
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange)
//     return () => unsubscribe()
//   }, [])

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)

import { onAuthStateChanged, User } from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth } from '../config'

// ✅ Updated AuthContext interface
interface AuthContext {
  user: any
  currentUser: {
    email: string
    [key: string]: any // Add other properties as needed
  } | null
}

// ✅ Create context with default value
export const AuthContext = createContext<AuthContext>({
  user: undefined, // Default value for user
  currentUser: null, // Default value for currentUser
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthContext['currentUser']>(
    null
  )

  const handleAuthStateChange = (user: User | null) => {
    if (user) {
      // Only extract what you need, or pass entire user
      setCurrentUser({
        email: user.email ?? '',
        uid: user.uid,
        displayName: user.displayName,
        // add other fields as needed
      })
    } else {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange)
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user: undefined, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)
