import { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import { Expense } from "@/types/expense";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  return <Dashboard expenses={expenses} />;
};

export default Index;
