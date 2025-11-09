// Função chamada ao salvar uma nova despesa



import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseFormData } from "@/types/expense";

const expenseSchema = z.object({
  amount: z.string().min(1, "Valor é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
});

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  onCancel: () => void;
  initialData?: ExpenseFormData;
}

export const ExpenseForm = ({ onSubmit, onCancel, initialData }: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialData || {
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const category = watch("category");

  const handleFormSubmit = (data: ExpenseFormData) => {
    onSubmit({
      ...data,
      amount: parseFloat(data.amount.toString()),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Valor (R$)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount")}
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select value={category} onValueChange={(value) => setValue("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="das">DAS - Simples Nacional</SelectItem>
            <SelectItem value="bling">BLING - Sistema de Gestão</SelectItem>
            <SelectItem value="contas">Contas (Água, Luz, Internet)</SelectItem>
            <SelectItem value="funcionario">Funcionário</SelectItem>
            <SelectItem value="contabilidade">Contabilidade</SelectItem>
            <SelectItem value="fornecedores">Fornecedores</SelectItem>
            <SelectItem value="marketing">Marketing e Publicidade</SelectItem>
            <SelectItem value="equipamentos">Equipamentos e Ferramentas</SelectItem>
            <SelectItem value="manutencao">Manutenção</SelectItem>
            <SelectItem value="aluguel">Aluguel</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Data</Label>
        <Input
          id="date"
          type="date"
          {...register("date")}
        />
        {errors.date && (
          <p className="text-sm text-destructive">{errors.date.message}</p>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? "Atualizar" : "Criar"} Despesa
        </Button>
      </div>
    </form>
  );
};
