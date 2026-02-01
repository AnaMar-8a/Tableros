# Project PRAGMA: Demand Planning Dashboard (Mockup)

## Contexto del Proyecto
Este repositorio aloja el **primer mockup funcional** desarrollado en el marco del **Proyecto PRAGMA**, una iniciativa estratégica ejecutada por **Summan** para **Grupo Nutresa**.

Este desarrollo surge de la necesidad de materializar la visión del nuevo modelo de **Supply Chain Management (SCM)**, específicamente enfocado en la reingeniería y optimización del proceso de **Pronóstico de la Demanda**. El objetivo de este prototipo es validar la visualización de indicadores críticos de desempeño y la experiencia de usuario antes de la integración final con los sistemas productivos.

> **Nota:** La información visualizada en este despliegue utiliza datos ficticios (*dummy data*) con fines estrictamente demostrativos para la validación de la interfaz y la lógica de cálculo de los KPIs.

## Alcance Funcional
El tablero de control está diseñado para ofrecer una lectura equilibrada entre el impacto económico, la calidad del pronóstico y la salud del portafolio. [cite_start]Se basa en las definiciones técnicas establecidas para la medición del desempeño en GN[cite: 1, 2].

Las métricas principales implementadas en esta visualización incluyen:

### 1. WMAPE (Weighted Mean Absolute Percentage Error)
* **Definición:** Mide el error total del plan de demanda ponderado por el volumen real.
* [cite_start]**Objetivo:** Proporcionar una lectura ejecutiva del impacto económico de las desviaciones en el negocio[cite: 6].

### 2. MAPE (Mean Absolute Percentage Error)
* **Definición:** Medición del error porcentual a nivel individual (SKU/Referencia) sin ponderación por volumen.
* [cite_start]**Objetivo:** Diagnóstico granular del desempeño por referencia, permitiendo análisis por Sector, Categoría, Marca o Canal[cite: 6].

### 3. BIAS (Sesgo)
* **Definición:** Indicador de la tendencia sistemática del plan (sobreestimación o subestimación).
* [cite_start]**Objetivo:** Identificar sesgos estructurales en el proceso de planificación[cite: 6].

### 4. Índice de Salud del Portafolio
* [cite_start]**Definición:** Porcentaje de materiales cuyo MAPE individual se encuentra dentro de la meta definida (ej. ≤ 20%)[cite: 4, 6].
* [cite_start]**Objetivo:** Evaluar la calidad global del portafolio evitando lecturas sesgadas por referencias de alto volumen[cite: 6].

## Stack Tecnológico
Este prototipo ha sido construido utilizando tecnologías modernas para garantizar rendimiento y escalabilidad:
* **Core:** React + TypeScript
* **Build Tool:** Vite
* **Estilos:** Tailwind CSS
* **Infraestructura:** Despliegue continuo en Netlify

## Instrucciones de Ejecución Local

Para levantar el proyecto en un entorno de desarrollo local:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

---

**Confidencialidad:** Este software y la documentación asociada contienen información propiedad de Summan y Grupo Nutresa. Su distribución está restringida a los stakeholders del proyecto PRAGMA.

---

**Ana Maria Ochoa**
Analista de Proyectos Contratista
**Proyecto PRAGMA | Summan - Nutresa**
