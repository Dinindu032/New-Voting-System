// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import { FiClock, FiCalendar } from 'react-icons/fi';

// const CastVoting = () => {
//   const { uniqueId } = useParams<{ uniqueId: string }>();
//   const [votingData, setVotingData] = useState<any>(null);

//   useEffect(() => {
//     const fetchVotingData = async () => {
//       try {
//         const docRef = doc(db, 'start-date', uniqueId!);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setVotingData(docSnap.data());
//         } else {
//           console.log('No such document!');
//         }
//       } catch (error) {
//         console.error('Error fetching voting data:', error);
//       }
//     };

//     if (uniqueId) {
//       fetchVotingData();
//     }
//   }, [uniqueId]);

//   const handleVote = (candidateName: string) => {
//     alert(`Vote casted for: ${candidateName}`);
//     // TODO: Save vote to Firestore
//   };

//   const getRemainingTime = (endDate: any) => {
//     const now = new Date();
//     const end = new Date(endDate.seconds * 1000);
//     const diff = end.getTime() - now.getTime();

//     if (diff <= 0) return 'Voting Ended';

//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m remaining`;
//   };

//   if (!votingData) {
//     return <div className="p-6 text-center text-gray-600">Loading ballot paper...</div>;
//   }

//   const { title, description, startDate, endDate, candidates } = votingData;

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
//         <p className="text-center text-lg text-blue-300 mb-6">{description}</p>

//         <div className="flex justify-center gap-6 mb-8 text-sm text-blue-200">
//           <div className="flex items-center gap-2">
//             <FiCalendar />
//             Start: {new Date(startDate.seconds * 1000).toLocaleString()}
//           </div>
//           <div className="flex items-center gap-2">
//             <FiCalendar />
//             End: {new Date(endDate.seconds * 1000).toLocaleString()}
//           </div>
//           <div className="flex items-center gap-2">
//             <FiClock />
//             {getRemainingTime(endDate)}
//           </div>
//         </div>

//         {/* Candidate Table */}
//         <div className="bg-white text-black rounded-lg shadow-md overflow-hidden">
//           <table className="w-full text-left">
//             <thead className="bg-blue-400 text-white">
//               <tr>
//                 <th className="p-4">Candidate</th>
//                 <th className="p-4">Description</th>
//                 <th className="p-4 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {candidates.map((candidate: any, index: number) => (
//                 <tr
//                   key={index}
//                   className="border-b hover:bg-blue-50 transition"
//                 >
//                   <td className="flex items-center gap-4 p-4">
//                     <img
//                       src={candidate.image || '/placeholder.jpg'}
//                       alt={candidate.name}
//                       className="w-12 h-12 object-cover rounded-full"
//                     />
//                     <span>{candidate.name}</span>
//                   </td>
//                   <td className="p-4">{candidate.description}</td>
//                   <td className="p-4 text-center">
//                     <button
//                       className="bg-blue-900 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700"
//                       onClick={() => handleVote(candidate.name)}
//                     >
//                       VOTE
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CastVoting;



// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import { FiClock, FiCalendar } from 'react-icons/fi';
// import { toast } from 'react-hot-toast';

// const CastVoting = () => {
//   const { uniqueId } = useParams<{ uniqueId: string }>();
//   const [votingData, setVotingData] = useState<any>(null);
//   const [hasVoted, setHasVoted] = useState(false);

//   useEffect(() => {
//     const fetchVotingData = async () => {
//       try {
//         const docRef = doc(db, 'start-date', uniqueId!);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setVotingData(docSnap.data());
//         } else {
//           console.log('No such document!');
//         }
//       } catch (error) {
//         console.error('Error fetching voting data:', error);
//       }
//     };

//     if (uniqueId) {
//       fetchVotingData();
//     }
//   }, [uniqueId]);

//   const handleVote = async (candidateName: string) => {
//     try {
//       if (!uniqueId) return;

//       const voteData = {
//         candidate: candidateName,
//         electionId: uniqueId,
//         timestamp: serverTimestamp(),
//       };

//       await addDoc(collection(db, 'Votes'), voteData);
//       setHasVoted(true);
//       toast.success('Thanking you for Casting your vote. It is your Right !');
//     } catch (error) {
//       console.error('Error saving vote:', error);
//       toast.error('Failed to cast vote. Please try again.');
//     }
//   };

//   const getRemainingTime = (endDate: any) => {
//     const now = new Date();
//     const end = new Date(endDate.seconds * 1000);
//     const diff = end.getTime() - now.getTime();

//     if (diff <= 0) return 'Voting Ended';

//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m remaining`;
//   };

//   if (!votingData) {
//     return <div className="p-6 text-center text-gray-600">Loading ballot paper...</div>;
//   }

//   const { title, description, startDate, endDate, candidates } = votingData;

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
//         <p className="text-center text-lg text-blue-300 mb-6">{description}</p>

//         <div className="flex justify-center gap-6 mb-8 text-sm text-blue-200">
//           <div className="flex items-center gap-2">
//             <FiCalendar />
//             Start: {new Date(startDate.seconds * 1000).toLocaleString()}
//           </div>
//           <div className="flex items-center gap-2">
//             <FiCalendar />
//             End: {new Date(endDate.seconds * 1000).toLocaleString()}
//           </div>
//           <div className="flex items-center gap-2">
//             <FiClock />
//             {getRemainingTime(endDate)}
//           </div>
//         </div>

//         {hasVoted ? (
//           <div className="text-center mt-10 text-xl font-semibold text-green-400">
//             🎉 Thanking you for Casting your vote. It is your Right !
//           </div>
//         ) : (
//           <div className="bg-white text-black rounded-lg shadow-md overflow-hidden">
//             <table className="w-full text-left">
//               <thead className="bg-blue-400 text-white">
//                 <tr>
//                   <th className="p-4">Candidate</th>
//                   <th className="p-4">Description</th>
//                   <th className="p-4 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((candidate: any, index: number) => (
//                   <tr key={index} className="border-b hover:bg-blue-50 transition">
//                     <td className="flex items-center gap-4 p-4">
//                       <img
//                         src={candidate.image || '/placeholder.jpg'}
//                         alt={candidate.name}
//                         className="w-12 h-12 object-cover rounded-full"
//                       />
//                       <span>{candidate.name}</span>
//                     </td>
//                     <td className="p-4">{candidate.description}</td>
//                     <td className="p-4 text-center">
//                       <button
//                         className="bg-blue-900 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700"
//                         onClick={() => handleVote(candidate.name)}
//                       >
//                         VOTE
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CastVoting;


// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import { FiClock, FiCalendar } from 'react-icons/fi';
// import { toast } from 'react-hot-toast';

// const CastVoting = () => {
//   const { uniqueId } = useParams<{ uniqueId: string }>();
//   const [votingData, setVotingData] = useState<any>(null);
//   const [hasVoted, setHasVoted] = useState(false);

//   useEffect(() => {
//     const fetchVotingData = async () => {
//       try {
//         const docRef = doc(db, 'start-date', uniqueId!);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setVotingData(docSnap.data());
//         } else {
//           console.log('No such document!');
//         }
//       } catch (error) {
//         console.error('Error fetching voting data:', error);
//       }
//     };

//     if (uniqueId) {
//       fetchVotingData();
//     }
//   }, [uniqueId]);

//   const handleVote = async (candidateName: string) => {
//     try {
//       if (!uniqueId) return;

//       const voteData = {
//         candidate: candidateName,
//         electionId: uniqueId,
//         timestamp: serverTimestamp(),
//       };

//       await addDoc(collection(db, 'Votes'), voteData);
//       setHasVoted(true);
//       toast.success('Thank you for casting your vote. Your voice matters!');
//     } catch (error) {
//       console.error('Error saving vote:', error);
//       toast.error('Failed to cast vote. Please try again.');
//     }
//   };

//   const getRemainingTime = (endDate: any) => {
//     const now = new Date();
//     const end = new Date(endDate.seconds * 1000);
//     const diff = end.getTime() - now.getTime();
//     if (diff <= 0) return 'Voting Ended';
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m remaining`;
//   };

//   if (!votingData) {
//     return <div className="p-10 text-center text-white text-xl">🗳️ Loading ballot paper...</div>;
//   }

//   const { title, description, startDate, endDate, candidates } = votingData;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-12 px-6 font-sans">
//       <div className="max-w-7xl mx-auto bg-white/10 rounded-3xl shadow-2xl p-12 border border-blue-600">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <h1 className="text-5xl font-extrabold text-blue-400">{title}</h1>
//           <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">{description}</p>
//         </div>

//         {/* Info Row */}
//         <div className="flex justify-center gap-10 flex-wrap text-base text-gray-300 mb-14">
//           <div className="flex items-center gap-2">
//             <FiCalendar />
//             <span className="text-white font-medium">Start:</span>{' '}
//             {new Date(startDate.seconds * 1000).toLocaleString()}
//           </div>
//           <div className="flex items-center gap-2">
//             <FiCalendar />
//             <span className="text-white font-medium">End:</span>{' '}
//             {new Date(endDate.seconds * 1000).toLocaleString()}
//           </div>
//           <div className="flex items-center gap-2">
//             <FiClock />
//             <span className="text-white font-medium">Time Left:</span> {getRemainingTime(endDate)}
//           </div>
//         </div>

//         {/* Voting Table or Thank You */}
//         {hasVoted ? (
//           <div className="text-center mt-24">
//             <div className="text-4xl font-bold text-green-400 mb-4">🎉 Thank you for voting!</div>
//             <p className="text-xl text-gray-300">Your participation makes democracy stronger.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white text-black rounded-3xl overflow-hidden shadow-lg text-lg">
//               <thead className="bg-blue-800 text-white text-xl">
//                 <tr>
//                   <th className="p-6">Candidate</th>
//                   <th className="p-6">Manifesto</th>
//                   <th className="p-6 text-center">Your Vote</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((candidate: any, index: number) => (
//                   <tr
//                     key={index}
//                     className="border-b border-blue-100 hover:bg-blue-100 transition-all duration-300"
//                   >
//                     <td className="flex items-center gap-6 p-6">
//                       <img
//                         src={candidate.image || '/placeholder.jpg'}
//                         alt={candidate.name}
//                         className="w-20 h-20 object-cover rounded-full shadow-lg border-2 border-blue-400"
//                       />
//                       <span className="font-semibold text-xl">{candidate.name}</span>
//                     </td>
//                     <td className="p-6 text-gray-700">{candidate.description}</td>
//                     <td className="p-6 text-center">
//                       <button
//                         onClick={() => handleVote(candidate.name)}
//                         className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-3 rounded-full text-base font-bold shadow-lg hover:scale-105 transition-transform"
//                       >
//                         VOTE
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CastVoting;


// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   doc,
//   getDoc,
//   collection,
//   addDoc,
//   serverTimestamp,
//   getDocs,
//   query,
//   where,
// } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import { FiClock, FiCalendar } from 'react-icons/fi';
// import { toast } from 'react-hot-toast';
// import { getAuth } from 'firebase/auth';

// const CastVoting = () => {
//   const { uniqueId } = useParams<{ uniqueId: string }>();
//   const navigate = useNavigate();
//   const [votingData, setVotingData] = useState<any>(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [pendingElections, setPendingElections] = useState<any[]>([]);
//   const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUserEmail(user?.email || null);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchVotingData = async () => {
//       try {
//         if (!uniqueId) return;

//         const docRef = doc(db, 'start-date', uniqueId);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setVotingData(docSnap.data());
//         } else {
//           console.log('No such document!');
//         }
//       } catch (error) {
//         console.error('Error fetching voting data:', error);
//       }
//     };

//     const fetchPendingVotes = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'start-date'));
//         const elections = querySnapshot.docs
//           .filter((docSnap) => docSnap.id !== uniqueId)
//           .map((docSnap) => ({
//             id: docSnap.id,
//             ...docSnap.data(),
//           }));
//         setPendingElections(elections);
//       } catch (error) {
//         console.error('Error fetching pending elections:', error);
//       }
//     };

//     const checkIfVoted = async () => {
//       try {
//         if (!uniqueId || !currentUserEmail) return;
//         const votesRef = collection(db, 'Votes');
//         const q = query(
//           votesRef,
//           where('electionId', '==', uniqueId),
//           where('userEmail', '==', currentUserEmail)
//         );
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           setHasVoted(true);
//         }
//       } catch (error) {
//         console.error('Error checking vote status:', error);
//       }
//     };

//     fetchVotingData();
//     fetchPendingVotes();
//     checkIfVoted();
//   }, [uniqueId, currentUserEmail]);

//   const handleVote = async (candidateName: string) => {
//     try {
//       if (!uniqueId || !currentUserEmail) return;

//       const voteData = {
//         candidate: candidateName,
//         electionId: uniqueId,
//         userEmail: currentUserEmail,
//         timestamp: serverTimestamp(),
//       };

//       await addDoc(collection(db, 'Votes'), voteData);
//       setHasVoted(true);
//       toast.success('Thank you for casting your vote. Your voice matters!');
//     } catch (error) {
//       console.error('Error saving vote:', error);
//       toast.error('Failed to cast vote. Please try again.');
//     }
//   };

//   const getRemainingTime = (endDate: any) => {
//     if (!endDate?.seconds) return 'N/A';
//     const now = new Date();
//     const end = new Date(endDate.seconds * 1000);
//     const diff = end.getTime() - now.getTime();
//     if (diff <= 0) return 'Voting Ended';
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m remaining`;
//   };

//   if (!votingData) {
//     return (
//       <div className="p-10 text-center text-white text-xl">
//         🗳️ Loading ballot paper...
//       </div>
//     );
//   }

//   const { title, description, startDate, endDate, candidates = [] } = votingData;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-12 px-6 font-sans">
//       <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Voting Panel */}
//         <div className="lg:col-span-2 bg-white/10 rounded-3xl shadow-2xl p-12 border border-blue-600">
//           <div className="text-center mb-14">
//             <h1 className="text-5xl font-extrabold text-blue-400">{title}</h1>
//             <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">{description}</p>
//           </div>

//           <div className="flex justify-center gap-10 flex-wrap text-base text-gray-300 mb-14">
//             <div className="flex items-center gap-2">
//               <FiCalendar />
//               <span className="text-white font-medium">Start:</span>{' '}
//               {startDate?.seconds
//                 ? new Date(startDate.seconds * 1000).toLocaleString()
//                 : 'N/A'}
//             </div>
//             <div className="flex items-center gap-2">
//               <FiCalendar />
//               <span className="text-white font-medium">End:</span>{' '}
//               {endDate?.seconds
//                 ? new Date(endDate.seconds * 1000).toLocaleString()
//                 : 'N/A'}
//             </div>
//             <div className="flex items-center gap-2">
//               <FiClock />
//               <span className="text-white font-medium">Time Left:</span>{' '}
//               {getRemainingTime(endDate)}
//             </div>
//           </div>

//           {hasVoted ? (
//             <div className="text-center mt-24">
//               <div className="text-4xl font-bold text-green-400 mb-4">
//                 🎉 Thank you for voting!
//               </div>
//               <p className="text-xl text-gray-300">
//                 Your participation makes democracy stronger.
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full bg-white text-black rounded-3xl overflow-hidden shadow-lg text-lg">
//                 <thead className="bg-blue-800 text-white text-xl">
//                   <tr>
//                     <th className="p-6">Candidate</th>
//                     <th className="p-6">Manifesto</th>
//                     <th className="p-6 text-center">Your Vote</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {candidates.map((candidate: any, index: number) => (
//                     <tr
//                       key={index}
//                       className="border-b border-blue-100 hover:bg-blue-100 transition-all duration-300"
//                     >
//                       <td className="flex items-center gap-6 p-6">
//                         <img
//                           src={candidate.image || '/placeholder.jpg'}
//                           alt={candidate.name}
//                           className="w-20 h-20 object-cover rounded-full shadow-lg border-2 border-blue-400"
//                         />
//                         <span className="font-semibold text-xl">{candidate.name}</span>
//                       </td>
//                       <td className="p-6 text-gray-700">{candidate.description}</td>
//                       <td className="p-6 text-center">
//                         <button
//                           onClick={() => handleVote(candidate.name)}
//                           className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-3 rounded-full text-base font-bold shadow-lg hover:scale-105 transition-transform"
//                         >
//                           VOTE
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Pending Elections Sidebar */}
//         <div className="lg:col-span-1 bg-white/10 border border-blue-600 rounded-3xl shadow-2xl p-8 h-full">
//           <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">
//             🕒 Pending Votes
//           </h2>
//           <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
//             {pendingElections.length === 0 ? (
//               <p className="text-center text-gray-400">No other pending votes found.</p>
//             ) : (
//               pendingElections.map((election) => (
//                 <div
//                   key={election.id}
//                   onClick={() => navigate(`/cast-vote/${election.id}`)}
//                   className="cursor-pointer bg-blue-900/40 hover:bg-blue-800 transition-all duration-200 p-4 rounded-2xl border border-blue-500 shadow-md"
//                 >
//                   <h3 className="text-lg font-semibold text-white">{election.title}</h3>
//                   <p className="text-sm text-gray-300">
//                     Ends:{' '}
//                     {election.endDate?.seconds
//                       ? new Date(election.endDate.seconds * 1000).toLocaleString()
//                       : 'N/A'}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CastVoting;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { getAuth } from 'firebase/auth';

const CastVoting = () => {
  const { uniqueId } = useParams<{ uniqueId: string }>();
  const navigate = useNavigate();
  const [votingData, setVotingData] = useState<any>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pendingElections, setPendingElections] = useState<any[]>([]);
  const [signedElections, setSignedElections] = useState<any[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUserEmail(user?.email || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchVotingData = async () => {
      try {
        if (!uniqueId) return;

        const docRef = doc(db, 'start-date', uniqueId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setVotingData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching voting data:', error);
      }
    };

    const fetchAllElectionsAndVotes = async () => {
      try {
        if (!currentUserEmail) return;

        const allElectionsSnapshot = await getDocs(collection(db, 'start-date'));
        const allElections = allElectionsSnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        const votesSnapshot = await getDocs(
          query(collection(db, 'Votes'), where('userEmail', '==', currentUserEmail))
        );

        const votedElectionIds = votesSnapshot.docs.map((doc) => doc.data().electionId);

        const pending: any[] = [];
        const signed: any[] = [];

        allElections.forEach((election) => {
          if (election.id === uniqueId) return;
          if (votedElectionIds.includes(election.id)) {
            signed.push(election);
          } else {
            pending.push(election);
          }
        });

        setPendingElections(pending);
        setSignedElections(signed);
      } catch (error) {
        console.error('Error fetching elections:', error);
      }
    };

    const checkIfVoted = async () => {
      try {
        if (!uniqueId || !currentUserEmail) return;
        const votesRef = collection(db, 'Votes');
        const q = query(
          votesRef,
          where('electionId', '==', uniqueId),
          where('userEmail', '==', currentUserEmail)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setHasVoted(true);
        }
      } catch (error) {
        console.error('Error checking vote status:', error);
      }
    };

    fetchVotingData();
    fetchAllElectionsAndVotes();
    checkIfVoted();
  }, [uniqueId, currentUserEmail]);

  const handleVote = async (candidateName: string) => {
    try {
      if (!uniqueId || !currentUserEmail) {
        toast.error('You must be logged in to vote.');
        return;
      }

      if (hasVoted) {
        toast.error('You have already voted in this election.');
        return;
      }

      const voteData = {
        candidate: candidateName,
        electionId: uniqueId,
        userEmail: currentUserEmail,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'Votes'), voteData);
      setHasVoted(true);
      toast.success('Thank you for casting your vote. Your voice matters!');
    } catch (error) {
      console.error('Error saving vote:', error);
      toast.error('Failed to cast vote. Please try again.');
    }
  };

  const getRemainingTime = (endDate: any) => {
    if (!endDate?.seconds) return 'N/A';
    const now = new Date();
    const end = new Date(endDate.seconds * 1000);
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return 'Voting Ended';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  if (!votingData) {
    return (
      <div className="p-10 text-center text-white text-xl">
        🗳️ Loading ballot paper...
      </div>
    );
  }

  const { title, description, startDate, endDate, candidates = [] } = votingData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-12 px-6 font-sans">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voting Panel */}
        <div className="lg:col-span-2 bg-white/10 rounded-3xl shadow-2xl p-12 border border-blue-600">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-blue-400">{title}</h1>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">{description}</p>
          </div>

          <div className="flex justify-center gap-10 flex-wrap text-base text-gray-300 mb-14">
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span className="text-white font-medium">Start:</span>{' '}
              {startDate?.seconds
                ? new Date(startDate.seconds * 1000).toLocaleString()
                : 'N/A'}
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span className="text-white font-medium">End:</span>{' '}
              {endDate?.seconds
                ? new Date(endDate.seconds * 1000).toLocaleString()
                : 'N/A'}
            </div>
            <div className="flex items-center gap-2">
              <FiClock />
              <span className="text-white font-medium">Time Left:</span>{' '}
              {getRemainingTime(endDate)}
            </div>
          </div>

          {hasVoted ? (
            <div className="text-center mt-24">
              <div className="text-4xl font-bold text-green-400 mb-4">
                🎉 Thank you for voting!
              </div>
              <p className="text-xl text-gray-300">
                Your participation makes democracy stronger.
              </p>
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center mt-24 text-red-400 text-2xl font-bold">
              🚫 No candidates available for this election.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white text-black rounded-3xl overflow-hidden shadow-lg text-lg">
                <thead className="bg-blue-800 text-white text-xl">
                  <tr>
                    <th className="p-6">Candidate</th>
                    <th className="p-6">Manifesto</th>
                    <th className="p-6 text-center">Your Vote</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-blue-100 hover:bg-blue-100 transition-all duration-300"
                    >
                      <td className="flex items-center gap-6 p-6">
                        <img
                          src={candidate.image || '/placeholder.jpg'}
                          alt={candidate.name}
                          className="w-20 h-20 object-cover rounded-full shadow-lg border-2 border-blue-400"
                        />
                        <span className="font-semibold text-xl">{candidate.name}</span>
                      </td>
                      <td className="p-6 text-gray-700">{candidate.description}</td>
                      <td className="p-6 text-center">
                        <button
                          onClick={() => handleVote(candidate.name)}
                          className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-3 rounded-full text-base font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                          VOTE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sidebar with Pending and Signed Elections */}
        <div className="lg:col-span-1 bg-white/10 border border-blue-600 rounded-3xl shadow-2xl p-8 h-full">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">🕒 Pending Votes</h2>
          <div className="space-y-4 overflow-y-auto max-h-[40vh] pr-2 mb-10">
            {pendingElections.length === 0 ? (
              <p className="text-center text-gray-400">No other pending votes found.</p>
            ) : (
              pendingElections.map((election) => (
                <div
                  key={election.id}
                  onClick={() => navigate(`/castvoting/${election.id}`)}
                  className="cursor-pointer bg-blue-900/40 hover:bg-blue-800 transition-all duration-200 p-4 rounded-2xl border border-blue-500 shadow-md"
                >
                  <h3 className="text-lg font-semibold text-white">{election.title}</h3>
                  <p className="text-sm text-gray-300">
                    Ends:{' '}
                    {election.endDate?.seconds
                      ? new Date(election.endDate.seconds * 1000).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
              ))
            )}
          </div>

          <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">✅ Casted Polls</h2>
          <div className="space-y-4 overflow-y-auto max-h-[40vh] pr-2">
            {signedElections.length === 0 ? (
              <p className="text-center text-gray-400">You haven't signed any petitions yet.</p>
            ) : (
              signedElections.map((election) => (
                <div
                  key={election.id}
                  className="bg-green-900/40 text-white p-4 rounded-2xl border border-green-500 shadow-md"
                >
                  <h3 className="text-lg font-semibold">{election.title}</h3>
                  <p className="text-sm text-gray-300">
                    Signed on:{' '}
                    {election.endDate?.seconds
                      ? new Date(election.endDate.seconds * 1000).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastVoting;
