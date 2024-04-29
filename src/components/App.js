import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]); // Filtred transactions

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8001/transactions");
      setTransactions(response.data);
      setFilteredTransactions(response.data); // We set filtred transactions 
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearch = (query) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filtered); // Filtred transctions on search query 
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/transactions",
        newTransaction
      );
      setTransactions([...transactions, response.data]);
      setFilteredTransactions([...transactions, response.data]); // Add and update filtred transctions 
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2>
      </div>
      <Search onSearch={handleSearch} />{/* Include the Search component */}
      <AddTransactionForm onAddTransaction={handleAddTransaction} />{/* Include the AddTransactionForm component */}
      <TransactionsList transactions={filteredTransactions} />{/* Include the TransactionsList component */}
    </div>
  );
}

export default App;








