// Interface que define os campos de uma despesa


export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}

export type ExpenseFormData = Omit<Expense, 'id' | 'createdAt'>;
