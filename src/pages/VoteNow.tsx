// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         vote.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     speakElectionDetails(vote)
//     setTimeout(() => playBeepAndListen(vote), 8000)
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title}. `
//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })
//     text += `Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.`

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()
//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const playBeepAndListen = (vote: any) => {
//     const beep = new Audio('/beep.mp3')
//     beep.play()
//     beep.onended = () => {
//       listenForAnswer(vote)
//     }
//   }

//   const listenForAnswer = (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       const matched = vote.candidates.find((candidate: any, index: number) => {
//         const number = index + 1
//         return transcript.includes(`my vote is for ${number}`) ||
//                transcript.includes(`vote is for ${number}`) ||
//                transcript.includes(`${number}`)
//       })

//       if (matched) {
//         setSelectedCandidateId(matched.id)
//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen bg-[#B1D9DD] p-6 relative">
//       <h2 className="text-2xl font-bold text-[#003B57] mb-6 shadow-sm">Vote Now</h2>

//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by election title..."
//           className="flex-1 p-2 rounded shadow border"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           className="p-2 rounded shadow border"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="">Filter by status</option>
//           <option value="Active">Active</option>
//           <option value="Upcoming">Upcoming</option>
//           <option value="Closed">Closed</option>
//         </select>
//       </div>

//       <div className="space-y-4">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id}
//             className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
//           >
//             <div>
//               <h3 className="text-lg font-bold text-[#000]">{vote.title}</h3>
//               <p className="text-sm text-gray-700">{vote.timeRemaining}</p>
//             </div>
//             <div className="flex gap-2 items-center">
//               <button
//                 onClick={() => handleOpen(vote)}
//                 className="bg-[#B1D9DD] hover:bg-[#a4d0d4] text-black font-semibold px-6 py-2 rounded shadow-md transition"
//               >
//                 Open
//               </button>
//               <button
//                 onClick={() => handleAccessibilityClick(vote)}
//                 className="bg-white border-2 border-gray-400 hover:border-[#003B57] text-[#003B57] px-3 py-2 rounded-full shadow transition"
//                 title="Disabled Users Access"
//               >
//                 <FaWheelchair className="text-xl" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Petitions Section */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold text-[#003B57] mb-4">Petitions</h2>
//         <div className="space-y-4">
//           {petitions.map((petition) => (
//             <div
//               key={petition.id}
//               className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
//             >
//               <div>
//                 <h3 className="text-lg font-bold text-[#000]">{petition.title}</h3>
//                 <p className="text-sm text-gray-700">{petition.description}</p>
//                 <p className="text-sm text-gray-700 mt-1 italic">{petition.timeRemaining}</p>
//               </div>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-[#B1D9DD] hover:bg-[#a4d0d4] text-black font-semibold px-6 py-2 rounded shadow-md transition">
//                   View
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VoteNow



// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         vote.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     speakElectionDetails(vote)
//     setTimeout(() => playBeepAndListen(vote), 8000)
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title}. `
//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })
//     text += `Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.`

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()
//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const playBeepAndListen = (vote: any) => {
//     const beep = new Audio('/beep.mp3')
//     beep.play()
//     beep.onended = () => {
//       listenForAnswer(vote)
//     }
//   }

//   const listenForAnswer = (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       const matched = vote.candidates.find((candidate: any, index: number) => {
//         const number = index + 1
//         return transcript.includes(`my vote is for ${number}`) ||
//                transcript.includes(`vote is for ${number}`) ||
//                transcript.includes(`${number}`)
//       })

//       if (matched) {
//         setSelectedCandidateId(matched.id)
//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {/* Elections Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Petitions Section */}
//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default VoteNow



// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         vote.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     speakElectionDetails(vote)
//     setTimeout(() => playBeepAndListen(vote), 8000)
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title}. `
//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })
//     text += `Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.`

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()
//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const playBeepAndListen = (vote: any) => {
//     const beep = new Audio('/beep.mp3')
//     beep.play()
//     beep.onended = () => {
//       listenForAnswer(vote)
//     }
//   }

//   const listenForAnswer = (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       const matched = vote.candidates.find((candidate: any, index: number) => {
//         const number = index + 1
//         return transcript.includes(`my vote is for ${number}`) ||
//                transcript.includes(`vote is for ${number}`) ||
//                transcript.includes(`${number}`)
//       })

//       if (matched) {
//         setSelectedCandidateId(matched.id)
//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {/* Elections Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Petitions Section */}
//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default VoteNow


// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         vote.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     speakElectionDetails(vote)
//     setTimeout(() => playBeepAndListen(vote), 8000)
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title}. `
//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })
//     text += 'Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()
//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const playBeepAndListen = (vote: any) => {
//     const beep = new Audio('/beep.mp3')
//     beep.play()
//     beep.onended = () => {
//       listenForAnswer(vote)
//     }
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       // Save transcript to Firestore
//       try {
//         await addDoc(collection(db, 'voice-votes'), {
//           voteId: vote.id,
//           transcript: transcript,
//           timestamp: new Date()
//         })
//       } catch (error) {
//         console.error('Failed to save voice vote:', error)
//       }

//       const matched = vote.candidates.find((candidate: any, index: number) => {
//         const number = index + 1
//         return transcript.includes(`my vote is for ${number}`) ||
//                transcript.includes(`vote is for ${number}`) ||
//                transcript.includes(`${number}`)
//       })

//       if (matched) {
//         setSelectedCandidateId(matched.id)
//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {/* Elections Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Petitions Section */}
//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default VoteNow


// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// // ✅ Safe check for browser environment
// const SpeechRecognition =
//   typeof window !== 'undefined'
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const [isListening, setIsListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     if (isSpeakingOrListening) return

//     speakElectionDetails(vote)
//     const beep = new Audio('\src/assets/beep-125033.mp3')

//     beep.play()
//       .then(() => {
//         console.log('Beep played!')
//       })
//       .catch((err) => {
//         console.error('Beep playback error:', err)
//       })

//     beep.onended = () => {
//       listenForAnswer(vote)
//     }
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title || 'Untitled'}. `

//     if (!vote.candidates || vote.candidates.length === 0) return

//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })

//     text += 'Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()
//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onstart = () => {
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsListening(false)
//     }

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       try {
//         await addDoc(collection(db, 'voice-votes'), {
//           voteId: vote.id,
//           transcript,
//           timestamp: new Date()
//         })
//       } catch (error) {
//         console.error('Failed to save voice vote:', error)
//       }

//       if (!vote.candidates || vote.candidates.length === 0) return

//       const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
//         transcript.includes(`my vote is for ${index + 1}`) ||
//         transcript.includes(`vote is for ${index + 1}`) ||
//         transcript.includes(`${index + 1}`)
//       )

//       if (matchedIndex !== -1) {
//         setSelectedCandidateId(matchedIndex + 1)

//         const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
//         const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
//         window.speechSynthesis.speak(confirmUtterance)

//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {isListening && (
//         <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-5 py-2 rounded-full shadow-lg animate-pulse z-50">
//           🎙️ Listening for your vote...
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id || vote.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   disabled={isSpeakingOrListening}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id || petition.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }





// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined'
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const [isListening, setIsListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     if (isSpeakingOrListening) return

//     speakElectionDetails(vote, () => {
//       const beep = new Audio('/beep-125033.mp3') 
//       beep.play()
//         .then(() => console.log('Beep played!'))
//         .catch(err => console.error('Beep playback error:', err))

//       beep.onended = () => {
//         listenForAnswer(vote)
//       }
//     })
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any, onFinish: () => void) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title || 'Untitled'}. `

//     if (!vote.candidates || vote.candidates.length === 0) return

//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })

//     text += 'Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()

//     utterance.onend = () => {
//       onFinish()
//     }

//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onstart = () => setIsListening(true)
//     recognition.onend = () => setIsListening(false)

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       try {
//         await addDoc(collection(db, 'voice-votes'), {
//           voteId: vote.id,
//           transcript,
//           timestamp: new Date()
//         })
//       } catch (error) {
//         console.error('Failed to save voice vote:', error)
//       }

//       if (!vote.candidates || vote.candidates.length === 0) return

//       const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
//         transcript.includes(`my vote is for ${index + 1}`) ||
//         transcript.includes(`vote is for ${index + 1}`) ||
//         transcript.includes(`${index + 1}`)
//       )

//       if (matchedIndex !== -1) {
//         setSelectedCandidateId(matchedIndex + 1)

//         const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
//         const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
//         window.speechSynthesis.speak(confirmUtterance)

//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {isListening && (
//         <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-5 py-2 rounded-full shadow-lg animate-pulse z-50">
//           🎙️ Listening for your vote...
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id || vote.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   disabled={isSpeakingOrListening}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id || petition.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined'
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const [isListening, setIsListening] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [isVoiceListening, setIsVoiceListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     if (isSpeakingOrListening) return

//     speakElectionDetails(vote, () => {
//       const beep = new Audio('/beep-125033.mp3')
//       beep.play()
//         .then(() => console.log('Beep played!'))
//         .catch(err => console.error('Beep playback error:', err))

//       beep.onended = () => {
//         listenForAnswer(vote)
//       }
//     })
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any, onFinish: () => void) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title || 'Untitled'}. `

//     if (!vote.candidates || vote.candidates.length === 0) return

//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })

//     text += 'Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()

//     setIsSpeaking(true)
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       onFinish()
//     }

//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onstart = () => {
//       setIsVoiceListening(true)
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsVoiceListening(false)
//       setIsListening(false)
//     }

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       try {
//         await addDoc(collection(db, 'Votes'), {
//           voteId: vote.id,
//           transcript,
//           timestamp: new Date()
//         })
//       } catch (error) {
//         console.error('Failed to save voice vote:', error)
//       }

//       if (!vote.candidates || vote.candidates.length === 0) return

//       const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
//         transcript.includes(`my vote is for ${index + 1}`) ||
//         transcript.includes(`vote is for ${index + 1}`) ||
//         transcript.includes(`${index + 1}`)
//       )

//       if (matchedIndex !== -1) {
//         setSelectedCandidateId(matchedIndex + 1)

//         try {
//           await addDoc(collection(db, 'votes'), {
//             voteId: vote.id,
//             candidateId: matchedIndex + 1,
//             candidateName: vote.candidates[matchedIndex].name,
//             timestamp: new Date()
//           })
//         } catch (error) {
//           console.error('Error saving vote:', error)
//         }

//         const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
//         const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
//         window.speechSynthesis.speak(confirmUtterance)

//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       setIsVoiceListening(false)
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {/* 🎤 UI Indicators */}
//       {isSpeaking && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           📢 Reading election details...
//         </div>
//       )}

//       {isVoiceListening && (
//         <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           🎤 Please state your vote...
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id || vote.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   disabled={isSpeakingOrListening}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id || petition.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined'
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const [isListening, setIsListening] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [isVoiceListening, setIsVoiceListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     if (isSpeakingOrListening) return

//     speakElectionDetails(vote, () => {
//       const beep = new Audio('/beep-125033.mp3')
//       beep.play()
//         .then(() => console.log('Beep played!'))
//         .catch(err => console.error('Beep playback error:', err))

//       beep.onended = () => {
//         listenForAnswer(vote)
//       }
//     })
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any, onFinish: () => void) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title || 'Untitled'}. `

//     if (!vote.candidates || vote.candidates.length === 0) return

//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })

//     text += 'Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()

//     setIsSpeaking(true)
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       onFinish()
//     }

//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onstart = () => {
//       setIsVoiceListening(true)
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsVoiceListening(false)
//       setIsListening(false)
//     }

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       try {
//         await addDoc(collection(db, 'Votes'), {
//           voteId: vote.id,
//           transcript,
//           timestamp: new Date(),
//           isDisabledVote: true
//         })
//       } catch (error) {
//         console.error('Failed to save raw voice vote:', error)
//       }

//       if (!vote.candidates || vote.candidates.length === 0) return

//       const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
//         transcript.includes(`my vote is for ${index + 1}`) ||
//         transcript.includes(`vote is for ${index + 1}`) ||
//         transcript.includes(`${index + 1}`)
//       )

//       if (matchedIndex !== -1) {
//         setSelectedCandidateId(matchedIndex + 1)

//         try {
//           await addDoc(collection(db, 'votes'), {
//             voteId: vote.id,
//             candidateId: matchedIndex + 1,
//             candidateName: vote.candidates[matchedIndex].name,
//             timestamp: new Date(),
//             isDisabledVote: true
//           })
//         } catch (error) {
//           console.error('Error saving vote:', error)
//         }

//         const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
//         const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
//         window.speechSynthesis.speak(confirmUtterance)

//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       setIsVoiceListening(false)
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {isSpeaking && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           📢 Reading election details...
//         </div>
//       )}

//       {isVoiceListening && (
//         <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           🎤 Please state your vote...
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id || vote.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   disabled={isSpeakingOrListening}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id || petition.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined'
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const [isListening, setIsListening] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [isVoiceListening, setIsVoiceListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()

//   const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     if (isSpeakingOrListening) return

//     speakElectionDetails(vote, () => {
//       const beep = new Audio('/beep-125033.mp3')
//       beep.play()
//         .then(() => console.log('Beep played!'))
//         .catch(err => console.error('Beep playback error:', err))

//       beep.onended = () => {
//         listenForAnswer(vote)
//       }
//     })
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any, onFinish: () => void) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title || 'Untitled'}. `

//     if (!vote.candidates || vote.candidates.length === 0) return

//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })

//     text += 'After the beep, please say: My vote is for number 1, 2, 3, or 4.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()

//     setIsSpeaking(true)
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       onFinish()
//     }

//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onstart = () => {
//       setIsVoiceListening(true)
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsVoiceListening(false)
//       setIsListening(false)
//     }

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       if (!vote.candidates || vote.candidates.length === 0) return

//       const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
//         transcript.includes(`my vote is for ${index + 1}`) ||
//         transcript.includes(`vote is for ${index + 1}`) ||
//         transcript.includes(`${index + 1}`)
//       )

//       if (matchedIndex !== -1) {
//         setSelectedCandidateId(matchedIndex + 1)

//         try {
//           await addDoc(collection(db, 'Votes'), {
//             candidate: vote.candidates[matchedIndex].name,
//             electionId: vote.id,
//             timestamp: new Date()
//           })
//         } catch (error) {
//           console.error('Error saving vote:', error)
//         }

//         const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
//         const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
//         window.speechSynthesis.speak(confirmUtterance)

//         setTimeout(() => handleSubmitVote(), 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       setIsVoiceListening(false)
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {isSpeaking && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           📢 Reading election details...
//         </div>
//       )}

//       {isVoiceListening && (
//         <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           🎤 Please state your vote...
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id || vote.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   disabled={isSpeakingOrListening}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id || petition.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }




// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined'
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const [isListening, setIsListening] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [isVoiceListening, setIsVoiceListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()
//   const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setElections(electionsData)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     fetchElections()
//   }, [])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     if (isSpeakingOrListening) return

//     speakElectionDetails(vote, () => {
//       const beep = new Audio('/beep-125033.mp3')
//       beep.play()
//         .then(() => console.log('Beep played!'))
//         .catch(err => console.error('Beep playback error:', err))

//       beep.onended = () => {
//         listenForAnswer(vote)
//       }
//     })
//   }

//   const handleSubmitVote = async (vote: any, candidateIndex: number) => {
//     if (candidateIndex !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       try {
//         await addDoc(collection(db, 'Votes'), {
//           candidate: vote.candidates[candidateIndex].name,
//           electionId: vote.id,
//           timestamp: new Date(),
//           isDisabledVote: false, // normal vote
//         })
//       } catch (error) {
//         console.error('Error saving vote:', error)
//       }
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any, onFinish: () => void) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title || 'Untitled'}. `

//     if (!vote.candidates || vote.candidates.length === 0) return

//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })

//     text += 'After the beep sound, please say: My vote is for number 1, 2, 3, or 4.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()

//     setIsSpeaking(true)
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       onFinish()
//     }

//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onstart = () => {
//       setIsVoiceListening(true)
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsVoiceListening(false)
//       setIsListening(false)
//     }

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       if (!vote.candidates || vote.candidates.length === 0) return

//       const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
//         transcript.includes(`my vote is for ${index + 1}`) ||
//         transcript.includes(`vote is for ${index + 1}`) ||
//         transcript.includes(`${index + 1}`)
//       )

//       if (matchedIndex !== -1) {
//         setSelectedCandidateId(matchedIndex + 1)

//         try {
//           await addDoc(collection(db, 'Votes'), {
//             candidate: vote.candidates[matchedIndex].name,
//             electionId: vote.id,
//             timestamp: new Date(),
//             isDisabledVote: true, // voice vote
//           })
//         } catch (error) {
//           console.error('Error saving voice vote:', error)
//         }

//         const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
//         const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
//         window.speechSynthesis.speak(confirmUtterance)

//         setTimeout(() => {
//           setShowSuccessPopup(true)
//           setTimeout(() => setShowSuccessPopup(false), 3000)
//         }, 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       setIsVoiceListening(false)
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {isSpeaking && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           📢 Reading election details...
//         </div>
//       )}

//       {isVoiceListening && (
//         <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           🎤 Please state your vote...
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id || vote.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   disabled={isSpeakingOrListening}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id || petition.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }





// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../providers/AuthProvider' // <-- Update the path to the correct location of AuthProvider

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined'
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null

// export const VoteNow = () => {
//   const { currentUser } = useAuth()
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const [isListening, setIsListening] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [isVoiceListening, setIsVoiceListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()
//   const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...(doc.data() as { votingCategories?: string[] }),
//         }))

//         // Filter only those elections where the current user's email is included in votingCategories
//         const userEmail = currentUser?.email
//         const allowedElections = electionsData.filter(election =>
//           userEmail && election.votingCategories?.includes(userEmail)
//         )

//         setElections(allowedElections)
//       } catch (error) {
//         console.error('Error fetching elections:', error)
//       }
//     }

//     if (currentUser?.email) {
//       fetchElections()
//     }
//   }, [currentUser])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     if (isSpeakingOrListening) return

//     speakElectionDetails(vote, () => {
//       const beep = new Audio('/beep-125033.mp3')
//       beep.play()
//         .then(() => console.log('Beep played!'))
//         .catch(err => console.error('Beep playback error:', err))

//       beep.onended = () => {
//         listenForAnswer(vote)
//       }
//     })
//   }

//   const handleSubmitVote = async (vote: any, candidateIndex: number) => {
//     if (candidateIndex !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       try {
//         await addDoc(collection(db, 'Votes'), {
//           candidate: vote.candidates[candidateIndex].name,
//           electionId: vote.id,
//           timestamp: new Date(),
//           isDisabledVote: false,
//         })
//       } catch (error) {
//         console.error('Error saving vote:', error)
//       }
//       setTimeout(() => {
//         setShowSuccessPopup(false)
//       }, 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any, onFinish: () => void) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title || 'Untitled'}. `

//     if (!vote.candidates || vote.candidates.length === 0) return

//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })

//     text += 'After the beep sound, please say: My vote is for number 1, 2, 3, or 4.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()

//     setIsSpeaking(true)
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       onFinish()
//     }

//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) {
//       recognitionRef.current.abort()
//     }
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onstart = () => {
//       setIsVoiceListening(true)
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsVoiceListening(false)
//       setIsListening(false)
//     }

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       if (!vote.candidates || vote.candidates.length === 0) return

//       const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
//         transcript.includes(`my vote is for ${index + 1}`) ||
//         transcript.includes(`vote is for ${index + 1}`) ||
//         transcript.includes(`${index + 1}`)
//       )

//       if (matchedIndex !== -1) {
//         setSelectedCandidateId(matchedIndex + 1)

//         try {
//           await addDoc(collection(db, 'Votes'), {
//             candidate: vote.candidates[matchedIndex].name,
//             electionId: vote.id,
//             timestamp: new Date(),
//             isDisabledVote: true,
//           })
//         } catch (error) {
//           console.error('Error saving voice vote:', error)
//         }

//         const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
//         const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
//         window.speechSynthesis.speak(confirmUtterance)

//         setTimeout(() => {
//           setShowSuccessPopup(true)
//           setTimeout(() => setShowSuccessPopup(false), 3000)
//         }, 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       setIsVoiceListening(false)
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {isSpeaking && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           📢 Reading election details...
//         </div>
//       )}

//       {isVoiceListening && (
//         <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           🎤 Please state your vote...
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id || vote.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   disabled={isSpeakingOrListening}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id || petition.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'
// import { db } from '../config/firebase'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../providers/AuthProvider'

// declare global {
//   interface Window {
//     SpeechRecognition: any
//     webkitSpeechRecognition: any
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined'
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null

// export const VoteNow = () => {
//   const { currentUser } = useAuth()
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [elections, setElections] = useState<any[]>([])
//   const [filteredVotes, setFilteredVotes] = useState<any[]>([])
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [petitions, setPetitions] = useState<any[]>([])
//   const [isListening, setIsListening] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [isVoiceListening, setIsVoiceListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const navigate = useNavigate()
//   const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

//   useEffect(() => {
//     const fetchElections = async () => {
//       try {
//         const electionsSnapshot = await getDocs(collection(db, 'start-date'))
//         const electionsData = electionsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...(doc.data() as { votingCategories?: string[] }),
//         }))

//         const mainImagesSnapshot = await getDocs(collection(db, 'main-images'))
//         const imageMap: Record<string, string> = {}

//         mainImagesSnapshot.docs.forEach(doc => {
//           const data = doc.data()
//           if (data.electionId && data.imageUrl) {
//             imageMap[data.electionId] = data.imageUrl
//           }
//         })

//         const userEmail = currentUser?.email
//         const allowedElections = electionsData
//           .filter(election => userEmail && election.votingCategories?.includes(userEmail))
//           .map(election => ({
//             ...election,
//             image: imageMap[election.id] || '/placeholder-election.png',
//           }))

//         setElections(allowedElections)
//       } catch (error) {
//         console.error('Error fetching elections or images:', error)
//       }
//     }

//     if (currentUser?.email) {
//       fetchElections()
//     }
//   }, [currentUser])

//   useEffect(() => {
//     let filtered = elections.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [elections, searchTerm, statusFilter, submittedVotes])

//   useEffect(() => {
//     const fetchPetitions = async () => {
//       try {
//         const petitionsCollection = await getDocs(collection(db, 'petitions'))
//         const petitionsData = petitionsCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setPetitions(petitionsData)
//       } catch (error) {
//         console.error('Error fetching petitions:', error)
//       }
//     }

//     fetchPetitions()
//   }, [])

//   const handleOpen = (vote: any) => {
//     navigate(`/CastVoting/${vote.id}`)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     if (isSpeakingOrListening) return

//     speakElectionDetails(vote, () => {
//       const beep = new Audio('/beep-125033.mp3')
//       beep.play().catch(err => console.error('Beep playback error:', err))
//       beep.onended = () => listenForAnswer(vote)
//     })
//   }

//   const handleSubmitVote = async (vote: any, candidateIndex: number) => {
//     if (candidateIndex !== null) {
//       setShowSuccessPopup(true)
//       window.speechSynthesis.cancel()
//       try {
//         await addDoc(collection(db, 'Votes'), {
//           candidate: vote.candidates[candidateIndex].name,
//           electionId: vote.id,
//           timestamp: new Date(),
//           isDisabledVote: false,
//         })
//       } catch (error) {
//         console.error('Error saving vote:', error)
//       }
//       setTimeout(() => setShowSuccessPopup(false), 3000)
//     } else {
//       alert('Please select a candidate to vote.')
//     }
//   }

//   const speakElectionDetails = (vote: any, onFinish: () => void) => {
//     const synth = window.speechSynthesis
//     let text = `Election Title: ${vote.title || 'Untitled'}. `

//     if (!vote.candidates || vote.candidates.length === 0) return

//     vote.candidates.forEach((candidate: any, index: number) => {
//       text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
//     })

//     text += 'After the beep sound, please say: My vote is for number 1, 2, 3, or 4.'

//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()

//     setIsSpeaking(true)
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       onFinish()
//     }

//     synth.speak(utterance)
//   }

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel()
//     if (recognitionRef.current) recognitionRef.current.abort()
//   }

//   const listenForAnswer = async (vote: any) => {
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported in this browser.')
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onstart = () => {
//       setIsVoiceListening(true)
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsVoiceListening(false)
//       setIsListening(false)
//     }

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Voice Transcript:', transcript)

//       if (!vote.candidates || vote.candidates.length === 0) return

//       const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
//         transcript.includes(`my vote is for ${index + 1}`) ||
//         transcript.includes(`vote is for ${index + 1}`) ||
//         transcript.includes(`${index + 1}`)
//       )

//       if (matchedIndex !== -1) {
//         setSelectedCandidateId(matchedIndex + 1)

//         try {
//           await addDoc(collection(db, 'Votes'), {
//             candidate: vote.candidates[matchedIndex].name,
//             electionId: vote.id,
//             timestamp: new Date(),
//             isDisabledVote: true,
//           })
//         } catch (error) {
//           console.error('Error saving voice vote:', error)
//         }

//         const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
//         const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
//         window.speechSynthesis.speak(confirmUtterance)

//         setTimeout(() => {
//           setShowSuccessPopup(true)
//           setTimeout(() => setShowSuccessPopup(false), 3000)
//         }, 1500)
//       } else {
//         alert('Could not recognize your vote. Please try again.')
//       }
//     }

//     recognition.onerror = () => {
//       setIsVoiceListening(false)
//       alert('Speech recognition failed. Please try again.')
//     }

//     recognition.start()
//     recognitionRef.current = recognition
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
//       <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

//       {isSpeaking && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           📢 Reading election details...
//         </div>
//       )}

//       {isVoiceListening && (
//         <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
//           🎤 Please state your vote...
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVotes.map((vote) => (
//           <div
//             key={vote.id || vote.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={vote.image || '/placeholder-election.png'}
//               alt={vote.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
//               <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleOpen(vote)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Vote
//                 </button>
//                 <button
//                   onClick={() => handleAccessibilityClick(vote)}
//                   disabled={isSpeakingOrListening}
//                   title="Accessibility Voting"
//                   className="text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-2 rounded-full transition"
//                 >
//                   <FaWheelchair />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {petitions.map((petition) => (
//           <div
//             key={petition.id || petition.title}
//             className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={petition.image || '/placeholder-petition.png'}
//               alt={petition.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
//               <Link to={`/Petitions/${petition.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                   View & Sign
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }




import { useState, useEffect, useRef } from 'react'
import { FaWheelchair } from 'react-icons/fa'
import { db } from '../config/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null

export const VoteNow = () => {
  const { currentUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [elections, setElections] = useState<any[]>([])
  const [filteredVotes, setFilteredVotes] = useState<any[]>([])
  const [submittedVotes, setSubmittedVotes] = useState<string[]>([]) // store electionIds of voted elections
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [petitions, setPetitions] = useState<any[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isVoiceListening, setIsVoiceListening] = useState(false)
  const recognitionRef = useRef<any>(null)
  const navigate = useNavigate()
  const isSpeakingOrListening = isListening || (typeof window !== 'undefined' && window.speechSynthesis?.speaking)

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const electionsSnapshot = await getDocs(collection(db, 'start-date'))
        const electionsData = electionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as { votingCategories?: string[] }),
        }))

        const mainImagesSnapshot = await getDocs(collection(db, 'main-images'))
        const imageMap: Record<string, string> = {}

        mainImagesSnapshot.docs.forEach(doc => {
          const data = doc.data()
          if (data.electionId && data.imageUrl) {
            imageMap[data.electionId] = data.imageUrl
          }
        })

        const userEmail = currentUser?.email
        const allowedElections = electionsData
          .filter(election => userEmail && election.votingCategories?.includes(userEmail))
          .map(election => ({
            ...election,
            image: imageMap[election.id] || '/placeholder-election.png',
          }))

        setElections(allowedElections)
      } catch (error) {
        console.error('Error fetching elections or images:', error)
      }
    }

    const fetchSubmittedVotes = async () => {
      try {
        const votesSnapshot = await getDocs(collection(db, 'Votes'))
        const userVotes = votesSnapshot.docs
          .map(doc => doc.data())
          .filter((vote: any) => vote.userEmail === currentUser?.email)
          .map((vote: any) => vote.electionId)

        setSubmittedVotes(userVotes)
      } catch (error) {
        console.error('Error fetching submitted votes:', error)
      }
    }

    if (currentUser?.email) {
      fetchElections()
      fetchSubmittedVotes()
    }
  }, [currentUser])

  useEffect(() => {
    let filtered = elections.filter(v => !submittedVotes.includes(v.id))

    if (searchTerm) {
      filtered = filtered.filter(vote =>
        (vote.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter) {
      filtered = filtered.filter(vote => vote.status === statusFilter)
    }

    setFilteredVotes(filtered)
  }, [elections, searchTerm, statusFilter, submittedVotes])

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        const petitionsCollection = await getDocs(collection(db, 'petitions'))
        const petitionsData = petitionsCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setPetitions(petitionsData)
      } catch (error) {
        console.error('Error fetching petitions:', error)
      }
    }

    fetchPetitions()
  }, [])

  const handleOpen = (vote: any) => {
    navigate(`/CastVoting/${vote.id}`)
  }

  const handleAccessibilityClick = (vote: any) => {
    if (isSpeakingOrListening) return
    if (submittedVotes.includes(vote.id)) return

    speakElectionDetails(vote, () => {
      const beep = new Audio('/beep-125033.mp3')
      beep.play().catch(err => console.error('Beep playback error:', err))
      beep.onended = () => listenForAnswer(vote)
    })
  }

  const handleSubmitVote = async (vote: any, candidateIndex: number) => {
    if (candidateIndex !== null) {
      setShowSuccessPopup(true)
      window.speechSynthesis.cancel()
      try {
        await addDoc(collection(db, 'Votes'), {
          candidate: vote.candidates[candidateIndex].name,
          electionId: vote.id,
          timestamp: new Date(),
          userEmail: currentUser?.email || '',
          isDisabledVote: false,
        })

        setSubmittedVotes(prev => [...prev, vote.id])
      } catch (error) {
        console.error('Error saving vote:', error)
      }
      setTimeout(() => setShowSuccessPopup(false), 3000)
    } else {
      alert('Please select a candidate to vote.')
    }
  }

  const speakElectionDetails = (vote: any, onFinish: () => void) => {
    const synth = window.speechSynthesis
    let text = `Election Title: ${vote.title || 'Untitled'}. `

    if (!vote.candidates || vote.candidates.length === 0) return

    vote.candidates.forEach((candidate: any, index: number) => {
      text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
    })

    text += 'After the beep sound, please say: My vote is for number 1, 2, 3, or 4.'

    const utterance = new SpeechSynthesisUtterance(text)
    synth.cancel()

    setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      onFinish()
    }

    synth.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    if (recognitionRef.current) recognitionRef.current.abort()
  }

  const listenForAnswer = async (vote: any) => {
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsVoiceListening(true)
      setIsListening(true)
    }

    recognition.onend = () => {
      setIsVoiceListening(false)
      setIsListening(false)
    }

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase()
      console.log('Voice Transcript:', transcript)

      if (!vote.candidates || vote.candidates.length === 0) return

      const matchedIndex = vote.candidates.findIndex((_: any, index: number) =>
        transcript.includes(`my vote is for ${index + 1}`) ||
        transcript.includes(`vote is for ${index + 1}`) ||
        transcript.includes(`${index + 1}`)
      )

      if (matchedIndex !== -1) {
        setSelectedCandidateId(matchedIndex + 1)

        try {
          await addDoc(collection(db, 'Votes'), {
            candidate: vote.candidates[matchedIndex].name,
            electionId: vote.id,
            timestamp: new Date(),
            userEmail: currentUser?.email || '',
            isDisabledVote: true,
          })

          setSubmittedVotes(prev => [...prev, vote.id])
        } catch (error) {
          console.error('Error saving voice vote:', error)
        }

        const confirmText = `You voted for ${vote.candidates[matchedIndex].name}. Thank you!`
        const confirmUtterance = new SpeechSynthesisUtterance(confirmText)
        window.speechSynthesis.speak(confirmUtterance)

        setTimeout(() => {
          setShowSuccessPopup(true)
          setTimeout(() => setShowSuccessPopup(false), 3000)
        }, 1500)
      } else {
        alert('Could not recognize your vote. Please try again.')
      }
    }

    recognition.onerror = () => {
      setIsVoiceListening(false)
      alert('Speech recognition failed. Please try again.')
    }

    recognition.start()
    recognitionRef.current = recognition
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#cbe7eb] to-[#a3d5dd]">
      <h2 className="text-4xl font-bold text-center text-[#003B57] mb-10 drop-shadow-md">Vote Now</h2>

      {isSpeaking && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
          📢 Reading election details...
        </div>
      )}

      {isVoiceListening && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
          🎤 Please state your vote...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVotes.map((vote) => {
          const alreadyVoted = submittedVotes.includes(vote.id)
          return (
            <div
              key={vote.id || vote.title}
              className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
            >
              <img
                src={vote.image || '/placeholder-election.png'}
                alt={vote.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{vote.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{vote.description}</p>
                <p className="text-sm text-gray-500 mb-3">Votes: {vote.votes || 0}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpen(vote)}
                    className={`px-4 py-2 rounded-lg transition text-white ${alreadyVoted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={alreadyVoted}
                  >
                    Vote
                  </button>
                  <button
                    onClick={() => handleAccessibilityClick(vote)}
                    disabled={alreadyVoted || isSpeakingOrListening}
                    title="Accessibility Voting"
                    className={`border px-3 py-2 rounded-full transition ${alreadyVoted ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-blue-700 hover:text-blue-900 border-blue-300'}`}
                  >
                    <FaWheelchair />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <h2 className="text-3xl font-semibold text-[#003B57] mt-16 mb-6 text-center">Petitions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petitions.map((petition) => (
          <div
            key={petition.id || petition.title}
            className="bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden"
          >
            <img
              src={petition.image || '/placeholder-petition.png'}
              alt={petition.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{petition.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{petition.description}</p>
              <Link to={`/Petitions/${petition.id}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                  View & Sign
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
