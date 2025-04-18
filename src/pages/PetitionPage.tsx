// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';

// type Petition = {
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: { name: string; comment: string; signedAt: Timestamp }[];
// };

// export const PetitionPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);

//   useEffect(() => {
//     const fetchPetition = async () => {
//       if (!id) return;
//       const docRef = doc(db, 'petitions', id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setPetition(docSnap.data() as Petition);
//       } else {
//         alert('Petition not found');
//       }
//     };

//     fetchPetition();
//   }, [id]);

//   const handleSign = async () => {
//     if (!id || !name.trim()) {
//       alert('Please enter your name to sign.');
//       return;
//     }

//     const docRef = doc(db, 'petitions', id);

//     await updateDoc(docRef, {
//       signatures: arrayUnion({
//         name,
//         comment,
//         signedAt: Timestamp.now(),
//       }),
//     });

//     setHasSigned(true);
//   };

//   if (!petition) {
//     return <div className="text-center py-20">Loading petition...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           {petition.title}
//         </h1>

//         <p className="text-orange-600 font-semibold text-sm mb-6">
//           Show your support by signing this petition now
//         </p>

//         <div className="flex items-center text-gray-600 mb-4">
//           <FiUser className="mr-2" />
//           <span className="font-medium">{petition.createdBy}</span>
//           <span className="ml-4">
//             {petition.signatures.length} Comments
//           </span>
//         </div>

//         <div className="mb-6 flex flex-col md:flex-row gap-6">
//           <div className="md:w-2/3">
//             <img
//               src={petition.image}
//               alt="Petition"
//               className="rounded-md w-full max-h-96 object-cover mb-4"
//             />
//             <p className="text-gray-700">{petition.description}</p>
//           </div>

//           <div className="md:w-1/3 bg-blue-50 p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold mb-2">Sign This Petition</h3>
//             <p className="text-sm text-gray-600 mb-4">
//               {petition.signatures.length} people have signed. Add your voice!
//             </p>

//             {!hasSigned ? (
//               <div className="space-y-4">
//                 <Input
//                   type="text"
//                   icon={FiUser}
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <TextArea
//                   iconLeft={FiMessageCircle}
//                   rows={3}
//                   placeholder="Comments (optional)"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//                 <Button
//                   label="Sign Petition"
//                   className="w-full bg-green-600 hover:bg-green-700"
//                   onClick={handleSign}
//                 />
//               </div>
//             ) : (
//               <div className="text-center space-y-4">
//                 <p className="text-green-700 font-medium text-lg">
//                   🎉 Thank you for signing the petition!
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Share this petition with others:
//                 </p>
//                 <div className="flex justify-center space-x-2">
//                   <a
//                     href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//                   >
//                     Facebook
//                   </a>
//                   <a
//                     href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-3 py-1 bg-blue-400 text-white rounded-md text-sm"
//                   >
//                     Twitter
//                   </a>
//                   <a
//                     href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-3 py-1 bg-blue-800 text-white rounded-md text-sm"
//                   >
//                     LinkedIn
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {petition.signatures.length > 0 && (
//           <div className="mt-8">
//             <h4 className="text-xl font-semibold mb-4">
//               Recent Signatures
//             </h4>
//             <ul className="space-y-3">
//               {petition.signatures
//                 .slice()
//                 .reverse()
//                 .map((sig, idx) => (
//                   <li
//                     key={idx}
//                     className="border-b pb-2 text-gray-700 text-sm"
//                   >
//                     <strong>{sig.name}</strong> - {sig.comment || 'No comment'}
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';

// type Petition = {
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: { name: string; comment: string; signedAt: Timestamp }[];
// };

// type PetitionPageProps = {
//   petitionId?: string; // Optional: can also fallback to URL
// };

// export const PetitionPage = ({ petitionId }: PetitionPageProps) => {
//   const { id: routeId } = useParams<{ id: string }>();
//   const id = petitionId || routeId;

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);

//   useEffect(() => {
//     const fetchPetition = async () => {
//       if (!id) return;
//       try {
//         const docRef = doc(db, 'petitions', id);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setPetition(docSnap.data() as Petition);
//         } else {
//           alert('Petition not found');
//         }
//       } catch (err) {
//         console.error('Error fetching petition:', err);
//       }
//     };

//     fetchPetition();
//   }, [id]);

//   const handleSign = async () => {
//     if (!id || !name.trim()) {
//       alert('Please enter your name to sign.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id);

//       await updateDoc(docRef, {
//         signatures: arrayUnion({
//           name,
//           comment,
//           signedAt: Timestamp.now(),
//         }),
//       });

//       setHasSigned(true);
//       // Optionally update local UI
//       setPetition((prev) =>
//         prev
//           ? {
//               ...prev,
//               signatures: [
//                 ...prev.signatures,
//                 { name, comment, signedAt: Timestamp.now() },
//               ],
//             }
//           : prev
//       );
//     } catch (err) {
//       console.error('Error signing petition:', err);
//     }
//   };

//   if (!petition) {
//     return <div className="text-center py-20">Loading petition...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           {petition.title}
//         </h1>

//         <p className="text-orange-600 font-semibold text-sm mb-6">
//           Show your support by signing this petition now
//         </p>

//         <div className="flex items-center text-gray-600 mb-4">
//           <FiUser className="mr-2" />
//           <span className="font-medium">{petition.createdBy}</span>
//           <span className="ml-4">
//             {petition.signatures.length} Comments
//           </span>
//         </div>

//         <div className="mb-6 flex flex-col md:flex-row gap-6">
//           <div className="md:w-2/3">
//             <img
//               src={petition.image}
//               alt="Petition"
//               className="rounded-md w-full max-h-96 object-cover mb-4"
//             />
//             <p className="text-gray-700">{petition.description}</p>
//           </div>

//           <div className="md:w-1/3 bg-blue-50 p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold mb-2">Sign This Petition</h3>
//             <p className="text-sm text-gray-600 mb-4">
//               {petition.signatures.length} people have signed. Add your voice!
//             </p>

//             {!hasSigned ? (
//               <div className="space-y-4">
//                 <Input
//                   type="text"
//                   icon={FiUser}
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <TextArea
//                   iconLeft={FiMessageCircle}
//                   rows={3}
//                   placeholder="Comments (optional)"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//                 <Button
//                   label="Sign Petition"
//                   className="w-full bg-green-600 hover:bg-green-700"
//                   onClick={handleSign}
//                 />
//               </div>
//             ) : (
//               <div className="text-center space-y-4">
//                 <p className="text-green-700 font-medium text-lg">
//                   🎉 Thank you for signing the petition!
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Share this petition with others:
//                 </p>
//                 <div className="flex justify-center space-x-2">
//                   <a
//                     href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//                   >
//                     Facebook
//                   </a>
//                   <a
//                     href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-3 py-1 bg-blue-400 text-white rounded-md text-sm"
//                   >
//                     Twitter
//                   </a>
//                   <a
//                     href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-3 py-1 bg-blue-800 text-white rounded-md text-sm"
//                   >
//                     LinkedIn
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {petition.signatures.length > 0 && (
//           <div className="mt-8">
//             <h4 className="text-xl font-semibold mb-4">Recent Signatures</h4>
//             <ul className="space-y-3">
//               {petition.signatures
//                 .slice()
//                 .reverse()
//                 .map((sig, idx) => (
//                   <li
//                     key={idx}
//                     className="border-b pb-2 text-gray-700 text-sm"
//                   >
//                     <strong>{sig.name}</strong> - {sig.comment || 'No comment'}
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';

// type Petition = {
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: { name: string; comment: string; signedAt: Timestamp }[];
// };

// type PetitionPageProps = {
//   petitionId?: string;
// };

// export const PetitionPage = ({ petitionId }: PetitionPageProps) => {
//   const { id: routeId } = useParams<{ id: string }>();
//   const id = petitionId || routeId;

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);

//   useEffect(() => {
//     const fetchPetition = async () => {
//       if (!id) return;
//       try {
//         const docRef = doc(db, 'petitions', id);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setPetition(docSnap.data() as Petition);
//         } else {
//           alert('Petition not found');
//         }
//       } catch (err) {
//         console.error('Error fetching petition:', err);
//       }
//     };

//     fetchPetition();
//   }, [id]);

//   const handleSign = async () => {
//     if (!id || !name.trim()) {
//       alert('Please enter your name to sign.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id);

//       await updateDoc(docRef, {
//         signatures: arrayUnion({
//           name,
//           comment,
//           signedAt: Timestamp.now(),
//         }),
//       });

//       setHasSigned(true);
//       setPetition((prev) =>
//         prev
//           ? {
//               ...prev,
//               signatures: [
//                 ...prev.signatures,
//                 { name, comment, signedAt: Timestamp.now() },
//               ],
//             }
//           : prev
//       );
//     } catch (err) {
//       console.error('Error signing petition:', err);
//     }
//   };

//   if (!petition) {
//     return <div className="text-center py-20 text-lg text-gray-600">Loading petition...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-3 gap-8 p-10">
//         <div className="md:col-span-2 space-y-6">
//           <h1 className="text-4xl font-extrabold text-gray-800">{petition.title}</h1>
//           <p className="text-sm text-orange-600 font-semibold uppercase tracking-wide">
//             Show your support by signing this petition now
//           </p>
//           <div className="flex items-center text-gray-600 text-sm gap-4">
//             <FiUser />
//             <span>Created by <strong>{petition.createdBy}</strong></span>
//             <span>•</span>
//             <span>{petition.signatures.length} Signatures</span>
//           </div>
//           <img
//             src={petition.image}
//             alt="Petition"
//             className="rounded-xl w-full object-cover max-h-[400px] shadow"
//           />
//           <p className="text-gray-700 text-lg leading-relaxed">{petition.description}</p>

//           {petition.signatures.length > 0 && (
//             <div className="bg-gray-50 rounded-xl p-5 shadow mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Signatures</h2>
//               <ul className="divide-y divide-gray-200">
//                 {petition.signatures
//                   .slice()
//                   .reverse()
//                   .map((sig, idx) => (
//                     <li key={idx} className="py-2 text-gray-700 text-sm">
//                       <strong className="text-gray-800">{sig.name}</strong> — {sig.comment || 'No comment'}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg h-fit">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign This Petition</h3>
//           <p className="text-sm text-gray-600 mb-4">
//             {petition.signatures.length} people have already signed. Add your voice!
//           </p>

//           {!hasSigned ? (
//             <div className="space-y-4">
//               <Input
//                 type="text"
//                 icon={FiUser}
//                 placeholder="Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <TextArea
//                 iconLeft={FiMessageCircle}
//                 rows={3}
//                 placeholder="Your Comment (Optional)"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//               <Button
//                 label="Sign Petition"
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={handleSign}
//               />
//             </div>
//           ) : (
//             <div className="text-center">
//               <p className="text-green-700 font-semibold text-lg">
//                 🎉 Thank you for signing!
//               </p>
//               <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
//               <div className="flex justify-center gap-2 mt-3">
//                 <a
//                   href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Facebook
//                 </a>
//                 <a
//                   href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Twitter
//                 </a>
//                 <a
//                   href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   LinkedIn
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
//   collection,
//   getDocs,
//   query,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';

// type Petition = {
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: { name: string; comment: string; signedAt: Timestamp }[];
// };

// type PetitionPageProps = {
//   petitionId?: string;
// };

// export const PetitionPage = ({ petitionId }: PetitionPageProps) => {
//   const { id: routeId } = useParams<{ id: string }>();
//   const id = petitionId || routeId;

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [pendingPetitions, setPendingPetitions] = useState<Petition[]>([]);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);

//   useEffect(() => {
//     const fetchPetition = async () => {
//       if (!id) return;
//       try {
//         const docRef = doc(db, 'petitions', id);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setPetition(docSnap.data() as Petition);
//         } else {
//           alert('Petition not found');
//         }
//       } catch (err) {
//         console.error('Error fetching petition:', err);
//       }
//     };

//     const fetchPendingPetitions = async () => {
//       try {
//         const q = query(collection(db, 'petitions'));
//         const querySnapshot = await getDocs(q);
//         const pending: Petition[] = [];
//         querySnapshot.forEach((docSnap) => {
//           const data = docSnap.data() as Petition;
//           if (data.signatures?.length < 20 && docSnap.id !== id) {
//             pending.push({ ...data });
//           }
//         });
//         setPendingPetitions(pending);
//       } catch (err) {
//         console.error('Error fetching pending petitions:', err);
//       }
//     };

//     fetchPetition();
//     fetchPendingPetitions();
//   }, [id]);

//   const handleSign = async () => {
//     if (!id || !name.trim()) {
//       alert('Please enter your name to sign.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id);
//       await updateDoc(docRef, {
//         signatures: arrayUnion({
//           name,
//           comment,
//           signedAt: Timestamp.now(),
//         }),
//       });

//       setHasSigned(true);
//       setPetition((prev) =>
//         prev
//           ? {
//               ...prev,
//               signatures: [
//                 ...prev.signatures,
//                 { name, comment, signedAt: Timestamp.now() },
//               ],
//             }
//           : prev
//       );
//     } catch (err) {
//       console.error('Error signing petition:', err);
//     }
//   };

//   if (!petition) {
//     return (
//       <div className="text-center py-20 text-lg text-gray-600">
//         Loading petition...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 md:px-10">
//       <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-10">
//         {/* Petition Content */}
//         <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-10 space-y-8 w-full">
//           <h1 className="text-5xl font-extrabold text-gray-900">
//             {petition.title}
//           </h1>
//           <p className="text-base text-orange-600 font-semibold uppercase tracking-wider">
//             Show your support by signing this petition
//           </p>
//           <div className="flex items-center text-gray-600 text-sm gap-4">
//             <FiUser />
//             <span>
//               Created by <strong>{petition.createdBy}</strong>
//             </span>
//             <span>•</span>
//             <span>{petition.signatures.length} Signatures</span>
//           </div>
//           <img
//             src={petition.image}
//             alt="Petition"
//             className="rounded-xl w-full object-cover max-h-[400px] shadow-lg"
//           />
//           <p className="text-gray-700 text-lg leading-relaxed">
//             {petition.description}
//           </p>

//           {petition.signatures.length > 0 && (
//             <div className="bg-gray-50 rounded-xl p-5 shadow mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 Recent Signatures
//               </h2>
//               <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
//                 {petition.signatures
//                   .slice()
//                   .reverse()
//                   .map((sig, idx) => (
//                     <li key={idx} className="py-2 text-gray-700 text-sm">
//                       <strong className="text-gray-800">{sig.name}</strong> —{' '}
//                       {sig.comment || 'No comment'}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}

//           {!hasSigned ? (
//             <div className="space-y-4 pt-6">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Sign This Petition
//               </h3>
//               <Input
//                 type="text"
//                 icon={FiUser}
//                 placeholder="Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <TextArea
//                 iconLeft={FiMessageCircle}
//                 rows={3}
//                 placeholder="Your Comment (Optional)"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//               <Button
//                 label="Sign Petition"
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={handleSign}
//               />
//             </div>
//           ) : (
//             <div className="text-center pt-6">
//               <p className="text-green-700 font-semibold text-lg">
//                 🎉 Thank you for signing!
//               </p>
//               <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 <a
//                   href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Facebook
//                 </a>
//                 <a
//                   href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Twitter
//                 </a>
//                 <a
//                   href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   LinkedIn
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Pending Petitions */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 h-fit max-h-[90vh] overflow-y-auto w-full">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Pending Petitions
//           </h2>
//           <div className="space-y-4">
//             {pendingPetitions.map((p, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition"
//               >
//                 <h4 className="text-md font-bold text-gray-700">{p.title}</h4>
//                 <p className="text-xs text-gray-500 mb-2">
//                   {p.description.slice(0, 60)}...
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   {p.signatures.length} signatures
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
//   collection,
//   getDocs,
//   query,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle, FiMic, FiX } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';
// import confetti from 'canvas-confetti';

// type Signature = {
//   name: string;
//   comment: string;
//   signedAt: Timestamp;
// };

// type Petition = {
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: Signature[];
//   docId?: string; // Add docId as an optional property
// };

// export const PetitionPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [pendingPetitions, setPendingPetitions] = useState<
//     (Petition & { docId: string })[]
//   >([]);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);
//   const [selectedPetition, setSelectedPetition] = useState<Petition | null>(
//     null
//   );

//   // Declare SpeechRecognition globally
//   type SpeechRecognition =
//     | typeof window.SpeechRecognition
//     // | (typeof (window as unknown as { webkitSpeechRecognition: SpeechRecognition }).webkitSpeechRecognition);
  
//   const recognitionRef = useRef<SpeechRecognition | null>(null);

//   useEffect(() => {
//     const fetchPetition = async () => {
//       if (!id) return;
//       const docRef = doc(db, 'petitions', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setPetition(docSnap.data() as Petition);
//       } else {
//         alert('Petition not found');
//       }
//     };

//     const fetchPendingPetitions = async () => {
//       const q = query(collection(db, 'petitions'));
//       const snapshot = await getDocs(q);
//       const result: (Petition & { docId: string })[] = [];
//       snapshot.forEach((docSnap) => {
//         const data = docSnap.data() as Petition;
//         if (data.signatures?.length < 20 && docSnap.id !== id) {
//           result.push({ ...data, docId: docSnap.id });
//         }
//       });
//       setPendingPetitions(result);
//     };

//     fetchPetition();
//     fetchPendingPetitions();
//   }, [id]);

//   const handleSign = async () => {
//     if (!name.trim()) {
//       alert('Please enter your name.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id!);
//       const newSignature = {
//         name,
//         comment,
//         signedAt: Timestamp.now(),
//       };
//       await updateDoc(docRef, {
//         signatures: arrayUnion(newSignature),
//       });

//       setHasSigned(true);
//       setPetition((prev) =>
//         prev ? { ...prev, signatures: [...prev.signatures, newSignature] } : prev
//       );

//       // Fire confetti
//       confetti({
//         particleCount: 150,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } catch (err) {
//       console.error('Signing error:', err);
//     }
//   };

//   const handleVoiceInput = (field: 'name' | 'comment') => {
//     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//       alert('Speech Recognition not supported on this browser.');
//       return;
//     }

//     const SpeechRecognition =
//       window.SpeechRecognition || (window as any).webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       if (field === 'name') setName(transcript);
//       else setComment(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 md:px-10">
//       <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-10">
//         {/* Petition Content */}
//         <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-10 space-y-8 w-full">
//           <h1 className="text-5xl font-extrabold text-gray-900">
//             {petition?.title}
//           </h1>
//           <p className="text-base text-orange-600 font-semibold uppercase tracking-wider">
//             Show your support by signing this petition
//           </p>
//           <div className="flex items-center text-gray-600 text-sm gap-4">
//             <FiUser />
//             <span>
//               Created by <strong>{petition?.createdBy}</strong>
//             </span>
//             <span>•</span>
//             <span>{petition?.signatures.length} Signatures</span>
//           </div>
//           <img
//             src={petition?.image}
//             alt="Petition"
//             className="rounded-xl w-full object-cover max-h-[400px] shadow-lg"
//           />
//           <p className="text-gray-700 text-lg leading-relaxed">
//             {petition?.description}
//           </p>

//           {/* Recent Signatures */}
//           {(petition?.signatures?.length ?? 0) > 0 && (
//             <div className="bg-gray-50 rounded-xl p-5 shadow mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 Recent Signatures
//               </h2>
//               <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
//                 {petition?.signatures
//                   .slice()
//                   .reverse()
//                   .map((sig, idx) => (
//                     <li key={idx} className="py-2 text-gray-700 text-sm">
//                       <strong className="text-gray-800">{sig.name}</strong> —{' '}
//                       {sig.comment || 'No comment'}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}

//           {!hasSigned ? (
//             <div className="space-y-4 pt-6">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Sign This Petition
//               </h3>
//               <div className="relative">
//                 <Input
//                   type="text"
//                   icon={FiUser}
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   aria-label="Your Name"
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('name')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <div className="relative">
//                 <TextArea
//                   iconLeft={FiMessageCircle}
//                   rows={3}
//                   placeholder="Your Comment (Optional)"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   aria-label="Your Comment"
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('comment')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <Button
//                 label="Sign Petition"
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={handleSign}
//               />
//             </div>
//           ) : (
//             <div className="text-center pt-6">
//               <p className="text-green-700 font-semibold text-lg">
//                 🎉 Thank you for signing!
//               </p>
//               <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 <a
//                   href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Facebook
//                 </a>
//                 <a
//                   href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Twitter
//                 </a>
//                 <a
//                   href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   LinkedIn
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Pending Petitions */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 h-fit max-h-[90vh] overflow-y-auto w-full">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Pending Petitions
//           </h2>
//           <div className="space-y-4">
//             {pendingPetitions.map((p, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
//                 onClick={() => setSelectedPetition(p)}
//               >
//                 <h4 className="text-md font-bold text-gray-700">{p.title}</h4>
//                 <p className="text-xs text-gray-500 mb-2">
//                   {p.description.slice(0, 60)}...
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   {p.signatures.length} signatures
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modal for pending petition preview */}
//       {selectedPetition && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 relative">
//             <button
//               onClick={() => navigate(`/petitions/${selectedPetition.docId}`)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black text-lg"
//               title="Open in full page"
//             >
//               🔗
//             </button>
//             <button
//               onClick={() => setSelectedPetition(null)}
//               className="absolute top-4 left-4 text-gray-500 hover:text-black"
//             >
//               <FiX size={20} />
//             </button>
//             <h2 className="text-xl font-bold">{selectedPetition.title}</h2>
//             <p className="text-sm mt-2 text-gray-600">{selectedPetition.description}</p>
//             <p className="text-xs text-gray-400 mt-2">
//               {selectedPetition.signatures.length} signatures
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
//   collection,
//   getDocs,
//   query,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle, FiMic, FiX } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';
// import confetti from 'canvas-confetti';

// type Signature = {
//   name: string;
//   comment: string;
//   signedAt: Timestamp;
// };

// type Petition = {
//   docId: any;
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: Signature[];
// };

// const MAX_SIGNATURES = 20;

// export const PetitionPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [pendingPetitions, setPendingPetitions] = useState<
//     (Petition & { docId: string })[]
//   >([]);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);
//   const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);

//   type SpeechRecognition =
//     | typeof window.SpeechRecognition
//     // | (typeof window & { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;

//   const recognitionRef = useRef<SpeechRecognition | null>(null);

//   useEffect(() => {
//     const fetchPetition = async () => {
//       if (!id) return;
//       const docRef = doc(db, 'petitions', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setPetition(docSnap.data() as Petition);
//       } else {
//         alert('Petition not found');
//       }
//     };

//     const fetchPendingPetitions = async () => {
//       const q = query(collection(db, 'petitions'));
//       const snapshot = await getDocs(q);
//       const result: (Petition & { docId: string })[] = [];
//       snapshot.forEach((docSnap) => {
//         const data = docSnap.data() as Petition;
//         if (data.signatures?.length < MAX_SIGNATURES && docSnap.id !== id) {
//           result.push({ ...data, docId: docSnap.id });
//         }
//       });
//       setPendingPetitions(result);
//     };

//     fetchPetition();
//     fetchPendingPetitions();
//   }, [id]);

//   const handleSign = async () => {
//     if (!name.trim()) {
//       alert('Please enter your name.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id!);
//       const newSignature = {
//         name,
//         comment,
//         signedAt: Timestamp.now(),
//       };
//       await updateDoc(docRef, {
//         signatures: arrayUnion(newSignature),
//       });

//       setHasSigned(true);
//       setPetition((prev) =>
//         prev ? { ...prev, signatures: [...prev.signatures, newSignature] } : prev
//       );

//       // Fire confetti
//       confetti({
//         particleCount: 150,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } catch (err) {
//       console.error('Signing error:', err);
//     }
//   };

//   const handleVoiceInput = (field: 'name' | 'comment') => {
//     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//       alert('Speech Recognition not supported on this browser.');
//       return;
//     }

//     const SpeechRecognition =
//       window.SpeechRecognition || (window as any).webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       if (field === 'name') setName(transcript);
//       else setComment(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const signaturePercentage = Math.min(
//     Math.round(((petition?.signatures.length || 0) / MAX_SIGNATURES) * 100),
//     100
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 md:px-10">
//       <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-10">
//         {/* Petition Content */}
//         <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-10 space-y-8 w-full">
//           <h1 className="text-5xl font-extrabold text-gray-900">
//             {petition?.title}
//           </h1>
//           <p className="text-base text-orange-600 font-semibold uppercase tracking-wider">
//             Show your support by signing this petition
//           </p>
//           <div className="flex items-center text-gray-600 text-sm gap-4">
//             <FiUser />
//             <span>
//               Created by <strong>{petition?.createdBy}</strong>
//             </span>
//             <span>•</span>
//             <span>{petition?.signatures.length} Signatures</span>
//           </div>

//           {/* 🎨 Progress Bar */}
//           <div className="mt-4">
//             <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
//               <span>{petition?.signatures.length || 0} / {MAX_SIGNATURES} Signatures</span>
//               <span>{signaturePercentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//               <div
//                 className="bg-green-500 h-full transition-all duration-700 ease-in-out"
//                 style={{ width: `${signaturePercentage}%` }}
//               ></div>
//             </div>
//           </div>

//           <img
//             src={petition?.image}
//             alt="Petition"
//             className="rounded-xl w-full object-cover max-h-[400px] shadow-lg"
//           />
//           <p className="text-gray-700 text-lg leading-relaxed">
//             {petition?.description}
//           </p>

//           {/* Recent Signatures */}
//           {(petition?.signatures?.length ?? 0) > 0 && (
//             <div className="bg-gray-50 rounded-xl p-5 shadow mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 Recent Signatures
//               </h2>
//               <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
//                 {petition?.signatures
//                   ?.slice()
//                   .reverse()
//                   .map((sig, idx) => (
//                     <li key={idx} className="py-2 text-gray-700 text-sm">
//                       <strong className="text-gray-800">{sig.name}</strong> —{' '}
//                       {sig.comment || 'No comment'}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}

//           {!hasSigned ? (
//             <div className="space-y-4 pt-6">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Sign This Petition
//               </h3>
//               <div className="relative">
//                 <Input
//                   type="text"
//                   icon={FiUser}
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   aria-label="Your Name"
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('name')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <div className="relative">
//                 <TextArea
//                   iconLeft={FiMessageCircle}
//                   rows={3}
//                   placeholder="Your Comment (Optional)"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   aria-label="Your Comment"
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('comment')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <Button
//                 label="Sign Petition"
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={handleSign}
//               />
//             </div>
//           ) : (
//             <div className="text-center pt-6">
//               <p className="text-green-700 font-semibold text-lg">
//                 🎉 Thank you for signing!
//               </p>
//               <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 <a
//                   href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Facebook
//                 </a>
//                 <a
//                   href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Twitter
//                 </a>
//                 <a
//                   href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   LinkedIn
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Pending Petitions */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 h-fit max-h-[90vh] overflow-y-auto w-full">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Pending Petitions
//           </h2>
//           <div className="space-y-4">
//             {pendingPetitions.map((p, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
//                 onClick={() => setSelectedPetition(p)}
//               >
//                 <h4 className="text-md font-bold text-gray-700">{p.title}</h4>
//                 <p className="text-xs text-gray-500 mb-2">
//                   {p.description.slice(0, 60)}...
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   {p.signatures.length} signatures
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modal for pending petition preview */}
//       {selectedPetition && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 relative">
//             <button
//               onClick={() => navigate(`/petitions/${selectedPetition.docId}`)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black text-lg"
//               title="Open in full page"
//             >
//               🔗
//             </button>
//             <button
//               onClick={() => setSelectedPetition(null)}
//               className="absolute top-4 left-4 text-gray-500 hover:text-black"
//             >
//               <FiX size={20} />
//             </button>
//             <h2 className="text-xl font-bold">{selectedPetition.title}</h2>
//             <p className="text-sm mt-2 text-gray-600">{selectedPetition.description}</p>
//             <p className="text-xs text-gray-400 mt-2">
//               {selectedPetition.signatures.length} signatures
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };




// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
//   collection,
//   getDocs,
//   query,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle, FiMic, FiX } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';
// import confetti from 'canvas-confetti';

// type Signature = {
//   name: string;
//   comment: string;
//   signedAt: Timestamp;
// };

// type Petition = {
//   docId: any;
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: Signature[];
// };

// const MAX_SIGNATURES = 20;

// export const PetitionPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [pendingPetitions, setPendingPetitions] = useState<(Petition & { docId: string })[]>([]);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);
//   const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);
//   const recognitionRef = useRef<any>(null);

//   useEffect(() => {
//     const fetchPetition = async () => {
//       if (!id) return;
//       const docRef = doc(db, 'petitions', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setPetition({ ...(docSnap.data() as Petition), docId: docSnap.id });
//       } else {
//         alert('Petition not found');
//       }
//     };

//     const fetchPendingPetitions = async () => {
//       const q = query(collection(db, 'petitions'));
//       const snapshot = await getDocs(q);
//       const result: (Petition & { docId: string })[] = [];
//       snapshot.forEach((docSnap) => {
//         const data = docSnap.data() as Petition;
//         if (data.signatures?.length < MAX_SIGNATURES && docSnap.id !== id) {
//           result.push({ ...data, docId: docSnap.id });
//         }
//       });
//       setPendingPetitions(result);
//     };

//     fetchPetition();
//     fetchPendingPetitions();
//   }, [id]);

//   const handleSign = async () => {
//     if (!name.trim()) {
//       alert('Please enter your name.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id!);
//       const newSignature = {
//         name,
//         comment,
//         signedAt: Timestamp.now(),
//       };
//       await updateDoc(docRef, {
//         signatures: arrayUnion(newSignature),
//       });

//       setHasSigned(true);
//       setPetition((prev) =>
//         prev ? { ...prev, signatures: [...prev.signatures, newSignature] } : prev
//       );

//       confetti({
//         particleCount: 200,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } catch (err) {
//       console.error('Signing error:', err);
//     }
//   };

//   const handleVoiceInput = (field: 'name' | 'comment') => {
//     const SpeechRecognition =
//       window.SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert('Speech Recognition not supported in this browser.');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       field === 'name' ? setName(transcript) : setComment(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const signaturePercentage = Math.min(
//     Math.round(((petition?.signatures.length || 0) / MAX_SIGNATURES) * 100),
//     100
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 md:px-10">
//       <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-10">
//         {/* Petition Details */}
//         <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-10 space-y-8 w-full">
//           <h1 className="text-5xl font-extrabold text-gray-900">{petition?.title}</h1>
//           <p className="text-base text-orange-600 font-semibold uppercase tracking-wider">
//             Show your support by signing this petition
//           </p>

//           <div className="flex items-center text-gray-600 text-sm gap-4">
//             <FiUser />
//             <span>
//               Created by <strong>{petition?.createdBy}</strong>
//             </span>
//             <span>•</span>
//             <span>{petition?.signatures.length} Signatures</span>
//           </div>

//           <div className="mt-4">
//             <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
//               <span>
//                 {petition?.signatures.length || 0} / {MAX_SIGNATURES} Signatures
//               </span>
//               <span>{signaturePercentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//               <div
//                 className="bg-green-500 h-full transition-all duration-700 ease-in-out"
//                 style={{ width: `${signaturePercentage}%` }}
//               />
//             </div>
//           </div>

//           <img
//             src={petition?.image}
//             alt="Petition"
//             className="rounded-xl w-full object-cover max-h-[400px] shadow-lg"
//           />

//           <p className="text-gray-700 text-lg leading-relaxed">{petition?.description}</p>

//           {(petition?.signatures?.length ?? 0) > 0 && (
//             <div className="bg-gray-50 rounded-xl p-5 shadow mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 Recent Signatures
//               </h2>
//               <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
//                 {petition?.signatures
//                   ?.slice()
//                   .reverse()
//                   .map((sig, idx) => (
//                     <li key={idx} className="py-2 text-gray-700 text-sm">
//                       <strong className="text-gray-800">{sig.name}</strong> —{' '}
//                       {sig.comment || 'No comment'}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}

//           {!hasSigned ? (
//             <div className="space-y-4 pt-6">
//               <h3 className="text-xl font-semibold text-gray-800">Sign This Petition</h3>
//               <div className="relative">
//                 <Input
//                   type="text"
//                   icon={FiUser}
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('name')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <div className="relative">
//                 <TextArea
//                   iconLeft={FiMessageCircle}
//                   rows={3}
//                   placeholder="Your Comment (Optional)"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('comment')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <Button
//                 label="Sign Petition"
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={handleSign}
//               />
//             </div>
//           ) : (
//             <div className="text-center pt-6">
//               <p className="text-green-700 font-semibold text-lg">🎉 Thank you for signing!</p>
//               <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 {['Facebook', 'Twitter', 'LinkedIn'].map((platform, i) => {
//                   const urls = {
//                     Facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
//                     Twitter: `https://twitter.com/intent/tweet?url=${window.location.href}`,
//                     LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
//                   };
//                   const colors = {
//                     Facebook: 'bg-blue-600 hover:bg-blue-700',
//                     Twitter: 'bg-blue-400 hover:bg-blue-500',
//                     LinkedIn: 'bg-blue-800 hover:bg-blue-900',
//                   };
//                   return (
//                     <a
//                       key={i}
//                       href={urls[platform as keyof typeof urls]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`${colors[platform as keyof typeof colors]} text-white px-3 py-1 rounded-md text-sm`}
//                     >
//                       {platform}
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Side: Pending Petitions */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 h-fit max-h-[90vh] overflow-y-auto w-full">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Petitions</h2>
//           <div className="space-y-4">
//             {pendingPetitions.map((p, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
//                 onClick={() => setSelectedPetition(p)}
//               >
//                 <h4 className="text-md font-bold text-gray-700">{p.title}</h4>
//                 <p className="text-xs text-gray-500 mb-2">{p.description.slice(0, 60)}...</p>
//                 <p className="text-xs text-gray-600">{p.signatures.length} signatures</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modal for Pending Petition */}
//       {selectedPetition && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 relative">
//             <button
//               onClick={() => navigate(`/petitions/${selectedPetition.docId}`)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black text-lg"
//               title="Open in full page"
//             >
//               🔗
//             </button>
//             <button
//               onClick={() => setSelectedPetition(null)}
//               className="absolute top-4 left-4 text-gray-500 hover:text-black"
//             >
//               <FiX size={20} />
//             </button>
//             <h2 className="text-xl font-bold">{selectedPetition.title}</h2>
//             <p className="text-sm mt-2 text-gray-600">{selectedPetition.description}</p>
//             <p className="text-xs text-gray-400 mt-2">
//               {selectedPetition.signatures.length} signatures
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };




// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
//   collection,
//   getDocs,
//   query,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle, FiMic, FiX } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';
// import confetti from 'canvas-confetti';

// type Signature = {
//   name: string;
//   comment: string;
//   signedAt: Timestamp;
// };

// type Petition = {
//   docId: string;
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: Signature[];
// };

// const MAX_SIGNATURES = 20;

// export const PetitionPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [pendingPetitions, setPendingPetitions] = useState<Petition[]>([]);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);
//   const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);
//   const recognitionRef = useRef<any>(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       const docRef = doc(db, 'petitions', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const data = docSnap.data() as Petition;
//         const newPetition = { ...data, docId: docSnap.id };
//         setPetition(newPetition);

//         // Reset form and hasSigned state when switching petitions
//         setName('');
//         setComment('');
//         setHasSigned(
//           newPetition.signatures?.some(
//             (sig) => sig.name.toLowerCase() === name.trim().toLowerCase()
//           )
//         );
//       } else {
//         alert('Petition not found');
//       }

//       const snapshot = await getDocs(query(collection(db, 'petitions')));
//       const result: Petition[] = [];
//       snapshot.forEach((docSnap) => {
//         const data = docSnap.data() as Petition;
//         if (data.signatures?.length < MAX_SIGNATURES && docSnap.id !== id) {
//           result.push({ ...data, docId: docSnap.id });
//         }
//       });
//       setPendingPetitions(result);
//     };

//     fetchData();
//   }, [id]);

//   const handleSign = async () => {
//     if (!name.trim()) {
//       alert('Please enter your name.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id!);
//       const newSignature = {
//         name,
//         comment,
//         signedAt: Timestamp.now(),
//       };
//       await updateDoc(docRef, {
//         signatures: arrayUnion(newSignature),
//       });

//       setHasSigned(true);
//       setPetition((prev) =>
//         prev ? { ...prev, signatures: [...prev.signatures, newSignature] } : prev
//       );

//       confetti({
//         particleCount: 200,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } catch (err) {
//       console.error('Signing error:', err);
//     }
//   };

//   const handleVoiceInput = (field: 'name' | 'comment') => {
//     const SpeechRecognition =
//       window.SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert('Speech Recognition not supported in this browser.');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       field === 'name' ? setName(transcript) : setComment(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const signaturePercentage = Math.min(
//     Math.round(((petition?.signatures.length || 0) / MAX_SIGNATURES) * 100),
//     100
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 md:px-10">
//       <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-10">
//         {/* Petition Details */}
//         <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-10 space-y-8 w-full">
//           <h1 className="text-5xl font-extrabold text-gray-900">{petition?.title}</h1>
//           <p className="text-base text-orange-600 font-semibold uppercase tracking-wider">
//             Show your support by signing this petition
//           </p>

//           <div className="flex items-center text-gray-600 text-sm gap-4">
//             <FiUser />
//             <span>
//               Created by <strong>{petition?.createdBy}</strong>
//             </span>
//             <span>•</span>
//             <span>{petition?.signatures.length} Signatures</span>
//           </div>

//           <div className="mt-4">
//             <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
//               <span>
//                 {petition?.signatures.length || 0} / {MAX_SIGNATURES} Signatures
//               </span>
//               <span>{signaturePercentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//               <div
//                 className="bg-green-500 h-full transition-all duration-700 ease-in-out"
//                 style={{ width: `${signaturePercentage}%` }}
//               />
//             </div>
//           </div>

//           <img
//             src={petition?.image}
//             alt="Petition"
//             className="rounded-xl w-full object-cover max-h-[400px] shadow-lg"
//           />

//           <p className="text-gray-700 text-lg leading-relaxed">{petition?.description}</p>

//           {(petition?.signatures?.length ?? 0) > 0 && (
//             <div className="bg-gray-50 rounded-xl p-5 shadow mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 Recent Signatures
//               </h2>
//               <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
//                 {petition?.signatures
//                   ?.slice()
//                   .reverse()
//                   .map((sig, idx) => (
//                     <li key={idx} className="py-2 text-gray-700 text-sm">
//                       <strong className="text-gray-800">{sig.name}</strong> —{' '}
//                       {sig.comment || 'No comment'}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}

//           {!hasSigned ? (
//             <div className="space-y-4 pt-6">
//               <h3 className="text-xl font-semibold text-gray-800">Sign This Petition</h3>
//               <div className="relative">
//                 <Input
//                   type="text"
//                   icon={FiUser}
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('name')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <div className="relative">
//                 <TextArea
//                   iconLeft={FiMessageCircle}
//                   rows={3}
//                   placeholder="Your Comment (Optional)"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('comment')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <Button
//                 label="Sign Petition"
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={handleSign}
//               />
//             </div>
//           ) : (
//             <div className="text-center pt-6">
//               <p className="text-green-700 font-semibold text-lg">🎉 Thank you for signing!</p>
//               <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 {['Facebook', 'Twitter', 'LinkedIn'].map((platform, i) => {
//                   const urls = {
//                     Facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
//                     Twitter: `https://twitter.com/intent/tweet?url=${window.location.href}`,
//                     LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
//                   };
//                   const colors = {
//                     Facebook: 'bg-blue-600 hover:bg-blue-700',
//                     Twitter: 'bg-blue-400 hover:bg-blue-500',
//                     LinkedIn: 'bg-blue-800 hover:bg-blue-900',
//                   };
//                   return (
//                     <a
//                       key={i}
//                       href={urls[platform as keyof typeof urls]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`${colors[platform as keyof typeof colors]} text-white px-3 py-1 rounded-md text-sm`}
//                     >
//                       {platform}
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Side: Pending Petitions */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 h-fit max-h-[90vh] overflow-y-auto w-full">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Petitions</h2>
//           <div className="space-y-4">
//             {pendingPetitions.map((p, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
//                 onClick={() => setSelectedPetition(p)}
//               >
//                 <h4 className="text-md font-bold text-gray-700">{p.title}</h4>
//                 <p className="text-xs text-gray-500 mb-2">{p.description.slice(0, 60)}...</p>
//                 <p className="text-xs text-gray-600">{p.signatures.length} signatures</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modal for Pending Petition */}
//       {selectedPetition && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 relative">
//             <button
//               onClick={() => navigate(`/petitions/${selectedPetition.docId}`)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black text-lg"
//               title="Open in full page"
//             >
//               🔗
//             </button>
//             <button
//               onClick={() => setSelectedPetition(null)}
//               className="absolute top-4 left-4 text-gray-500 hover:text-black"
//             >
//               <FiX size={20} />
//             </button>
//             <h2 className="text-xl font-bold">{selectedPetition.title}</h2>
//             <p className="text-sm mt-2 text-gray-600">{selectedPetition.description}</p>
//             <p className="text-xs text-gray-400 mt-2">
//               {selectedPetition.signatures.length} signatures
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };




// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
//   collection,
//   getDocs,
//   query,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle, FiMic } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';
// import confetti from 'canvas-confetti';

// type Signature = {
//   name: string;
//   comment: string;
//   signedAt: Timestamp;
// };

// type Petition = {
//   docId: string;
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: Signature[];
// };

// const MAX_SIGNATURES = 20;

// export const PetitionPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [pendingPetitions, setPendingPetitions] = useState<Petition[]>([]);
//   const [signedPetitions, setSignedPetitions] = useState<Petition[]>([]);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);
//   const recognitionRef = useRef<any>(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       const docRef = doc(db, 'petitions', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const data = docSnap.data() as Petition;
//         const newPetition = { ...data, docId: docSnap.id };
//         setPetition(newPetition);

//         const alreadySigned = newPetition.signatures?.some(
//           (sig) => sig.name.toLowerCase() === name.trim().toLowerCase()
//         );
//         setHasSigned(alreadySigned);
//       } else {
//         alert('Petition not found');
//       }

//       const snapshot = await getDocs(query(collection(db, 'petitions')));
//       const result: Petition[] = [];
//       const signed: Petition[] = [];

//       snapshot.forEach((docSnap) => {
//         const data = docSnap.data() as Petition;
//         const p = { ...data, docId: docSnap.id };
//         const userSigned = p.signatures?.some(
//           (sig) => sig.name.toLowerCase() === name.trim().toLowerCase()
//         );

//         if (userSigned) {
//           signed.push(p);
//         } else if (p.signatures?.length < MAX_SIGNATURES && docSnap.id !== id) {
//           result.push(p);
//         }
//       });

//       setPendingPetitions(result);
//       setSignedPetitions(signed);
//     };

//     fetchData();
//   }, [id, name]);

//   const handleSign = async () => {
//     if (!name.trim()) {
//       alert('Please enter your name.');
//       return;
//     }

//     const alreadySigned = petition?.signatures?.some(
//       (sig) => sig.name.toLowerCase() === name.trim().toLowerCase()
//     );
//     if (alreadySigned) {
//       alert('You have already signed this petition.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id!);
//       const newSignature = {
//         name,
//         comment,
//         signedAt: Timestamp.now(),
//       };
//       await updateDoc(docRef, {
//         signatures: arrayUnion(newSignature),
//       });

//       const updatedPetition: Petition = {
//         ...(petition as Petition),
//         signatures: [...(petition?.signatures || []), newSignature],
//       };
//       setPetition(updatedPetition);
//       setHasSigned(true);
//       setSignedPetitions((prev) => [...prev, updatedPetition]);
//       setPendingPetitions((prev) =>
//         prev.filter((p) => p.docId !== updatedPetition.docId)
//       );

//       setName('');
//       setComment('');

//       confetti({
//         particleCount: 200,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } catch (err) {
//       console.error('Signing error:', err);
//     }
//   };

//   const handleVoiceInput = (field: 'name' | 'comment') => {
//     const SpeechRecognition =
//       window.SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert('Speech Recognition not supported in this browser.');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       field === 'name' ? setName(transcript) : setComment(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const signaturePercentage = Math.min(
//     Math.round(((petition?.signatures.length || 0) / MAX_SIGNATURES) * 100),
//     100
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 md:px-10">
//       <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-10">
//         {/* Petition Details */}
//         <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-10 space-y-8 w-full">
//           <h1 className="text-5xl font-extrabold text-gray-900">{petition?.title}</h1>
//           <p className="text-base text-orange-600 font-semibold uppercase tracking-wider">
//             Show your support by signing this petition
//           </p>

//           <div className="flex items-center text-gray-600 text-sm gap-4">
//             <FiUser />
//             <span>
//               Created by <strong>{petition?.createdBy}</strong>
//             </span>
//             <span>•</span>
//             <span>{petition?.signatures.length} Signatures</span>
//           </div>

//           <div className="mt-4">
//             <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
//               <span>
//                 {petition?.signatures.length || 0} / {MAX_SIGNATURES} Signatures
//               </span>
//               <span>{signaturePercentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//               <div
//                 className="bg-green-500 h-full transition-all duration-700 ease-in-out"
//                 style={{ width: `${signaturePercentage}%` }}
//               />
//             </div>
//           </div>

//           <img
//             src={petition?.image}
//             alt="Petition"
//             className="rounded-xl w-full object-cover max-h-[400px] shadow-lg"
//           />

//           <p className="text-gray-700 text-lg leading-relaxed">{petition?.description}</p>

//           {(petition?.signatures?.length ?? 0) > 0 && (
//             <div className="bg-gray-50 rounded-xl p-5 shadow mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Signatures</h2>
//               <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
//                 {petition?.signatures
//                   ?.slice()
//                   .reverse()
//                   .map((sig, idx) => (
//                     <li key={idx} className="py-2 text-gray-700 text-sm">
//                       <strong className="text-gray-800">{sig.name}</strong> —{' '}
//                       {sig.comment || 'No comment'}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}

//           {!hasSigned ? (
//             <div className="space-y-4 pt-6">
//               <h3 className="text-xl font-semibold text-gray-800">Sign This Petition</h3>
//               <div className="relative">
//                 <Input
//                   type="text"
//                   icon={FiUser}
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('name')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <div className="relative">
//                 <TextArea
//                   iconLeft={FiMessageCircle}
//                   rows={3}
//                   placeholder="Your Comment (Optional)"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('comment')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <Button
//                 label="Sign Petition"
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={handleSign}
//               />
//             </div>
//           ) : (
//             <div className="text-center pt-6">
//               <p className="text-green-700 font-semibold text-lg">🎉 Thank you for signing!</p>
//               <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 {['Facebook', 'Twitter', 'LinkedIn'].map((platform, i) => {
//                   const urls = {
//                     Facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
//                     Twitter: `https://twitter.com/intent/tweet?url=${window.location.href}`,
//                     LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
//                   };
//                   const colors = {
//                     Facebook: 'bg-blue-600 hover:bg-blue-700',
//                     Twitter: 'bg-blue-400 hover:bg-blue-500',
//                     LinkedIn: 'bg-blue-800 hover:bg-blue-900',
//                   };
//                   return (
//                     <a
//                       key={i}
//                       href={urls[platform as keyof typeof urls]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`${colors[platform as keyof typeof colors]} text-white px-3 py-1 rounded-md text-sm`}
//                     >
//                       {platform}
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Side Panel */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 h-fit max-h-[90vh] overflow-y-auto w-full space-y-10">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Petitions</h2>
//             <div className="space-y-4">
//               {pendingPetitions.map((p, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
//                   onClick={() => navigate(`/petitions/${p.docId}`)}
//                 >
//                   <h4 className="text-md font-bold text-gray-700">{p.title}</h4>
//                   <p className="text-xs text-gray-500 mb-2">{p.description.slice(0, 60)}...</p>
//                   <p className="text-xs text-gray-600">{p.signatures.length} signatures</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {hasSigned && signedPetitions.length > 0 && (
//             <div>
//               <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Signed Petitions</h2>
//               <div className="space-y-4">
//                 {signedPetitions.map((p, index) => (
//                   <div
//                     key={index}
//                     className="border border-green-300 bg-green-50 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
//                     onClick={() => navigate(`/petitions/${p.docId}`)}
//                   >
//                     <h4 className="text-md font-bold text-green-800">{p.title}</h4>
//                     <p className="text-xs text-green-600">{p.signatures.length} signatures</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };



// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { db } from '../config/firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
//   collection,
//   getDocs,
//   query,
// } from 'firebase/firestore';
// import { FiUser, FiMessageCircle, FiMic } from 'react-icons/fi';
// import { Button } from '../components/Button';
// import { TextArea } from '../components/TextArea';
// import { Input } from '../components/Input';
// import confetti from 'canvas-confetti';
// import { getAuth } from 'firebase/auth';

// type Signature = {
//   name: string;
//   comment: string;
//   signedAt: Timestamp;
//   uid?: string;
// };

// type Petition = {
//   docId: string;
//   title: string;
//   description: string;
//   createdBy: string;
//   image: string;
//   signatures: Signature[];
// };

// const MAX_SIGNATURES = 20;

// export const PetitionPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const auth = getAuth();

//   const [petition, setPetition] = useState<Petition | null>(null);
//   const [pendingPetitions, setPendingPetitions] = useState<Petition[]>([]);
//   const [signedPetitions, setSignedPetitions] = useState<Petition[]>([]);
//   const [comment, setComment] = useState('');
//   const [hasSigned, setHasSigned] = useState(false);
//   const recognitionRef = useRef<any>(null);
//   const user = auth.currentUser;

//   useEffect(() => {
//     if (!id || !user) return;

//     const fetchData = async () => {
//       const docRef = doc(db, 'petitions', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const data = docSnap.data() as Petition;
//         const newPetition = { ...data, docId: docSnap.id };
//         setPetition(newPetition);

//         const alreadySigned = newPetition.signatures?.some(
//           (sig) => sig.uid === user.uid
//         );
//         setHasSigned(alreadySigned);
//       } else {
//         alert('Petition not found');
//       }

//       const snapshot = await getDocs(query(collection(db, 'petitions')));
//       const result: Petition[] = [];
//       const signed: Petition[] = [];

//       snapshot.forEach((docSnap) => {
//         const data = docSnap.data() as Petition;
//         const p = { ...data, docId: docSnap.id };
//         const userSigned = p.signatures?.some((sig) => sig.uid === user.uid);

//         if (userSigned) {
//           signed.push(p);
//         } else if (p.signatures?.length < MAX_SIGNATURES && docSnap.id !== id) {
//           result.push(p);
//         }
//       });

//       setPendingPetitions(result);
//       setSignedPetitions(signed);
//     };

//     fetchData();
//   }, [id, user]);

//   const handleSign = async () => {
//     if (!user) {
//       alert('You must be signed in to sign a petition.');
//       return;
//     }

//     const alreadySigned = petition?.signatures?.some(
//       (sig) => sig.uid === user.uid
//     );
//     if (alreadySigned) {
//       alert('You have already signed this petition.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'petitions', id!);
//       const newSignature = {
//         name: user.displayName || 'Anonymous',
//         comment,
//         signedAt: Timestamp.now(),
//         uid: user.uid,
//       };
//       await updateDoc(docRef, {
//         signatures: arrayUnion(newSignature),
//       });

//       const updatedPetition: Petition = {
//         ...(petition as Petition),
//         signatures: [...(petition?.signatures || []), newSignature],
//       };
//       setPetition(updatedPetition);
//       setHasSigned(true);
//       setSignedPetitions((prev) => [...prev, updatedPetition]);
//       setPendingPetitions((prev) =>
//         prev.filter((p) => p.docId !== updatedPetition.docId)
//       );
//       setComment('');

//       confetti({
//         particleCount: 200,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } catch (err) {
//       console.error('Signing error:', err);
//     }
//   };

//   const handleVoiceInput = (field: 'comment') => {
//     const SpeechRecognition =
//       window.SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert('Speech Recognition not supported in this browser.');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       if (field === 'comment') setComment(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const signaturePercentage = Math.min(
//     Math.round(((petition?.signatures.length || 0) / MAX_SIGNATURES) * 100),
//     100
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 md:px-10">
//       <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-10">
//         {/* Petition Content */}
//         <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-10 space-y-8 w-full">
//           <h1 className="text-5xl font-extrabold text-gray-900">{petition?.title}</h1>
//           <p className="text-base text-orange-600 font-semibold uppercase tracking-wider">
//             Show your support by signing this petition
//           </p>

//           <div className="flex items-center text-gray-600 text-sm gap-4">
//             <FiUser />
//             <span>
//               Created by <strong>{petition?.createdBy}</strong>
//             </span>
//             <span>•</span>
//             <span>{petition?.signatures.length} Signatures</span>
//           </div>

//           <div className="mt-4">
//             <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
//               <span>
//                 {petition?.signatures.length || 0} / {MAX_SIGNATURES} Signatures
//               </span>
//               <span>{signaturePercentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//               <div
//                 className="bg-green-500 h-full transition-all duration-700 ease-in-out"
//                 style={{ width: `${signaturePercentage}%` }}
//               />
//             </div>
//           </div>

//           <img
//             src={petition?.image}
//             alt="Petition"
//             className="rounded-xl w-full object-cover max-h-[400px] shadow-lg"
//           />

//           <p className="text-gray-700 text-lg leading-relaxed">{petition?.description}</p>

//           {(petition?.signatures?.length ?? 0) > 0 && (
//             <div className="bg-gray-50 rounded-xl p-5 shadow mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Signatures</h2>
//               <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
//                 {petition?.signatures
//                   ?.slice()
//                   .reverse()
//                   .map((sig, idx) => (
//                     <li key={idx} className="py-2 text-gray-700 text-sm">
//                       <strong className="text-gray-800">{sig.name}</strong> —{' '}
//                       {sig.comment || 'No comment'}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}

//           {!hasSigned ? (
//             <div className="space-y-4 pt-6">
//               <h3 className="text-xl font-semibold text-gray-800">Sign This Petition</h3>
//               <div className="relative">
//                 <TextArea
//                   iconLeft={FiMessageCircle}
//                   rows={3}
//                   placeholder="Your Comment (Optional)"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//                 <FiMic
//                   onClick={() => handleVoiceInput('comment')}
//                   className="absolute right-3 top-3 text-gray-500 cursor-pointer"
//                 />
//               </div>
//               <Button
//                 label="Sign Petition"
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={handleSign}
//               />
//             </div>
//           ) : (
//             <div className="text-center pt-6">
//               <p className="text-green-700 font-semibold text-lg">🎉 Thank you for signing!</p>
//               <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 {['Facebook', 'Twitter', 'LinkedIn'].map((platform, i) => {
//                   const urls = {
//                     Facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
//                     Twitter: `https://twitter.com/intent/tweet?url=${window.location.href}`,
//                     LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
//                   };
//                   const colors = {
//                     Facebook: 'bg-blue-600 hover:bg-blue-700',
//                     Twitter: 'bg-blue-400 hover:bg-blue-500',
//                     LinkedIn: 'bg-blue-800 hover:bg-blue-900',
//                   };
//                   return (
//                     <a
//                       key={i}
//                       href={urls[platform as keyof typeof urls]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`${colors[platform as keyof typeof colors]} text-white px-3 py-1 rounded-md text-sm`}
//                     >
//                       {platform}
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Sidebar */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 h-fit max-h-[90vh] overflow-y-auto w-full space-y-10">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Petitions</h2>
//             <div className="space-y-4">
//               {pendingPetitions.map((p, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
//                   onClick={() => navigate(`/petitions/${p.docId}`)}
//                 >
//                   <h4 className="text-md font-bold text-gray-700">{p.title}</h4>
//                   <p className="text-xs text-gray-500 mb-2">{p.description.slice(0, 60)}...</p>
//                   <p className="text-xs text-gray-600">{p.signatures.length} signatures</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {hasSigned && signedPetitions.length > 0 && (
//             <div>
//               <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Signed Petitions</h2>
//               <div className="space-y-4">
//                 {signedPetitions.map((p, index) => (
//                   <div
//                     key={index}
//                     className="border border-green-300 bg-green-50 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
//                     onClick={() => navigate(`/petitions/${p.docId}`)}
//                   >
//                     <h4 className="text-md font-bold text-gray-800">{p.title}</h4>
//                     <p className="text-xs text-gray-500 mb-2">{p.description.slice(0, 60)}...</p>
//                     <p className="text-xs text-gray-600">{p.signatures.length} signatures</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };



import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
  collection,
  getDocs,
  query,
} from 'firebase/firestore';
import { FiUser, FiMessageCircle, FiMic } from 'react-icons/fi';
import { Button } from '../components/Button';
import { TextArea } from '../components/TextArea';
import { getAuth } from 'firebase/auth';
import confetti from 'canvas-confetti';

type Signature = {
  name: string;
  comment: string;
  signedAt: Timestamp;
  uid?: string;
};

type Petition = {
  docId: string;
  title: string;
  description: string;
  createdBy: string;
  image: string;
  signatures: Signature[];
};

const MAX_SIGNATURES = 20;

export const PetitionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = getAuth();

  const [petition, setPetition] = useState<Petition | null>(null);
  const [pendingPetitions, setPendingPetitions] = useState<Petition[]>([]);
  const [signedPetitions, setSignedPetitions] = useState<Petition[]>([]);
  const [comment, setComment] = useState('');
  const [hasSigned, setHasSigned] = useState(false);
  const recognitionRef = useRef<any>(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (!id || !user) return;

    const fetchData = async () => {
      const docRef = doc(db, 'petitions', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Petition;
        const newPetition = { ...data, docId: docSnap.id };
        setPetition(newPetition);

        const alreadySigned = newPetition.signatures?.some(
          (sig) => sig.uid === user.uid
        );
        setHasSigned(alreadySigned);
      } else {
        alert('Petition not found');
      }

      const snapshot = await getDocs(query(collection(db, 'petitions')));
      const result: Petition[] = [];
      const signed: Petition[] = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Petition;
        const p = { ...data, docId: docSnap.id };
        const userSigned = p.signatures?.some((sig) => sig.uid === user.uid);

        if (userSigned) {
          signed.push(p);
        } else if (p.signatures?.length < MAX_SIGNATURES && docSnap.id !== id) {
          result.push(p);
        }
      });

      setPendingPetitions(result);
      setSignedPetitions(signed);
    };

    fetchData();
  }, [id, user]);

  const handleSign = async () => {
    if (!user) {
      alert('You must be signed in to sign a petition.');
      return;
    }

    const alreadySigned = petition?.signatures?.some(
      (sig) => sig.uid === user.uid
    );
    if (alreadySigned) {
      alert('You have already signed this petition.');
      return;
    }

    try {
      const docRef = doc(db, 'petitions', id!);
      const newSignature = {
        name: user.displayName || 'Anonymous',
        comment,
        signedAt: Timestamp.now(),
        uid: user.uid,
      };
      await updateDoc(docRef, {
        signatures: arrayUnion(newSignature),
      });

      const updatedPetition: Petition = {
        ...(petition as Petition),
        signatures: [...(petition?.signatures || []), newSignature],
      };
      setPetition(updatedPetition);
      setHasSigned(true);
      setSignedPetitions((prev) => [...prev, updatedPetition]);
      setPendingPetitions((prev) =>
        prev.filter((p) => p.docId !== updatedPetition.docId)
      );
      setComment('');

      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error('Signing error:', err);
    }
  };

  const handleVoiceInput = (field: 'comment') => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (field === 'comment') setComment(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const signaturePercentage = Math.min(
    Math.round(((petition?.signatures.length || 0) / MAX_SIGNATURES) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-10 px-4 md:px-10">
      <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-10">
        {/* Petition Content */}
        <div className="md:col-span-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-10 space-y-8 w-full">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 text-transparent bg-clip-text">
            {petition?.title}
          </h1>
          <p className="text-base text-orange-600 font-semibold uppercase tracking-wider">
            Show your support by signing this petition
          </p>

          <div className="flex items-center text-gray-600 text-sm gap-4">
            <FiUser />
            <span>
              Created by <strong>{petition?.createdBy}</strong>
            </span>
            <span>•</span>
            <span>{petition?.signatures.length} Signatures</span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
              <span>
                {petition?.signatures.length || 0} / {MAX_SIGNATURES} Signatures
              </span>
              <span>{signaturePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 via-lime-400 to-green-500 h-full transition-all duration-700 ease-in-out"
                style={{ width: `${signaturePercentage}%` }}
              />
            </div>
          </div>

          <img
            src={petition?.image}
            alt="Petition"
            className="rounded-xl w-full object-cover max-h-[400px] shadow-xl border"
          />

          <p className="text-gray-700 text-lg leading-relaxed">{petition?.description}</p>

          {(petition?.signatures?.length ?? 0) > 0 && (
            <div className="bg-gray-100 rounded-xl p-5 shadow-inner mt-8 border">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Signatures</h2>
              <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
                {petition?.signatures
                  ?.slice()
                  .reverse()
                  .map((sig, idx) => (
                    <li key={idx} className="py-2 text-gray-700 text-sm">
                      <strong className="text-gray-800">{sig.name}</strong> —{' '}
                      {sig.comment || 'No comment'}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {!hasSigned ? (
            <div className="space-y-4 pt-6">
              <h3 className="text-xl font-semibold text-gray-800">Sign This Petition</h3>
              <div className="relative">
                <TextArea
                  iconLeft={FiMessageCircle}
                  rows={3}
                  placeholder="Your Comment (Optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <FiMic
                  onClick={() => handleVoiceInput('comment')}
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                />
              </div>
              <Button
                label="Sign Petition"
                className="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-bold py-2 rounded-xl transition"
                onClick={handleSign}
              />
            </div>
          ) : (
            <div className="text-center pt-6">
              <p className="text-green-700 font-semibold text-lg">🎉 Thank you for signing!</p>
              <p className="text-sm text-gray-600 mt-2">Help spread the word:</p>
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                {['Facebook', 'Twitter', 'LinkedIn'].map((platform, i) => {
                  const urls = {
                    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                    Twitter: `https://twitter.com/intent/tweet?url=${window.location.href}`,
                    LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                  };
                  const colors = {
                    Facebook: 'bg-blue-600 hover:bg-blue-700',
                    Twitter: 'bg-blue-400 hover:bg-blue-500',
                    LinkedIn: 'bg-blue-800 hover:bg-blue-900',
                  };
                  return (
                    <a
                      key={i}
                      href={urls[platform as keyof typeof urls]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${colors[platform as keyof typeof colors]} text-white px-3 py-1 rounded-md text-sm transition`}
                    >
                      {platform}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 h-fit max-h-[90vh] overflow-y-auto w-full space-y-10 border border-gray-100">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Petitions</h2>
            <div className="space-y-4">
              {pendingPetitions.map((p, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-4 rounded-xl bg-white hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
                  onClick={() => navigate(`/petitions/${p.docId}`)}
                >
                  <h4 className="text-md font-bold text-gray-700">{p.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{p.description.slice(0, 60)}...</p>
                  <p className="text-xs text-gray-600">{p.signatures.length} signatures</p>
                </div>
              ))}
            </div>
          </div>

          {hasSigned && signedPetitions.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Signed Petitions</h2>
              <div className="space-y-4">
                {signedPetitions.map((p, index) => (
                  <div
                    key={index}
                    className="border border-green-300 bg-green-50 p-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
                    onClick={() => navigate(`/petitions/${p.docId}`)}
                  >
                    <h4 className="text-md font-bold text-gray-800">{p.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{p.description.slice(0, 60)}...</p>
                    <p className="text-xs text-gray-600">{p.signatures.length} signatures</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
