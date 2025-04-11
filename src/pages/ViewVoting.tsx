// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     PieChart,
//     Pie,
//     Cell,
//     Legend,
//   } from 'recharts'
  
//   const barData = [
//     { name: 'OPTION 1', votes: 65 },
//     { name: 'OPTION 2', votes: 18 },
//     { name: 'OPTION 3', votes: 51 },
//     { name: 'OPTION 4', votes: 136 },
//   ]
  
//   const pieData = [
//     { name: 'Option 1', value: 24 },
//     { name: 'Option 2', value: 7 },
//     { name: 'Option 3', value: 19 },
//     { name: 'Option 4', value: 50 },
//   ]
  
//   const COLORS = ['#FFD700', '#C0C0C0', '#A52A2A', '#8B0000']
  
//   export const VotingResults = () => {
//     return (
//       <div className="min-h-screen bg-sky-50 px-4 py-8">
//         <div className="max-w-6xl mx-auto rounded-lg border bg-white p-6 shadow-lg">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis</h2>
//           <h1 className="text-xl font-bold text-center mb-6">
//             ▼ Title of the Election
//           </h1>
  
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//             <StatCard number={300} label="No. of Eligible Voters" />
//             <StatCard number={270} label="No. of casted Votes" />
//             <StatCard number={4} label="No. of Options" />
//           </div>
  
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Bar Chart */}
//             <div className="rounded-lg bg-white p-4 shadow-md">
//               <h3 className="text-center font-semibold mb-4">Received Votes</h3>
//               <BarChart width={300} height={200} data={barData} layout="vertical">
//                 <XAxis type="number" />
//                 <YAxis type="category" dataKey="name" />
//                 <Tooltip />
//                 <Bar dataKey="votes" fill="#0ea5e9" />
//               </BarChart>
//             </div>
  
//             {/* Pie Chart */}
//             <div className="rounded-lg bg-white p-4 shadow-md">
//               <h3 className="text-center font-semibold mb-4">
//                 Results as a Percentage
//               </h3>
//               <PieChart width={300} height={200}>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   dataKey="value"
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Legend />
//               </PieChart>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
  
//   const StatCard = ({ number, label }: { number: number; label: string }) => (
//     <div className="rounded-xl bg-teal-700 text-white shadow-md py-6 text-center">
//       <div className="text-3xl font-bold">{number}</div>
//       <div className="mt-2 bg-teal-600 py-2 rounded-b-lg shadow-inner">
//         {label}
//       </div>
//     </div>
//   )
  