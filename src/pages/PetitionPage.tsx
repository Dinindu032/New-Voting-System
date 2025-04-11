// import { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { FaCheckCircle } from 'react-icons/fa'

// type Signature = {
//   name: string
//   time: string
// }

// type Petition = {
//   title: string
//   description: string
//   image: string
//   createdBy: string
//   signatures: Signature[]
// }

// type FormData = {
//   name: string
//   email: string
//   comment: string
//   showName: boolean
//   keepUpdated: boolean
// }

// export const PetitionPage = () => {
//   const { petitionId } = useParams<{ petitionId: string }>()

//   const [petition, setPetition] = useState<Petition>({
//     title: 'NEW PETITION FOR MANAGEMENT',
//     description: 'Let’s bring positive change in our organization with your support.',
//     image: 'https://via.placeholder.com/300x200?text=Online+Petition',
//     createdBy: 'DININDU BANDARA',
//     signatures: [],
//   })

//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     comment: '',
//     showName: true,
//     keepUpdated: true,
//   })

//   const [signed, setSigned] = useState(false)

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }))
//   }

//   const handleSign = () => {
//     if (!formData.name || !formData.email) {
//       alert('Name and email are required.')
//       return
//     }

//     const newSignature: Signature = {
//       name: formData.showName ? formData.name : 'Anonymous',
//       time: new Date().toLocaleTimeString(),
//     }

//     setPetition((prev) => ({
//       ...prev,
//       signatures: [...prev.signatures, newSignature],
//     }))

//     setSigned(true)
//     setFormData((prev) => ({ ...prev, comment: '' }))
//   }

//   const shareUrl = window.location.href

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col lg:flex-row">
//         {/* Petition Info */}
//         <div className="w-full lg:w-2/3 pr-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">{petition.title}</h1>
//           <p className="text-orange-600 font-semibold mb-4">
//             Show your support by signing this petition now →
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             👤 {petition.createdBy} | 🗨️ 0 Comments
//           </p>
//           <img
//             src={petition.image}
//             alt="Petition"
//             className="rounded-md mb-4 w-full"
//           />
//           <p className="text-gray-700">{petition.description}</p>

//           {/* Share Buttons */}
//           <div className="mt-6">
//             <h3 className="text-orange-500 font-bold mb-2">Share for Success</h3>
//             <div className="flex gap-4 flex-wrap">
//               <a
//                 href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Share on Facebook
//               </a>
//               <a
//                 href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-400 text-white px-4 py-2 rounded"
//               >
//                 Share on Twitter
//               </a>
//               <a
//                 href={`https://www.messenger.com/share?link=${shareUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Share in Messenger
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Sign Form */}
//         <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
//           <div className="bg-blue-50 p-4 rounded-md">
//             <h2 className="text-xl font-bold mb-2">SIGN THIS PETITION</h2>
//             <p className="mb-2">
//               <span className="text-orange-600 font-bold">
//                 {petition.signatures.length}
//               </span>{' '}
//               person{petition.signatures.length !== 1 && 's'} has signed. Add your voice!
//             </p>
//             <div className="w-full bg-white rounded-full h-2 mb-4">
//               <div
//                 className="bg-orange-500 h-2 rounded-full"
//                 style={{
//                   width: `${Math.min(petition.signatures.length, 100)}%`,
//                 }}
//               ></div>
//             </div>

//             {!signed ? (
//               <>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Name*"
//                   className="w-full border p-2 mb-2 rounded"
//                 />
//                 <input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email*"
//                   className="w-full border p-2 mb-2 rounded"
//                 />
//                 <textarea
//                   name="comment"
//                   value={formData.comment}
//                   onChange={handleChange}
//                   placeholder="Comments"
//                   className="w-full border p-2 mb-2 rounded"
//                   rows={3}
//                 />

//                 <div className="mb-2 space-y-2">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       name="showName"
//                       checked={formData.showName}
//                       onChange={handleChange}
//                     />
//                     <span>Show my name in the online signature list</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       name="keepUpdated"
//                       checked={formData.keepUpdated}
//                       onChange={handleChange}
//                     />
//                     <span>Keep me informed on this and similar petitions</span>
//                   </label>
//                 </div>

//                 <button
//                   onClick={handleSign}
//                   className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
//                 >
//                   Sign Petition
//                 </button>
//               </>
//             ) : (
//               <div className="text-center text-green-600 font-semibold mt-4">
//                 <FaCheckCircle className="mx-auto text-3xl" />
//                 <p>Thank you for signing!</p>
//               </div>
//             )}

//             {/* Signature List */}
//             <div className="mt-4 text-sm text-gray-700">
//               {petition.signatures.map((sig, index) => (
//                 <p key={index}>✔ {sig.name} signed {sig.time}</p>
//               ))}
//             </div>
//           </div>

//           <div className="mt-4 text-center">
//             <a href="/create" className="text-blue-600 underline">
//               Have a cause? Start your own petition
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// import { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { FaCheckCircle } from 'react-icons/fa'

// type Signature = {
//   name: string
//   time: string
// }

// type Petition = {
//   title: string
//   description: string
//   image: string
//   createdBy: string
//   signatures: Signature[]
// }

// type FormData = {
//   name: string
//   email: string
//   comment: string
//   showName: boolean
//   keepUpdated: boolean
// }

// export const PetitionPage = () => {
//   const { petitionId } = useParams() as { petitionId?: string }
//   const safePetitionId = petitionId ?? 'default-id' // Optional fallback usage

//   const [petition, setPetition] = useState<Petition>({
//     title: 'NEW PETITION FOR MANAGEMENT',
//     description: 'Let’s bring positive change in our organization with your support.',
//     image: 'https://via.placeholder.com/300x200?text=Online+Petition',
//     createdBy: 'DININDU BANDARA',
//     signatures: [],
//   })

//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     comment: '',
//     showName: true,
//     keepUpdated: true,
//   })

//   const [signed, setSigned] = useState(false)

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type } = e.target
//     const checked = (e.target as HTMLInputElement).checked

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }))
//   }

//   const handleSign = () => {
//     if (!formData.name || !formData.email) {
//       alert('Name and email are required.')
//       return
//     }

//     const newSignature: Signature = {
//       name: formData.showName ? formData.name : 'Anonymous',
//       time: new Date().toLocaleTimeString(),
//     }

//     setPetition((prev) => ({
//       ...prev,
//       signatures: [...prev.signatures, newSignature],
//     }))

//     setSigned(true)
//     setFormData((prev) => ({ ...prev, comment: '' }))
//   }

//   const shareUrl = window.location.href

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col lg:flex-row">
//         {/* Petition Info */}
//         <div className="w-full lg:w-2/3 pr-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">{petition.title}</h1>
//           <p className="text-orange-600 font-semibold mb-4">
//             Show your support by signing this petition now →
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             👤 {petition.createdBy} | 🗨️ 0 Comments
//           </p>
//           <img
//             src={petition.image}
//             alt="Petition"
//             className="rounded-md mb-4 w-full"
//           />
//           <p className="text-gray-700">{petition.description}</p>

//           {/* Share Buttons */}
//           <div className="mt-6">
//             <h3 className="text-orange-500 font-bold mb-2">Share for Success</h3>
//             <div className="flex gap-4 flex-wrap">
//               <a
//                 href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Share on Facebook
//               </a>
//               <a
//                 href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-400 text-white px-4 py-2 rounded"
//               >
//                 Share on Twitter
//               </a>
//               <a
//                 href={`https://www.messenger.com/share?link=${shareUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Share in Messenger
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Sign Form */}
//         <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
//           <div className="bg-blue-50 p-4 rounded-md">
//             <h2 className="text-xl font-bold mb-2">SIGN THIS PETITION</h2>
//             <p className="mb-2">
//               <span className="text-orange-600 font-bold">
//                 {petition.signatures.length}
//               </span>{' '}
//               person{petition.signatures.length !== 1 && 's'} has signed. Add your voice!
//             </p>
//             <div className="w-full bg-white rounded-full h-2 mb-4">
//               <div
//                 className="bg-orange-500 h-2 rounded-full"
//                 style={{
//                   width: `${Math.min(petition.signatures.length, 100)}%`,
//                 }}
//               ></div>
//             </div>

//             {!signed ? (
//               <>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Name*"
//                   className="w-full border p-2 mb-2 rounded"
//                 />
//                 <input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email*"
//                   className="w-full border p-2 mb-2 rounded"
//                 />
//                 <textarea
//                   name="comment"
//                   value={formData.comment}
//                   onChange={handleChange}
//                   placeholder="Comments"
//                   className="w-full border p-2 mb-2 rounded"
//                   rows={3}
//                 />

//                 <div className="mb-2 space-y-2">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       name="showName"
//                       checked={formData.showName}
//                       onChange={handleChange}
//                     />
//                     <span>Show my name in the online signature list</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       name="keepUpdated"
//                       checked={formData.keepUpdated}
//                       onChange={handleChange}
//                     />
//                     <span>Keep me informed on this and similar petitions</span>
//                   </label>
//                 </div>

//                 <button
//                   onClick={handleSign}
//                   className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
//                 >
//                   Sign Petition
//                 </button>
//               </>
//             ) : (
//               <div className="text-center text-green-600 font-semibold mt-4">
//                 <FaCheckCircle className="mx-auto text-3xl" />
//                 <p>Thank you for signing!</p>
//               </div>
//             )}

//             {/* Signature List */}
//             <div className="mt-4 text-sm text-gray-700">
//               {petition.signatures.map((sig, index) => (
//                 <p key={index}>✔ {sig.name} signed {sig.time}</p>
//               ))}
//             </div>
//           </div>

//           <div className="mt-4 text-center">
//             <a href="/create" className="text-blue-600 underline">
//               Have a cause? Start your own petition
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// src/pages/PetitionPage.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../config/firebase'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { FaCheckCircle } from 'react-icons/fa'

type Signature = {
  name: string
  time: string
}

type Petition = {
  title: string
  description: string
  image: string
  createdBy: string
  signatures: Signature[]
}

type FormData = {
  name: string
  email: string
  comment: string
  showName: boolean
  keepUpdated: boolean
}

export const PetitionPage = () => {
  const { petitionId } = useParams() as { petitionId?: string }
  const [petition, setPetition] = useState<Petition | null>(null)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    comment: '',
    showName: true,
    keepUpdated: true,
  })

  const [signed, setSigned] = useState(false)

  useEffect(() => {
    const fetchPetition = async () => {
      try {
        const docRef = doc(db, 'petitions', petitionId!)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setPetition(docSnap.data() as Petition)
        } else {
          alert('Petition not found!')
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching petition:', error)
      }
    }

    if (petitionId) fetchPetition()
  }, [petitionId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSign = async () => {
    if (!formData.name || !formData.email) {
      alert('Name and email are required.')
      return
    }

    const newSignature: Signature = {
      name: formData.showName ? formData.name : 'Anonymous',
      time: new Date().toLocaleTimeString(),
    }

    try {
      const docRef = doc(db, 'petitions', petitionId!)
      await updateDoc(docRef, {
        signatures: arrayUnion(newSignature),
      })

      setPetition((prev) =>
        prev
          ? { ...prev, signatures: [...prev.signatures, newSignature] }
          : prev
      )
      setSigned(true)
    } catch (error) {
      console.error('Error signing petition:', error)
    }
  }

  if (loading || !petition) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>
  }

  const shareUrl = window.location.href

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col lg:flex-row">
        {/* Petition Info */}
        <div className="w-full lg:w-2/3 pr-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{petition.title}</h1>
          <p className="text-orange-600 font-semibold mb-4">
            Show your support by signing this petition now →
          </p>
          <p className="text-sm text-gray-700 mb-2">
            👤 {petition.createdBy}
          </p>
          <img src={petition.image} alt="Petition" className="rounded-md mb-4 w-full" />
          <p className="text-gray-700">{petition.description}</p>

          {/* Share Buttons */}
          <div className="mt-6">
            <h3 className="text-orange-500 font-bold mb-2">Share for Success</h3>
            <div className="flex gap-4 flex-wrap">
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Share on Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white px-4 py-2 rounded"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.messenger.com/share?link=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Share in Messenger
              </a>
            </div>
          </div>
        </div>

        {/* Sign Form */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
          <div className="bg-blue-50 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">SIGN THIS PETITION</h2>
            <p className="mb-2">
              <span className="text-orange-600 font-bold">
                {petition.signatures.length}
              </span>{' '}
              person{petition.signatures.length !== 1 && 's'} has signed. Add your voice!
            </p>
            <div className="w-full bg-white rounded-full h-2 mb-4">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(petition.signatures.length, 100)}%`,
                }}
              ></div>
            </div>

            {!signed ? (
              <>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  className="w-full border p-2 mb-2 rounded"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  className="w-full border p-2 mb-2 rounded"
                />
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Comments"
                  className="w-full border p-2 mb-2 rounded"
                  rows={3}
                />

                <div className="mb-2 space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="showName"
                      checked={formData.showName}
                      onChange={handleChange}
                    />
                    <span>Show my name in the online signature list</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="keepUpdated"
                      checked={formData.keepUpdated}
                      onChange={handleChange}
                    />
                    <span>Keep me informed on this and similar petitions</span>
                  </label>
                </div>

                <button
                  onClick={handleSign}
                  className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                >
                  Sign Petition
                </button>
              </>
            ) : (
              <div className="text-center text-green-600 font-semibold mt-4">
                <FaCheckCircle className="mx-auto text-3xl" />
                <p>Thank you for signing!</p>
              </div>
            )}

            {/* Signature List */}
            <div className="mt-4 text-sm text-gray-700">
              {petition.signatures.map((sig, index) => (
                <p key={index}>✔ {sig.name} signed {sig.time}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
