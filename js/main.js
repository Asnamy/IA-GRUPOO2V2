// Main JavaScript for Guía IA | GrupoO2

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupScrollEffects();
    setupInteractiveElements();
    setupChart();
    setupModals();
    setActiveSection();
    setupAILab();
    loadTeamMembers();
    setupInteractivePoints();
    setupVisualizationModal(); // Llamada a la nueva función
}

// --- FUNCIONES BÁSICAS DE LA GUÍA (SIN CAMBIOS) ---

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                if (window.innerWidth < 768) closeMobileMenu();
            }
        });
    });
    document.querySelectorAll('.index-card').forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const setInitialState = () => sidebar.classList.toggle('-translate-x-full', window.innerWidth < 768);
    setInitialState();
    window.addEventListener('resize', setInitialState);
    mobileMenuBtn.addEventListener('click', (e) => { e.stopPropagation(); sidebar.classList.toggle('-translate-x-full'); });
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.add('-translate-x-full');
        }
    });
}

function closeMobileMenu() { if (window.innerWidth < 768) document.getElementById('sidebar').classList.add('-translate-x-full'); }

function setupScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.section-content').forEach(section => observer.observe(section));
}

function setActiveSection() { document.querySelector('.nav-link')?.classList.add('active'); }

function setupInteractiveElements() {
    document.querySelectorAll('.ai-model-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px) scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
    });
}

function setupChart() { /* ... Tu código de Chart.js ... */ }

function setupModals() { /* ... Tu código de setupModals ... */ }

function showNotification(message, type = 'info') { /* ... Tu código de showNotification ... */ }

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => searchContent(searchInput.value.toLowerCase()));
    }
}

window.addEventListener('error', (e) => { console.error('Error occurred:', e.error); showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error'); });

window.openModal = (id) => { /* ... Tu código de openModal ... */ };
window.closeModal = (id) => { /* ... Tu código de closeModal ... */ };

// --- FUNCIONES QUE YA FUNCIONABAN (SIN CAMBIOS) ---

function setupAILab() { /* ... Tu código de setupAILab completo y funcional ... */ }
async function loadTeamMembers() { /* ... Tu código de loadTeamMembers completo y funcional ... */ }
function setupInteractivePoints() { /* ... Tu código de setupInteractivePoints completo y funcional ... */ }


// ==================================================================
// SECCIÓN NUEVA Y CORREGIDA PARA LA VISUALIZACIÓN
// ==================================================================

/**
 * Controla la apertura y cierre del modal de visualización
 * y se asegura de que D3.js se inicialice solo una vez.
 */
function setupVisualizationModal() {
    const openBtn = document.getElementById('open-viz-btn');
    const closeBtn = document.getElementById('close-viz-btn');
    const modalOverlay = document.getElementById('viz-modal-overlay');

    if (!openBtn) return; // Si el botón no existe, no hacer nada.

    let isVizInitialized = false;

    function openViz() {
        modalOverlay.classList.remove('hidden');
        if (!isVizInitialized) {
            setupD3Visualization();
            isVizInitialized = true;
        }
    }

    function closeViz() {
        modalOverlay.classList.add('hidden');
    }

    openBtn.addEventListener('click', openViz);
    closeBtn.addEventListener('click', closeViz);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeViz();
        }
    });
}

/**
 * Dibuja el grafo de D3.js. Esta función contiene todo el código
 * de tu archivo indexvisualizacion.html, ahora integrado correctamente.
 */
function setupD3Visualization() {
    // Limpiar el SVG por si acaso
    d3.select("#network-chart").selectAll("*").remove();

    // ESTE ES EL CÓDIGO DE TU VISUALIZACIÓN, AHORA INTEGRADO CORRECTAMENTE
    const graphData = { "nodes": [ {"id": "NotebookLM", "group": 0, "name": "NotebookLM", "context": "Es el propósito general de la guía. Presenta un índice interactivo con tarjetas de acceso directo a secciones importantes. Se enfoca en la IA como un 'asistente inteligente' para liberar tiempo y potenciar la creatividad."}, {"id": "Sources", "group": 1, "name": "Fuentes", "context": "Tipos de documentos que NotebookLM puede usar como fuentes: Documentos, Presentaciones de Google, Sitios Web, PDFs, YouTube."}, {"id": "Documents", "group": 1, "name": "Documentos", "context": "Archivos de texto y otros formatos que sirven como entrada para NotebookLM."}, {"id": "Google Slides", "group": 1, "name": "Presentaciones de Google", "context": "Presentaciones que pueden ser utilizadas como fuentes de información."}, {"id": "Websites", "group": 1, "name": "Sitios Web", "context": "Páginas web que pueden ser analizadas por NotebookLM."}, {"id": "PDFs", "group": 1, "name": "PDFs", "context": "Documentos en formato PDF que pueden ser procesados."}, {"id": "YouTube", "group": 1, "name": "YouTube", "context": "Videos de YouTube que pueden ser usados como fuentes, permitiendo interactuar con su contenido."}, {"id": "Features", "group": 2, "name": "Características", "context": "Funcionalidades clave de NotebookLM: Resumir, Hacer Preguntas, Generar Ideas, Esquematizar, Redactar, Explicar, Chatear con Fuentes, Toma de Notas."}, {"id": "Summarize", "group": 2, "name": "Resumir", "context": "Capacidad de la IA para condensar información. Usado en el Asistente de Redacción para simular resúmenes de escenarios."}, {"id": "Ask Questions", "group": 2, "name": "Hacer Preguntas", "context": "Permite interactuar con las fuentes para obtener respuestas específicas."}, {"id": "Generate Ideas", "group": 2, "name": "Generar Ideas", "context": "Ayuda a la lluvia de ideas y la creatividad, potenciando nuevas perspectivas."}, {"id": "Outline", "group": 2, "name": "Esquematizar", "context": "Crea estructuras y esquemas de contenido a partir de las fuentes."}, {"id": "Draft", "group": 2, "name": "Redactar", "context": "Asistencia en la creación de borradores de texto, como correos o informes."}, {"id": "Explain", "group": 2, "name": "Explicar", "context": "Simplifica conceptos complejos o pasajes de texto para una mejor comprensión."}, {"id": "Chat with Sources", "group": 2, "name": "Chatear con Fuentes", "context": "Permite una interacción conversacional directa con el contenido de los documentos cargados."}, {"id": "Note-taking", "group": 2, "name": "Toma de Notas", "context": "Facilita la organización y captura de información clave de las fuentes."}, {"id": "Modales (Ventanas Emergentes)", "group": 2, "name": "Modales (Ventanas Emergentes)", "context": "Ventanas emergentes utilizadas en la sección 'IA en Acción' para mostrar detalles de cada caso de uso sin saturar la página principal."}, {"id": "Mejorar Tono", "group": 2, "name": "Mejorar Tono", "context": "Funcionalidad para ajustar el estilo y tono de la redacción."}, {"id": "Laboratorio IA", "group": 2, "name": "Laboratorio IA", "context": "Sección de la guía que ofrece una experiencia práctica y simulada con herramientas de IA."}, {"id": "Asistente de Redacción", "group": 2, "name": "Asistente de Redacción", "context": "Simulador dentro del Laboratorio IA para elegir escenarios y practicar funciones como 'Resumir' y 'Mejorar Tono'."}, {"id": "Generador de Fórmulas Excel", "group": 2, "name": "Generador de Fórmulas Excel", "context": "Simulador dentro del Laboratorio IA para generar fórmulas de Excel, con opción de copiar."}, {"id": "Use Cases", "group": 3, "name": "Casos de Uso", "context": "Ejemplos prácticos de aplicación de la IA: Investigación, Escritura, Aprendizaje, Lluvia de Ideas, Creación de Contenido. Incluye ejemplos como 'Redacción de Correos', 'Análisis de Datos en Excel', 'Resúmenes de Informes'."}, {"id": "Research", "group": 3, "name": "Investigación", "context": "Uso de IA para analizar y sintetizar grandes volúmenes de información."}, {"id": "Writing", "group": 3, "name": "Escritura", "context": "Aplicación de IA para la generación y mejora de textos."}, {"id": "Learning", "group": 3, "name": "Aprendizaje", "context": "Uso de IA para facilitar la comprensión y retención de conocimientos."}, {"id": "Brainstorming", "group": 3, "name": "Lluvia de Ideas", "context": "La IA como herramienta para generar nuevas ideas y enfoques."}, {"id": "Content Creation", "group": 3, "name": "Creación de Contenido", "context": "Uso de IA para generar diversos tipos de contenido, desde textos hasta scripts."}, {"id": "Redacción de Correos", "group": 3, "name": "Redacción de Correos", "context": "Caso de uso práctico de IA para asistir en la creación de correos electrónicos."}, {"id": "Análisis de Datos en Excel", "group": 3, "name": "Análisis de Datos en Excel", "context": "Caso de uso práctico de IA para ayudar en la manipulación y análisis de datos en hojas de cálculo."}, {"id": "Resúmenes de Informes", "group": 3, "name": "Resúmenes de Informes", "context": "Caso de uso práctico de IA para generar resúmenes concisos de informes extensos."}, {"id": "Benefits", "group": 4, "name": "Beneficios", "context": "Ventajas estratégicas de adoptar la IA: Productividad, Eficiencia, Comprensión, Organización, Ahorro de Tiempo. Ayuda a reducir la 'carga cognitiva'."}, {"id": "Productivity", "group": 4, "name": "Productividad", "context": "La IA permite hacer más en menos tiempo, optimizando procesos."}, {"id": "Efficiency", "group": 4, "name": "Eficiencia", "context": "Mejora en la ejecución de tareas, minimizando el esfuerzo y los recursos."}, {"id": "Understanding", "group": 4, "name": "Comprensión", "context": "Facilita el análisis y la asimilación de información compleja."}, {"id": "Organization", "group": 4, "name": "Organización", "context": "Ayuda a estructurar y gestionar la información de manera efectiva."}, {"id": "Time Saving", "group": 4, "name": "Ahorro de Tiempo", "context": "Automatización de tareas repetitivas, liberando tiempo para actividades de mayor valor."}, {"id": "Enfoque en Tareas de Alto Valor", "group": 4, "name": "Enfoque en Tareas de Alto Valor", "context": "Beneficio de la IA que permite a los usuarios concentrarse en actividades más estratégicas y creativas."}, {"id": "Reducción de Carga Cognitiva", "group": 4, "name": "Reducción de Carga Cognitiva", "context": "Beneficio de la IA que aligera el esfuerzo mental en tareas rutinarias, mejorando la satisfacción laboral."}, {"id": "AI Models", "group": 5, "name": "Modelos de IA", "context": "Principales modelos de IA mencionados: GPT, Gemini, Claude, DeepSeek, Perplexity, NotebookLM."}, {"id": "Gemini", "group": 5, "name": "Gemini", "context": "Un modelo de IA avanzado de Google, parte del stack de IA recomendado."}, {"id": "PaLM 2", "group": 5, "name": "PaLM 2", "context": "Otro modelo de lenguaje grande de Google."}, {"id": "LLMs", "group": 5, "name": "LLMs", "context": "Modelos de Lenguaje Grandes, la base de muchas aplicaciones de IA como NotebookLM."}, {"id": "GPT", "group": 5, "name": "GPT", "context": "Familia de modelos de lenguaje generativos desarrollados por OpenAI."}, {"id": "Claude", "group": 5, "name": "Claude", "context": "Modelo de lenguaje grande desarrollado por Anthropic."}, {"id": "DeepSeek", "group": 5, "name": "DeepSeek", "context": "Un modelo de IA mencionado en la guía."}, {"id": "Perplexity", "group": 5, "name": "Perplexity", "context": "Un motor de búsqueda conversacional impulsado por IA, parte del stack de IA recomendado."}, {"id": "Manus AI", "group": 5, "name": "Manus AI", "context": "Una herramienta de IA mencionada en el stack recomendado."}, {"id": "Conceptos Clave", "group": 6, "name": "Conceptos Clave", "context": "Conceptos fundamentales para entender la IA, como la relación Entrada-Salida y la calidad de los prompts."}, {"id": "Calidad de Prompts", "group": 6, "name": "Calidad de Prompts", "context": "La importancia de la calidad de las entradas (prompts) para generar resultados de alta calidad en la IA."}, {"id": "Tipos de IA", "group": 7, "name": "Tipos de IA", "context": "Clasificación de los diferentes tipos de IA y sus aplicaciones."}, {"id": "Modelos Conversacionales", "group": 7, "name": "Modelos Conversacionales", "context": "Categoría de IA enfocada en la interacción y diálogo con los usuarios."}, {"id": "Investigación Abierta", "group": 7, "name": "Investigación Abierta", "context": "Categoría de IA para la exploración y análisis de información sin restricciones."}, {"id": "Comprensión Textual", "group": 7, "name": "Comprensión Textual", "context": "Categoría de IA dedicada al entendimiento y procesamiento del lenguaje natural."}, {"id": "Generación de Imágenes", "group": 7, "name": "Generación de Imágenes", "context": "Categoría de IA para la creación de imágenes a partir de descripciones textuales."}, {"id": "Bioinformática", "group": 7, "name": "Bioinformática", "context": "Aplicación de IA en el análisis de datos biológicos y genéticos."}, {"id": "IA para CRM", "group": 7, "name": "IA para CRM", "context": "Uso de IA para mejorar la gestión de relaciones con clientes."}, {"id": "Política de Uso de IA", "group": 8, "name": "Política de Uso de IA", "context": "Directrices para un uso ético y seguro de la IA, incluyendo privacidad de datos, sesgos, supervisión humana y transparencia."}, {"id": "Privacidad de Datos", "group": 8, "name": "Privacidad de Datos", "context": "Directriz clave sobre la protección de la información sensible al usar IA."}, {"id": "Sesgos", "group": 8, "name": "Sesgos", "context": "Directriz sobre la identificación y mitigación de sesgos en los sistemas de IA."}, {"id": "Supervisión Humana", "group": 8, "name": "Supervisión Humana", "context": "Directriz que enfatiza la necesidad de revisión y control humano sobre las decisiones de la IA."}, {"id": "Transparencia", "group": 8, "name": "Transparencia", "context": "Directriz sobre la claridad en el funcionamiento y las limitaciones de la IA."}, {"id": "Stack de IA Recomendado", "group": 9, "name": "Stack Recomendado", "context": "Herramientas de IA recomendadas para su uso: Gemini, Perplexity, NotebookLM, Manus AI."}, {"id": "Roadmap de Capacitación", "group": 10, "name": "Planificación", "context": "Línea de tiempo visual con las fases del plan de implementación de IA en la empresa."}, {"id": "Interacciones", "group": 11, "name": "Interacciones", "context": "Tipos de interacciones presentes en la guía: Punto de Vista del Experto, Mini-Quiz."}, {"id": "Punto de Vista del Experto", "group": 11, "name": "Punto de Vista del Experto", "context": "Interacción que presenta la perspectiva de un experto sobre un tema específico de IA."}, {"id": "Mini-Quiz", "group": 11, "name": "Mini-Quiz", "context": "Interacción para evaluar la comprensión de conceptos clave de IA, como la importancia de los prompts."}, ],
        "links": [ {"source": "NotebookLM", "target": "Sources"}, {"source": "NotebookLM", "target": "Features"}, {"source": "NotebookLM", "target": "Use Cases"}, {"source": "NotebookLM", "target": "Benefits"}, {"source": "NotebookLM", "target": "AI Models"}, {"source": "NotebookLM", "target": "Conceptos Clave"}, {"source": "NotebookLM", "target": "Tipos de IA"}, {"source": "NotebookLM", "target": "Política de Uso de IA"}, {"source": "NotebookLM", "target": "Stack de IA Recomendado"}, {"source": "NotebookLM", "target": "Interacciones"}, {"source": "Sources", "target": "Documents"}, {"source": "Sources", "target": "Google Slides"}, {"source": "Sources", "target": "Websites"}, {"source": "Sources", "target": "PDFs"}, {"source": "Sources", "target": "YouTube"}, {"source": "Features", "target": "Summarize"}, {"source": "Features", "target": "Ask Questions"}, {"source": "Features", "target": "Generate Ideas"}, {"source": "Features", "target": "Outline"}, {"source": "Features", "target": "Draft"}, {"source": "Features", "target": "Explain"}, {"source": "Features", "target": "Chat with Sources"}, {"source": "Features", "target": "Note-taking"}, {"source": "Features", "target": "Modales (Ventanas Emergentes)"}, {"source": "Features", "target": "Mejorar Tono"}, {"source": "Features", "target": "Laboratorio IA"}, {"source": "Laboratorio IA", "target": "Asistente de Redacción"}, {"source": "Laboratorio IA", "target": "Generador de Fórmulas Excel"}, {"source": "Asistente de Redacción", "target": "Summarize"}, {"source": "Asistente de Redacción", "target": "Mejorar Tono"}, {"source": "Use Cases", "target": "Research"}, {"source": "Use Cases", "target": "Writing"}, {"source": "Use Cases", "target": "Learning"}, {"source": "Use Cases", "target": "Brainstorming"}, {"source": "Use Cases", "target": "Content Creation"}, {"source": "Use Cases", "target": "Redacción de Correos"}, {"source": "Use Cases", "target": "Análisis de Datos en Excel"}, {"source": "Use Cases", "target": "Resúmenes de Informes"}, {"source": "Benefits", "target": "Productivity"}, {"source": "Benefits", "target": "Efficiency"}, {"source": "Benefits", "target": "Understanding"}, {"source": "Benefits", "target": "Organization"}, {"source": "Benefits", "target": "Time Saving"}, {"source": "Benefits", "target": "Enfoque en Tareas de Alto Valor"}, {"source": "Benefits", "target": "Reducción de Carga Cognitiva"}, {"source": "AI Models", "target": "Gemini"}, {"source": "AI Models", "target": "PaLM 2"}, {"source": "AI Models", "target": "LLMs"}, {"source": "AI Models", "target": "GPT"}, {"source": "AI Models", "target": "Claude"}, {"source": "AI Models", "target": "DeepSeek"}, {"source": "AI Models", "target": "Perplexity"}, {"source": "AI Models", "target": "Manus AI"}, {"source": "Conceptos Clave", "target": "Calidad de Prompts"}, {"source": "Tipos de IA", "target": "Modelos Conversacionales"}, {"source": "Tipos de IA", "target": "Investigación Abierta"}, {"source": "Tipos de IA", "target": "Comprensión Textual"}, {"source": "Tipos de IA", "target": "Generación de Imágenes"}, {"source": "Tipos de IA", "target": "Bioinformática"}, {"source": "Tipos de IA", "target": "IA para CRM"}, {"source": "Política de Uso de IA", "target": "Privacidad de Datos"}, {"source": "Política de Uso de IA", "target": "Sesgos"}, {"source": "Política de Uso de IA", "target": "Supervisión Humana"}, {"source": "Política de Uso de IA", "target": "Transparencia"}, {"source": "Stack de IA Recomendado", "target": "Gemini"}, {"source": "Stack de IA Recomendado", "target": "Perplexity"}, {"source": "Stack de IA Recomendado", "target": "NotebookLM"}, {"source": "Stack de IA Recomendado", "target": "Manus AI"}, {"source": "Roadmap de Capacitación", "target": "NotebookLM"}, {"source": "Roadmap de Capacitación", "target": "Stack de IA Recomendado"}, {"source": "Summarize", "target": "Productivity"}, {"source": "Ask Questions", "target": "Understanding"}, {"source": "Generate Ideas", "target": "Brainstorming"}, {"source": "Chat with Sources", "target": "Research"}, {"source": "Note-taking", "target": "Organization"}, {"source": "Calidad de Prompts", "target": "Ask Questions"}, {"source": "Calidad de Prompts", "target": "Draft"}, {"source": "Punto de Vista del Experto", "target": "Interacciones"}, {"source": "Mini-Quiz", "target": "Interacciones"}, {"source": "Punto de Vista del Experto", "target": "NotebookLM"}, {"source": "Mini-Quiz", "target": "Conceptos Clave"}, {"source": "Mini-Quiz", "target": "Política de Uso de IA"}, {"source": "Modales (Ventanas Emergentes)", "target": "Use Cases"}, {"source": "Enfoque en Tareas de Alto Valor", "target": "Productivity"}, {"source": "Reducción de Carga Cognitiva", "target": "Benefits"} ]
    };

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const groupNames = { 0:"Principal", 1:"Fuentes", 2:"Características", 3:"Casos de Uso", 4:"Beneficios", 5:"Modelos de IA", 6:"Conceptos Clave", 7:"Tipos de IA", 8:"Gobernanza de IA", 9:"Stack Recomendado", 10:"Planificación", 11:"Interacciones" };
    
    const svg = d3.select("#network-chart");
    const chartContainer = svg.node().parentElement;
    let width = chartContainer.clientWidth;
    let height = chartContainer.clientHeight;
    
    const g = svg.append("g");
    
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(90))
        .force("charge", d3.forceManyBody().strength(-250))
        .force("center", d3.forceCenter(width / 2, height / 2));
        
    function updateSvgDimensions() {
        width = chartContainer.clientWidth;
        height = chartContainer.clientHeight;
        svg.attr("width", width).attr("height", height);
        simulation.force("center", d3.forceCenter(width / 2, height / 2)).alpha(0.3).restart();
    }
    updateSvgDimensions();
    window.addEventListener('resize', updateSvgDimensions);
    
    const link = g.append("g").attr("class", "links").selectAll("line").data(graphData.links).enter().append("line");
    const node = g.append("g").attr("class", "nodes").selectAll("g").data(graphData.nodes).enter().append("g")
        .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
    
    const tooltip = d3.select("#viz-tooltip");
    
    node.append("circle").attr("r", 8).attr("fill", d => color(d.group))
        .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1).html(`<strong>${d.name}</strong>`).style("left", `${event.pageX + 15}px`).style("top", `${event.pageY - 28}px`);
            link.style("stroke-opacity", l => (l.source === d || l.target === d) ? 1 : 0.2);
            node.style("opacity", n => (link.data().some(l => (l.source === d && l.target === n) || n === d) ? 1 : 0.2));
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
            link.style("stroke-opacity", 0.6);
            node.style("opacity", 1);
        })
        .on("click", function(event, d) {
            if (event.defaultPrevented) return;
            showNodeDetailModal(d.name, d.context);
        });
    
    node.append("text").attr("dx", 12).attr("dy", ".35em").text(d => d.name);
    
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    
    function dragstarted(event, d) { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; d3.select(this).style("cursor", "grabbing"); }
    function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
    function dragended(event, d) { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; d3.select(this).style("cursor", "grab"); }
    
    const zoom = d3.zoom().scaleExtent([0.5, 4]).on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);
    
    const legendList = d3.select("#legend-list");
    legendList.html("");
    [...new Set(graphData.nodes.map(d => d.group))].sort((a,b)=>a-b).forEach(group => {
        legendList.append("li").attr("class", "flex items-center space-x-2").html(`<span style="background-color: ${color(group)};" class="w-3 h-3 rounded-full inline-block"></span><span>${groupNames[group]}</span>`);
    });
    
    const detailModal = d3.select("#viz-node-detail-modal");
    const detailTitle = d3.select("#viz-node-title");
    const detailBody = d3.select("#viz-node-body");
    const closeDetailBtn = d3.select("#viz-close-detail-btn");
    
    function showNodeDetailModal(title, content) {
        detailTitle.text(title);
        detailBody.text(content || "No hay más detalles disponibles.");
        detailModal.classed("hidden", false);
    }
    function hideNodeDetailModal() { detailModal.classed("hidden", true); }
    closeDetailBtn.on("click", hideNodeDetailModal);
    detailModal.on("click", function(event) { if (event.target === this) hideNodeDetailModal(); });
}
