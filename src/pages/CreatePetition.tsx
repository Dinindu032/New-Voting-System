// import { FiMail, FiEdit2, FiPaperclip } from 'react-icons/fi'
// import { Button } from '../components/Button'
// import { Input } from '../components/Input'
// import { TextArea } from '../components/TextArea'
// // import { useAuthSafeRoute } from '../hooks'

// export const CreatePetition = () => {
//   // useAuthSafeRoute()

//   return (
//     <div className="content full-page flex flex-col">
//       <div className="mt-4 flex w-full grow flex-col rounded-lg bg-white">
//         <div className="flex items-center border-b px-6 py-3 text-lg font-bold">
//           <div className="grow">Create Petition</div>
//           <Button label="Submit Petition" className="max-w-48" />
//         </div>
//         <div className="flex grow flex-col items-center justify-center bg-blue-50 p-8 text-center">
//           <div className="mb-4 text-xl font-semibold italic text-gray-700">
//             - Speak Up, Stand Out, Make a Difference -
//           </div>
//           <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-lg">
//             <Input
//               type="email"
//               placeholder="Email"
//               icon={FiMail}
//               className="w-full"
//             />
//             <TextArea
//               placeholder="Add Description"
//               iconLeft={FiEdit2}
//               iconRight={FiPaperclip}
//               rows={5}
//               className="w-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// src/pages/CreatePetition.tsx

// import { FiMail, FiEdit2, FiPaperclip } from 'react-icons/fi'
// import { Button } from '../components/Button'
// import { Input } from '../components/Input'
// import { TextArea } from '../components/TextArea'
// import { useAuthSafeRoute } from '../hooks'

// export const CreatePetition = () => {
//   useAuthSafeRoute()

//   return (
//     <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-3xl rounded-lg bg-white shadow-xl">
//         <div className="flex items-center justify-between border-b px-6 py-4">
//           <h2 className="text-xl font-bold text-gray-800">Create Petition</h2>
//           <Button label="Submit Petition" className="max-w-48" />
//         </div>

//         <div className="px-8 py-6">
//           <div className="mb-6 text-center text-lg italic text-gray-600">
//             - Speak Up, Stand Out, Make a Difference -
//           </div>

//           <div className="space-y-6">
//             <Input
//               type="email"
//               placeholder="Your Email"
//               icon={FiMail}
//               className="w-full"
//             />

//             <TextArea
//               placeholder="Add Description..."
//               iconLeft={FiEdit2}
//               iconRight={FiPaperclip}
//               rows={6}
//               className="w-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useState } from 'react'
// import { FiMail, FiEdit2, FiPaperclip } from 'react-icons/fi'
// import { Button } from '../components/Button'
// import { Input } from '../components/Input'
// import { TextArea } from '../components/TextArea'
// import { useAuthSafeRoute } from '../hooks'
// import { FaCheckCircle } from 'react-icons/fa'

// export const CreatePetition = () => {
//   useAuthSafeRoute()

//   const [submitted, setSubmitted] = useState(false)

//   const handleSubmit = () => {
//     // Here you can also send data to backend if needed
//     setSubmitted(true)
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-3xl rounded-lg bg-white shadow-xl">
//         <div className="flex items-center justify-between border-b px-6 py-4">
//           <h2 className="text-xl font-bold text-gray-800">Create Petition</h2>
//           <Button label="Submit Petition" className="max-w-48" onClick={handleSubmit} />
//         </div>

//         {/* Petition form */}
//         <div className="px-8 py-6">
//           <div className="mb-6 text-center text-lg italic text-gray-600">
//             - Speak Up, Stand Out, Make a Difference -
//           </div>

//           {!submitted ? (
//             <div className="space-y-6">
//               <Input
//                 type="email"
//                 placeholder="Your Email"
//                 icon={FiMail}
//                 className="w-full"
//               />

//               <TextArea
//                 placeholder="Add Description..."
//                 iconLeft={FiEdit2}
//                 iconRight={FiPaperclip}
//                 rows={6}
//                 className="w-full"
//               />
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-10 mt-8">
//               <FaCheckCircle className="text-green-600 text-6xl mb-4" />
//               <p className="text-xl text-center font-semibold text-gray-700">
//                 Your Petition has been submitted. <br /> Thank you!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


// src/pages/CreatePetition.tsx
import { useState } from 'react'
import { FiMail, FiEdit2, FiPaperclip } from 'react-icons/fi'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { TextArea } from '../components/TextArea'
import { useAuthSafeRoute } from '../hooks'
import { FaCheckCircle } from 'react-icons/fa'
import { db } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore'

export const CreatePetition = () => {
  useAuthSafeRoute()

  const [submitted, setSubmitted] = useState(false)
  const [petitionLink, setPetitionLink] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'petitions'), {
        title: 'NEW PETITION FOR MANAGEMENT',
        description,
        createdBy: email,
        image: 'https://via.placeholder.com/300x200?text=Online+Petition',
        signatures: [],
        createdAt: new Date(),
      })

      const link = `${window.location.origin}/petitions/${docRef.id}`
      setPetitionLink(link)
      setSubmitted(true)
    } catch (error) {
      console.error('Error creating petition:', error)
      alert('Failed to create petition')
    }
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
              <Input
                type="email"
                placeholder="Your Email"
                icon={FiMail}
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextArea
                placeholder="Add Description..."
                iconLeft={FiEdit2}
                iconRight={FiPaperclip}
                rows={6}
                className="w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
