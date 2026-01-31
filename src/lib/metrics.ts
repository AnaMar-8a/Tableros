export interface MetricDefinition {
  label: string;
  fullTitle: string;
  desc: string;
  formula: string[];
  usage: string;
}

export const METRICS: Record<string, MetricDefinition> = {
  wmape: {
    label: 'WMAPE',
    fullTitle: 'Error Ponderado (WMAPE)',
    desc: 'Mide el error total del plan de demanda ponderado por el volumen real.',
    formula: ['Error Absoluto / Demanda Total'],
    usage: 'Lectura ejecutiva.'
  },
  bias: {
    label: 'BIAS',
    fullTitle: 'Sesgo (BIAS)',
    desc: 'Mide la tendencia sistemática del plan a sobreestimar (+) o subestimar (-).',
    formula: ['(Real - Plan) / Real'],
    usage: 'Identificar sesgos estructurales.'
  },
  health: {
    label: 'Salud Portafolio',
    fullTitle: 'Índice de Salud',
    desc: '% SKUs con error ≤ meta.',
    formula: ['SKUs en meta / Total SKUs'],
    usage: 'Calidad sin sesgo de volumen.'
  },
  mape: {
    label: 'MAPE Ref',
    fullTitle: 'MAPE Promedio',
    desc: 'Promedio simple del error porcentual a nivel SKU.',
    formula: ['Promedio de errores %'],
    usage: 'Diagnóstico operativo granular.'
  }
};
