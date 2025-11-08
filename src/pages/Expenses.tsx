import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ExpenseTable } from "@/components/ExpenseTable";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Expense, ExpenseFormData } from "@/types/expense";

interface ExpensesProps {
  expenses: Expense[];
  onAddExpense: (expense: ExpenseFormData) => void;
  onUpdateExpense: (id: string, expense: ExpenseFormData) => void;
  onDeleteExpense: (id: string) => void;
}

export const Expenses = ({
  expenses,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
}: ExpensesProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta despesa?")) {
      onDeleteExpense(id);
    }
  };

  const handleSubmit = (data: ExpenseFormData) => {
    if (editingExpense) {
      onUpdateExpense(editingExpense.id, data);
    } else {
      onAddExpense(data);
    }
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Despesas</h2>
              <p className="text-muted-foreground">
                Gerencie todas as despesas do seu negócio
              </p>
            </div>
            <Button onClick={() => { setShowForm(true); setEditingExpense(null); }}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Despesa
            </Button>
          </div>

          {showForm && (
            <div className="p-4 border rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-4">
                {editingExpense ? "Editar Despesa" : "Nova Despesa"}
              </h3>
              <ExpenseForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={editingExpense || undefined}
              />
            </div>
          )}

          <ExpenseTable
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
};
