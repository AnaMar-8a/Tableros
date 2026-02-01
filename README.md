# Project PRAGMA: Demand Planning Dashboard (Mockup)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b3f076c8-5c4d-4503-9110-384732151609/deploy-status)](https://app.netlify.com/sites/pronosticos-s/deploys)
🚀 **Demo en vivo:** [https://pronosticos-s.netlify.app/](https://pronosticos-s.netlify.app/)

## 1. Visión Estratégica y Contexto del Proyecto
Este repositorio aloja el **primer mockup funcional** desarrollado bajo la iniciativa **PRAGMA**, ejecutada por [**Summan**](http://www.summan.com/) para **Grupo Nutresa**.

Este desarrollo representa la materialización táctica preliminar del nuevo modelo de **Supply Chain Management (SCM)**, enfocado en la reingeniería del proceso de **Pronóstico de la Demanda**.

### Objetivo del Mockup
El dashboard se entrega como una herramienta de exploración y **validación funcional**. Su propósito es permitir a los *planners*, líderes funcionales y directivos interactuar con la propuesta visual y lógica para:
1.  Confirmar la utilidad de los indicadores propuestos.
2.  Ajustar la experiencia de usuario (UX) antes de iniciar desarrollos complejos.
3.  Asegurar una lectura equilibrada entre impacto económico, calidad del pronóstico y salud del portafolio.

> **Nota de Confidencialidad:** La data presentada en este despliegue es simulada (*dummy data*). Su función es estrictamente facilitar la validación de los flujos de usuario y comportamiento de los KPIs.

---

## 2. Definición de Métricas (Lógica de Negocio Propuesta)
El tablero implementa las fórmulas y definiciones técnicas establecidas en los documentos de gobierno del proceso de Planeación de la Demanda de GN, las cuales están sujetas a revisión durante esta fase:

### WMAPE (Weighted Mean Absolute Percentage Error)
* **Definición:** Mide el error total del plan de demanda ponderado por el volumen real.
* **Fórmula:** $\sum |Plan - Real| / \sum Demanda Real$.
* **Objetivo:** Proporcionar una lectura ejecutiva del impacto económico de las desviaciones en el negocio.

### MAPE (Mean Absolute Percentage Error)
* **Definición:** Medición del error porcentual a nivel individual (SKU/Referencia), tratando cada material de forma equitativa.
* **Objetivo:** Diagnóstico granular del desempeño por referencia (Sector, Categoría, Marca o Canal).

### BIAS (Sesgo)
* **Definición:** Indicador de la tendencia sistemática del plan a sobreestimar o subestimar la demanda.
* **Fórmula:** $\sum (Plan - Real) / \sum Demanda Real$.
* **Objetivo:** Identificar sesgos estructurales del proceso.

### Índice de Salud del Portafolio
* **Definición:** Porcentaje de materiales cuyo MAPE individual se encuentra en o por debajo de la meta definida (ej. 20%).
* **Objetivo:** Evaluar la calidad global del portafolio evitando lecturas sesgadas por referencias de alto volumen.

---

## 3. Hoja de Ruta hacia Power BI (Siguientes Pasos)
Este prototipo sirve como **insumo base para las sesiones de validación**. Una vez el equipo funcional apruebe la interacción y la lógica presentada aquí, este repositorio se convertirá en la especificación técnica para el equipo de desarrollo de Power BI.

La proyección de uso para el equipo de BI (post-validación) es la siguiente:

### A. Especificación de UX/UI
El diseño validado definirá el estándar visual para los reportes finales:
* **Jerarquía Visual:** Uso de tarjetas de KPIs y gráficos de tendencia según lo aprobado en este mockup.
* **Interacción:** Réplica de la experiencia de filtrado por *Regional*, *Canal* y *Categoría*.

### B. Traducción de Lógica a DAX
Las fórmulas matemáticas aquí expuestas deberán convertirse a medidas **DAX** dinámicas, asegurando que cálculos como el **WMAPE** iteren correctamente sobre la tabla de hechos (`SUMX`) según los filtros que validen los usuarios funcionales.

---

## 4. Arquitectura del Prototipo
La solución ha sido construida bajo una arquitectura moderna de **Single Page Application (SPA)** para agilizar las iteraciones de cambio durante la fase de validación:

* **Core:** React + TypeScript.
* **Build Tool:** Vite.
* **UI Components:** Radix UI + Tailwind CSS.
* **Visualización:** Recharts.
* **Infraestructura:** Despliegue en Netlify para revisión remota inmediata.

## 5. Instrucciones de Ejecución Local

Para levantar el proyecto y realizar revisiones locales:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

---

[**Ana Maria Ochoa**](https://www.linkedin.com/in/8aanamaria/)
Analista de Proyectos Contratista
**Proyecto PRAGMA | [Summan S.A.S](https://www.linkedin.com/company/summan-s-a-s/) - Nutresa**
