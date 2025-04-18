// import { FiHash, FiImage, FiUser, FiX } from 'react-icons/fi'
// import { Button, Input } from '../components'
// import { useAuthSafeRoute } from '../hooks'

// export const CreateVoting = () => {
//   useAuthSafeRoute()

//   return (
//     <div className="content full-page flex flex-col">
//       <div className="mt-4 flex w-full grow flex-col rounded-lg bg-white">
//         <div className="flex items-center border-b px-6 py-3 text-lg font-bold">
//           <div className="grow">Create voting process</div>
//           <Button label="Create" className="max-w-48" />
//         </div>
//         <div className="flex grow flex-row items-stretch">
//           <div
//             style={{ minWidth: '500px', maxWidth: '500px' }}
//             className="flex h-full flex-col items-center gap-6 p-8"
//           >
//             <div className="mb-8 flex aspect-square w-2/3 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-500 text-neutral-600">
//               <FiImage size={40} />
//               <div className="mt-2">Please select an image</div>
//             </div>
//             <Input icon={FiUser} placeholder="First Name" />
//             <Input icon={FiUser} placeholder="Last Name" />
//             <Input icon={FiHash} placeholder="Age" />
//             <Button label="Add" />
//           </div>
//           <div className="grid grow auto-rows-min grid-cols-3 gap-6 border-l p-6">
//             <div className="relative rounded-lg border">
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/TrumpPortrait.jpg/800px-TrumpPortrait.jpg"
//                 className="aspect-square w-full rounded-t-lg object-cover"
//               />
//               <div className="flex items-center p-3 text-lg font-semibold">
//                 <div className="grow">Donald Trump</div>
//                 <div>24</div>
//               </div>
//               <div className="absolute right-3 top-3 cursor-pointer rounded-full bg-red-500 p-2 text-white">
//                 <FiX />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useState } from 'react'
// import { FiLink, FiEdit } from 'react-icons/fi'
// import { Button } from '../components'
// import { useAuthSafeRoute } from '../hooks'
// import { v4 as uuidv4 } from 'uuid'

// export const CreateVoting = () => {
//   useAuthSafeRoute()

//   const [title, setTitle] = useState('Title of the Election')
//   const [editingTitle, setEditingTitle] = useState(false)
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [timeZone, setTimeZone] = useState('')
//   const [emailEnabled, setEmailEnabled] = useState('')
//   const [electionUrl, setElectionUrl] = useState('')
//   const [previewUrl, setPreviewUrl] = useState('')

//   const handleConfirm = () => {
//     const uniqueId = uuidv4()
//     setElectionUrl(`https://yourapp.com/vote/${uniqueId}`)
//     setPreviewUrl(`https://yourapp.com/preview/${uniqueId}`)
//   }

//   return (
//     <div className="p-6 bg-[#D6F4F9] min-h-screen">
//       <h2 className="text-2xl font-bold text-[#003b57] mb-6">Create New</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//         <div className="flex items-center text-xl font-semibold">
//           {editingTitle ? (
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               onBlur={() => setEditingTitle(false)}
//               autoFocus
//               className="text-xl font-semibold border-b border-gray-300 focus:outline-none"
//             />
//           ) : (
//             <>
//               {title}
//               <FiEdit
//                 className="ml-2 cursor-pointer text-gray-600"
//                 onClick={() => setEditingTitle(true)}
//               />
//             </>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="relative">
//             <input
//               type="datetime-local"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="w-full p-2 rounded border"
//               placeholder="Start Time and Date"
//             />
//           </div>
//           <div>
//             <input
//               type="datetime-local"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="w-full p-2 rounded border"
//               placeholder="End Time and Date"
//             />
//           </div>

//           <select
//             value={timeZone}
//             onChange={(e) => setTimeZone(e.target.value)}
//             className="w-full p-2 rounded border"
//           >
//             <option value="">Time Zone</option>
//             <option value="UTC">UTC</option>
//             <option value="PST">PST</option>
//             <option value="EST">EST</option>
//             {/* Add more as needed */}
//           </select>

//           <select
//             value={emailEnabled}
//             onChange={(e) => setEmailEnabled(e.target.value)}
//             className="w-full p-2 rounded border"
//           >
//             <option value="">Email Enabled (Yes/No)</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <div className="border p-4 rounded bg-[#F8FAFC] space-y-2">
//           <div>
//             <label className="text-sm text-gray-700">Election URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={electionUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//           <div>
//             <label className="text-sm text-gray-700">Preview URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={previewUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//         </div>

//         <select className="w-full p-2 rounded border">
//           <option>Add Candidates/Voting Options</option>
//           {/* Candidates logic here */}
//         </select>

//         <select className="w-full p-2 rounded border">
//           <option>Select Voting Categories</option>
//           {/* Voting categories logic here */}
//         </select>

//         <div className="flex justify-between pt-4">
//           <Button label="Confirm & Preview" onClick={handleConfirm} />
//           {/* <div className="flex gap-2">
//             <Button label="Pause" variant="secondary" />
//             <Button label="Cancel" variant="danger" />
//           </div> */}
//         </div>
//       </div>
//     </div>
//   )
// }


// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { db } from "../config/firebase"; // Adjust path based on your setup

// const CreateVoting = () => {
//   const [title, setTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [timeZone, setTimeZone] = useState("");
//   const [candidates, setCandidates] = useState([""]);
//   const [emails, setEmails] = useState([""]);
//   const [emailEnabled, setEmailEnabled] = useState("No");
//   const [electionUrl, setElectionUrl] = useState("");
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   const handleCandidateChange = (index: number, value: string) => {
//     const updatedCandidates = [...candidates];
//     updatedCandidates[index] = value;
//     setCandidates(updatedCandidates);
//   };

//   const handleEmailChange = (index: number, value: string) => {
//     const updatedEmails = [...emails];
//     updatedEmails[index] = value;
//     setEmails(updatedEmails);
//   };

//   const addCandidate = () => setCandidates([...candidates, ""]);
//   const addEmail = () => setEmails([...emails, ""]);

//   const handleConfirm = async () => {
//     if (!startDate || !endDate) {
//       alert("Please fill in both start and end dates.");
//       return;
//     }

//     const parsedStartDate = new Date(startDate);
//     const parsedEndDate = new Date(endDate);

//     if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
//       alert("Invalid date format.");
//       return;
//     }

//     const uniqueId = uuidv4();
//     const voteURL = `https://yourapp.com/vote/${uniqueId}`;
//     const previewURL = `https://yourapp.com/preview/${uniqueId}`;

//     setElectionUrl(voteURL);
//     setPreviewUrl(previewURL);
//     setShowPopup(true);

//     if (emailEnabled === "Yes") {
//       emails.forEach((email) => {
//         console.log(`Sending vote URL to ${email}...`);
//         // Add actual email sending logic if needed
//       });
//     }

//     try {
//       const data = {
//         title,
//         startDate: Timestamp.fromDate(parsedStartDate),
//         endDate: Timestamp.fromDate(parsedEndDate),
//         timeZone,
//         voteURL,
//         previewURL,
//         candidates,
//         emails,
//         createdAt: Timestamp.now(),
//       };

//       console.log("Saving data:", data);

//       await addDoc(collection(db, "start-date"), data);
//       console.log("Data saved to Firestore!");
//     } catch (error) {
//       console.error("Error saving to Firestore:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Create Voting Event</h2>

//       <label className="block mb-2">
//         Title:
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border p-2"
//           required
//         />
//       </label>

//       <label className="block mb-2">
//         Start Date:
//         <input
//           type="datetime-local"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="w-full border p-2"
//           required
//         />
//       </label>

//       <label className="block mb-2">
//         End Date:
//         <input
//           type="datetime-local"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="w-full border p-2"
//           required
//         />
//       </label>

//       <label className="block mb-2">
//         Time Zone:
//         <input
//           type="text"
//           value={timeZone}
//           onChange={(e) => setTimeZone(e.target.value)}
//           className="w-full border p-2"
//         />
//       </label>

//       <div className="mb-4">
//         <h3 className="font-semibold">Candidates:</h3>
//         {candidates.map((candidate, index) => (
//           <input
//             key={index}
//             type="text"
//             value={candidate}
//             onChange={(e) => handleCandidateChange(index, e.target.value)}
//             className="w-full border p-2 mb-2"
//           />
//         ))}
//         <button onClick={addCandidate} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Candidate
//         </button>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2">Send Vote URL via Email?</label>
//         <select
//           value={emailEnabled}
//           onChange={(e) => setEmailEnabled(e.target.value)}
//           className="border p-2"
//         >
//           <option value="No">No</option>
//           <option value="Yes">Yes</option>
//         </select>

//         {emailEnabled === "Yes" && (
//           <div className="mt-2">
//             {emails.map((email, index) => (
//               <input
//                 key={index}
//                 type="email"
//                 value={email}
//                 onChange={(e) => handleEmailChange(index, e.target.value)}
//                 className="w-full border p-2 mb-2"
//               />
//             ))}
//             <button onClick={addEmail} className="bg-blue-500 text-white px-4 py-2 rounded">
//               Add Email
//             </button>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleConfirm}
//         className="bg-green-600 text-white px-6 py-2 rounded mt-4"
//       >
//         Confirm & Create
//       </button>

//       {showPopup && (
//         <div className="mt-4 bg-gray-100 p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-2">Voting Links Generated</h3>
//           <p>
//             <strong>Voting URL:</strong>{" "}
//             <a href={electionUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
//               {electionUrl}
//             </a>
//           </p>
//           <p>
//             <strong>Preview URL:</strong>{" "}
//             <a href={previewUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
//               {previewUrl}
//             </a>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateVoting;


// import { useState } from 'react'
// import { FiLink, FiEdit, FiImage, FiMail, FiUser, FiX } from 'react-icons/fi'
// import { Button } from '../components'
// import { useAuthSafeRoute } from '../hooks'
// import { v4 as uuidv4 } from 'uuid'
// import { useNavigate } from 'react-router-dom'

// export const CreateVoting = () => {
//   useAuthSafeRoute()
//   const navigate = useNavigate()

//   const [title, setTitle] = useState('Title of the Election')
//   const [editingTitle, setEditingTitle] = useState(false)
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [timeZone, setTimeZone] = useState('')
//   const [emailEnabled, setEmailEnabled] = useState('')
//   const [electionUrl, setElectionUrl] = useState('')
//   const [previewUrl, setPreviewUrl] = useState('')
//   const [candidates, setCandidates] = useState([])
//   const [candidateInput, setCandidateInput] = useState({ name: '', description: '', image: '' })
//   const [emails, setEmails] = useState<string[]>([])
//   const [newEmail, setNewEmail] = useState('')
//   const [showPopup, setShowPopup] = useState(false)

//   const handleAddCandidate = () => {
//     if (candidateInput.name && candidateInput.description && candidateInput.image) {
//       setCandidates([...candidates, candidateInput])
//       setCandidateInput({ name: '', description: '', image: '' })
//     }
//   }

//   const handleImageUpload = (e: any) => {
//     const file = e.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setCandidateInput({ ...candidateInput, image: reader.result as string })
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleAddEmail = () => {
//     if (newEmail && /\S+@\S+\.\S+/.test(newEmail)) {
//       setEmails([...emails, newEmail])
//       setNewEmail('')
//     }
//   }

//   const handleConfirm = () => {
//     const uniqueId = uuidv4()
//     const voteURL = `https://yourapp.com/vote/${uniqueId}`
//     const previewURL = `https://yourapp.com/preview/${uniqueId}`
//     setElectionUrl(voteURL)
//     setPreviewUrl(previewURL)

//     if (emailEnabled === 'Yes') {
//       emails.forEach(email => {
//         console.log(`Sending vote URL to ${email}...`)
//       })
//     }

//     setShowPopup(true)
//   }

//   const handleCopy = () => {
//     navigator.clipboard.writeText(electionUrl)
//   }

//   const handleClosePopup = () => {
//     setShowPopup(false)
//     navigate('/my-votings')
//   }

//   return (
//     <div className="p-6 bg-[#D6F4F9] min-h-screen relative">
//       {showPopup && (
//         <div className="fixed bottom-4 right-4 bg-white shadow-xl border rounded-lg w-96 z-50 p-4">
//           <h3 className="text-lg font-bold text-green-600 mb-2">Voting Successfully Created!</h3>
//           <p className="text-sm text-gray-700 mb-2">Here is your generated voting URL:</p>
//           <div className="flex items-center justify-between bg-gray-100 rounded px-2 py-1">
//             <span className="text-sm break-all">{electionUrl}</span>
//             <button onClick={handleCopy} className="text-blue-600 font-medium ml-2">Copy</button>
//           </div>
//           <button
//             onClick={handleClosePopup}
//             className="absolute bottom-2 right-2 text-gray-500 hover:text-black"
//           >
//             <FiX size={18} />
//           </button>
//         </div>
//       )}

//       <h2 className="text-2xl font-bold text-[#003b57] mb-6">Create New</h2>

//       {/* [Rest of your code remains unchanged, including title input, candidates, emails etc.] */}
//       {/* Only inserted new popup code and logic above */}
      
//       {/* Footer Actions */}
//       <div className="flex justify-between pt-4">
//         <Button label="Confirm & Preview" onClick={handleConfirm} />
//       </div>
//     </div>
//   )
// }


// import { useState } from 'react'
// import { FiLink, FiEdit, FiImage, FiMail, FiUser, FiX } from 'react-icons/fi'
// import { Button } from '../components'
// import { useAuthSafeRoute } from '../hooks'
// import { v4 as uuidv4 } from 'uuid'
// import { collection, addDoc, Timestamp } from 'firebase/firestore'
// import { db } from '../config/firebase'

// export const CreateVoting = () => {
//   useAuthSafeRoute()

//   const [title, setTitle] = useState('Title of the Election')
//   const [editingTitle, setEditingTitle] = useState(false)
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [timeZone, setTimeZone] = useState('')
//   const [emailEnabled, setEmailEnabled] = useState('')
//   const [electionUrl, setElectionUrl] = useState('')
//   const [previewUrl, setPreviewUrl] = useState('')
//   const [candidates, setCandidates] = useState<{ name: string; description: string; image: string }[]>([])
//   const [candidateInput, setCandidateInput] = useState({ name: '', description: '', image: '' })
//   const [emails, setEmails] = useState<string[]>([])
//   const [newEmail, setNewEmail] = useState('')
//   const [showPopup, setShowPopup] = useState(false)

//   const handleAddCandidate = () => {
//     if (candidateInput.name && candidateInput.description && candidateInput.image) {
//       setCandidates([...candidates, candidateInput])
//       setCandidateInput({ name: '', description: '', image: '' })
//     }
//   }

//   const handleImageUpload = (e: any) => {
//     const file = e.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setCandidateInput({ ...candidateInput, image: reader.result as string })
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleAddEmail = () => {
//     if (newEmail && /\S+@\S+\.\S+/.test(newEmail)) {
//       setEmails([...emails, newEmail])
//       setNewEmail('')
//     }
//   }

//   const handleConfirm = async () => {
//     const uniqueId = uuidv4()
//     const voteURL = `https://yourapp.com/vote/${uniqueId}`
//     const previewURL = `https://yourapp.com/preview/${uniqueId}`
//     setElectionUrl(voteURL)
//     setPreviewUrl(previewURL)
//     setShowPopup(true)

//     if (emailEnabled === 'Yes') {
//       emails.forEach(email => {
//         console.log(`Sending vote URL to ${email}...`)
//       })
//     }

//     try {
//       await addDoc(collection(db, 'start-date'), {
//         title,
//         startDate: Timestamp.fromDate(new Date(startDate)),
//         endDate: Timestamp.fromDate(new Date(endDate)),
//         timeZone,
//         voteURL,
//         previewURL,
//         candidates,
//         emails,
//         createdAt: Timestamp.now(),
//       })
//       console.log('Data saved to Firestore!')
//     } catch (error) {
//       console.error('Error saving to Firestore:', error)
//     }
//   }

//   return (
//     <div className="p-6 bg-[#D6F4F9] min-h-screen relative">
//       <h2 className="text-2xl font-bold text-[#003b57] mb-6">Create New</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//         {/* Title Edit */}
//         <div className="flex items-center text-xl font-semibold">
//           {editingTitle ? (
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               onBlur={() => setEditingTitle(false)}
//               autoFocus
//               className="text-xl font-semibold border-b border-gray-300 focus:outline-none"
//             />
//           ) : (
//             <>
//               {title}
//               <FiEdit
//                 className="ml-2 cursor-pointer text-gray-600"
//                 onClick={() => setEditingTitle(true)}
//               />
//             </>
//           )}
//         </div>

//         {/* Date and Time */}
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="datetime-local"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="w-full p-2 rounded border"
//           />
//           <input
//             type="datetime-local"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="w-full p-2 rounded border"
//           />
//           <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className="w-full p-2 rounded border">
//             <option value="">Time Zone</option>
//             <option value="UTC">UTC</option>
//             <option value="PST">PST</option>
//             <option value="EST">EST</option>
//           </select>
//           <select value={emailEnabled} onChange={(e) => setEmailEnabled(e.target.value)} className="w-full p-2 rounded border">
//             <option value="">Email Enabled (Yes/No)</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         {/* Candidate Section */}
//         <div className="space-y-4">
//           <details className="bg-[#F0FAFF] p-4 rounded border">
//             <summary className="font-medium cursor-pointer">Add Candidates / Voting Options</summary>
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//               {candidates.map((c, idx) => (
//                 <div key={idx} className="border p-2 rounded">
//                   <img src={c.image} alt="Candidate" className="w-full h-32 object-cover rounded" />
//                   <h4 className="font-bold mt-2">{c.name}</h4>
//                   <p className="text-sm text-gray-600">{c.description}</p>
//                 </div>
//               ))}
//               <div className="border p-2 rounded space-y-2">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="w-full"
//                 />
//                 <input
//                   placeholder="Name"
//                   value={candidateInput.name}
//                   onChange={(e) => setCandidateInput({ ...candidateInput, name: e.target.value })}
//                   className="w-full p-2 border rounded"
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={candidateInput.description}
//                   onChange={(e) => setCandidateInput({ ...candidateInput, description: e.target.value })}
//                   className="w-full p-2 border rounded"
//                 />
//                 <Button label="Add Candidate" onClick={handleAddCandidate} />
//               </div>
//             </div>
//           </details>
//         </div>

//         {/* Voting Categories */}
//         <select className="w-full p-2 rounded border">
//           <option>Select Voting Categories</option>
//         </select>

//         {/* Email Section */}
//         <details className="bg-[#F0FAFF] p-4 rounded border">
//           <summary className="font-medium cursor-pointer">Add Recipients (Emails)</summary>
//           <div className="mt-4 space-y-2">
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <Button label="Add" onClick={handleAddEmail} />
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {emails.map((email, i) => (
//                 <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{email}</span>
//               ))}
//             </div>
//           </div>
//         </details>

//         {/* URLs */}
//         <div className="border p-4 rounded bg-[#F8FAFC] space-y-2">
//           <div>
//             <label className="text-sm text-gray-700">Election URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={electionUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//           <div>
//             <label className="text-sm text-gray-700">Preview URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={previewUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="flex justify-between pt-4">
//           <Button label="Confirm & Preview" onClick={handleConfirm} />
//         </div>
//       </div>

//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white border border-gray-300 rounded-xl shadow-xl p-6 relative max-w-md w-full text-center">
//             <h3 className="text-xl font-bold text-green-700 mb-4">🎉 Voting Created Successfully!</h3>
//             <p className="text-sm text-gray-700 mb-2">Election URL:</p>
//             <p className="text-blue-600 font-medium break-all">{electionUrl}</p>
//             <button
//               className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
//               onClick={() => setShowPopup(false)}
//             >
//               <FiX size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }






// import { useState } from 'react'
// import { FiLink, FiEdit, FiImage, FiMail, FiUser, FiX } from 'react-icons/fi'
// import { Button } from '../components'
// import { useAuthSafeRoute } from '../hooks'
// import { v4 as uuidv4 } from 'uuid'
// import { collection, addDoc, Timestamp } from 'firebase/firestore'
// import { db, storage } from '../config/firebase'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { doc, setDoc } from 'firebase/firestore'
// import { useNavigate } from 'react-router-dom' // ✅ Add this at the top


// export const CreateVoting = () => {
//   useAuthSafeRoute()

//   const [title, setTitle] = useState('Title of the Election')
//   const [editingTitle, setEditingTitle] = useState(false)
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [timeZone, setTimeZone] = useState('')
//   const [emailEnabled, setEmailEnabled] = useState('')
//   const [electionUrl, setElectionUrl] = useState('')
//   const [previewUrl, setPreviewUrl] = useState('')
//   const [candidates, setCandidates] = useState<{ name: string; description: string; image: string }[]>([])
//   const [candidateInput, setCandidateInput] = useState({ name: '', description: '', image: '' })
//   const [candidateImageFile, setCandidateImageFile] = useState<File | null>(null)
//   const [emails, setEmails] = useState<string[]>([])
//   const [newEmail, setNewEmail] = useState('')
//   const [showPopup, setShowPopup] = useState(false)

//   const handleImageUpload = (e: any) => {
//     const file = e.target.files[0]
//     if (file) {
//       setCandidateImageFile(file)
//     }
//   }

//   const handleAddCandidate = async () => {
//     if (candidateInput.name && candidateInput.description && candidateImageFile) {
//       const imageRef = ref(storage, `candidate-images/${uuidv4()}_${candidateImageFile.name}`)
//       await uploadBytes(imageRef, candidateImageFile)
//       const imageUrl = await getDownloadURL(imageRef)

//       const newCandidate = {
//         name: candidateInput.name,
//         description: candidateInput.description,
//         image: imageUrl,
//       }

//       setCandidates([...candidates, newCandidate])
//       setCandidateInput({ name: '', description: '', image: '' })
//       setCandidateImageFile(null)
//     }
//   }

//   const handleAddEmail = () => {
//     if (newEmail && /\S+@\S+\.\S+/.test(newEmail)) {
//       setEmails([...emails, newEmail])
//       setNewEmail('')
//     }
//   }

//   // Inside your component:
// const navigate = useNavigate() // ✅ Initialize navigate

// const handleConfirm = async () => {
//   const uniqueId = uuidv4()
//   const voteURL = `https://yourapp.com/vote/${uniqueId}`
//   const previewURL = `https://yourapp.com/preview/${uniqueId}`

//   setElectionUrl(voteURL)
//   setPreviewUrl(previewURL)
//   setShowPopup(true)

//   if (emailEnabled === 'Yes') {
//     emails.forEach(email => {
//       console.log(`Sending vote URL to ${email}...`)
//     })
//   }

//   try {
//     await setDoc(doc(db, 'start-date', uniqueId), {
//       title,
//       startDate: Timestamp.fromDate(new Date(startDate)),
//       endDate: Timestamp.fromDate(new Date(endDate)),
//       timeZone,
//       voteURL,
//       previewURL,
//       candidates,
//       emails,
//       createdAt: Timestamp.now(),
//     })

//     console.log('Election saved to Firestore!')
//     navigate(`/Cast-Voting/${uniqueId}`) // ✅ Redirect to CastVoting with ID
//   } catch (error) {
//     console.error('Error saving to Firestore:', error)
//   }
// }

//   return (
//     <div className="p-6 bg-[#D6F4F9] min-h-screen relative">
//       <h2 className="text-2xl font-bold text-[#003b57] mb-6">Create New</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//         {/* Title Edit */}
//         <div className="flex items-center text-xl font-semibold">
//           {editingTitle ? (
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               onBlur={() => setEditingTitle(false)}
//               autoFocus
//               className="text-xl font-semibold border-b border-gray-300 focus:outline-none"
//             />
//           ) : (
//             <>
//               {title}
//               <FiEdit className="ml-2 cursor-pointer text-gray-600" onClick={() => setEditingTitle(true)} />
//             </>
//           )}
//         </div>

//         {/* Date and Time */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 rounded border" />
//           <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 rounded border" />
//           <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className="w-full p-2 rounded border">
//             <option value="">Time Zone</option>
//             <option value="UTC">UTC</option>
//             <option value="PST">PST</option>
//             <option value="EST">EST</option>
//           </select>
//           <select value={emailEnabled} onChange={(e) => setEmailEnabled(e.target.value)} className="w-full p-2 rounded border">
//             <option value="">Email Enabled (Yes/No)</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         {/* Candidate Section */}
//         <div className="space-y-4">
//           <details className="bg-[#F0FAFF] p-4 rounded border">
//             <summary className="font-medium cursor-pointer">Add Candidates / Voting Options</summary>
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//               {candidates.map((c, idx) => (
//                 <div key={idx} className="border p-2 rounded">
//                   <img src={c.image} alt="Candidate" className="w-full h-32 object-cover rounded" />
//                   <h4 className="font-bold mt-2">{c.name}</h4>
//                   <p className="text-sm text-gray-600">{c.description}</p>
//                 </div>
//               ))}
//               <div className="border p-2 rounded space-y-2">
//                 <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
//                 <input
//                   placeholder="Name"
//                   value={candidateInput.name}
//                   onChange={(e) => setCandidateInput({ ...candidateInput, name: e.target.value })}
//                   className="w-full p-2 border rounded"
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={candidateInput.description}
//                   onChange={(e) => setCandidateInput({ ...candidateInput, description: e.target.value })}
//                   className="w-full p-2 border rounded"
//                 />
//                 <Button label="Add Candidate" onClick={handleAddCandidate} />
//               </div>
//             </div>
//           </details>
//         </div>

//         {/* Voting Categories */}
//         <select className="w-full p-2 rounded border">
//           <option>Select Voting Categories</option>
//         </select>

//         {/* Email Section */}
//         <details className="bg-[#F0FAFF] p-4 rounded border">
//           <summary className="font-medium cursor-pointer">Add Recipients (Emails)</summary>
//           <div className="mt-4 space-y-2">
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <Button label="Add" onClick={handleAddEmail} />
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {emails.map((email, i) => (
//                 <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{email}</span>
//               ))}
//             </div>
//           </div>
//         </details>

//         {/* URLs */}
//         <div className="border p-4 rounded bg-[#F8FAFC] space-y-2">
//           <div>
//             <label className="text-sm text-gray-700">Election URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={electionUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//           <div>
//             <label className="text-sm text-gray-700">Preview URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={previewUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="flex justify-between pt-4">
//           <Button label="Confirm & Preview" onClick={handleConfirm} />
//         </div>
//       </div>

//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white border border-gray-300 rounded-xl shadow-xl p-6 relative max-w-md w-full text-center">
//             <h3 className="text-xl font-bold text-green-700 mb-4">🎉 Voting Created Successfully!</h3>
//             <p className="text-sm text-gray-700 mb-2">Election URL:</p>
//             <p className="text-blue-600 font-medium break-all">{electionUrl}</p>
//             <button
//               className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
//               onClick={() => setShowPopup(false)}
//             >
//               <FiX size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CreateVoting;

// import { useEffect, useState } from 'react'
// import { FiLink, FiEdit, FiImage, FiMail, FiUser, FiX } from 'react-icons/fi'
// import { Button } from '../components'
// import { useAuthSafeRoute } from '../hooks'
// import { v4 as uuidv4 } from 'uuid'
// import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore'
// import { db, storage } from '../config/firebase'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// export const CreateVoting = () => {
//   useAuthSafeRoute()
//   const navigate = useNavigate()

//   const [title, setTitle] = useState('Title of the Election')
//   const [editingTitle, setEditingTitle] = useState(false)
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [timeZone, setTimeZone] = useState('')
//   const [emailEnabled, setEmailEnabled] = useState('')
//   const [electionUrl, setElectionUrl] = useState('')
//   const [previewUrl, setPreviewUrl] = useState('')
//   const [candidates, setCandidates] = useState<{ name: string; description: string; image: string }[]>([])
//   const [candidateInput, setCandidateInput] = useState({ name: '', description: '', image: '' })
//   const [candidateImageFile, setCandidateImageFile] = useState<File | null>(null)
//   const [emails, setEmails] = useState<string[]>([])
//   const [newEmail, setNewEmail] = useState('')
//   const [showPopup, setShowPopup] = useState(false)

//   const [allUsers, setAllUsers] = useState<string[]>([])
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([])

//   useEffect(() => {
//     // Fetch users from backend API
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('/api/users')
//         const data = response.data as { users: string[] }
//         setAllUsers(data.users || [])
//       } catch (err) {
//         console.error('Error fetching users:', err)
//       }
//     }
//     fetchUsers()
//   }, [])

//   const handleImageUpload = (e: any) => {
//     const file = e.target.files[0]
//     if (file) setCandidateImageFile(file)
//   }

//   const handleAddCandidate = async () => {
//     if (candidateInput.name && candidateInput.description && candidateImageFile) {
//       const imageRef = ref(storage, `candidate-images/${uuidv4()}_${candidateImageFile.name}`)
//       await uploadBytes(imageRef, candidateImageFile)
//       const imageUrl = await getDownloadURL(imageRef)

//       const newCandidate = {
//         name: candidateInput.name,
//         description: candidateInput.description,
//         image: imageUrl,
//       }

//       setCandidates([...candidates, newCandidate])
//       setCandidateInput({ name: '', description: '', image: '' })
//       setCandidateImageFile(null)
//     }
//   }

//   const handleAddEmail = () => {
//     if (newEmail && /\S+@\S+\.\S+/.test(newEmail)) {
//       setEmails([...emails, newEmail])
//       setNewEmail('')
//     }
//   }

//   const handleConfirm = async () => {
//     const uniqueId = uuidv4()
//     const voteURL = `https://yourapp.com/vote/${uniqueId}`
//     const previewURL = `https://yourapp.com/preview/${uniqueId}`

//     setElectionUrl(voteURL)
//     setPreviewUrl(previewURL)
//     setShowPopup(true)

//     if (emailEnabled === 'Yes') {
//       emails.forEach(email => {
//         console.log(`Sending vote URL to ${email}...`)
//       })
//     }

//     try {
//       await setDoc(doc(db, 'start-date', uniqueId), {
//         title,
//         startDate: Timestamp.fromDate(new Date(startDate)),
//         endDate: Timestamp.fromDate(new Date(endDate)),
//         timeZone,
//         voteURL,
//         previewURL,
//         candidates,
//         emails,
//         votingCategories: selectedUsers,
//         createdAt: Timestamp.now(),
//       })

//       console.log('Election saved to Firestore!')
//       navigate(`/Cast-Voting/${uniqueId}`)
//     } catch (error) {
//       console.error('Error saving to Firestore:', error)
//     }
//   }

//   return (
//     <div className="p-6 bg-[#D6F4F9] min-h-screen relative">
//       <h2 className="text-2xl font-bold text-[#003b57] mb-6">Create New</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//         <div className="flex items-center text-xl font-semibold">
//           {editingTitle ? (
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               onBlur={() => setEditingTitle(false)}
//               autoFocus
//               className="text-xl font-semibold border-b border-gray-300 focus:outline-none"
//             />
//           ) : (
//             <>
//               {title}
//               <FiEdit className="ml-2 cursor-pointer text-gray-600" onClick={() => setEditingTitle(true)} />
//             </>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 rounded border" />
//           <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 rounded border" />
//           <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className="w-full p-2 rounded border">
//             <option value="">Time Zone</option>
//             <option value="UTC">UTC</option>
//             <option value="PST">PST</option>
//             <option value="EST">EST</option>
//           </select>
//           <select value={emailEnabled} onChange={(e) => setEmailEnabled(e.target.value)} className="w-full p-2 rounded border">
//             <option value="">Email Enabled (Yes/No)</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <details className="bg-[#F0FAFF] p-4 rounded border">
//           <summary className="font-medium cursor-pointer">Add Candidates / Voting Options</summary>
//           <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//             {candidates.map((c, idx) => (
//               <div key={idx} className="border p-2 rounded">
//                 <img src={c.image} alt="Candidate" className="w-full h-32 object-cover rounded" />
//                 <h4 className="font-bold mt-2">{c.name}</h4>
//                 <p className="text-sm text-gray-600">{c.description}</p>
//               </div>
//             ))}
//             <div className="border p-2 rounded space-y-2">
//               <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
//               <input
//                 placeholder="Name"
//                 value={candidateInput.name}
//                 onChange={(e) => setCandidateInput({ ...candidateInput, name: e.target.value })}
//                 className="w-full p-2 border rounded"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={candidateInput.description}
//                 onChange={(e) => setCandidateInput({ ...candidateInput, description: e.target.value })}
//                 className="w-full p-2 border rounded"
//               />
//               <Button label="Add Candidate" onClick={handleAddCandidate} />
//             </div>
//           </div>
//         </details>

//         {/* Voting Categories Dropdown */}
//         <div>
//           <label className="text-sm font-medium">Select Voting Categories (Users)</label>
//           <select
//             multiple
//             value={selectedUsers}
//             onChange={(e) => {
//               const selected = Array.from(e.target.selectedOptions, (option) => option.value)
//               setSelectedUsers(selected)
//             }}
//             className="w-full p-2 rounded border h-32"
//           >
//             {allUsers.map((user, idx) => (
//               <option key={idx} value={user}>{user}</option>
//             ))}
//           </select>
//         </div>

//         <details className="bg-[#F0FAFF] p-4 rounded border">
//           <summary className="font-medium cursor-pointer">Add Recipients (Emails)</summary>
//           <div className="mt-4 space-y-2">
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <Button label="Add" onClick={handleAddEmail} />
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {emails.map((email, i) => (
//                 <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{email}</span>
//               ))}
//             </div>
//           </div>
//         </details>

//         <div className="border p-4 rounded bg-[#F8FAFC] space-y-2">
//           <div>
//             <label className="text-sm text-gray-700">Election URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={electionUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//           <div>
//             <label className="text-sm text-gray-700">Preview URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={previewUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between pt-4">
//           <Button label="Confirm & Preview" onClick={handleConfirm} />
//         </div>
//       </div>

//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white border border-gray-300 rounded-xl shadow-xl p-6 relative max-w-md w-full text-center">
//             <h3 className="text-xl font-bold text-green-700 mb-4">🎉 Voting Created Successfully!</h3>
//             <p className="text-sm text-gray-700 mb-2">Election URL:</p>
//             <p className="text-blue-600 font-medium break-all">{electionUrl}</p>
//             <button
//               className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
//               onClick={() => setShowPopup(false)}
//             >
//               <FiX size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CreateVoting



import { useEffect, useState } from 'react'
import { FiLink, FiEdit, FiImage, FiMail, FiUser, FiX } from 'react-icons/fi'
import { Button } from '../components'
import { useAuthSafeRoute } from '../hooks'
import { v4 as uuidv4 } from 'uuid'
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const CreateVoting = () => {
  useAuthSafeRoute()
  const navigate = useNavigate()

  const [title, setTitle] = useState('Title of the Election')
  const [editingTitle, setEditingTitle] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [timeZone, setTimeZone] = useState('')
  const [emailEnabled, setEmailEnabled] = useState('')
  const [electionUrl, setElectionUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [candidates, setCandidates] = useState<{ name: string; description: string; image: string }[]>([])
  const [candidateInput, setCandidateInput] = useState({ name: '', description: '', image: '' })
  const [candidateImageFile, setCandidateImageFile] = useState<File | null>(null)
  const [emails, setEmails] = useState<string[]>([])
  const [newEmail, setNewEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const [allUsers, setAllUsers] = useState<string[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // useEffect(() => {
  //   // Fetch users from backend API
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('/api/users')
  //       const data = response.data as { users: string[] }
  //       setAllUsers(data.users || [])
  //     } catch (err) {
  //       console.error('Error fetching users:', err)
  //     }
  //   }
  //   fetchUsers()
  // }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://getallusers-tiq4z73hla-uc.a.run.app/')
        const data = response.data as { users: { uid: string; email: string }[] }
  
        // Extract only the email addresses
        const emails = data.users.map(user => user.email)
        setAllUsers(emails)
  
        console.log("Fetched emails:", emails)
      } catch (err) {
        console.error('Error fetching users:', err)
      }
    }
    fetchUsers()
  }, [])
  



  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (file) setCandidateImageFile(file)
  }

  const handleAddCandidate = async () => {
    if (candidateInput.name && candidateInput.description && candidateImageFile) {
      const imageRef = ref(storage, `candidate-images/${uuidv4()}_${candidateImageFile.name}`)
      await uploadBytes(imageRef, candidateImageFile)
      const imageUrl = await getDownloadURL(imageRef)

      const newCandidate = {
        name: candidateInput.name,
        description: candidateInput.description,
        image: imageUrl,
      }

      setCandidates([...candidates, newCandidate])
      setCandidateInput({ name: '', description: '', image: '' })
      setCandidateImageFile(null)
    }
  }

  const handleAddEmail = () => {
    if (newEmail && /\S+@\S+\.\S+/.test(newEmail)) {
      setEmails([...emails, newEmail])
      setNewEmail('')
    }
  }

  const handleConfirm = async () => {
    const uniqueId = uuidv4()
    const voteURL = `https://yourapp.com/vote/${uniqueId}`
    const previewURL = `https://yourapp.com/preview/${uniqueId}`

    setElectionUrl(voteURL)
    setPreviewUrl(previewURL)
    setShowPopup(true)

    if (emailEnabled === 'Yes') {
      emails.forEach(email => {
        console.log(`Sending vote URL to ${email}...`)
      })
    }

    try {
      await setDoc(doc(db, 'start-date', uniqueId), {
        title,
        startDate: Timestamp.fromDate(new Date(startDate)),
        endDate: Timestamp.fromDate(new Date(endDate)),
        timeZone,
        voteURL,
        previewURL,
        candidates,
        emails,
        votingCategories: selectedUsers,
        createdAt: Timestamp.now(),
      })

      console.log('Election saved to Firestore!')
      navigate(`/Cast-Voting/${uniqueId}`)
    } catch (error) {
      console.error('Error saving to Firestore:', error)
    }
  }

  return (
    <div className="p-6 bg-[#D6F4F9] min-h-screen relative">
      <h2 className="text-2xl font-bold text-[#003b57] mb-6">Create New</h2>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex items-center text-xl font-semibold">
          {editingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              autoFocus
              className="text-xl font-semibold border-b border-gray-300 focus:outline-none"
            />
          ) : (
            <>
              {title}
              <FiEdit className="ml-2 cursor-pointer text-gray-600" onClick={() => setEditingTitle(true)} />
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 rounded border" />
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 rounded border" />
          <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className="w-full p-2 rounded border">
            <option value="">Time Zone</option>
            <option value="UTC">UTC</option>
            <option value="PST">PST</option>
            <option value="EST">EST</option>
          </select>
          <select value={emailEnabled} onChange={(e) => setEmailEnabled(e.target.value)} className="w-full p-2 rounded border">
            <option value="">Email Enabled (Yes/No)</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <details className="bg-[#F0FAFF] p-4 rounded border">
          <summary className="font-medium cursor-pointer">Add Candidates / Voting Options</summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map((c, idx) => (
              <div key={idx} className="border p-2 rounded">
                <img src={c.image} alt="Candidate" className="w-full h-32 object-cover rounded" />
                <h4 className="font-bold mt-2">{c.name}</h4>
                <p className="text-sm text-gray-600">{c.description}</p>
              </div>
            ))}
            <div className="border p-2 rounded space-y-2">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
              <input
                placeholder="Name"
                value={candidateInput.name}
                onChange={(e) => setCandidateInput({ ...candidateInput, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={candidateInput.description}
                onChange={(e) => setCandidateInput({ ...candidateInput, description: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <Button label="Add Candidate" onClick={handleAddCandidate} />
            </div>
          </div>
        </details>

        {/* Voting Categories Dropdown */}
        <div>
          <label className="text-sm font-medium">Select Voting Categories (Users)</label>
          <select
            multiple
            value={selectedUsers}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, (option) => option.value)
              setSelectedUsers(selected)
            }}
            className="w-full p-2 rounded border h-32"
          >
            {allUsers.map((user, idx) => (
              <option key={idx} value={user}>{user}</option>
            ))}
          </select>
        </div>

        <details className="bg-[#F0FAFF] p-4 rounded border">
          <summary className="font-medium cursor-pointer">Add Recipients (Emails)</summary>
          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <Button label="Add" onClick={handleAddEmail} />
            </div>
            <div className="flex flex-wrap gap-2">
              {emails.map((email, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{email}</span>
              ))}
            </div>
          </div>
        </details>

        <div className="border p-4 rounded bg-[#F8FAFC] space-y-2">
          <div>
            <label className="text-sm text-gray-700">Election URL</label>
            <div className="flex items-center bg-white border rounded px-2 py-1">
              <FiLink className="text-gray-500 mr-2" />
              <input type="text" value={electionUrl} readOnly className="w-full bg-transparent focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-700">Preview URL</label>
            <div className="flex items-center bg-white border rounded px-2 py-1">
              <FiLink className="text-gray-500 mr-2" />
              <input type="text" value={previewUrl} readOnly className="w-full bg-transparent focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button label="Confirm & Preview" onClick={handleConfirm} />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 rounded-xl shadow-xl p-6 relative max-w-md w-full text-center">
            <h3 className="text-xl font-bold text-green-700 mb-4">🎉 Voting Created Successfully!</h3>
            <p className="text-sm text-gray-700 mb-2">Election URL:</p>
            <p className="text-blue-600 font-medium break-all">{electionUrl}</p>
            <button
              className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowPopup(false)}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateVoting



// import { useEffect, useState } from 'react'
// import { FiLink, FiEdit, FiImage, FiMail, FiUser, FiX } from 'react-icons/fi'
// import { Button } from '../components'
// import { useAuthSafeRoute } from '../hooks'
// import { v4 as uuidv4 } from 'uuid'
// import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore'
// import { db, storage } from '../config/firebase'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// export const CreateVoting = () => {
//   useAuthSafeRoute()
//   const navigate = useNavigate()

//   const [title, setTitle] = useState('Title of the Election')
//   const [editingTitle, setEditingTitle] = useState(false)
//   const [mainImageFile, setMainImageFile] = useState<File | null>(null)
//   const [mainImageUrl, setMainImageUrl] = useState('')
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [timeZone, setTimeZone] = useState('')
//   const [emailEnabled, setEmailEnabled] = useState('')
//   const [electionUrl, setElectionUrl] = useState('')
//   const [previewUrl, setPreviewUrl] = useState('')
//   const [candidates, setCandidates] = useState<{ name: string; description: string; image: string }[]>([])
//   const [candidateInput, setCandidateInput] = useState({ name: '', description: '', image: '' })
//   const [candidateImageFile, setCandidateImageFile] = useState<File | null>(null)
//   const [emails, setEmails] = useState<string[]>([])
//   const [newEmail, setNewEmail] = useState('')
//   const [showPopup, setShowPopup] = useState(false)
//   const [allUsers, setAllUsers] = useState<string[]>([])
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([])

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('https://getallusers-tiq4z73hla-uc.a.run.app/')
//         const data = response.data as { users: { uid: string; email: string }[] }
//         const emails = data.users.map(user => user.email)
//         setAllUsers(emails)
//       } catch (err) {
//         console.error('Error fetching users:', err)
//       }
//     }
//     fetchUsers()
//   }, [])

//   const handleImageUpload = (e: any) => {
//     const file = e.target.files[0]
//     if (file) setCandidateImageFile(file)
//   }

//   const handleMainImageUpload = (e: any) => {
//     const file = e.target.files[0]
//     if (file) setMainImageFile(file)
//   }

//   const handleAddCandidate = async () => {
//     if (candidateInput.name && candidateInput.description && candidateImageFile) {
//       const imageRef = ref(storage, `candidate-images/${uuidv4()}_${candidateImageFile.name}`)
//       await uploadBytes(imageRef, candidateImageFile)
//       const imageUrl = await getDownloadURL(imageRef)

//       const newCandidate = {
//         name: candidateInput.name,
//         description: candidateInput.description,
//         image: imageUrl,
//       }

//       setCandidates([...candidates, newCandidate])
//       setCandidateInput({ name: '', description: '', image: '' })
//       setCandidateImageFile(null)
//     }
//   }

//   const handleAddEmail = () => {
//     if (newEmail && /\S+@\S+\.\S+/.test(newEmail)) {
//       setEmails([...emails, newEmail])
//       setNewEmail('')
//     }
//   }

//   const handleConfirm = async () => {
//     const uniqueId = uuidv4()
//     const voteURL = `https://yourapp.com/vote/${uniqueId}`
//     const previewURL = `https://yourapp.com/preview/${uniqueId}`

//     setElectionUrl(voteURL)
//     setPreviewUrl(previewURL)
//     setShowPopup(true)

//     let uploadedMainImageUrl = ''
//     if (mainImageFile) {
//       const mainImgRef = ref(storage, `main-images/${uuidv4()}_${mainImageFile.name}`)
//       await uploadBytes(mainImgRef, mainImageFile)
//       uploadedMainImageUrl = await getDownloadURL(mainImgRef)
//       setMainImageUrl(uploadedMainImageUrl)
//     }

//     if (emailEnabled === 'Yes') {
//       emails.forEach(email => {
//         console.log(`Sending vote URL to ${email}...`)
//       })
//     }

//     try {
//       await setDoc(doc(db, 'start-date', uniqueId), {
//         title,
//         startDate: Timestamp.fromDate(new Date(startDate)),
//         endDate: Timestamp.fromDate(new Date(endDate)),
//         timeZone,
//         voteURL,
//         previewURL,
//         mainImage: uploadedMainImageUrl,
//         candidates,
//         emails,
//         votingCategories: selectedUsers,
//         createdAt: Timestamp.now(),
//       })

//       console.log('Election saved to Firestore!')
//       navigate(`/Cast-Voting/${uniqueId}`)
//     } catch (error) {
//       console.error('Error saving to Firestore:', error)
//     }
//   }

//   return (
//     <div className="p-6 bg-[#D6F4F9] min-h-screen relative">
//       <h2 className="text-2xl font-bold text-[#003b57] mb-6">Create New</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div className="flex items-center text-xl font-semibold">
//             {editingTitle ? (
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 onBlur={() => setEditingTitle(false)}
//                 autoFocus
//                 className="text-xl font-semibold border-b border-gray-300 focus:outline-none"
//               />
//             ) : (
//               <>
//                 {title}
//                 <FiEdit className="ml-2 cursor-pointer text-gray-600" onClick={() => setEditingTitle(true)} />
//               </>
//             )}
//           </div>
//           <div>
//             <input type="file" accept="image/*" onChange={handleMainImageUpload} />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 rounded border" />
//           <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 rounded border" />
//           <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className="w-full p-2 rounded border">
//             <option value="">Time Zone</option>
//             <option value="UTC">UTC</option>
//             <option value="PST">PST</option>
//             <option value="EST">EST</option>
//           </select>
//           <select value={emailEnabled} onChange={(e) => setEmailEnabled(e.target.value)} className="w-full p-2 rounded border">
//             <option value="">Email Enabled (Yes/No)</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <details className="bg-[#F0FAFF] p-4 rounded border">
//           <summary className="font-medium cursor-pointer">Add Candidates / Voting Options</summary>
//           <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//             {candidates.map((c, idx) => (
//               <div key={idx} className="border p-2 rounded">
//                 <img src={c.image} alt="Candidate" className="w-full h-32 object-cover rounded" />
//                 <h4 className="font-bold mt-2">{c.name}</h4>
//                 <p className="text-sm text-gray-600">{c.description}</p>
//               </div>
//             ))}
//             <div className="border p-2 rounded space-y-2">
//               <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
//               <input
//                 placeholder="Name"
//                 value={candidateInput.name}
//                 onChange={(e) => setCandidateInput({ ...candidateInput, name: e.target.value })}
//                 className="w-full p-2 border rounded"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={candidateInput.description}
//                 onChange={(e) => setCandidateInput({ ...candidateInput, description: e.target.value })}
//                 className="w-full p-2 border rounded"
//               />
//               <Button label="Add Candidate" onClick={handleAddCandidate} />
//             </div>
//           </div>
//         </details>

//         <div>
//           <label className="text-sm font-medium">Select Voting Categories (Users)</label>
//           <select
//             multiple
//             value={selectedUsers}
//             onChange={(e) => {
//               const selected = Array.from(e.target.selectedOptions, (option) => option.value)
//               setSelectedUsers(selected)
//             }}
//             className="w-full p-2 rounded border h-32"
//           >
//             {allUsers.map((user, idx) => (
//               <option key={idx} value={user}>{user}</option>
//             ))}
//           </select>
//         </div>

//         <details className="bg-[#F0FAFF] p-4 rounded border">
//           <summary className="font-medium cursor-pointer">Add Recipients (Emails)</summary>
//           <div className="mt-4 space-y-2">
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <Button label="Add" onClick={handleAddEmail} />
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {emails.map((email, i) => (
//                 <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{email}</span>
//               ))}
//             </div>
//           </div>
//         </details>

//         <div className="border p-4 rounded bg-[#F8FAFC] space-y-2">
//           <div>
//             <label className="text-sm text-gray-700">Election URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={electionUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//           <div>
//             <label className="text-sm text-gray-700">Preview URL</label>
//             <div className="flex items-center bg-white border rounded px-2 py-1">
//               <FiLink className="text-gray-500 mr-2" />
//               <input type="text" value={previewUrl} readOnly className="w-full bg-transparent focus:outline-none" />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between pt-4">
//           <Button label="Confirm & Preview" onClick={handleConfirm} />
//         </div>
//       </div>

//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white border border-gray-300 rounded-xl shadow-xl p-6 relative max-w-md w-full text-center">
//             <h3 className="text-xl font-bold text-green-700 mb-4">🎉 Voting Created Successfully!</h3>
//             <p className="text-sm text-gray-700 mb-2">Election URL:</p>
//             <p className="text-blue-600 font-medium break-all">{electionUrl}</p>
//             <button
//               className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
//               onClick={() => setShowPopup(false)}
//             >
//               <FiX size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CreateVoting
