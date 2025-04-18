// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { useEffect, useState, useRef } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// interface Voting {
//   id: string;
//   title: string;
//   candidates: { name: string; votes: number; description: string; image: string }[];
//   eligibleVoters: number;
// }

// const COLORS = ['#FFD700', '#C0C0C0', '#A52A2A', '#8B0000'];

// export const ViewVotings = () => {
//   const [votings, setVotings] = useState<Voting[]>([]);
//   const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
//   const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
//   const [totalVotes, setTotalVotes] = useState(0);
//   const pdfRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchVotings = async () => {
//       const snapshot = await getDocs(collection(db, 'start-date'));
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Voting[];

//       setVotings(data);
//       if (data.length > 0) {
//         setSelectedVoting(data[0]);
//       }
//     };

//     fetchVotings();
//   }, []);

//   useEffect(() => {
//     const fetchVotes = async () => {
//       if (!selectedVoting) return;

//       const q = query(collection(db, 'Votes'), where('electionId', '==', selectedVoting.id));
//       const snapshot = await getDocs(q);
//       const counts: Record<string, number> = {};

//       snapshot.docs.forEach(doc => {
//         const { candidate } = doc.data();
//         counts[candidate] = (counts[candidate] || 0) + 1;
//       });

//       setVoteCounts(counts);
//       setTotalVotes(snapshot.size);
//     };

//     fetchVotes();
//   }, [selectedVoting]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = votings.find(v => v.title === e.target.value);
//     if (selected) setSelectedVoting(selected);
//   };

//   const downloadPDF = async () => {
//     if (!pdfRef.current) return;

//     const canvas = await html2canvas(pdfRef.current);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${selectedVoting?.title || 'election-results'}.pdf`);
//   };

//   const pieData = selectedVoting
//     ? selectedVoting.candidates.map(c => ({
//         name: c.name,
//         value: voteCounts[c.name] || 0,
//       }))
//     : [];

//   const barData = pieData.map(item => ({
//     name: item.name,
//     votes: item.value,
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 px-6 py-10">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-6">📊 Election Results</h2>

//         <div className="flex justify-center mb-8">
//           <select
//             className="text-lg px-4 py-2 border border-sky-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
//             onChange={handleChange}
//             value={selectedVoting?.title || ''}
//           >
//             {votings.map((voting) => (
//               <option key={voting.id} value={voting.title}>
//                 {voting.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedVoting && (
//           <>
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={downloadPDF}
//                 className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
//               >
//                 📥 Download PDF
//               </button>
//             </div>

//             <div ref={pdfRef}>
//               <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">▼ {selectedVoting.title}</h1>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
//                 <StatCard number={selectedVoting.eligibleVoters || 0} label="No. of Eligible Voters" />
//                 <StatCard number={totalVotes} label="No. of Casted Votes" />
//                 <StatCard number={selectedVoting.candidates.length} label="No. of Options" />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📥 Received Votes</h3>
//                   <div className="flex justify-center">
//                     <BarChart width={400} height={300} data={barData} layout="vertical">
//                       <XAxis type="number" />
//                       <YAxis type="category" dataKey="name" />
//                       <Tooltip />
//                       <Bar dataKey="votes" fill="#0ea5e9" />
//                     </BarChart>
//                   </div>
//                 </div>

//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📈 Results as a Percentage</h3>
//                   <div className="flex justify-center">
//                     <PieChart width={400} height={300}>
//                       <Pie
//                         data={pieData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                         outerRadius={120}
//                         dataKey="value"
//                       >
//                         {pieData.map((_, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Legend />
//                     </PieChart>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ number, label }: { number: number; label: string }) => (
//   <div className="rounded-2xl bg-sky-600 text-white shadow-lg py-8 text-center transition duration-200 hover:scale-105">
//     <div className="text-4xl font-extrabold">{number}</div>
//     <div className="mt-3 text-lg bg-sky-700 py-3 rounded-b-xl shadow-inner">
//       {label}
//     </div>
//   </div>
// );

// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { useEffect, useState, useRef } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// interface Voting {
//   id: string;
//   title: string;
//   candidates: { name: string; votes: number; description: string; image: string }[];
//   eligibleVoters: number;
// }

// const COLORS = ['#FFD700', '#C0C0C0', '#A52A2A', '#8B0000'];

// export const ViewVotings = () => {
//   const [votings, setVotings] = useState<Voting[]>([]);
//   const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
//   const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [disabledVotes, setDisabledVotes] = useState(0);
//   const pdfRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchVotings = async () => {
//       const snapshot = await getDocs(collection(db, 'start-date'));
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Voting[];

//       setVotings(data);
//       if (data.length > 0) {
//         setSelectedVoting(data[0]);
//       }
//     };

//     fetchVotings();
//   }, []);

//   useEffect(() => {
//     const fetchVotes = async () => {
//       if (!selectedVoting) return;

//       const q = query(collection(db, 'Votes'), where('electionId', '==', selectedVoting.id));
//       const snapshot = await getDocs(q);
//       const counts: Record<string, number> = {};
//       let disabled = 0;

//       snapshot.docs.forEach(doc => {
//         const data = doc.data();
//         const { candidate, disabled: isDisabled } = data;
//         counts[candidate] = (counts[candidate] || 0) + 1;

//         if (isDisabled === true) {
//           disabled += 1;
//         }
//       });

//       setVoteCounts(counts);
//       setTotalVotes(snapshot.size);
//       setDisabledVotes(disabled);
//     };

//     fetchVotes();
//   }, [selectedVoting]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = votings.find(v => v.title === e.target.value);
//     if (selected) setSelectedVoting(selected);
//   };

//   const downloadPDF = async () => {
//     if (!pdfRef.current) return;

//     const canvas = await html2canvas(pdfRef.current);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${selectedVoting?.title || 'election-results'}.pdf`);
//   };

//   const pieData = selectedVoting
//     ? selectedVoting.candidates.map(c => ({
//         name: c.name,
//         value: voteCounts[c.name] || 0,
//       }))
//     : [];

//   const barData = pieData.map(item => ({
//     name: item.name,
//     votes: item.value,
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 px-6 py-10">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-6">📊 Election Results</h2>

//         <div className="flex justify-center mb-8">
//           <select
//             className="text-lg px-4 py-2 border border-sky-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
//             onChange={handleChange}
//             value={selectedVoting?.title || ''}
//           >
//             {votings.map((voting) => (
//               <option key={voting.id} value={voting.title}>
//                 {voting.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedVoting && (
//           <>
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={downloadPDF}
//                 className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
//               >
//                 📥 Download PDF
//               </button>
//             </div>

//             <div ref={pdfRef}>
//               <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">▼ {selectedVoting.title}</h1>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
//                 <StatCard number={selectedVoting.eligibleVoters || 0} label="No. of Eligible Voters" />
//                 <StatCard number={totalVotes} label="No. of Casted Votes" />
//                 <StatCard number={selectedVoting.candidates.length} label="No. of Options" />
//                 {disabledVotes > 0 && (
//                   <StatCard number={disabledVotes} label="Votes from Disabled People" />
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📥 Received Votes</h3>
//                   <div className="flex justify-center">
//                     <BarChart width={400} height={300} data={barData} layout="vertical">
//                       <XAxis type="number" />
//                       <YAxis type="category" dataKey="name" />
//                       <Tooltip />
//                       <Bar dataKey="votes" fill="#0ea5e9" />
//                     </BarChart>
//                   </div>
//                 </div>

//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📈 Results as a Percentage</h3>
//                   <div className="flex justify-center">
//                     <PieChart width={400} height={300}>
//                       <Pie
//                         data={pieData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                         outerRadius={120}
//                         dataKey="value"
//                       >
//                         {pieData.map((_, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Legend />
//                     </PieChart>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ number, label }: { number: number; label: string }) => (
//   <div className="rounded-2xl bg-sky-600 text-white shadow-lg py-8 text-center transition duration-200 hover:scale-105">
//     <div className="text-4xl font-extrabold">{number}</div>
//     <div className="mt-3 text-lg bg-sky-700 py-3 rounded-b-xl shadow-inner">
//       {label}
//     </div>
//   </div>
// );


// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { useEffect, useState, useRef } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// interface Voting {
//   id: string;
//   title: string;
//   candidates: { name: string; votes: number; description: string; image: string }[];
//   eligibleVoters: number;
// }

// const COLORS = ['#FFD700', '#C0C0C0', '#A52A2A', '#8B0000'];

// export const ViewVotings = () => {
//   const [votings, setVotings] = useState<Voting[]>([]);
//   const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
//   const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
//   const [disabledVoteCounts, setDisabledVoteCounts] = useState<Record<string, number>>({});
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [disabledVotes, setDisabledVotes] = useState(0);
//   const pdfRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchVotings = async () => {
//       const snapshot = await getDocs(collection(db, 'start-date'));
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Voting[];

//       setVotings(data);
//       if (data.length > 0) {
//         setSelectedVoting(data[0]);
//       }
//     };

//     fetchVotings();
//   }, []);

//   useEffect(() => {
//     const fetchVotes = async () => {
//       if (!selectedVoting) return;

//       const q = query(collection(db, 'Votes'), where('electionId', '==', selectedVoting.id));
//       const snapshot = await getDocs(q);
//       const counts: Record<string, number> = {};
//       const disabledCounts: Record<string, number> = {};
//       let disabled = 0;

//       snapshot.docs.forEach(doc => {
//         const data = doc.data();
//         const { candidate, disabled: isDisabled } = data;

//         counts[candidate] = (counts[candidate] || 0) + 1;

//         if (isDisabled === true) {
//           disabled += 1;
//           disabledCounts[candidate] = (disabledCounts[candidate] || 0) + 1;
//         }
//       });

//       setVoteCounts(counts);
//       setDisabledVoteCounts(disabledCounts);
//       setTotalVotes(snapshot.size);
//       setDisabledVotes(disabled);
//     };

//     fetchVotes();
//   }, [selectedVoting]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = votings.find(v => v.title === e.target.value);
//     if (selected) setSelectedVoting(selected);
//   };

//   const downloadPDF = async () => {
//     if (!pdfRef.current) return;

//     const canvas = await html2canvas(pdfRef.current);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${selectedVoting?.title || 'election-results'}.pdf`);
//   };

//   const pieData = selectedVoting
//     ? selectedVoting.candidates.map(c => ({
//         name: c.name,
//         value: voteCounts[c.name] || 0,
//       }))
//     : [];

//   const barData = selectedVoting?.candidates.map(candidate => {
//     const total = voteCounts[candidate.name] || 0;
//     const disabled = disabledVoteCounts[candidate.name] || 0;
//     const normal = total - disabled;

//     return {
//       name: candidate.name,
//       normalVotes: normal,
//       disabledVotes: disabled,
//     };
//   }) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 px-6 py-10">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-6">📊 Election Results</h2>

//         <div className="flex justify-center mb-8">
//           <select
//             className="text-lg px-4 py-2 border border-sky-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
//             onChange={handleChange}
//             value={selectedVoting?.title || ''}
//           >
//             {votings.map((voting) => (
//               <option key={voting.id} value={voting.title}>
//                 {voting.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedVoting && (
//           <>
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={downloadPDF}
//                 className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
//               >
//                 📥 Download PDF
//               </button>
//             </div>

//             <div ref={pdfRef}>
//               <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">▼ {selectedVoting.title}</h1>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
//                 <StatCard number={selectedVoting.eligibleVoters || 0} label="No. of Eligible Voters" />
//                 <StatCard number={totalVotes} label="No. of Casted Votes" />
//                 <StatCard number={selectedVoting.candidates.length} label="No. of Options" />
//                 {disabledVotes > 0 && (
//                   <StatCard number={disabledVotes} label="Votes from Disabled People" />
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📥 Received Votes</h3>
//                   <div className="flex justify-center">
//                     <BarChart width={400} height={300} data={barData} layout="vertical">
//                       <XAxis type="number" />
//                       <YAxis type="category" dataKey="name" />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="normalVotes" stackId="a" fill="#0ea5e9" name="Normal Votes" />
//                       <Bar dataKey="disabledVotes" stackId="a" fill="#94a3b8" name="Disabled Votes" />
//                     </BarChart>
//                   </div>
//                 </div>

//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📈 Results as a Percentage</h3>
//                   <div className="flex justify-center">
//                     <PieChart width={400} height={300}>
//                       <Pie
//                         data={pieData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                         outerRadius={120}
//                         dataKey="value"
//                       >
//                         {pieData.map((_, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Legend />
//                     </PieChart>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ number, label }: { number: number; label: string }) => (
//   <div className="rounded-2xl bg-sky-600 text-white shadow-lg py-8 text-center transition duration-200 hover:scale-105">
//     <div className="text-4xl font-extrabold">{number}</div>
//     <div className="mt-3 text-lg bg-sky-700 py-3 rounded-b-xl shadow-inner">
//       {label}
//     </div>
//   </div>
// );




// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { useEffect, useState, useRef } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// interface Voting {
//   id: string;
//   title: string;
//   candidates: { name: string; votes: number; description: string; image: string }[];
//   eligibleVoters: number;
// }

// const COLORS = ['#FFD700', '#C0C0C0', '#A52A2A', '#8B0000'];

// export const ViewVotings = () => {
//   const [votings, setVotings] = useState<Voting[]>([]);
//   const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
//   const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
//   const [disabledVoteCounts, setDisabledVoteCounts] = useState<Record<string, number>>({});
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [disabledVotes, setDisabledVotes] = useState(0);
//   const pdfRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchVotings = async () => {
//       const snapshot = await getDocs(collection(db, 'start-date'));
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Voting[];

//       setVotings(data);
//       if (data.length > 0) {
//         setSelectedVoting(data[0]);
//       }
//     };

//     fetchVotings();
//   }, []);

//   useEffect(() => {
//     const fetchVotes = async () => {
//       if (!selectedVoting) return;

//       const q = query(collection(db, 'Votes'), where('electionId', '==', selectedVoting.id));
//       const snapshot = await getDocs(q);
//       const counts: Record<string, number> = {};
//       const disabledCounts: Record<string, number> = {};
//       let disabled = 0;

//       snapshot.docs.forEach(doc => {
//         const data = doc.data();
//         const { candidate, isDisabledVote: isDisabled } = data;

//         counts[candidate] = (counts[candidate] || 0) + 1;

//         if (isDisabled === true) {
//           disabled += 1;
//           disabledCounts[candidate] = (disabledCounts[candidate] || 0) + 1;
//         }
//       });

//       setVoteCounts(counts);
//       setDisabledVoteCounts(disabledCounts);
//       setTotalVotes(snapshot.size);
//       setDisabledVotes(disabled);
//     };

//     fetchVotes();
//   }, [selectedVoting]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = votings.find(v => v.title === e.target.value);
//     if (selected) setSelectedVoting(selected);
//   };

//   const downloadPDF = async () => {
//     if (!pdfRef.current) return;

//     const canvas = await html2canvas(pdfRef.current);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${selectedVoting?.title || 'election-results'}.pdf`);
//   };

//   const pieData = selectedVoting
//     ? selectedVoting.candidates.map(c => ({
//         name: c.name,
//         value: voteCounts[c.name] || 0,
//       }))
//     : [];

//   const barData = selectedVoting?.candidates.map(candidate => {
//     const total = voteCounts[candidate.name] || 0;
//     const disabled = disabledVoteCounts[candidate.name] || 0;
//     const normal = total - disabled;

//     return {
//       name: candidate.name,
//       normalVotes: normal,
//       disabledVotes: disabled,
//     };
//   }) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 px-6 py-10">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-6">📊 Election Results</h2>

//         <div className="flex justify-center mb-8">
//           <select
//             className="text-lg px-4 py-2 border border-sky-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
//             onChange={handleChange}
//             value={selectedVoting?.title || ''}
//           >
//             {votings.map((voting) => (
//               <option key={voting.id} value={voting.title}>
//                 {voting.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedVoting && (
//           <>
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={downloadPDF}
//                 className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
//               >
//                 📥 Download PDF
//               </button>
//             </div>

//             <div ref={pdfRef}>
//               <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">▼ {selectedVoting.title}</h1>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
//                 <StatCard number={selectedVoting.eligibleVoters || 0} label="No. of Eligible Voters" />
//                 <StatCard number={totalVotes} label="No. of Casted Votes" />
//                 <StatCard number={selectedVoting.candidates.length} label="No. of Options" />
//                 {disabledVotes > 0 && (
//                   <StatCard number={disabledVotes} label="Votes from Disabled People" />
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📥 Received Votes</h3>
//                   <div className="flex justify-center">
//                     <BarChart width={400} height={300} data={barData} layout="vertical">
//                       <XAxis type="number" />
//                       <YAxis type="category" dataKey="name" />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="normalVotes" stackId="a" fill="#0ea5e9" name="Normal Votes" />
//                       <Bar dataKey="disabledVotes" stackId="a" fill="#94a3b8" name="Disabled Votes" />
//                     </BarChart>
//                   </div>
//                 </div>

//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📈 Results as a Percentage</h3>
//                   <div className="flex justify-center">
//                     <PieChart width={400} height={300}>
//                       <Pie
//                         data={pieData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                         outerRadius={120}
//                         dataKey="value"
//                       >
//                         {pieData.map((_, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Legend />
//                     </PieChart>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ number, label }: { number: number; label: string }) => (
//   <div className="rounded-2xl bg-sky-600 text-white shadow-lg py-8 text-center transition duration-200 hover:scale-105">
//     <div className="text-4xl font-extrabold">{number}</div>
//     <div className="mt-3 text-lg bg-sky-700 py-3 rounded-b-xl shadow-inner">
//       {label}
//     </div>
//   </div>
// );



// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { useEffect, useState, useRef } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// interface Candidate {
//   name: string;
//   votes: number;
//   description: string;
//   image: string;
// }

// interface Voting {
//   id: string;
//   title: string;
//   candidates: Candidate[];
//   eligibleVoters: number;
// }

// const COLORS = ['#FFD700', '#C0C0C0', '#A52A2A', '#8B0000'];

// export const ViewVotings = () => {
//   const [votings, setVotings] = useState<Voting[]>([]);
//   const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
//   const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
//   const [disabledVoteCounts, setDisabledVoteCounts] = useState<Record<string, number>>({});
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [disabledVotes, setDisabledVotes] = useState(0);
//   const pdfRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchVotings = async () => {
//       const snapshot = await getDocs(collection(db, 'start-date'));
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Voting[];

//       setVotings(data);
//       if (data.length > 0) {
//         setSelectedVoting(data[0]);
//       }
//     };

//     fetchVotings();
//   }, []);

//   useEffect(() => {
//     const fetchVotes = async () => {
//       if (!selectedVoting || !selectedVoting.candidates || selectedVoting.candidates.length === 0) return;

//       const q = query(collection(db, 'Votes'), where('electionId', '==', selectedVoting.id));
//       const snapshot = await getDocs(q);
//       const counts: Record<string, number> = {};
//       const disabledCounts: Record<string, number> = {};
//       let disabled = 0;

//       snapshot.docs.forEach(doc => {
//         const data = doc.data();
//         const { candidate, voteId, isDisabledVote } = data;

//         let candidateName = candidate || voteId;

//         // Match candidateName against list of known candidates
//         const found = selectedVoting.candidates.find(c => c.name === candidateName);
//         if (!found) return;

//         counts[candidateName] = (counts[candidateName] || 0) + 1;

//         if (isDisabledVote === true) {
//           disabled += 1;
//           disabledCounts[candidateName] = (disabledCounts[candidateName] || 0) + 1;
//         }
//       });

//       setVoteCounts(counts);
//       setDisabledVoteCounts(disabledCounts);
//       setTotalVotes(snapshot.size);
//       setDisabledVotes(disabled);
//     };

//     fetchVotes();
//   }, [selectedVoting]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = votings.find(v => v.title === e.target.value);
//     if (selected) setSelectedVoting(selected);
//   };

//   const downloadPDF = async () => {
//     if (!pdfRef.current) return;

//     const canvas = await html2canvas(pdfRef.current);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${selectedVoting?.title || 'election-results'}.pdf`);
//   };

//   const pieData = selectedVoting?.candidates?.map(c => ({
//     name: c.name,
//     value: voteCounts[c.name] || 0,
//   })) || [];

//   const barData = selectedVoting?.candidates?.map(candidate => {
//     const total = voteCounts[candidate.name] || 0;
//     const disabled = disabledVoteCounts[candidate.name] || 0;
//     const normal = total - disabled;

//     return {
//       name: candidate.name,
//       normalVotes: normal,
//       disabledVotes: disabled,
//     };
//   }) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 px-6 py-10">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-6">📊 Election Results</h2>

//         <div className="flex justify-center mb-8">
//           <select
//             className="text-lg px-4 py-2 border border-sky-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
//             onChange={handleChange}
//             value={selectedVoting?.title || ''}
//           >
//             {votings.map((voting) => (
//               <option key={voting.id} value={voting.title}>
//                 {voting.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedVoting && selectedVoting.candidates?.length > 0 && (
//           <>
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={downloadPDF}
//                 className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
//               >
//                 📥 Download PDF
//               </button>
//             </div>

//             <div ref={pdfRef}>
//               <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">▼ {selectedVoting.title}</h1>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
//                 <StatCard number={selectedVoting.eligibleVoters || 0} label="No. of Eligible Voters" />
//                 <StatCard number={totalVotes} label="No. of Casted Votes" />
//                 <StatCard number={selectedVoting.candidates.length} label="No. of Options" />
//                 {disabledVotes > 0 && (
//                   <StatCard number={disabledVotes} label="Votes from Disabled People" />
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📥 Received Votes</h3>
//                   <div className="flex justify-center">
//                     <BarChart width={400} height={300} data={barData} layout="vertical">
//                       <XAxis type="number" />
//                       <YAxis type="category" dataKey="name" />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="normalVotes" stackId="a" fill="#0ea5e9" name="Normal Votes" />
//                       <Bar dataKey="disabledVotes" stackId="a" fill="#94a3b8" name="Disabled Votes" />
//                     </BarChart>
//                   </div>
//                 </div>

//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📈 Results as a Percentage</h3>
//                   <div className="flex justify-center">
//                     <PieChart width={400} height={300}>
//                       <Pie
//                         data={pieData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                         outerRadius={120}
//                         dataKey="value"
//                       >
//                         {pieData.map((_, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Legend />
//                     </PieChart>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ number, label }: { number: number; label: string }) => (
//   <div className="rounded-2xl bg-sky-600 text-white shadow-lg py-8 text-center transition duration-200 hover:scale-105">
//     <div className="text-4xl font-extrabold">{number}</div>
//     <div className="mt-3 text-lg bg-sky-700 py-3 rounded-b-xl shadow-inner">
//       {label}
//     </div>
//   </div>
// );





// your existing imports...

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
} from 'recharts';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Candidate {
  name: string;
  votes: number;
  description: string;
  image: string;
}

interface Voting {
  id: string;
  title: string;
  candidates: Candidate[];
  eligibleVoters: number;
}

const COLORS = ['#FFD700', '#C0C0C0', '#A52A2A', '#8B0000'];

export const ViewVotings = () => {
  const [votings, setVotings] = useState<Voting[]>([]);
  const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [disabledVoteCounts, setDisabledVoteCounts] = useState<Record<string, number>>({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [disabledVotes, setDisabledVotes] = useState(0);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVotings = async () => {
      const snapshot = await getDocs(collection(db, 'start-date'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Voting[];

      setVotings(data);
      if (data.length > 0) {
        setSelectedVoting(data[0]);
      }
    };

    fetchVotings();
  }, []);

  useEffect(() => {
    const fetchVotes = async () => {
      if (!selectedVoting || !selectedVoting.candidates || selectedVoting.candidates.length === 0) return;

      const q = query(collection(db, 'Votes'), where('electionId', '==', selectedVoting.id));
      const snapshot = await getDocs(q);
      const counts: Record<string, number> = {};
      const disabledCounts: Record<string, number> = {};
      let disabled = 0;

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        let { candidate, transcript, isDisabledVote } = data;

        // Resolve candidate name
        let candidateName: string | undefined = undefined;

        if (candidate) {
          candidateName = candidate;
        } else if (isDisabledVote && transcript) {
          const match = transcript.match(/#(\d+)/);
          if (match) {
            const index = parseInt(match[1]) - 1;
            if (index >= 0 && index < selectedVoting.candidates.length) {
              candidateName = selectedVoting.candidates[index].name;
            }
          }
        }

        if (!candidateName) return;

        // Check candidate exists
        const found = selectedVoting.candidates.find(c => c.name === candidateName);
        if (!found) return;

        counts[candidateName] = (counts[candidateName] || 0) + 1;

        if (isDisabledVote === true) {
          disabled += 1;
          disabledCounts[candidateName] = (disabledCounts[candidateName] || 0) + 1;
        }
      });

      setVoteCounts(counts);
      setDisabledVoteCounts(disabledCounts);
      setTotalVotes(snapshot.size);
      setDisabledVotes(disabled);
    };

    fetchVotes();
  }, [selectedVoting]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = votings.find(v => v.title === e.target.value);
    if (selected) setSelectedVoting(selected);
  };

  const downloadPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selectedVoting?.title || 'election-results'}.pdf`);
  };

  const pieData = selectedVoting?.candidates?.map(c => ({
    name: c.name,
    value: voteCounts[c.name] || 0,
  })) || [];

  const barData = selectedVoting?.candidates?.map(candidate => {
    const total = voteCounts[candidate.name] || 0;
    const disabled = disabledVoteCounts[candidate.name] || 0;
    const normal = total - disabled;

    return {
      name: candidate.name,
      normalVotes: normal,
      disabledVotes: disabled,
    };
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 px-6 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-6">📊 Election Results</h2>

        <div className="flex justify-center mb-8">
          <select
            className="text-lg px-4 py-2 border border-sky-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            onChange={handleChange}
            value={selectedVoting?.title || ''}
          >
            {votings.map((voting) => (
              <option key={voting.id} value={voting.title}>
                {voting.title}
              </option>
            ))}
          </select>
        </div>

        {selectedVoting && selectedVoting.candidates?.length > 0 && (
          <>
            <div className="flex justify-center mb-6">
              <button
                onClick={downloadPDF}
                className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
              >
                📥 Download PDF
              </button>
            </div>

            <div ref={pdfRef}>
              <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">▼ {selectedVoting.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <StatCard number={selectedVoting.eligibleVoters || 0} label="No. of Eligible Voters" />
                <StatCard number={totalVotes} label="No. of Casted Votes" />
                <StatCard number={selectedVoting.candidates.length} label="No. of Options" />
                {disabledVotes > 0 && (
                  <StatCard number={disabledVotes} label="Votes from Disabled People" />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-sky-50 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📥 Received Votes</h3>
                  <div className="flex justify-center">
                    <BarChart width={400} height={300} data={barData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="normalVotes" stackId="a" fill="#0ea5e9" name="Normal Votes" />
                      <Bar dataKey="disabledVotes" stackId="a" fill="#94a3b8" name="Disabled Votes" />
                    </BarChart>
                  </div>
                </div>

                <div className="bg-sky-50 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📈 Results as a Percentage</h3>
                  <div className="flex justify-center">
                    <PieChart width={400} height={300}>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        dataKey="value"
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ number, label }: { number: number; label: string }) => (
  <div className="rounded-2xl bg-sky-600 text-white shadow-lg py-8 text-center transition duration-200 hover:scale-105">
    <div className="text-4xl font-extrabold">{number}</div>
    <div className="mt-3 text-lg bg-sky-700 py-3 rounded-b-xl shadow-inner">
      {label}
    </div>
  </div>
);



// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { useEffect, useState, useRef } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { getAuth } from 'firebase/auth';

// interface Candidate {
//   name: string;
//   votes: number;
//   description: string;
//   image: string;
// }

// interface Voting {
//   id: string;
//   title: string;
//   candidates: Candidate[];
//   eligibleVoters: number;
//   creator: string;
// }

// const COLORS = ['#FFD700', '#C0C0C0', '#A52A2A', '#8B0000'];

// export const ViewVotings = () => {
//   const [votings, setVotings] = useState<Voting[]>([]);
//   const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
//   const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
//   const [disabledVoteCounts, setDisabledVoteCounts] = useState<Record<string, number>>({});
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [disabledVotes, setDisabledVotes] = useState(0);
//   const [currentUserEmail, setCurrentUserEmail] = useState('');
//   const pdfRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchVotings = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) return;
//       setCurrentUserEmail(user.email || '');

//       const snapshot = await getDocs(collection(db, 'start-date'));
//       const allData = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Voting[];

//       const userVotings = allData.filter(v => v.creator === user.email);
//       setVotings(userVotings);

//       if (userVotings.length > 0) {
//         setSelectedVoting(userVotings[0]);
//       }
//     };

//     fetchVotings();
//   }, []);

//   useEffect(() => {
//     const fetchVotes = async () => {
//       if (!selectedVoting || !selectedVoting.candidates || selectedVoting.candidates.length === 0) return;

//       const q = query(collection(db, 'Votes'), where('electionId', '==', selectedVoting.id));
//       const snapshot = await getDocs(q);
//       const counts: Record<string, number> = {};
//       const disabledCounts: Record<string, number> = {};
//       let disabled = 0;

//       snapshot.docs.forEach(doc => {
//         const data = doc.data();
//         let { candidate, transcript, isDisabledVote } = data;

//         let candidateName: string | undefined = undefined;

//         if (candidate) {
//           candidateName = candidate;
//         } else if (isDisabledVote && transcript) {
//           const match = transcript.match(/#(\d+)/);
//           if (match) {
//             const index = parseInt(match[1]) - 1;
//             if (index >= 0 && index < selectedVoting.candidates.length) {
//               candidateName = selectedVoting.candidates[index].name;
//             }
//           }
//         }

//         if (!candidateName) return;

//         const found = selectedVoting.candidates.find(c => c.name === candidateName);
//         if (!found) return;

//         counts[candidateName] = (counts[candidateName] || 0) + 1;

//         if (isDisabledVote === true) {
//           disabled += 1;
//           disabledCounts[candidateName] = (disabledCounts[candidateName] || 0) + 1;
//         }
//       });

//       setVoteCounts(counts);
//       setDisabledVoteCounts(disabledCounts);
//       setTotalVotes(snapshot.size);
//       setDisabledVotes(disabled);
//     };

//     fetchVotes();
//   }, [selectedVoting]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = votings.find(v => v.title === e.target.value);
//     if (selected) setSelectedVoting(selected);
//   };

//   const downloadPDF = async () => {
//     if (!pdfRef.current) return;

//     const canvas = await html2canvas(pdfRef.current);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${selectedVoting?.title || 'election-results'}.pdf`);
//   };

//   const pieData = selectedVoting?.candidates?.map(c => ({
//     name: c.name,
//     value: voteCounts[c.name] || 0,
//   })) || [];

//   const barData = selectedVoting?.candidates?.map(candidate => {
//     const total = voteCounts[candidate.name] || 0;
//     const disabled = disabledVoteCounts[candidate.name] || 0;
//     const normal = total - disabled;

//     return {
//       name: candidate.name,
//       normalVotes: normal,
//       disabledVotes: disabled,
//     };
//   }) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 px-6 py-10">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-6">📊 Election Results</h2>

//         <div className="flex justify-center mb-8">
//           <select
//             className="text-lg px-4 py-2 border border-sky-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
//             onChange={handleChange}
//             value={selectedVoting?.title || ''}
//           >
//             {votings.map((voting) => (
//               <option key={voting.id} value={voting.title}>
//                 {voting.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedVoting && selectedVoting.candidates?.length > 0 && (
//           <>
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={downloadPDF}
//                 className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
//               >
//                 📥 Download PDF
//               </button>
//             </div>

//             <div ref={pdfRef}>
//               <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">▼ {selectedVoting.title}</h1>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
//                 <StatCard number={selectedVoting.eligibleVoters || 0} label="No. of Eligible Voters" />
//                 <StatCard number={totalVotes} label="No. of Casted Votes" />
//                 <StatCard number={selectedVoting.candidates.length} label="No. of Options" />
//                 {disabledVotes > 0 && (
//                   <StatCard number={disabledVotes} label="Votes from Disabled People" />
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📥 Received Votes</h3>
//                   <div className="flex justify-center">
//                     <BarChart width={400} height={300} data={barData} layout="vertical">
//                       <XAxis type="number" />
//                       <YAxis type="category" dataKey="name" />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="normalVotes" stackId="a" fill="#0ea5e9" name="Normal Votes" />
//                       <Bar dataKey="disabledVotes" stackId="a" fill="#94a3b8" name="Disabled Votes" />
//                     </BarChart>
//                   </div>
//                 </div>

//                 <div className="bg-sky-50 rounded-xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold text-center mb-4 text-sky-700">📈 Results as a Percentage</h3>
//                   <div className="flex justify-center">
//                     <PieChart width={400} height={300}>
//                       <Pie
//                         data={pieData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                         outerRadius={120}
//                         dataKey="value"
//                       >
//                         {pieData.map((_, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Legend />
//                     </PieChart>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ number, label }: { number: number; label: string }) => (
//   <div className="rounded-2xl bg-sky-600 text-white shadow-lg py-8 text-center transition duration-200 hover:scale-105">
//     <div className="text-4xl font-extrabold">{number}</div>
//     <div className="mt-3 text-lg bg-sky-700 py-3 rounded-b-xl shadow-inner">
//       {label}
//     </div>
//   </div>
// );
