const { useState, useEffect, useMemo } = React;
const { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } = Recharts;

// --- ICONOS SVG ---
const Icons = {
    Info: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
    Activity: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    Target: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    Alert: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 11"/></svg>
};

const themes = {
    summan: {
        id: 'summan',
        light: { bg: '#FDFDFD', text: '#333333', head: '#1A1A1B', accent: '#A3C657', secondary: '#F9D423', border: '#E69D4F' },
        dark: { bg: '#1A1A1B', text: '#E0E0E0', head: '#F9D423', accent: '#A3C657', secondary: '#F2B134', border: '#4A773C' }
    },
    nutresa: {
        id: 'nutresa',
        light: { bg: '#F8F9FA', text: '#333333', head: '#2D5A27', accent: '#2D5A27', secondary: '#76B82A', border: '#76B82A' },
        dark: { bg: '#121212', text: '#E0E0E0', head: '#8BD13F', accent: '#8BD13F', secondary: '#2D5A27', border: '#4A773C' }
    }
};

function DemandDashboard() {
    const [page, setPage] = useState('main');
    const [isDark, setIsDark] = useState(false);
    const [themeId, setThemeId] = useState('summan');
    const [isMounted, setIsMounted] = useState(false); // Fix para Recharts

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const config = isDark ? themes[themeId].dark : themes[themeId].light;

    const data = useMemo(() => {
        const categories = ['Cárnicos', 'Helados', 'Café', 'Novaventa', 'Galletas', 'Chocolates', 'Pastas', 'TMLUC'];
        return categories.map(name => ({
            name,
            wmape: Math.floor(Math.random() * 20) + 10,
            health: Math.floor(Math.random() * 30) + 70
        })).sort((a,b) => b.wmape - a.wmape);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="pbi-frame transition-colors duration-500" style={{ backgroundColor: config.bg, color: config.text }}>
            
            {/* Nav Superior */}
            <div className="h-16 border-b flex items-center justify-between px-8" style={{ borderColor: config.border + '40' }}>
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg text-white" style={{ background: `linear-gradient(135deg, ${config.accent}, ${config.secondary})` }}>
                        <Icons.Activity />
                    </div>
                    <h1 className="text-xl font-800 uppercase tracking-tighter" style={{ color: config.head }}>Demand<span style={{ color: config.accent }}>Analytics</span></h1>
                </div>
                
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsDark(!isDark)} className="p-2 opacity-50 hover:opacity-100 uppercase text-[10px] font-bold">
                        {isDark ? 'Modo Claro' : 'Modo Oscuro'}
                    </button>
                    <div className="flex gap-2">
                        {Object.keys(themes).map(id => (
                            <button key={id} onClick={() => setThemeId(id)} className={`w-6 h-6 rounded-full border-2 ${themeId === id ? 'border-white' : 'border-transparent'}`}
                                style={{ backgroundColor: themes[id].light.accent }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Contenido Paginado */}
            <div className="p-8 h-[654px] flex flex-col gap-6">
                <div className="flex gap-8 border-b" style={{ borderColor: config.border + '20' }}>
                    <button onClick={() => setPage('main')} className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${page === 'main' ? 'opacity-100 border-b-2' : 'opacity-40'}`} style={{ borderColor: config.accent }}>Tablero Estratégico</button>
                    <button onClick={() => setPage('detail')} className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${page === 'detail' ? 'opacity-100 border-b-2' : 'opacity-40'}`} style={{ borderColor: config.accent }}>Detalle Táctico</button>
                </div>

                {page === 'main' ? (
                    <div className="flex-1 flex flex-col gap-6 animate-fade-in">
                        {/* KPIs */}
                        <div className="grid grid-cols-4 gap-6">
                            {[
                                { t: 'WMAPE', v: '22.4%', i: 'Activity', k: 'wmape' },
                                { t: 'BIAS', v: '+2.1%', i: 'Target', k: 'bias' },
                                { t: 'Salud', v: '85%', i: 'Check', k: 'health' },
                                { t: 'MAPE Ref', v: '38%', i: 'Alert', k: 'mapeRef' }
                            ].map(kpi => (
                                <div key={kpi.t} className="p-6 rounded-2xl border bg-opacity-5" style={{ borderColor: config.border + '40', backgroundColor: config.accent + '05' }}>
                                    <h4 className="text-[10px] font-bold uppercase opacity-60 mb-2">{kpi.t}</h4>
                                    <div className="text-3xl font-800" style={{ color: config.head }}>{kpi.v}</div>
                                </div>
                            ))}
                        </div>

                        {/* Gráfico principal */}
                        <div className="flex-1 grid grid-cols-3 gap-6">
                            <div className="col-span-2 p-6 rounded-2xl border" style={{ borderColor: config.border + '20' }}>
                                <h4 className="text-xs font-bold uppercase mb-6">Tendencia de Precisión</h4>
                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer>
                                        <ComposedChart data={[
                                            {m: 'Ago', w: 25, b: 5}, {m: 'Sep', w: 22, b: -2}, {m: 'Oct', w: 28, b: 3}, {m: 'Nov', w: 24, b: 1}, {m: 'Dic', w: 30, b: 8}, {m: 'Ene', w: 22, b: 2}
                                        ]}>
                                            <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill: config.text, fontSize: 10}} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1e293b', color: '#fff' }} />
                                            <Area type="monotone" dataKey="w" stroke={config.accent} fill={config.accent} fillOpacity={0.1} strokeWidth={3} />
                                            <Bar dataKey="b" fill={config.secondary} radius={[4, 4, 0, 0]} barSize={20} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            
                            <div className="p-6 rounded-2xl border flex flex-col justify-center items-center" style={{ borderColor: config.border + '20' }}>
                                <h4 className="text-xs font-bold uppercase mb-4 text-center">Salud del Portafolio</h4>
                                <div className="h-48 w-48 relative">
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie data={[{v: 85}, {v: 15}]} innerRadius={60} outerRadius={80} dataKey="v" stroke="none">
                                                <Cell fill={config.accent} />
                                                <Cell fill={config.accent + '20'} />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex items-center justify-center font-800 text-3xl">85%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-hidden rounded-2xl border animate-fade-in" style={{ borderColor: config.border + '20' }}>
                        <table className="w-full text-left">
                            <thead className="text-[10px] font-bold uppercase opacity-60 sticky top-0" style={{ backgroundColor: config.bg }}>
                                <tr>
                                    <th className="p-6">Categoría</th>
                                    <th className="p-6">Precisión (WMAPE)</th>
                                    <th className="p-6">Índice de Salud</th>
                                    <th className="p-6 text-right">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ divideColor: config.border + '10' }}>
                                {data.map(cat => (
                                    <tr key={cat.name} className="hover:bg-black/5 transition-colors">
                                        <td className="p-6 font-bold">{cat.name}</td>
                                        <td className="p-6 font-semibold" style={{ color: cat.wmape > 25 ? '#ef4444' : config.text }}>{cat.wmape}%</td>
                                        <td className="p-6">
                                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full" style={{ width: `${cat.health}%`, backgroundColor: config.accent }}></div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: config.accent + '20', color: config.accent }}>Estable</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DemandDashboard />);
