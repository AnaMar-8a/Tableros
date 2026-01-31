export interface ChartDataPoint {
  name: string;
  wmape: number;
  bias: number;
}

export interface CategoryData {
  name: string;
  wmape: number;
  health: number;
  status: 'OK' | 'Riesgo' | 'Crítico';
}

export interface KpiValue {
  value: string;
  trend: number;
}

export interface DashboardData {
  chartData: ChartDataPoint[];
  kpis: {
    wmape: KpiValue;
    bias: KpiValue;
    health: KpiValue;
    mape: KpiValue;
  };
  catData: CategoryData[];
  donutData: { name: string; value: number }[];
}

export function generateDashboardData(
  periodo: string,
  negocio: string,
  refreshCount: number
): DashboardData {
  let labels: string[] = [];
  
  if (periodo === 'Mensual') {
    labels = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene'];
  } else if (periodo === 'Trimestral') {
    labels = ['Q2-25', 'Q3-25', 'Q4-25', 'Q1-26'];
  } else {
    labels = ['2023', '2024', '2025', 'YTD'];
  }

  const baseError = negocio === 'Todos' ? 20 : (negocio.length * 2) + 15;

  const chartData: ChartDataPoint[] = labels.map((label, i) => {
    return {
      name: label,
      wmape: Math.max(10, Math.floor(baseError + (Math.random() * 5))),
      bias: Math.floor((Math.random() * 10) - 5)
    };
  });

  const current = chartData[chartData.length - 1];
  const prev = chartData[chartData.length - 2] || { wmape: 25, bias: 2 };
  
  const kpis = {
    wmape: {
      value: current.wmape.toFixed(1) + '%',
      trend: -(current.wmape - prev.wmape)
    },
    bias: {
      value: (current.bias > 0 ? '+' : '') + current.bias.toFixed(1) + '%',
      trend: current.bias - prev.bias
    },
    health: {
      value: (100 - current.wmape - 5).toFixed(0) + '%',
      trend: 2.5
    },
    mape: {
      value: (current.wmape * 1.3).toFixed(1) + '%',
      trend: -1.2
    }
  };

  let categories = [
    'Cárnicos',
    'Helados',
    'Café',
    'Novaventa',
    'Galletas',
    'Chocolates',
    'Pastas',
    'TMLUC'
  ];
  
  if (negocio !== 'Todos') {
    categories = [negocio, ...categories.filter(c => c !== negocio)];
  }

  const catData: CategoryData[] = categories
    .map(c => {
      const catError = Math.floor(baseError + (Math.random() * 15) - 7);
      return {
        name: c,
        wmape: catError,
        health: Math.min(99, 100 - catError + 5),
        status: (catError < 25 ? 'OK' : catError < 35 ? 'Riesgo' : 'Crítico') as 'OK' | 'Riesgo' | 'Crítico'
      };
    })
    .sort((a, b) => b.wmape - a.wmape);

  const healthVal = parseInt(kpis.health.value);
  const donutData = [
    { name: 'Sano', value: healthVal },
    { name: 'Riesgo', value: 100 - healthVal }
  ];

  return { chartData, kpis, catData, donutData };
}
