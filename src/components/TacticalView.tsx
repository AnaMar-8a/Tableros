import { RefreshCw, CheckCircle, AlertCircle, Layout } from 'lucide-react';
import { DashboardData } from '../lib/data';
import { Theme } from '../lib/themes';

interface TacticalViewProps {
  dashboardData: DashboardData;
  theme: Theme;
  negocio: string;
}

export function TacticalView({ dashboardData, theme, negocio }: TacticalViewProps) {
  return (
    <div 
      className="h-full rounded-2xl border shadow-sm overflow-hidden flex flex-col"
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
    >
      <div 
        className="p-6 border-b flex justify-between items-center"
        style={{ borderColor: theme.border + '30' }}
      >
        <div>
          <h3 
            className="text-lg font-bold uppercase tracking-wider"
            style={{ color: theme.head }}
          >
            Detalle por Negocio: {negocio}
          </h3>
          <p className="text-xs opacity-60 mt-1">
            Análisis de Pareto: Ordenado por mayor impacto en WMAPE
          </p>
        </div>
        <button
          onClick={() => alert('Exportando CSV...')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-colors hover:bg-black/5"
          style={{ borderColor: theme.border }}
        >
          <RefreshCw size={14} />
          Exportar Datos
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <table className="w-full text-left border-collapse">
          <thead 
            className="sticky top-0 z-10"
            style={{ backgroundColor: theme.card }}
          >
            <tr 
              className="text-[10px] uppercase font-bold opacity-50 border-b"
              style={{ borderColor: theme.border + '30' }}
            >
              <th className="p-4 pl-6">Categoría</th>
              <th className="p-4 text-center">Precisión (WMAPE)</th>
              <th className="p-4 w-1/3">Índice de Salud</th>
              <th className="p-4 text-center">Estado</th>
              <th className="p-4 text-right pr-6">Acción</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.catData.map((cat, i) => (
              <tr
                key={i}
                className="group hover:bg-black/5 transition-colors border-b last:border-0"
                style={{ borderColor: theme.border + '10' }}
              >
                <td className="p-4 pl-6 font-bold" style={{ color: theme.head }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{
                        background: i < 3 ? theme.accent : theme.text + '20'
                      }}
                    />
                    {cat.name}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-2 py-1 rounded font-bold ${
                      cat.wmape > 25 ? 'bg-red-100 text-red-700' : ''
                    }`}
                    style={cat.wmape <= 25 ? { color: theme.text } : {}}
                  >
                    {cat.wmape}%
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="font-bold w-8 text-right opacity-60">
                      {cat.health}%
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.health}%`,
                          background: cat.health > 70 ? theme.accent : '#ef4444'
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  {cat.status === 'OK' ? (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase"
                      style={{ borderColor: theme.border, color: theme.accent }}
                    >
                      <CheckCircle size={10} />
                      Estable
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-red-200 bg-red-50 text-red-600 uppercase">
                      <AlertCircle size={10} />
                      {cat.status}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right pr-6">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-black/10 rounded-full">
                    <Layout size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
