import React, { useState, useEffect } from "react";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import TransactionsList from "./TransactionsList";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // Fetch transactions data from the link
      const response = await fetch("http://localhost:8001/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Error handling 
    }
  };

  const handleSearch = (query) => {
    // Filter transactions
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div>
      {/* Render the Search component with handleSearch function */}
      <Search onSearch={handleSearch} />
      {/* Render the AddTransactionForm component */}
      <AddTransactionForm />
      {/* Render the TransactionsList component with filteredTransactions */}
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;

