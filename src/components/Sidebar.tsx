//Componente de navegação lateral

import { NavLink } from "./NavLink";
import logo from "@/assets/logo.png";

export const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <img src={logo} alt="FIIM Logo" className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-sidebar-foreground text-center">FIIM</h1>
        <p className="text-sm text-sidebar-foreground/60 text-center">Fundos para MEIs</p>
      </div>
      
      <nav className="px-3 space-y-1">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
        >
          <span>Visão Geral</span>
        </NavLink>
        
        <NavLink
          to="/expenses"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
        >
          <span>Despesas</span>
        </NavLink>
      </nav>
    </aside>
  );
};
