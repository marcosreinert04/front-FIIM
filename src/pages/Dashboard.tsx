//Página responsável por listar todas as despesas


import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { Expense } from "@/types/expense";
import { ChartAreaDefault } from "@/components/ChartAreaDefault";

interface DashboardProps {
  expenses: Expense[];
}

export const Dashboard = ({ expenses }: DashboardProps) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });
  
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categorySummary = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getMonthlyChartData = () => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      return {
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
      };
    });

    return last6Months.map(({ month, year, monthIndex }) => {
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === monthIndex && 
               expenseDate.getFullYear() === year;
      });
      
      const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        month,
        desktop: total,
      };
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Visão Geral</h2>
            <p className="text-muted-foreground">
              Gerencie as finanças do seu negócio como MEI
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total de Despesas"
              value={formatCurrency(totalExpenses)}
              description="Todas as despesas cadastradas"
            />
            <StatCard
              title="Despesas do Mês"
              value={formatCurrency(monthlyTotal)}
              description="Total do mês atual"
            />
            <StatCard
              title="Quantidade"
              value={expenses.length.toString()}
              description="Total de registros"
            />
            <StatCard
              title="Categorias"
              value={Object.keys(categorySummary).length.toString()}
              description="Categorias em uso"
            />
          </div>

          <ChartAreaDefault chartData={getMonthlyChartData()} />
        </div>
      </main>
    </div>
  );
};
