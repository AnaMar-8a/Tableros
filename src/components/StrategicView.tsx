import { Activity, Target, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { KpiCard } from './KpiCard';
import { DashboardData } from '../lib/data';
import { Theme } from '../lib/themes';
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface StrategicViewProps {
  dashboardData: DashboardData;
  theme: Theme;
  activePopup: string | null;
  setActivePopup: (key: string | null) => void;
  periodo: string;
  onNavigateToTactical: () => void;
}

export function StrategicView({
  dashboardData,
  theme,
  activePopup,
  setActivePopup,
  periodo,
  onNavigateToTactical
}: StrategicViewProps) {
  return (
    <>
      {/* Fila KPIs */}
      <div className="grid grid-cols-4 gap-6 h-36">
        <KpiCard
          kpiKey="wmape"
          value={dashboardData.kpis.wmape.value}
          trend={dashboardData.kpis.wmape.trend}
          icon={Activity}
          theme={theme}
          activePopup={activePopup}
          setActivePopup={setActivePopup}
        />
        <KpiCard
          kpiKey="bias"
          value={dashboardData.kpis.bias.value}
          trend={dashboardData.kpis.bias.trend}
          icon={Target}
          theme={theme}
          activePopup={activePopup}
          setActivePopup={setActivePopup}
        />
        <KpiCard
          kpiKey="health"
          value={dashboardData.kpis.health.value}
          trend={dashboardData.kpis.health.trend}
          icon={CheckCircle}
          theme={theme}
          activePopup={activePopup}
          setActivePopup={setActivePopup}
        />
        <KpiCard
          kpiKey="mape"
          value={dashboardData.kpis.mape.value}
          trend={dashboardData.kpis.mape.trend}
          icon={AlertCircle}
          theme={theme}
          activePopup={activePopup}
          setActivePopup={setActivePopup}
        />
      </div>

      {/* Fila Gráficos */}
      <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
        {/* Gráfico de Tendencias */}
        <div 
          className="col-span-2 rounded-2xl border shadow-sm p-6 flex flex-col"
          style={{ backgroundColor: theme.card, borderColor: theme.border }}
        >
          <div className="flex justify-between mb-4">
            <h3 
              className="font-bold uppercase text-xs tracking-wider"
              style={{ color: theme.head }}
            >
              Tendencia WMAPE vs BIAS ({periodo})
            </h3>
            <div className="flex gap-4 text-[10px] uppercase font-bold">
              <span className="flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ background: theme.chart1 }}
                />
                WMAPE
              </span>
              <span className="flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ background: theme.chart2 }}
                />
                BIAS
              </span>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dashboardData.chartData}>
                <defs>
                  <linearGradient id="colorWmape" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.chart1} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={theme.chart1} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke={theme.text}
                  strokeOpacity={0.1}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.text, fontSize: 10 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.text, fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    backgroundColor: theme.card
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="wmape"
                  stroke={theme.chart1}
                  strokeWidth={3}
                  fill="url(#colorWmape)"
                  animationDuration={1000}
                />
                <Bar
                  dataKey="bias"
                  barSize={20}
                  fill={theme.chart2}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut con CTA */}
        <div 
          className="rounded-2xl border shadow-sm p-6 flex flex-col items-center justify-between relative group"
          style={{ backgroundColor: theme.card, borderColor: theme.border }}
        >
          <div className="w-full relative flex-1 flex items-center justify-center">
            <h3 
              className="absolute top-0 left-0 font-bold uppercase text-xs tracking-wider"
              style={{ color: theme.head }}
            >
              Salud Portafolio
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dashboardData.donutData}
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1000}
                >
                  <Cell fill={theme.chart1} />
                  <Cell fill={theme.text + '20'} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span 
                className="text-4xl font-extrabold"
                style={{ color: theme.head }}
              >
                {dashboardData.kpis.health.value}
              </span>
              <span className="text-[10px] uppercase font-bold opacity-50">Sano</span>
            </div>
          </div>

          {/* CALL TO ACTION BUTTON */}
          <button
            onClick={onNavigateToTactical}
            className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wide text-white shadow-lg transform transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(to right, ${theme.accent}, ${theme.sec})` }}
          >
            Ir a Detalle Táctico
            <TrendingUp size={16} className="transform rotate-90" />
          </button>
        </div>
      </div>
    </>
  );
}
