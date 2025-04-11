// import { useState, useEffect } from 'react'
// import { FaWheelchair } from 'react-icons/fa'

// const dummyVotes = [
//   {
//     id: 1,
//     title: 'Title of the Election',
//     status: 'Active',
//     timeRemaining: 'Time Remaining',
//     candidates: [
//       {
//         id: 1,
//         name: 'Candidate/Choice Number 1',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//       {
//         id: 2,
//         name: 'Candidate/Choice Number 2',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//       {
//         id: 3,
//         name: 'Candidate/Choice Number 3',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Title of the Election',
//     status: 'Active',
//     timeRemaining: 'Time Remaining',
//     candidates: [
//       {
//         id: 4,
//         name: 'Candidate/Choice Number 1',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//     ],
//   },
// ]

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [filteredVotes, setFilteredVotes] = useState(dummyVotes)
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedElection, setSelectedElection] = useState<any | null>(null)
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showModal, setShowModal] = useState(false)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)

//   useEffect(() => {
//     let filtered = dummyVotes.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         vote.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [searchTerm, statusFilter, submittedVotes])

//   const handleOpen = (vote: any) => {
//     setSelectedElection(vote)
//     setSelectedCandidateId(null)
//     setShowModal(true)
//   }

//   const handleVoteClick = (candidateId: number) => {
//     setSelectedCandidateId(candidateId)
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null && selectedElection !== null) {
//       setSubmittedVotes(prev => [...prev, selectedElection])
//       setShowModal(false)
//       setShowSuccessPopup(true)
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
//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel() // cancel any ongoing speech
//     synth.speak(utterance)
//   }

//   return (
//     <div className="min-h-screen bg-[#B1D9DD] p-6 relative">
//       <h2 className="text-2xl font-bold text-[#003B57] mb-6 shadow-sm">Vote Now</h2>

//       {/* Search & Filter */}
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

//       {/* Election Cards */}
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
//                 onClick={() => speakElectionDetails(vote)}
//                 className="bg-white border-2 border-gray-400 hover:border-[#003B57] text-[#003B57] px-3 py-2 rounded-full shadow transition"
//                 title="Disabled Users Access"
//               >
//                 <FaWheelchair className="text-xl" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Submitted Votes Section */}
//       {submittedVotes.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold text-[#003B57] mb-4">Submitted Votes</h2>
//           <div className="space-y-4">
//             {submittedVotes.map((vote) => (
//               <div
//                 key={vote.id}
//                 className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-between"
//               >
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">{vote.title}</h3>
//                   <p className="text-sm text-gray-600">Your vote has been submitted.</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Pagination Info */}
//       <p className="text-sm text-gray-800 mt-6">
//         Showing {filteredVotes.length} active elections
//       </p>

//       {/* Modal for voting */}
//       {showModal && selectedElection && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-[#D7F2F4] rounded-lg shadow-lg w-[90%] max-w-2xl p-6">
//             <h2 className="text-2xl font-bold text-center mb-6">{selectedElection.title}</h2>

//             <div className="space-y-4">
//               {selectedElection.candidates.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
//                 >
//                   <div className="flex gap-4 items-center">
//                     {candidate.image && (
//                       <img
//                         src={candidate.image}
//                         alt={candidate.name}
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                     )}
//                     <div>
//                       <h4 className="font-semibold">{candidate.name}</h4>
//                       <p className="text-sm text-gray-600">{candidate.description}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleVoteClick(candidate.id)}
//                     className={`border-2 px-6 py-1 rounded font-semibold ${
//                       selectedCandidateId === candidate.id
//                         ? 'bg-green-400 text-white border-green-600'
//                         : 'border-green-500 text-black'
//                     }`}
//                   >
//                     VOTE
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleSubmitVote}
//                 className="bg-[#1D7A83] text-white font-semibold px-8 py-2 rounded shadow-md hover:bg-[#16656b]"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white text-center p-6 rounded-lg shadow-xl border-2 border-green-500 max-w-md mx-auto">
//             <h3 className="text-xl font-bold text-green-600 mb-2">
//               You Have Successfully Submitted your Vote.
//             </h3>
//             <p className="text-gray-700">Thank You!</p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default VoteNow


// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'

// const dummyVotes = [
//   {
//     id: 1,
//     title: 'Title of the Election',
//     status: 'Active',
//     timeRemaining: 'Time Remaining',
//     candidates: [
//       {
//         id: 1,
//         name: 'Candidate/Choice Number 1',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//       {
//         id: 2,
//         name: 'Candidate/Choice Number 2',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//       {
//         id: 3,
//         name: 'Candidate/Choice Number 3',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Title of the Election',
//     status: 'Active',
//     timeRemaining: 'Time Remaining',
//     candidates: [
//       {
//         id: 4,
//         name: 'Candidate/Choice Number 1',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//     ],
//   },
// ]

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [filteredVotes, setFilteredVotes] = useState(dummyVotes)
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedElection, setSelectedElection] = useState<any | null>(null)
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showModal, setShowModal] = useState(false)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const recognitionRef = useRef<any>(null)

//   useEffect(() => {
//     let filtered = dummyVotes.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         vote.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [searchTerm, statusFilter, submittedVotes])

//   const handleOpen = (vote: any) => {
//     setSelectedElection(vote)
//     setSelectedCandidateId(null)
//     setShowModal(true)
//     setTimeout(() => speakElectionDetails(vote), 500)
//     setTimeout(() => listenForAnswer(vote), 6000)
//   }

//   const handleVoteClick = (candidateId: number) => {
//     setSelectedCandidateId(candidateId)
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null && selectedElection !== null) {
//       setSubmittedVotes(prev => [...prev, selectedElection])
//       setShowModal(false)
//       setShowSuccessPopup(true)
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
//     const utterance = new SpeechSynthesisUtterance(text)
//     synth.cancel()
//     synth.speak(utterance)
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

//     recognition.onstart = () => {
//       console.log('Voice recognition started...')
//     }

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Recognized:', transcript)

//       // Try to match by candidate number or name
//       const matched = vote.candidates.find((candidate: any, index: number) => {
//         return (
//           transcript.includes(candidate.name.toLowerCase()) ||
//           transcript.includes((index + 1).toString())
//         )
//       })

//       if (matched) {
//         setSelectedCandidateId(matched.id)
//         setTimeout(() => handleSubmitVote(), 2000)
//       } else {
//         alert('Could not recognize your answer. Please try again.')
//       }
//     }

//     recognition.onerror = (event: any) => {
//       console.error('Speech recognition error:', event.error)
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
//                 onClick={() => speakElectionDetails(vote)}
//                 className="bg-white border-2 border-gray-400 hover:border-[#003B57] text-[#003B57] px-3 py-2 rounded-full shadow transition"
//                 title="Disabled Users Access"
//               >
//                 <FaWheelchair className="text-xl" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {submittedVotes.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold text-[#003B57] mb-4">Submitted Votes</h2>
//           <div className="space-y-4">
//             {submittedVotes.map((vote) => (
//               <div
//                 key={vote.id}
//                 className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-between"
//               >
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">{vote.title}</h3>
//                   <p className="text-sm text-gray-600">Your vote has been submitted.</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <p className="text-sm text-gray-800 mt-6">
//         Showing {filteredVotes.length} active elections
//       </p>

//       {showModal && selectedElection && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-[#D7F2F4] rounded-lg shadow-lg w-[90%] max-w-2xl p-6">
//             <h2 className="text-2xl font-bold text-center mb-6">{selectedElection.title}</h2>

//             <div className="space-y-4">
//               {selectedElection.candidates.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
//                 >
//                   <div className="flex gap-4 items-center">
//                     {candidate.image && (
//                       <img
//                         src={candidate.image}
//                         alt={candidate.name}
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                     )}
//                     <div>
//                       <h4 className="font-semibold">{candidate.name}</h4>
//                       <p className="text-sm text-gray-600">{candidate.description}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleVoteClick(candidate.id)}
//                     className={`border-2 px-6 py-1 rounded font-semibold ${
//                       selectedCandidateId === candidate.id
//                         ? 'bg-green-400 text-white border-green-600'
//                         : 'border-green-500 text-black'
//                     }`}
//                   >
//                     VOTE
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleSubmitVote}
//                 className="bg-[#1D7A83] text-white font-semibold px-8 py-2 rounded shadow-md hover:bg-[#16656b]"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSuccessPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white text-center p-6 rounded-lg shadow-xl border-2 border-green-500 max-w-md mx-auto">
//             <h3 className="text-xl font-bold text-green-600 mb-2">
//               You Have Successfully Submitted your Vote.
//             </h3>
//             <p className="text-gray-700">Thank You!</p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default VoteNow

// import { useState, useEffect, useRef } from 'react'
// import { FaWheelchair } from 'react-icons/fa'

// const dummyVotes = [
//   {
//     id: 1,
//     title: 'Title of the Election',
//     status: 'Active',
//     timeRemaining: 'Time Remaining',
//     candidates: [
//       {
//         id: 1,
//         name: 'Candidate/Choice Number 1',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//       {
//         id: 2,
//         name: 'Candidate/Choice Number 2',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//       {
//         id: 3,
//         name: 'Candidate/Choice Number 3',
//         description: 'Designation/Other Description',
//         image: '',
//       },
//     ],
//   },
// ]

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// export const VoteNow = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [filteredVotes, setFilteredVotes] = useState(dummyVotes)
//   const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
//   const [selectedElection, setSelectedElection] = useState<any | null>(null)
//   const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
//   const [showModal, setShowModal] = useState(false)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const recognitionRef = useRef<any>(null)

//   useEffect(() => {
//     let filtered = dummyVotes.filter(v => !submittedVotes.some(s => s.id === v.id))

//     if (searchTerm) {
//       filtered = filtered.filter(vote =>
//         vote.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(vote => vote.status === statusFilter)
//     }

//     setFilteredVotes(filtered)
//   }, [searchTerm, statusFilter, submittedVotes])

//   const handleOpen = (vote: any) => {
//     setSelectedElection(vote)
//     setSelectedCandidateId(null)
//     setShowModal(true)
//   }

//   const handleAccessibilityClick = (vote: any) => {
//     handleOpen(vote)
//     setTimeout(() => speakElectionDetails(vote), 500)
//     setTimeout(() => playBeepAndListen(vote), 8000)
//   }

//   const handleVoteClick = (candidateId: number) => {
//     setSelectedCandidateId(candidateId)
//   }

//   const handleSubmitVote = () => {
//     if (selectedCandidateId !== null && selectedElection !== null) {
//       setSubmittedVotes(prev => [...prev, selectedElection])
//       setShowModal(false)
//       setShowSuccessPopup(true)
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

//   const playBeepAndListen = (vote: any) => {
//     const beep = new Audio('/beep.mp3') // make sure beep.mp3 exists in /public
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

//     recognition.onstart = () => {
//       console.log('Voice recognition started...')
//     }

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript.toLowerCase()
//       console.log('Recognized:', transcript)

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

//     recognition.onerror = (event: any) => {
//       console.error('Speech recognition error:', event.error)
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

//       {submittedVotes.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold text-[#003B57] mb-4">Submitted Votes</h2>
//           <div className="space-y-4">
//             {submittedVotes.map((vote) => (
//               <div
//                 key={vote.id}
//                 className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-between"
//               >
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">{vote.title}</h3>
//                   <p className="text-sm text-gray-600">Your vote has been submitted.</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showModal && selectedElection && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-[#D7F2F4] rounded-lg shadow-lg w-[90%] max-w-2xl p-6">
//             <h2 className="text-2xl font-bold text-center mb-6">{selectedElection.title}</h2>

//             <div className="space-y-4">
//               {selectedElection.candidates.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
//                 >
//                   <div className="flex gap-4 items-center">
//                     {candidate.image && (
//                       <img
//                         src={candidate.image}
//                         alt={candidate.name}
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                     )}
//                     <div>
//                       <h4 className="font-semibold">{candidate.name}</h4>
//                       <p className="text-sm text-gray-600">{candidate.description}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleVoteClick(candidate.id)}
//                     className={`border-2 px-6 py-1 rounded font-semibold ${
//                       selectedCandidateId === candidate.id
//                         ? 'bg-green-400 text-white border-green-600'
//                         : 'border-green-500 text-black'
//                     }`}
//                   >
//                     VOTE
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleSubmitVote}
//                 className="bg-[#1D7A83] text-white font-semibold px-8 py-2 rounded shadow-md hover:bg-[#16656b]"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSuccessPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white text-center p-6 rounded-lg shadow-xl border-2 border-green-500 max-w-md mx-auto">
//             <h3 className="text-xl font-bold text-green-600 mb-2">
//               You Have Successfully Submitted your Vote.
//             </h3>
//             <p className="text-gray-700">Thank You!</p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default VoteNow

import { useState, useEffect, useRef } from 'react'
import { FaWheelchair } from 'react-icons/fa'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

const dummyVotes = [
  {
    id: 1,
    title: 'Title of the Election',
    status: 'Active',
    timeRemaining: 'Time Remaining',
    candidates: [
      {
        id: 1,
        name: 'Candidate/Choice Number 1',
        description: 'Designation/Other Description',
        image: '',
      },
      {
        id: 2,
        name: 'Candidate/Choice Number 2',
        description: 'Designation/Other Description',
        image: '',
      },
      {
        id: 3,
        name: 'Candidate/Choice Number 3',
        description: 'Designation/Other Description',
        image: '',
      },
    ],
  },
]

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export const VoteNow = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [filteredVotes, setFilteredVotes] = useState(dummyVotes)
  const [submittedVotes, setSubmittedVotes] = useState<any[]>([])
  const [selectedElection, setSelectedElection] = useState<any | null>(null)
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    let filtered = dummyVotes.filter(v => !submittedVotes.some(s => s.id === v.id))

    if (searchTerm) {
      filtered = filtered.filter(vote =>
        vote.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter) {
      filtered = filtered.filter(vote => vote.status === statusFilter)
    }

    setFilteredVotes(filtered)
  }, [searchTerm, statusFilter, submittedVotes])

  const handleOpen = (vote: any) => {
    setSelectedElection(vote)
    setSelectedCandidateId(null)
    setShowModal(true)
  }

  const handleAccessibilityClick = (vote: any) => {
    handleOpen(vote)
    setTimeout(() => speakElectionDetails(vote), 500)
    setTimeout(() => playBeepAndListen(vote), 8000)
  }

  const handleVoteClick = (candidateId: number) => {
    setSelectedCandidateId(candidateId)
  }

  const handleSubmitVote = () => {
    if (selectedCandidateId !== null && selectedElection !== null) {
      setSubmittedVotes(prev => [...prev, selectedElection])
      setShowModal(false)
      setShowSuccessPopup(true)
      window.speechSynthesis.cancel()
      setTimeout(() => {
        setShowSuccessPopup(false)
      }, 3000)
    } else {
      alert('Please select a candidate to vote.')
    }
  }

  const speakElectionDetails = (vote: any) => {
    const synth = window.speechSynthesis
    let text = `Election Title: ${vote.title}. `
    vote.candidates.forEach((candidate: any, index: number) => {
      text += `Candidate ${index + 1}: ${candidate.name}, Description: ${candidate.description}. `
    })
    text += `Now, please tell your voting number whether it is 1, 2, 3, or 4 after the beep sound. Say: My vote is for number 1, 2, etc.`

    const utterance = new SpeechSynthesisUtterance(text)
    synth.cancel()
    synth.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }
  }

  const playBeepAndListen = (vote: any) => {
    const beep = new Audio('/beep.mp3')
    beep.play()
    beep.onended = () => {
      listenForAnswer(vote)
    }
  }

  const listenForAnswer = (vote: any) => {
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      console.log('Voice recognition started...')
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase()
      console.log('Recognized:', transcript)

      const matched = vote.candidates.find((candidate: any, index: number) => {
        const number = index + 1
        return transcript.includes(`my vote is for ${number}`) ||
               transcript.includes(`vote is for ${number}`) ||
               transcript.includes(`${number}`)
      })

      if (matched) {
        setSelectedCandidateId(matched.id)
        setTimeout(() => handleSubmitVote(), 1500)
      } else {
        alert('Could not recognize your vote. Please try again.')
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      alert('Speech recognition failed. Please try again.')
    }

    recognition.start()
    recognitionRef.current = recognition
  }

  return (
    <div className="min-h-screen bg-[#B1D9DD] p-6 relative">
      <h2 className="text-2xl font-bold text-[#003B57] mb-6 shadow-sm">Vote Now</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by election title..."
          className="flex-1 p-2 rounded shadow border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 rounded shadow border"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by status</option>
          <option value="Active">Active</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredVotes.map((vote) => (
          <div
            key={vote.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-[#000]">{vote.title}</h3>
              <p className="text-sm text-gray-700">{vote.timeRemaining}</p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => handleOpen(vote)}
                className="bg-[#B1D9DD] hover:bg-[#a4d0d4] text-black font-semibold px-6 py-2 rounded shadow-md transition"
              >
                Open
              </button>
              <button
                onClick={() => handleAccessibilityClick(vote)}
                className="bg-white border-2 border-gray-400 hover:border-[#003B57] text-[#003B57] px-3 py-2 rounded-full shadow transition"
                title="Disabled Users Access"
              >
                <FaWheelchair className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {submittedVotes.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-[#003B57] mb-4">Submitted Votes</h2>
          <div className="space-y-4">
            {submittedVotes.map((vote) => (
              <div
                key={vote.id}
                className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{vote.title}</h3>
                  <p className="text-sm text-gray-600">Your vote has been submitted.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && selectedElection && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#D7F2F4] rounded-lg shadow-lg w-[90%] max-w-2xl p-6 relative">
            <h2 className="text-2xl font-bold text-center mb-6">{selectedElection.title}</h2>

            <button
              onClick={stopSpeaking}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm shadow hover:bg-red-600"
            >
              Stop Reading Aloud
            </button>

            <div className="space-y-4">
              {selectedElection.candidates.map((candidate: any) => (
                <div
                  key={candidate.id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div className="flex gap-4 items-center">
                    {candidate.image && (
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold">{candidate.name}</h4>
                      <p className="text-sm text-gray-600">{candidate.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleVoteClick(candidate.id)}
                    className={`border-2 px-6 py-1 rounded font-semibold ${
                      selectedCandidateId === candidate.id
                        ? 'bg-green-400 text-white border-green-600'
                        : 'border-green-500 text-black'
                    }`}
                  >
                    VOTE
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSubmitVote}
                className="bg-[#1D7A83] text-white font-semibold px-8 py-2 rounded shadow-md hover:bg-[#16656b]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-center p-6 rounded-lg shadow-xl border-2 border-green-500 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-green-600 mb-2">
              You Have Successfully Submitted your Vote.
            </h3>
            <p className="text-gray-700">Thank You!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoteNow
