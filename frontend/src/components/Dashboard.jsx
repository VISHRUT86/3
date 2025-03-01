


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getExpenses } from "../services/expense";
// import { getIncomes } from "../services/income";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Label,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
// } from "recharts";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [incomes, setIncomes] = useState([]);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//      // **Extract User Name from Token**
//      try {
//       const decoded = jwtDecode(token); // Decode JWT Token
//       setUserName(decoded.name || "User"); // Fallback to "User" if name is missing
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }

//     fetchExpenses();
//     fetchIncomes();
//   }, []);

//   const fetchExpenses = async () => {
//     try {
//       const data = await getExpenses();
//       setExpenses(data);
//       setTotalExpenses(data.reduce((acc, expense) => acc + expense.amount, 0));
//     } catch (error) {
//       console.error("Error fetching expenses:", error);
//     }
//   };

//   const fetchIncomes = async () => {
//     try {
//       const data = await getIncomes();
//       setIncomes(data);
//       setTotalIncome(data.reduce((acc, income) => acc + income.amount, 0));
//     } catch (error) {
//       console.error("Error fetching incomes:", error);
//     }
//   };

//   const totalBalance = totalIncome - totalExpenses;

//   // Donut Chart Data for Income vs Expenses
//   const pieChartData = [
//     { name: "Income", value: totalIncome },
//     { name: "Expenses", value: totalExpenses },
//   ];

//   const COLORS = ["#28a745", "#dc3545"]; // Green for Income, Red for Expenses

//   // Area Chart Data for Monthly Tracking
//   const graphData = incomes.map((income, index) => ({
//     month: `M${index + 1}`,
//     income: income.amount,
//     expense: expenses[index] ? expenses[index].amount : 0,
//   }));

//   return (
//     <div className="dashboard-container">
//       <div className="flex-container">
//         <div className="sidebar">
//           <div className="dash">
//             hello... XYZ
//             <img className="simag" src="avatar.png" alt="User Avatar" />
//             <div className="sidebar1">
//               <nav>
//                 <ul>
//                   <li><Link to="/dashboard">Dashboard</Link></li>
//                   <li><Link to="/incomes">Incomes</Link></li>
//                   <li><Link to="/expenses">Expenses</Link></li>
//                   <li><Link to="/settings">Settings</Link></li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>

//         <div className="main-content">
//           <div className="summary-section">
//             <h1>Finance Dashboard</h1>
//             <div className="summary-cards">
//               <div className="card balance">
//                 <h3>Total Balance</h3>
//                 <p>₹{totalBalance}</p>
//               </div>
//               <div className="card income">
//                 <h3>Total Income</h3>
//                 <p>₹{totalIncome}</p>
//               </div>
//               <div className="card expenses">
//                 <h3>Total Expenses</h3>
//                 <p>₹{totalExpenses}</p>
//               </div>
//             </div>
//           </div>

//           {/* Transactions Table (Restored) */}
//           <div className="transactions">
//             <h2>Recent Transactions</h2>
//             <table className="transactions-table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Category</th>
//                   <th>Type</th>
//                   <th>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {[...incomes, ...expenses]
//                   .sort((a, b) => new Date(b.date) - new Date(a.date))
//                   .map((transaction) => {
//                     const isIncome = incomes.some((inc) => inc._id === transaction._id);
//                     const transactionType = isIncome ? "income" : "expense";

//                     return (
//                       <tr key={transaction._id} className={transactionType}>
//                         <td>{new Date(transaction.date).toLocaleDateString("en-GB")}</td>
//                         <td>{transaction.category || transaction.source}</td>
//                         <td>{transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}</td>
//                         <td>₹{transaction.amount}</td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>

//           {/* Donut Chart & Area Chart Section */}
//           <div className="chart-container">
//             {/* Donut Chart */}
//             <div className="chart-box">
//               <h2>Income vs Expenses</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={pieChartData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={70}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     label
//                   >
//                     {pieChartData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                     ))}
//                     <Label 
//                       value={`₹${totalBalance}`} 
//                       position="center" 
//                       fill="#ffffff" 
//                       fontSize={20} 
//                     />
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Area Chart */}
//             <div className="chart-box">
//               <h2>Income vs Expenses (Monthly)</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={graphData}>
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Area type="monotone" dataKey="income" stroke="#007A33" fillOpacity={0.3} fill="#007A33" />
//                   <Area type="monotone" dataKey="expense" stroke="#FF4567" fillOpacity={0.3} fill="#FF4567" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getExpenses } from "../services/expense";
import { getIncomes } from "../services/income";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [filterDate, setFilterDate] = useState("");
const [filterCategory, setFilterCategory] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchExpenses();
    fetchIncomes();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
      setTotalExpenses(data.reduce((acc, expense) => acc + expense.amount, 0));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const data = await getIncomes();
      setIncomes(data);
      setTotalIncome(data.reduce((acc, income) => acc + income.amount, 0));
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const totalBalance = totalIncome - totalExpenses;

  // Donut Chart Data for Income vs Expenses
  const pieChartData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ];

  const COLORS = ["#28a745", "#dc3545"]; // Green for Income, Red for Expenses

  // Area Chart Data for Monthly Tracking
  const graphData = incomes.map((income, index) => ({
    month: `M${index + 1}`,
    income: income.amount,
    expense: expenses[index] ? expenses[index].amount : 0,
  }));

  return (
    
    <div className="dashboard-container">
      <div className="flex-container">
        <div className="sidebar">
          <div className="dash">
            hello... XYZ
            <img className="simag" src="avatar.png" alt="User Avatar" />
            <div className="sidebar1">
              <nav>
                <ul>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/incomes">Incomes</Link></li>
                  <li><Link to="/expenses">Expenses</Link></li>
                  <li><Link to="/transaction-history">Transaction History</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="summary-section">
            <h1>Finance Dashboard</h1>
            <div className="summary-cards">
              <div className="card balance">
                <h3>Total Balance</h3>
                <p>₹{totalBalance}</p>
              </div>
              <div className="card income">
                <h3>Total Income</h3>
                <p>₹{totalIncome}</p>
              </div>
              <div className="card expenses">
                <h3>Total Expenses</h3>
                <p>₹{totalExpenses}</p>
              </div>
            </div>
          </div>




          {/* Transactions Table (Limited to 4 Recent Transactions) */}
          <div className="transactions">
            <h2>Recent Transactions</h2>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[...incomes, ...expenses]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 4) // ✅ Show only 3 most recent transactions
                  .map((transaction) => {
                    const isIncome = incomes.some((inc) => inc._id === transaction._id);
                    const transactionType = isIncome ? "income" : "expense";

                    return (
                      <tr key={transaction._id} className={transactionType}>
                        <td>{new Date(transaction.date).toLocaleDateString("en-GB")}</td>
                        <td>{transaction.category || transaction.source}</td>
                        <td>{transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}</td>
                        <td>₹{transaction.amount}</td>
                      </tr>
                    );
                  })}
   
          {/* Transaction History Popup */}
          {showHistory && (
            <div className="history-modal">
              <div className="history-content">
                <h2>Transaction History</h2>
                <button className="close-btn" onClick={() => setShowHistory(false)}>Close</button>
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTransactions.map((transaction) => {
                      const isIncome = incomes.some((inc) => inc._id === transaction._id);
                      const transactionType = isIncome ? "income" : "expense";
                      return (
                        <tr key={transaction._id} className={transactionType}>
                          <td>{new Date(transaction.date).toLocaleDateString("en-GB")}</td>
                          <td>{transaction.category || transaction.source}</td>
                          <td>{transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}</td>
                          <td>₹{transaction.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
                  
              </tbody>
            </table>
          </div>

          {/* Donut Chart & Area Chart Section */}
          <div className="chart-container">
            {/* Donut Chart */}
            <div className="chart-box">
              <h2>Income vs Expenses</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                    <Label 
                      value={`₹${totalBalance}`} 
                      position="center" 
                      fill="#ffffff" 
                      fontSize={20} 
                    />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Area Chart */}
            <div className="chart-box">
              <h2>Income vs Expenses (Monthly)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={graphData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="income" stroke="#007A33" fillOpacity={0.3} fill="#007A33" />
                  <Area type="monotone" dataKey="expense" stroke="#FF4567" fillOpacity={0.3} fill="#FF4567" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
   
    </div>
  );
};

export default Dashboard;
