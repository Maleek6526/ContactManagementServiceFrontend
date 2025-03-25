// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Dashboard.module.css";

// const Dashboard = () => {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState(null);
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     if (!search.trim()) return;

//     try {
//       const response = await fetch(`http://localhost:8080/api/search?phone=${search}`);
//       const data = await response.json();
//       setSearchResult(data);
//     } catch (error) {
//       console.error("Error fetching search results", error);
//     }
//   };

//   return (
//     <div className={styles.dashboard}>
//       {/* Sidebar */}
//       <aside className={styles.sidebar}>
//         <h2>Caller ID</h2>
//         <ul>
//           <li>📞 Contacts</li>
//           <li>🚨 Spam List</li>
//           <li>⚙️ Settings</li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         {/* Search Bar */}
//         <div className={styles.searchBar}>
//           <input 
//             type="text" 
//             placeholder="Enter phone number..." 
//             value={search} 
//             onChange={(e) => setSearch(e.target.value)} 
//           />
//           <button onClick={handleSearch}>🔍 Search</button>
//         </div>

//         {/* Search Results */}
//         {searchResult && (
//           <div className={styles.searchResults}>
//             <h3>{searchResult.name || "Unknown Caller"}</h3>
//             <p>📞 {searchResult.phone}</p>
//             <p>⚠️ Spam Risk: {searchResult.spamLevel}</p>
//           </div>
//         )}

//         {/* Recent Calls */}
//         <div className={styles.recentCalls}>
//           <h3>Recent Calls</h3>
//           <p>No recent calls yet.</p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;

