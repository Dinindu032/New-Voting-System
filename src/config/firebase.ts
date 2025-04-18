export const firebaseConfig = {
  apiKey: 'AIzaSyDIakZa6sk29gtsl60I5Euhyh3kBZze9Y8',
  authDomain: 'voting-system-41e3b.firebaseapp.com',
  projectId: 'voting-system-41e3b',
  storageBucket: 'voting-system-41e3b.firebasestorage.app',
  messagingSenderId: '594276206542',
  appId: '1:594276206542:web:dacf664824c9c4d7cf4d9f',
  measurementId: 'G-REGZSSN1R4',
}

import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)

export { analytics, auth, db, storage, app }
