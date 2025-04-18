// import { useState } from 'react'
// import { FiEdit2, FiPaperclip } from 'react-icons/fi'
// import { Button } from '../components/Button'
// import { TextArea } from '../components/TextArea'
// import { useAuthSafeRoute } from '../hooks'
// import { FaCheckCircle } from 'react-icons/fa'
// import { db, storage } from '../config/firebase'
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// export const CreatePetition = () => {
//   useAuthSafeRoute()

//   const [submitted, setSubmitted] = useState(false)
//   const [petitionLink, setPetitionLink] = useState('')
//   const [email, setEmail] = useState('')
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [image, setImage] = useState<File | null>(null)

//   const handleSubmit = async () => {
//     try {
//       let imageUrl = 'https://via.placeholder.com/300x200?text=Online+Petition'

//       if (image) {
//         const storageRef = ref(storage, `petition-images/${Date.now()}-${image.name}`)
//         await uploadBytes(storageRef, image)
//         imageUrl = await getDownloadURL(storageRef)
//       }

//       const docRef = await addDoc(collection(db, 'petitions'), {
//         title,
//         description,
//         createdBy: email,
//         image: imageUrl,
//         signatures: [],
//         createdAt: serverTimestamp(),
//       })

//       const link = `${window.location.origin}/petitions/${docRef.id}`
//       setPetitionLink(link)
//       setSubmitted(true)
//     } catch (error) {
//       console.error('Error creating petition:', error)
//       alert('Failed to create petition')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-3xl rounded-lg bg-white shadow-xl">
//         <div className="flex items-center justify-between border-b px-6 py-4">
//           <h2 className="text-xl font-bold text-gray-800">Create Petition</h2>
//           <Button label="Submit Petition" className="max-w-48" onClick={handleSubmit} />
//         </div>

//         <div className="px-8 py-6">
//           <div className="mb-6 text-center text-lg italic text-gray-600">
//             - Speak Up, Stand Out, Make a Difference -
//           </div>

//           {!submitted ? (
//             <div className="space-y-6">
//               <TextArea
//                 placeholder="Title of the Petition"
//                 iconLeft={FiEdit2}
//                 rows={2}
//                 className="w-full"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />

//               <TextArea
//                 placeholder="Add Petition Description..."
//                 iconLeft={FiEdit2}
//                 iconRight={FiPaperclip}
//                 rows={6}
//                 className="w-full"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />

//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <div>
//                 <label className="text-sm text-gray-700 font-medium">Featured Image</label>
//                 <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
//                   <div className="text-gray-500">Drop image here or</div>
//                   <input
//                     type="file"
//                     className="mt-2"
//                     accept="image/*"
//                     onChange={(e) => setImage(e.target.files?.[0] || null)}
//                   />
//                   <p className="text-xs text-gray-400 mt-2">
//                     Image should be at least 500x300px, max 10MB.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-10 mt-8 space-y-4">
//               <FaCheckCircle className="text-green-600 text-6xl mb-2" />
//               <p className="text-xl text-center font-semibold text-gray-700">
//                 Your Petition has been submitted. <br /> Thank you!
//               </p>
//               <p className="text-sm text-gray-600">
//                 Share or access your petition using the link below:
//               </p>
//               <a
//                 href={petitionLink}
//                 className="text-blue-600 font-medium underline break-all"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {petitionLink}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useState } from 'react'
// import { FiEdit2, FiPaperclip } from 'react-icons/fi'
// import { Button } from '../components/Button'
// import { TextArea } from '../components/TextArea'
// import { useAuthSafeRoute } from '../hooks'
// import { FaCheckCircle } from 'react-icons/fa'
// import { db, storage } from '../config/firebase'
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// export const CreatePetition = () => {
//   useAuthSafeRoute()

//   const [submitted, setSubmitted] = useState(false)
//   const [petitionLink, setPetitionLink] = useState('')
//   const [email, setEmail] = useState('')
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [image, setImage] = useState<File | null>(null)

//   const handleSubmit = async () => {
//     try {
//       if (!title || !description || !email) {
//         alert('Please fill in all fields.')
//         return
//       }

//       let imageUrl = 'https://via.placeholder.com/300x200?text=Online+Petition'

//       if (image) {
//         const storageRef = ref(storage, `petition-images/${Date.now()}-${image.name}`)
//         await uploadBytes(storageRef, image)
//         imageUrl = await getDownloadURL(storageRef)
//       }

//       console.log('Final submission data:', {
//         title,
//         description,
//         email,
//         imageUrl,
//       })

//       const docRef = await addDoc(collection(db, 'petitions'), {
//         title,
//         description,
//         createdBy: email,
//         image: imageUrl,
//         signatures: [],
//         createdAt: serverTimestamp(),
//       })

//       const link = `${window.location.origin}/petitions/${docRef.id}`
//       setPetitionLink(link)
//       setSubmitted(true)
//     } catch (error) {
//       console.error('Error creating petition:', error)
//       alert('Failed to create petition')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-3xl rounded-lg bg-white shadow-xl">
//         <div className="flex items-center justify-between border-b px-6 py-4">
//           <h2 className="text-xl font-bold text-gray-800">Create Petition</h2>
//           <Button label="Submit Petition" className="max-w-48" onClick={handleSubmit} />
//         </div>

//         <div className="px-8 py-6">
//           <div className="mb-6 text-center text-lg italic text-gray-600">
//             - Speak Up, Stand Out, Make a Difference -
//           </div>

//           {!submitted ? (
//             <div className="space-y-6">
//               <TextArea
//                 placeholder="Title of the Petition"
//                 iconLeft={FiEdit2}
//                 rows={2}
//                 className="w-full"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />

//               <TextArea
//                 placeholder="Add Petition Description..."
//                 iconLeft={FiEdit2}
//                 iconRight={FiPaperclip}
//                 rows={6}
//                 className="w-full"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />

//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <div>
//                 <label className="text-sm text-gray-700 font-medium">Featured Image</label>
//                 <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
//                   <div className="text-gray-500">Drop image here or</div>
//                   <input
//                     type="file"
//                     className="mt-2"
//                     accept="image/*"
//                     onChange={(e) => setImage(e.target.files?.[0] || null)}
//                   />
//                   <p className="text-xs text-gray-400 mt-2">
//                     Image should be at least 500x300px, max 10MB.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-10 mt-8 space-y-4">
//               <FaCheckCircle className="text-green-600 text-6xl mb-2" />
//               <p className="text-xl text-center font-semibold text-gray-700">
//                 Your Petition has been submitted. <br /> Thank you!
//               </p>
//               <p className="text-sm text-gray-600">
//                 Share or access your petition using the link below:
//               </p>
//               <a
//                 href={petitionLink}
//                 className="text-blue-600 font-medium underline break-all"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {petitionLink}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
 

import { useState } from 'react'
import { FiEdit2, FiPaperclip } from 'react-icons/fi'
import { Button } from '../components/Button'
import { TextArea } from '../components/TextArea'
import { useAuthSafeRoute } from '../hooks'
import { FaCheckCircle } from 'react-icons/fa'
import { db, storage } from '../config/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAuth } from '../providers/AuthProvider' // adjust path if needed

export const CreatePetition = () => {
  const { currentUser } = useAuth()
  useAuthSafeRoute()

  const [loading, setLoading] = useState(false)

  const [submitted, setSubmitted] = useState(false)
  const [petitionLink, setPetitionLink] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async () => {
    try {
      if (!title || !description || !email) {
        alert('Please fill in all fields.')
        return
      }

      let imageUrl = 'https://via.placeholder.com/300x200?text=Online+Petition'

      if (image) {
        const storageRef = ref(storage, `petition-images/${Date.now()}-${image.name}`)
        await uploadBytes(storageRef, image)
        imageUrl = await getDownloadURL(storageRef)
      }

      console.log('Final submission data:', {
        title,
        description,
        email,
        imageUrl,
      })

      const docRef = await addDoc(collection(db, 'petitions'), {
        title,
        description,
        createdBy: email,
        image: imageUrl,
        signatures: [],
        createdAt: serverTimestamp(),
      })

      const link = `${window.location.origin}/petitions/${docRef.id}`
      setPetitionLink(link)
      setSubmitted(true)
    } catch (error) {
      console.error('Error creating petition:', error)
      alert('Failed to create petition')
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">Create Petition</h2>
          <Button label="Submit Petition" className="max-w-48" onClick={handleSubmit} />
        </div>

        <div className="px-8 py-6">
          <div className="mb-6 text-center text-lg italic text-gray-600">
            - Speak Up, Stand Out, Make a Difference -
          </div>

          {!submitted ? (
            <div className="space-y-6">
              <TextArea
                placeholder="Title of the Petition"
                iconLeft={FiEdit2}
                rows={2}
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextArea
                placeholder="Add Petition Description..."
                iconLeft={FiEdit2}
                iconRight={FiPaperclip}
                rows={6}
                className="w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <label className="text-sm text-gray-700 font-medium">Featured Image</label>
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="text-gray-500">Drop image here or</div>
                  <input
                    type="file"
                    className="mt-2"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Image should be at least 500x300px, max 10MB.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-10 mt-8 space-y-4">
              <FaCheckCircle className="text-green-600 text-6xl mb-2" />
              <p className="text-xl text-center font-semibold text-gray-700">
                Your Petition has been submitted. <br /> Thank you!
              </p>
              <p className="text-sm text-gray-600">
                Share or access your petition using the link below:
              </p>
              <a
                href={petitionLink}
                className="text-blue-600 font-medium underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {petitionLink}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
