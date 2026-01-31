# Hand-off: Tablero Demand Analytics

## Especificaciones para Desarrollo – Power BI

Este documento consolida los insumos y lineamientos necesarios para la correcta construcción del reporte **Demand Analytics** en **Power BI**, asegurando coherencia visual, consistencia funcional y una experiencia de usuario alineada con los estándares definidos.

---

## Contenido del Paquete

### Prototipo Funcional (HTML)

Simulación interactiva que ejemplifica el comportamiento esperado del tablero.

### Guía de Estilo (Markdown / PDF)

Lineamientos de diseño, uso de color, tipografía y disposición visual.

### Hoja de Recursos Gráficos (`Recursos_Graficos_PowerBI.md`)

Activos gráficos oficiales: iconografía en SVG y códigos de degradados listos para su implementación.

---

## Instrucciones para el Equipo de Power BI

Los siguientes recursos deben utilizarse de forma complementaria, cada uno con un propósito específico.

---

### 1. Prototipo HTML (`index.html`) — Referencia de Comportamiento

Este archivo **no corresponde al código fuente final**. Power BI no implementa React de forma nativa.

Debe utilizarse exclusivamente como guía para comprender:

* El funcionamiento esperado de los filtros globales en la parte superior del tablero.
* La navegación entre vistas **"Estratégica"** y **"Táctica"** mediante **Bookmarks**.
* El comportamiento de los tooltips informativos al interactuar con los KPIs.

---

### 2. Hoja de Recursos Gráficos (`Recursos_Graficos_PowerBI.md`) — Activos Visuales

**Iconografía**
No se deben incorporar iconos externos. Utilicen exclusivamente los **SVG provistos** para garantizar nitidez, consistencia visual y control de color dentro de Power BI.

**Degradados y colores**
Apliquen los **códigos HEX definidos** en los fondos de iconos y elementos de KPI, sin variaciones.

---

### 3. Guía de Estilo (`Guia_Estilo.md`) — Configuración del Reporte

* Configuren el archivo **JSON de tema (Theme)** de Power BI utilizando los códigos HEX especificados.
* El **lienzo (Canvas)** debe establecerse estrictamente en **1280 × 720 px**, sin excepciones.

---

## Checklist de Aceptación (QA)

El desarrollo se considerará finalizado únicamente cuando se cumplan **todos** los siguientes criterios de aceptación. Estos criterios definen el estándar mínimo esperado para aprobar el tablero desde una perspectiva funcional, visual, de experiencia de usuario y de uso ejecutivo.

---

### 1. Diseño y Layout

**Objetivo:** Garantizar una visualización clara, estable y consistente en el entorno objetivo de consumo.

* El reporte se visualiza correctamente en una resolución **1280 × 720 px**, sin generar scroll horizontal ni vertical.
* Todos los elementos (KPIs, gráficos, filtros, textos) mantienen alineación visual, márgenes coherentes y espaciado consistente.
* No existen elementos superpuestos, cortados o fuera del área visible del lienzo.
* La jerarquía visual es clara:

  * Los KPIs principales destacan de forma inmediata.
  * Los KPIs secundarios y visuales de contexto no compiten visualmente con los indicadores clave.
* El layout permite una lectura fluida de izquierda a derecha y de arriba hacia abajo, sin ambigüedades.

---

### 2. Identidad Visual

**Objetivo:** Asegurar consistencia con la identidad gráfica definida y eliminar interpretaciones subjetivas del diseño.

* Todos los KPIs utilizan exclusivamente los **iconos SVG oficiales** provistos (Activity, Target, Check, Alert).
* No se utilizan iconos, imágenes o recursos externos distintos a los incluidos en el paquete.
* Los colores del reporte coinciden exactamente con la **paleta Summan** definida (Verde / Amarillo), sin variaciones de tono, saturación u opacidad.
* Los degradados aplicados en fondos de iconos y KPIs corresponden a los **códigos HEX especificados** en la hoja de recursos.
* No se emplean colores por defecto de Power BI que no estén explícitamente definidos en el tema.

---

### 3. Configuración Técnica del Reporte

**Objetivo:** Garantizar una base técnica consistente y mantenible.

* El archivo de **tema (Theme JSON)** está correctamente configurado según la Guía de Estilo.
* El lienzo del reporte está configurado exactamente en **1280 × 720 px**.
* No existen configuraciones temporales, valores hardcodeados o ajustes manuales pendientes.
* El reporte puede ser actualizado con nuevos datos sin romper el layout ni la experiencia visual.

---

### 4. Funcionalidad y Navegación

**Objetivo:** Asegurar una interacción predecible, coherente y alineada con el modelo mental del usuario.

* Los filtros globales afectan de manera consistente a todas las visualizaciones relevantes.
* Los filtros no generan resultados incoherentes, vacíos inesperados o comportamientos contradictorios.
* La navegación entre vistas **"Estratégica"** y **"Táctica"** mediante **Bookmarks**:

  * Es clara e intuitiva.
  * Mantiene el contexto del usuario.
  * Permite volver a la vista anterior sin pérdida de información.
* No existen interacciones rotas, botones inactivos o elementos sin propósito funcional.

---

### 5. Tooltips y Definición de Métricas

**Objetivo:** Reducir ambigüedad y asegurar correcta interpretación de los indicadores.

* Todos los KPIs cuentan con tooltips informativos correctamente configurados.
* Cada tooltip incluye:

  * Definición clara de la métrica.
  * Contexto de negocio (qué mide y para qué se utiliza).
  * Consideraciones relevantes para su interpretación.
* El contenido de los tooltips es consistente con la lógica de negocio acordada y con otras visualizaciones del tablero.
* Los tooltips son legibles, no se superponen y no interfieren con la navegación.

---

### 6. Calidad General y Preparación Ejecutiva

**Objetivo:** Validar que el tablero está listo para toma de decisiones, no solo para demostración.

* El reporte presenta un desempeño fluido, sin demoras perceptibles en filtros, navegación o tooltips.
* No existen textos de prueba, placeholders, visuales incompletos o configuraciones por defecto visibles.
* El tablero puede ser utilizado directamente por usuarios ejecutivos sin necesidad de explicaciones adicionales.
* El reporte transmite confianza, claridad y madurez analítica.

---

## Contacto de Diseño y Lineamientos

**Ana María Ochoa**
Analista de Proyectos
Contratista – Summan
