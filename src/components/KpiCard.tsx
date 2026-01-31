import { Info, TrendingUp, TrendingDown, X } from 'lucide-react';
import { METRICS } from '../lib/metrics';
import { Theme } from '../lib/themes';

interface InfoPopupProps {
  metricKey: string;
  theme: Theme;
  onClose: () => void;
}

function InfoPopup({ metricKey, theme, onClose }: InfoPopupProps) {
  const m = METRICS[metricKey];
  if (!m) return null;

  return (
    <div 
      className="absolute top-14 left-4 z-50 w-72 rounded-xl shadow-2xl border p-4 text-sm animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur"
      style={{ backgroundColor: theme.card + 'F5', borderColor: theme.border, color: theme.text }}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="flex justify-between items-center mb-2 border-b pb-2"
        style={{ borderColor: theme.border + '40' }}
      >
        <h4 className="font-bold uppercase tracking-wide" style={{ color: theme.head }}>
          {m.fullTitle}
        </h4>
        <button 
          onClick={onClose}
          className="hover:bg-black/10 p-1 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <p className="leading-snug text-xs mb-3">{m.desc}</p>
      <div className="p-2 rounded bg-black/5 mb-3">
        <ul className="list-disc pl-4 space-y-1 text-[10px]">
          {m.formula.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
      <p 
        className="italic text-xs opacity-70 border-t pt-2"
        style={{ borderColor: theme.border + '20' }}
      >
        Uso: {m.usage}
      </p>
    </div>
  );
}

interface KpiCardProps {
  kpiKey: string;
  value: string;
  trend: number;
  icon: React.ComponentType<{ size?: number }>;
  theme: Theme;
  activePopup: string | null;
  setActivePopup: (key: string | null) => void;
}

export function KpiCard({
  kpiKey,
  value,
  trend,
  icon: Icon,
  theme,
  activePopup,
  setActivePopup
}: KpiCardProps) {
  const isOpen = activePopup === kpiKey;

  return (
    <div 
      className="relative p-5 rounded-2xl border shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 backdrop-blur-sm"
      style={{ backgroundColor: theme.card + '80', borderColor: theme.border }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start">
        <div 
          className="p-2 rounded-lg text-white shadow-md"
          style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.sec})` }}
        >
          <Icon size={20} />
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setActivePopup(isOpen ? null : kpiKey);
          }}
          className="opacity-40 hover:opacity-100 transition-opacity p-1 rounded hover:bg-black/5"
          style={{ color: theme.text }}
        >
          <Info size={16} />
        </button>
      </div>

      {isOpen && <InfoPopup metricKey={kpiKey} theme={theme} onClose={() => setActivePopup(null)} />}

      <div className="mt-4">
        <h3 
          className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1"
          style={{ color: theme.text }}
        >
          {METRICS[kpiKey]?.label}
        </h3>
        <div className="flex items-baseline gap-1">
          <span 
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: theme.head }}
          >
            {value}
          </span>
          <div 
            className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 border ${
              trend >= 0
                ? 'bg-green-100 text-green-700 border-green-200'
                : 'bg-red-100 text-red-700 border-red-200'
            }`}
          >
            {trend >= 0 ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        </div>
        <p className="text-[10px] opacity-50 mt-1" style={{ color: theme.text }}>
          vs. mes anterior
        </p>
      </div>
    </div>
  );
}
