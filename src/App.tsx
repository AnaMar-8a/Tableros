import { useState, useMemo } from 'react';
import { KpiCard } from './components/KpiCard';
import { StrategicView } from './components/StrategicView';
import { TacticalView } from './components/TacticalView';
import { THEMES, Theme } from './lib/themes';
import { generateDashboardData } from './lib/data';
import { Layout, Moon, Sun, Filter, Calendar, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [themeId, setThemeId] = useState<keyof typeof THEMES>('summan');
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  
  const [periodo, setPeriodo] = useState('Mensual');
  const [negocio, setNegocio] = useState('Todos');
  const [refreshCount, setRefreshCount] = useState(0);

  const theme = darkMode ? THEMES[themeId].dark : THEMES[themeId].light;
  
  const dashboardData = useMemo(() => 
    generateDashboardData(periodo, negocio, refreshCount),
    [periodo, negocio, refreshCount]
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* HEADER */}
      <header 
        className="h-16 border-b flex items-center justify-between px-6 relative backdrop-blur-md bg-white/80 dark:bg-black/80"
        style={{ borderColor: theme.border + '40' }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.sec})` }}
          >
            <Layout size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight uppercase" style={{ color: theme.head }}>
              Demand<span style={{ color: theme.accent }}>Analytics</span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-semibold opacity-60 mt-1 uppercase tracking-widest">
              <span>GN Corporativo</span>
              <span className="w-1 h-1 rounded-full bg-current"></span>
              <span>Enero 2026</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* FILTROS INTERACTIVOS */}
          <div className="flex items-center gap-3">
            {/* Selector Negocio */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-opacity-50 transition-colors hover:bg-opacity-80"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              <Filter size={14} className="opacity-50" />
              <select 
                value={negocio} 
                onChange={(e) => setNegocio(e.target.value)}
                className="bg-transparent text-xs font-bold uppercase tracking-wide focus:outline-none cursor-pointer pr-4 appearance-none"
                style={{ color: theme.text }}
              >
                <option value="Todos">Todos los Negocios</option>
                <option value="Cárnicos">Cárnicos</option>
                <option value="Lácteos">Lácteos</option>
                <option value="Galletas">Galletas</option>
                <option value="Café">Café</option>
              </select>
            </div>

            {/* Selector Periodo */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-opacity-50 transition-colors hover:bg-opacity-80"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              <Calendar size={14} className="opacity-50" />
              <select 
                value={periodo} 
                onChange={(e) => setPeriodo(e.target.value)}
                className="bg-transparent text-xs font-bold uppercase tracking-wide focus:outline-none cursor-pointer pr-4 appearance-none"
                style={{ color: theme.text }}
              >
                <option value="Mensual">Vista Mensual</option>
                <option value="Trimestral">Vista Trimestral</option>
                <option value="YTD">Acumulado YTD</option>
              </select>
            </div>

            {/* Botón Refresh */}
            <button 
              onClick={() => setRefreshCount(c => c + 1)}
              className="p-2 rounded-lg border hover:bg-black/5 transition-all active:scale-95"
              style={{ borderColor: theme.border, color: theme.accent }}
              title="Actualizar Datos"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          <div className="h-6 w-px bg-current opacity-10"></div>

          {/* Temas */}
          <div className="flex gap-2 p-1 rounded-full border" style={{ borderColor: theme.border + '30' }}>
            {Object.entries(THEMES).map(([id, t]) => (
              <button 
                key={id}
                onClick={() => setThemeId(id as keyof typeof THEMES)}
                title={`Tema ${t.name}`}
                className={`w-5 h-5 rounded-full transition-transform ${themeId === id ? 'scale-110 ring-2 ring-offset-1' : 'opacity-50 hover:opacity-100'}`}
                style={{ background: t.light.accent, ...(themeId === id && { ringColor: theme.text }) }}
              />
            ))}
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 p-6 overflow-hidden relative" onClick={() => setActivePopup(null)}>
        {/* PÁGINA 1: DASHBOARD ESTRATÉGICO */}
        <div 
          className={`absolute inset-0 p-6 flex flex-col gap-6 transition-all duration-500 ease-in-out ${
            page === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <StrategicView 
            dashboardData={dashboardData}
            theme={theme}
            activePopup={activePopup}
            setActivePopup={setActivePopup}
            periodo={periodo}
            onNavigateToTactical={() => setPage(2)}
          />
        </div>

        {/* PÁGINA 2: DETALLE TÁCTICO */}
        <div 
          className={`absolute inset-0 p-6 transition-all duration-500 ease-in-out ${
            page === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <TacticalView 
            dashboardData={dashboardData}
            theme={theme}
            negocio={negocio}
          />
        </div>
      </div>

      {/* FOOTER - BARRA DE NAVEGACIÓN */}
      <div 
        className="h-12 border-t flex items-center justify-between px-6 backdrop-blur-md bg-white/90 dark:bg-black/90"
        style={{ borderColor: theme.border + '30' }}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-1 rounded hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Página Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-bold opacity-60">Página {page} de 2</span>
          <button 
            onClick={() => setPage(Math.min(2, page + 1))}
            disabled={page === 2}
            className="p-1 rounded hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Página Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
          {page === 1 ? 'Vista Estratégica' : 'Vista Táctica'}
        </div>
      </div>
    </div>
  );
}
