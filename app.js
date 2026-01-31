// --- CONFIGURACIÓN GLOBAL ---
const { useState, useEffect, useMemo } = React;
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, PieChart, Pie, Cell } = Recharts;

// --- SISTEMA DE ICONOS SVG NATIVOS (Cero dependencias externas = Cero errores) ---
const Icon = ({ path, className, size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d={path} />
    </svg>
);

const Icons = {
    LayoutGrid: (props) => <Icon {...props} path="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />,
    Sun: (props) => <Icon {...props} path="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
    Moon: (props) => <Icon {...props} path="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    RefreshCw: (props) => <Icon {...props} path="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5" />,
    Check: (props) => <Icon {...props} path="M20 6 9 17l-5-5" />,
    Download: (props) => <Icon {...props} path="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
    Target: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    Activity: (props) => <Icon {...props} path="M22 12h-4l-3 9L9 3l-3 9H2" />,
    AlertCircle: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    Info: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
    TrendingUp: (props) => <Icon {...props} path="m23 6-9.5 9.5-5-5L1 18" />,
    TrendingDown: (props) => <Icon {...props} path="m23 18-9.5-9.5-5 5L1 6" />,
    ArrowRight: (props) => <Icon {...props} path="M5 12h14M12 5l7 7-7 7" />,
    ArrowLeft: (props) => <Icon {...props} path="M19 12H5M12 19l-7-7 7-7" />,
    MoreHorizontal: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
    X: (props) => <Icon {...props} path="M18 6 6 18M6 6l12 12" />
};

// --- DEFINICIONES DE NEGOCIO ---
const METRIC_DEFINITIONS = {
    wmape: { title: "WMAPE (Error Ponderado)", definition: "Mide el error total del plan de demanda ponderado por el volumen real, reflejando el impacto económico de las desviaciones.", formula: ["1) Se calcula el error absoluto entre plan y real.", "2) Se suman todos los errores.", "3) Se divide por la demanda real total."], usage: "Lectura ejecutiva del impacto del error en el negocio." },
    bias: { title: "BIAS (Sesgo)", definition: "Mide la tendencia sistemática del plan a sobreestimar o subestimar la demanda.", formula: ["1) Se suman las diferencias entre plan y real (con signo).", "2) Se divide por la demanda real total."], usage: "Identificar sesgos estructurales del proceso." },
    health: { title: "Índice de Salud", definition: "Mide el porcentaje de materiales cuyo MAPE individual se encuentra en o por debajo de la meta definida.", formula: ["1) Se define una meta de MAPE (ej. 20%).", "2) Se cuentan los materiales con MAPE ≤ meta."], usage: "Evaluar la salud global del portafolio sin ponderación por volumen." },
    mapeRef: { title: "MAPE (Referencia)", definition: "Mide el error porcentual del plan de demanda a nivel individual, tratando cada material de forma equitativa.", formula: ["1) Para cada material, se calcula el error porcentual.", "2) No se pondera por volumen."], usage: "Diagnóstico del desempeño por referencia (SKU)." }
};

// --- CONFIGURACIÓN DE TEMAS ---
const themes = {
    summan: { id: 'summan', label: 'Summan', isGeometric: true, colors: { light: { bg: '#FDFDFD', text: '#333333', heading: '#1A1A1B', cardBg: '#FFFFFF', border: '#E69D4F', accent: '#A3C657', secondary: '#F9D423', gradient: 'from-[#A3C657] to-[#F9D423]', badgePos: 'bg-[#A3C657] text-[#1A1A1B] border-[#8CB045] font-semibold', badgeNeg: 'bg-[#F2B134] text-[#1A1A1B] border-[#D99E20] font-semibold' }, dark: { bg: '#1A1A1B', text: '#E0E0E0', heading: '#F9D423', cardBg: '#252526', border: '#A3C657', accent: '#A3C657', secondary: '#F9D423', gradient: 'from-[#A3C657] to-[#F2B134]', badgePos: 'bg-[#A3C657]/20 text-[#A3C657] border-[#A3C657]', badgeNeg: 'bg-[#F2B134]/20 text-[#F2B134] border-[#F2B134]' } } },
    nutresa: { id: 'nutresa', label: 'Nutresa', isGeometric: true, colors: { light: { bg: '#F8F9FA', text: '#333333', heading: '#2D5A27', cardBg: '#FFFFFF', border: '#76B82A', accent: '#2D5A27', secondary: '#76B82A', gradient: 'from-[#2D5A27] to-[#76B82A]', badgePos: 'bg-[#E9F5E6] text-[#2D5A27] border-[#76B82A]', badgeNeg: 'bg-red-50 text-red-800 border-red-200' }, dark: { bg: '#121212', text: '#E0E0E0', heading: '#8BD13F', cardBg: '#1E1E1E', border: '#4A773C', accent: '#2D5A27', secondary: '#4A773C', gradient: 'from-[#2D5A27] to-[#8BD13F]', badgePos: 'bg-[#252B24] text-[#8BD13F] border-[#4A773C]', badgeNeg: 'bg-red-900/20 text-red-300 border-red-800' } } },
    amop: { id: 'amop', label: 'AMOP', isGeometric: false, colors: { light: { bg: '#EEF2FF', text: '#0f172a', heading: '#312e81', cardBg: '#FFFFFF', border: '#e0e7ff', accent: '#6366f1', secondary: '#d946ef', gradient: 'from-indigo-600 to-fuchsia-600', badgePos: 'bg-indigo-50 text-indigo-700 border-indigo-200', badgeNeg: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' }, dark: { bg: '#020617', text: '#e2e8f0', heading: '#ffffff', cardBg: '#0f172a', border: '#1e293b', accent: '#818cf8', secondary: '#e879f9', gradient: 'from-indigo-500 to-fuchsia-500', badgePos: 'bg-indigo-900/30 text-indigo-300 border-indigo-800', badgeNeg: 'bg-fuchsia-900/30 text-fuchsia-300 border-fuchsia-800' } } },
    minimal: { id: 'minimal', label: 'Grises', isGeometric: false, colors: { light: { bg: '#f9fafb', text: '#4b5563', heading: '#111827', cardBg: '#FFFFFF', border: '#e5e7eb', accent: '#4b5563', secondary: '#9ca3af', gradient: 'from-gray-700 to-gray-900', badgePos: 'bg-gray-100 text-gray-800 border-gray-200', badgeNeg: 'bg-gray-100 text-gray-600 border-gray-300' }, dark: { bg: '#000000', text: '#9ca3af', heading: '#ffffff', cardBg: '#171717', border: '#262626', accent: '#d4d4d4', secondary: '#525252', gradient: 'from-neutral-600 to-neutral-200', badgePos: 'bg-neutral-800 text-neutral-300 border-neutral-700', badgeNeg: 'bg-neutral-900 text-neutral-500 border-neutral-800' } } }
};

// --- DATA ---
const generateRandomTrend = () => {
    const months = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene'];
    return months.map(month => ({ month, wmape: Math.floor(Math.random() * (35 - 15 + 1)) + 15, bias: Math.floor(Math.random() * (8 - (-8) + 1)) + (-8) }));
};
const generateCategoryData = () => {
    const categories = ['Cárnicos', 'Helados', 'Café', 'Novaventa', 'Galletas', 'Chocolates', 'Pastas', 'TMLUC'];
    return categories.map(name => ({ name, wmape: Math.floor(Math.random() * (38 - 12 + 1)) + 12, health: Math.floor(Math.random() * (99 - 35 + 1)) + 35 })).sort((a, b) => b.wmape - a.wmape);
};

// --- COMPONENTES AUXILIARES ---
const Card = ({ children, className = "", themeConfig }) => {
    const style = { backgroundColor: themeConfig.cardBg, borderColor: themeConfig.border, borderWidth: '1px', borderStyle: 'solid' };
    return <div className={`rounded-xl transition-all duration-300 shadow-sm ${className}`} style={style}>{children}</div>;
};

const Badge = ({ children, type = 'neutral', themeConfig }) => {
    const badgeClass = type === 'positive' ? themeConfig.badgePos : themeConfig.badgeNeg;
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${badgeClass}`}>{children}</span>;
};

const DetailPopup = ({ isOpen, onClose, definitionData, themeConfig }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute top-12 left-0 w-full z-[100] px-2 animate-in">
            <div className="rounded-xl shadow-2xl p-4 text-xs relative border" style={{ backgroundColor: themeConfig.cardBg, color: themeConfig.text, borderColor: themeConfig.border, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-2 right-2 opacity-50 hover:opacity-100"><Icons.X size={14} /></button>
                <h4 className="font-bold mb-2 text-sm pb-2 border-b" style={{ borderColor: themeConfig.border + '30', color: themeConfig.heading }}>{definitionData.title}</h4>
                <div className="space-y-2">
                    <div><span className="font-bold text-[10px] uppercase opacity-70 block">Definición</span><p className="leading-snug opacity-90">{definitionData.definition}</p></div>
                    <div className="bg-black/5 p-2 rounded-lg"><span className="font-bold text-[10px] uppercase opacity-70 block">Fórmula</span><ul className="list-disc list-inside space-y-0.5 opacity-90">{definitionData.formula.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
                    <div><span className="font-bold text-[10px] uppercase opacity-70 block">Uso</span><p className="italic opacity-80">{definitionData.usage}</p></div>
                </div>
            </div>
            <div className="fixed inset-0 z-[90]" onClick={(e) => { e.stopPropagation(); onClose(); }}></div>
        </div>
    );
};

const MetricCard = ({ title, value, trend, trendValue, iconKey, definitionKey, themeConfig, isGeometric, suffix = "" }) => {
    const [showPopup, setShowPopup] = useState(false);
    const definitionData = METRIC_DEFINITIONS[definitionKey];
    const gradientClass = `bg-gradient-to-br ${themeConfig.gradient}`;
    const IconComp = Icons[iconKey] || Icons.Activity;

    return (
        <Card className={`p-4 relative group transition-all duration-300 h-full flex flex-col justify-between ${showPopup ? 'z-50 ring-2 ring-offset-2 ring-indigo-500/20' : 'hover:-translate-y-1'}`} themeConfig={themeConfig}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${gradientClass} opacity-[0.08] rounded-bl-full -mr-6 -mt-6 pointer-events-none`}></div>
            <div className="flex justify-between items-start mb-2 relative z-10">
                <div className={`p-2 rounded-xl ${gradientClass} text-white shadow-md`}><IconComp size={20} /></div>
                <button onClick={() => setShowPopup(!showPopup)} className="relative p-1.5 rounded-full hover:bg-black/5 transition-colors" style={{ color: themeConfig.text }}><Icons.Info size={16} className="opacity-50 hover:opacity-100" /></button>
            </div>
            <DetailPopup isOpen={showPopup} onClose={() => setShowPopup(false)} definitionData={definitionData} themeConfig={themeConfig} />
            <div className="relative z-10">
                <h3 className={`text-xs font-bold mb-0.5 ${isGeometric ? 'uppercase tracking-widest' : ''}`} style={{ color: themeConfig.text, opacity: 0.7 }}>{title}</h3>
                <div className="flex items-baseline gap-1"><span className="text-3xl font-extrabold tracking-tight" style={{ color: themeConfig.heading }}>{value}</span><span className="text-sm font-semibold opacity-60" style={{ color: themeConfig.heading }}>{suffix}</span></div>
                <div className="mt-2 flex items-center gap-2">
                    <Badge type={trend === 'positive' ? 'positive' : 'negative'} themeConfig={themeConfig}>{trend === 'positive' ? <Icons.TrendingDown size={12} /> : <Icons.TrendingUp size={12} />} {trendValue}</Badge>
                    <span className="text-[10px] font-semibold opacity-50" style={{ color: themeConfig.text }}>vs. mes ant.</span>
                </div>
            </div>
        </Card>
    );
};

// --- APP PRINCIPAL ---
function DemandDashboard() {
    const [dataVersion, setDataVersion] = useState(0);
    const [currentThemeId, setCurrentThemeId] = useState('summan'); 
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');
    
    // Datos y Configuración
    const themeObj = themes[currentThemeId];
    const themeConfig = isDarkMode ? themeObj.colors.dark : themeObj.colors.light;
    const { trendData, categoryData, kpiData } = useMemo(() => {
        const tData = generateRandomTrend();
        const cData = generateCategoryData();
        const current = tData[tData.length - 1];
        const previous = tData[tData.length - 2] || current;
        return { 
            trendData: tData, categoryData: cData, 
            kpiData: {
                wmape: { value: current.wmape, trend: current.wmape < previous.wmape ? 'positive' : 'negative', change: Math.abs(current.wmape - previous.wmape).toFixed(1) + '%' },
                bias: { value: current.bias, trend: Math.abs(current.bias) < Math.abs(previous.bias) ? 'positive' : 'negative', change: Math.abs(current.bias - previous.bias).toFixed(1) + '%' },
                health: { value: current.health, trend: current.health > previous.health ? 'positive' : 'negative', change: Math.abs(current.health - previous.health).toFixed(1) + '%' },
                mapeRef: { value: (current.wmape * 1.5).toFixed(1), trend: 'negative', change: '1.2%' }
            } 
        };
    }, [dataVersion]);

    const healthDistribution = [{ name: 'Saludable', value: 85, color: themeConfig.accent }, { name: 'Riesgo', value: 15, color: isDarkMode ? '#334155' : '#e2e8f0' }];

    return (
        <div id="dashboard-frame" className={`${themeObj.font || 'font-sans'}`} style={{ backgroundColor: themeConfig.bg, color: themeConfig.text }}>
            
            {/* Header */}
            <header className="absolute top-0 left-0 w-full h-16 border-b z-40 flex items-center justify-between px-6 backdrop-blur-md" style={{ borderColor: themeConfig.border }}>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg text-white bg-gradient-to-tr ${themeConfig.gradient}`}><Icons.LayoutGrid size={18} /></div>
                        <div>
                            <h1 className="text-lg font-extrabold tracking-tight leading-none" style={{ color: themeConfig.heading }}>Demand<span className={`bg-clip-text text-transparent bg-gradient-to-r ${themeConfig.gradient}`}>Analytics</span></h1>
                            <div className="flex items-center gap-2 text-[10px] font-bold mt-0.5 opacity-60 uppercase tracking-wider"><span>GN Corporativo</span><span className="w-1 h-1 rounded-full bg-current opacity-40"></span><span>Enero 2026</span></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 ml-4 pl-4 border-l border-gray-200/20 h-8">
                        {Object.values(themes).map((t) => (
                            <button key={t.id} onClick={() => setCurrentThemeId(t.id)} title={t.label} className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${currentThemeId === t.id ? 'scale-110 ring-2 ring-offset-1 ring-offset-transparent' : 'opacity-60 hover:opacity-100'}`} style={{ background: `linear-gradient(135deg, ${t.colors.light.accent}, ${t.colors.light.secondary})` }}>{currentThemeId === t.id && <Icons.Check size={12} className="text-white" />}</button>
                        ))}
                    </div>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="ml-2 opacity-50 hover:opacity-100">{isDarkMode ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}</button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-1 rounded-lg flex items-center gap-1 border" style={{ borderColor: themeConfig.border, backgroundColor: themeConfig.cardBg }}><span className="px-3 py-1 text-xs font-bold opacity-60">Mensual</span></div>
                    <button onClick={() => setDataVersion(v => v + 1)} className="p-2 opacity-50 hover:opacity-100"><Icons.RefreshCw size={18} /></button>
                </div>
            </header>

            {/* Contenido Paginado */}
            <div className="absolute top-16 bottom-0 w-full p-6 overflow-hidden flex flex-col">
                <div className="flex gap-6 mb-4 border-b" style={{ borderColor: themeConfig.border + '40' }}>
                    <button onClick={() => setActivePage('dashboard')} className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${activePage === 'dashboard' ? 'opacity-100' : 'opacity-40'}`} style={{ borderColor: activePage === 'dashboard' ? themeConfig.accent : 'transparent', color: activePage === 'dashboard' ? themeConfig.accent : 'inherit' }}>1. Tablero Estratégico</button>
                    <button onClick={() => setActivePage('details')} className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${activePage === 'details' ? 'opacity-100' : 'opacity-40'}`} style={{ borderColor: activePage === 'details' ? themeConfig.accent : 'transparent', color: activePage === 'details' ? themeConfig.accent : 'inherit' }}>2. Detalle Táctico</button>
                </div>

                {activePage === 'dashboard' && (
                    <div className="flex-1 flex flex-col gap-6 animate-in">
                        <div className="grid grid-cols-4 gap-4 h-[140px]">
                            <MetricCard title="WMAPE" definitionKey="wmape" value={kpiData.wmape.value} suffix="%" trend={kpiData.wmape.trend} trendValue={kpiData.wmape.change} iconKey="Activity" themeConfig={themeConfig} isGeometric={themeObj.isGeometric} />
                            <MetricCard title="BIAS (Sesgo)" definitionKey="bias" value={(kpiData.bias.value > 0 ? '+' : '') + kpiData.bias.value} suffix="%" trend={kpiData.bias.trend} trendValue={kpiData.bias.change} iconKey="Target" themeConfig={themeConfig} isGeometric={themeObj.isGeometric} />
                            <MetricCard title="Salud Portafolio" definitionKey="health" value={kpiData.health.value} suffix="%" trend={kpiData.health.trend} trendValue={kpiData.health.change} iconKey="Activity" themeConfig={themeConfig} isGeometric={themeObj.isGeometric} />
                            <MetricCard title="MAPE (Ref)" definitionKey="mapeRef" value={kpiData.mapeRef.value} suffix="%" trend={kpiData.mapeRef.trend} trendValue={kpiData.mapeRef.change} iconKey="AlertCircle" themeConfig={themeConfig} isGeometric={themeObj.isGeometric} />
                        </div>
                        <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
                            <Card className="col-span-2 p-5 flex flex-col" themeConfig={themeConfig}>
                                <div className="flex justify-between items-center mb-2"><h3 className={`text-sm font-bold ${themeObj.isGeometric ? 'uppercase tracking-widest' : ''}`} style={{ color: themeConfig.heading }}>Evolución</h3></div>
                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                            <defs><linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={themeConfig.accent} stopOpacity={0.25}/><stop offset="95%" stopColor={themeConfig.accent} stopOpacity={0}/></linearGradient></defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#cbd5e1'} strokeOpacity={0.4} />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: themeConfig.text, fontSize: 11, fontWeight: 600}} dy={10} />
                                            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: themeConfig.text, fontSize: 11, fontWeight: 600}} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', color: '#000' }} />
                                            <Area yAxisId="left" type="monotone" dataKey="wmape" stroke={themeConfig.accent} strokeWidth={3} fill="url(#colorMain)" />
                                            <Bar yAxisId="right" dataKey="bias" barSize={12} fill={themeConfig.secondary} radius={[2, 2, 0, 0]} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                            <Card className="p-5 flex flex-col relative" themeConfig={themeConfig}>
                                <h3 className={`text-sm font-bold mb-2 ${themeObj.isGeometric ? 'uppercase tracking-widest' : ''}`} style={{ color: themeConfig.heading }}>Salud</h3>
                                <div className="flex-1 relative flex items-center justify-center min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={healthDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={75} paddingAngle={2} dataKey="value" stroke="none">
                                                {healthDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span className="text-3xl font-extrabold" style={{ color: themeConfig.heading }}>{kpiData.health.value}%</span></div>
                                </div>
                                <button onClick={() => setActivePage('details')} className="mt-4 w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors hover:bg-black/5" style={{ color: themeConfig.accent }}>Ver reporte detallado <Icons.ArrowRight size={12} /></button>
                            </Card>
                        </div>
                    </div>
                )}

                {activePage === 'details' && (
                    <div className="flex-1 flex flex-col animate-in h-full">
                        <Card className="flex-1 overflow-hidden flex flex-col" themeConfig={themeConfig}>
                            <div className="p-5 border-b flex justify-between items-center" style={{ borderColor: themeConfig.border }}>
                                <div><h3 className={`text-lg font-bold ${themeObj.isGeometric ? 'uppercase tracking-widest' : ''}`} style={{ color: themeConfig.heading }}>Detalle por Negocio</h3><p className="text-xs font-medium mt-1 opacity-60">Análisis de Pareto: Categorías ordenadas por desviación</p></div>
                                <button onClick={() => setActivePage('dashboard')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors hover:bg-black/5" style={{ color: themeConfig.text }}><Icons.ArrowLeft size={16} /> Volver</button>
                            </div>
                            <div className="flex-1 overflow-auto p-2">
                                <table className="w-full text-left text-sm">
                                    <thead className="text-xs uppercase font-bold tracking-wider opacity-60 sticky top-0 z-10" style={{ backgroundColor: themeConfig.cardBg, color: themeConfig.text }}>
                                        <tr><th className="px-6 py-4 font-bold">Categoría</th><th className="px-6 py-4 font-bold text-center">Precisión (WMAPE)</th><th className="px-6 py-4 font-bold pl-10">Índice Salud</th><th className="px-6 py-4 font-bold text-center">Diagnóstico</th><th className="px-6 py-4 font-bold text-right">Acciones</th></tr>
                                    </thead>
                                    <tbody className="divide-y" style={{ divideColor: themeConfig.border + '20' }}>
                                        {categoryData.map((cat, idx) => (
                                            <tr key={idx} className="transition-colors hover:bg-black/5">
                                                <td className="px-6 py-4"><div className="flex items-center gap-4"><div className={`w-1 h-8 rounded-full ${idx < 3 ? 'opacity-100' : 'opacity-20'} -ml-4`} style={{backgroundColor: themeConfig.accent}}></div><span className="font-bold">{cat.name}</span></div></td>
                                                <td className="px-6 py-4 text-center"><span className={`text-sm font-bold ${cat.wmape > 25 ? 'text-red-500' : ''}`} style={cat.wmape <= 25 ? { color: themeConfig.text } : {}}>{cat.wmape}%</span></td>
                                                <td className="px-6 py-4"><div className="flex items-center gap-4 max-w-[200px]"><span className="text-xs font-bold w-8 text-right opacity-60">{cat.health}%</span><div className="flex-1 h-2 rounded-full overflow-hidden bg-black/10"><div className={`h-full rounded-full transition-all duration-1000 ${cat.health > 70 ? '' : 'bg-red-500'}`} style={{ width: `${cat.health}%`, backgroundColor: cat.health > 70 ? themeConfig.accent : undefined }}></div></div></div></td>
                                                <td className="px-6 py-4 text-center">{cat.wmape < 25 && cat.health > 70 ? <Badge type="positive" themeConfig={themeConfig}><Icons.Check size={10} /> OK</Badge> : <Badge type="negative" themeConfig={themeConfig}><Icons.AlertCircle size={10} /> Revisar</Badge>}</td>
                                                <td className="px-6 py-4 text-right"><button className="p-1.5 rounded hover:bg-black/10 opacity-50 hover:opacity-100"><Icons.MoreHorizontal size={16} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DemandDashboard />);
