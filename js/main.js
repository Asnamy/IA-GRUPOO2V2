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
    setupVisualizationModal();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open (only on mobile)
                if (window.innerWidth < 768) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Index cards navigation
    const indexCards = document.querySelectorAll('.index-card');
    indexCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                const correspondingNav = document.querySelector(`a[href="#${target}"]`);
                if (correspondingNav) {
                    correspondingNav.classList.add('active');
                }
            }
        });
    });
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');

    // Set initial state based on screen size
    function setInitialSidebarState() {
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        } else {
            sidebar.classList.remove('-translate-x-full');
        }
    }

    // Set initial state
    setInitialSidebarState();

    // Handle window resize
    window.addEventListener('resize', setInitialSidebarState);

    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking outside (only on mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const isHidden = sidebar.classList.contains('-translate-x-full');
    
    if (isHidden) {
        sidebar.classList.remove('-translate-x-full');
    } else {
        sidebar.classList.add('-translate-x-full');
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth < 768) {
        sidebar.classList.add('-translate-x-full');
    }
}

// Scroll Effects
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Update active navigation
                const sectionId = entry.target.id;
                updateActiveNavigation(sectionId);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function updateActiveNavigation(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

function setActiveSection() {
    // Set the first section as active by default
    const firstNavLink = document.querySelector('.nav-link');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
}

// Interactive Elements Setup
function setupInteractiveElements() {
    // La lógica para 'group-option' ha sido eliminada ya que esos botones ya no existen.
    
    // Add hover effects to cards
    addCardHoverEffects();
}

function addCardHoverEffects() {
    // AI Model cards
    const aiModelCards = document.querySelectorAll('.ai-model-card');
    aiModelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Chart Setup
function setupChart() {
    const ctx = document.getElementById('impactChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Eficiencia', 'Creatividad', 'Precisión', 'Innovación', 'Satisfacción'],
                datasets: [{
                    label: 'Impacto Potencial (%)',
                    data: [85, 70, 90, 75, 80],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f97316',
                        '#8b5cf6',
                        '#ef4444'
                    ],
                    borderColor: [
                        '#1e40af',
                        '#047857',
                        '#c2410c',
                        '#6d28d9',
                        '#dc2626'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `Mejora esperada: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'
                }
            }
        });
    }
}

// Modal Functions
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalFadeIn 0.3s ease';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}


// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${getNotificationClasses(type)}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${getNotificationIcon(type)} mr-2"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationClasses(type) {
    switch(type) {
        case 'success': return 'bg-green-500 text-white';
        case 'error': return 'bg-red-500 text-white';
        case 'warning': return 'bg-yellow-500 text-white';
        default: return 'bg-blue-500 text-white';
    }
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Smooth Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animate');
                entry.target.classList.add(`animate-${animationType}`);
            }
        });
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Progress Tracking
let progressData = {
    sectionsVisited: new Set(),
    reflectionsCompleted: 0,
    interactionsCount: 0
};

function trackProgress(sectionId) {
    progressData.sectionsVisited.add(sectionId);
    updateProgressDisplay();
}

function updateProgressDisplay() {
    const totalSections = 9;
    const visitedSections = progressData.sectionsVisited.size;
    const progressPercentage = (visitedSections / totalSections) * 100;
    
    // Update progress bar if exists
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
}

// Accessibility Functions
function setupAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
    
    // Add ARIA labels
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
            element.setAttribute('aria-label', 'Interactive element');
        }
    });
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    // --- CAMBIO CLAVE ---
    // Solo si el elemento searchInput existe, procedemos a añadir el listener.
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            searchContent(query);
        });
    }
    // Si no existe, la función simplemente no hace nada y no causa un error.
}

function searchContent(query) {
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const isMatch = content.includes(query);
        
        if (query === '' || isMatch) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Service Worker Registration (for offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Print Function
function printPage() {
    window.print();
}

// Export to PDF Function
function exportToPDF() {
    showNotification('Función de exportación a PDF próximamente disponible', 'info');
}

// Share Function
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Guía IA | GrupoO2',
            text: 'Descubre cómo aprovechar la Inteligencia Artificial en GrupoO2',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('Enlace copiado al portapapeles', 'success');
    }
}

// Analytics (placeholder for future implementation)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Form Handling
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Información enviada correctamente', 'success');
    form.reset();
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupAccessibility();
    optimizePerformance();
    animateOnScroll();
});

// Expose global functions
window.openModal = openModal;
window.closeModal = closeModal;
window.printPage = printPage;
window.exportToPDF = exportToPDF;
window.shareContent = shareContent;

function setupAILab() {
    // --- ELEMENTOS COMUNES Y LÓGICA DE PESTAÑAS ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabButtons.length) return; // Salir si no hay laboratorio

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            
            tabButtons.forEach(btn => btn.classList.remove('active-tab'));
            button.classList.add('active-tab');

            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

    // --- LÓGICA PARA EL ASISTENTE DE REDACCIÓN (Pestaña 1) ---
    (function setupWritingAssistant() {
        // ... (Esta parte no necesita cambios, se mantiene igual)
        const scenarioSelector = document.getElementById('scenarioSelector');
        const summarizeBtn = document.getElementById('summarizeBtn');
        const improveBtn = document.getElementById('improveBtn');
        const outputPanel = document.getElementById('outputPanel');
        const inputText = document.getElementById('inputText');

        const examples = [
            {
                id: 'reunion',
                name: 'Recordatorio de Reunión Trimestral',
                inputText: 'Hola equipo, quería recordarles sobre la reunión de mañana para discutir el reporte trimestral. Es importante que todos vengan preparados. La junta es a las 10am. Saludos.',
                summaryText: 'Reunión sobre reporte trimestral mañana a las 10am. Se requiere preparación.',
                improvedText: '<p><strong>Asunto:</strong> Preparación para la Reunión de Revisión Trimestral</p><p>Estimado equipo,</p><p>Este es un recordatorio cordial sobre nuestra reunión de mañana a las 10:00 a.m. para analizar el informe trimestral. Agradezco su puntualidad.</p>'
            },
            {
                id: 'mantenimiento',
                name: 'Anuncio de Mantenimiento',
                inputText: 'chicos, les aviso que mañana TI va a hacer mantenimiento en los servidores desde temprano, asi que porfa lleguen antes para que puedan guardar todo. empezaran a las 8am.',
                summaryText: 'TI realizará mantenimiento de servidores mañana a las 8:00 a.m. Se solicita llegar antes para guardar archivos.',
                improvedText: '<p><strong>Asunto:</strong> Aviso Importante: Mantenimiento Programado</p><p>Estimados colaboradores,</p><p>Les informamos que TI llevará a cabo un mantenimiento esencial en nuestros servidores el día de mañana, a partir de las 8:00 a.m. Solicitamos llegar con antelación para guardar su trabajo.</p>'
            }
        ];

        examples.forEach(ex => scenarioSelector.add(new Option(ex.name, ex.id)));
        
        function updateScenario() {
            const selected = examples.find(ex => ex.id === scenarioSelector.value);
            if (selected) {
                inputText.value = selected.inputText;
                outputPanel.innerHTML = '<span class="text-gray-500 italic">Aquí aparecerá la respuesta de la IA...</span>';
            }
        }
        scenarioSelector.addEventListener('change', updateScenario);
        updateScenario();

        function showLoader(panel) {
            panel.innerHTML = `<div class="flex items-center justify-center h-full text-corporate-blue"><div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div></div>`;
        }
        
        summarizeBtn.addEventListener('click', () => {
            const selected = examples.find(ex => ex.id === scenarioSelector.value);
            if (selected) {
                showLoader(outputPanel);
                setTimeout(() => { outputPanel.innerHTML = `<p>${selected.summaryText}</p>`; }, 1500);
            }
        });

        improveBtn.addEventListener('click', () => {
            const selected = examples.find(ex => ex.id === scenarioSelector.value);
            if (selected) {
                showLoader(outputPanel);
                setTimeout(() => { outputPanel.innerHTML = `<div class="text-left">${selected.improvedText}</div>`; }, 2000);
            }
        });
    })();

    // --- LÓGICA PARA EL GENERADOR DE FÓRMULAS (Pestaña 2) ---
    (function setupFormulaGenerator() {
        const scenarioSelector = document.getElementById('formulaScenarioSelector');
        const generateBtn = document.getElementById('generateFormulaBtn');
        const problemDiv = document.getElementById('formulaProblem');
        const outputDiv = document.getElementById('formulaOutput');

        const formulaScenarios = [
             { id: 'sumif', name: 'Sumar celdas que cumplen una condición', problem: "Quiero sumar todos los valores de la columna 'B' donde la celda en la columna 'A' diga 'Ventas'.", formula: '=SUMIF(A:A, "Ventas", B:B)' },
             { id: 'vlookup', name: 'Buscar un valor en una tabla', problem: "Quiero encontrar el 'Precio' (columna 3) de un 'Producto' (ID en celda E2) dentro de la tabla A1:C50.", formula: '=VLOOKUP(E2, A1:C50, 3, FALSE)' },
             { id: 'countif', name: 'Contar cuántas veces aparece un texto', problem: "Quiero contar cuántas celdas en el rango A1:A100 contienen la palabra 'Completado'.", formula: '=COUNTIF(A1:A100, "Completado")' }
        ];

        formulaScenarios.forEach(sc => scenarioSelector.add(new Option(sc.name, sc.id)));
        
        function updateFormulaScenario() {
            const selected = formulaScenarios.find(sc => sc.id === scenarioSelector.value);
            if (selected) {
                problemDiv.textContent = selected.problem;
                outputDiv.innerHTML = '<span class="text-gray-400">Aquí aparecerá la fórmula...</span>';
            }
        }
        scenarioSelector.addEventListener('change', updateFormulaScenario);
        updateFormulaScenario();

        generateBtn.addEventListener('click', () => {
            const selected = formulaScenarios.find(sc => sc.id === scenarioSelector.value);
            if (selected) {
                outputDiv.innerHTML = '<div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-400 h-6 w-6"></div>';
                setTimeout(() => {
                    // CAMBIO 1: Eliminamos el `onclick` y usamos un atributo `data-formula` para guardar el texto a copiar.
                    outputDiv.innerHTML = `
                        <span>${selected.formula}</span>
                        <button class="copy-button ml-4 bg-gray-600 px-3 py-1 rounded text-xs hover:bg-gray-500" data-formula="${selected.formula}">Copiar</button>
                    `;
                }, 2000);
            }
        });

        // CAMBIO 2: Usamos delegación de eventos en el contenedor de salida.
        outputDiv.addEventListener('click', function(event) {
            // Comprobamos si el elemento clickeado es nuestro botón de copiar.
            if (event.target.classList.contains('copy-button')) {
                const button = event.target;
                const formulaToCopy = button.dataset.formula;
                
                navigator.clipboard.writeText(formulaToCopy).then(() => {
                    button.textContent = '¡Copiado!';
                    // Mostramos una notificación de éxito en lugar del popup de error.
                    showNotification('Fórmula copiada al portapapeles', 'success');
                    setTimeout(() => {
                        button.textContent = 'Copiar';
                    }, 2000);
                }).catch(err => {
                    console.error('Error al copiar: ', err);
                    // En caso de que falle el API del portapapeles.
                    showNotification('No se pudo copiar la fórmula.', 'error');
                });
            }
        });
    })();

    // CAMBIO 3: Ya no necesitamos la función global, así que la eliminamos para mantener el código limpio.
    // Se eliminó la función `copyToClipboard` y `window.copyToClipboard`.
}
async function loadTeamMembers() {
    try {
        const response = await fetch('data/training-progress.json');
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
        }
        const data = await response.json();
        const teamMembers = data.team_structure.ado_team;
        const container = document.getElementById('team-container');

        if (!container) return; // Si no hay contenedor, no hacer nada

        // Limpiamos el contenedor por si acaso
        container.innerHTML = '';

        // Creamos una tarjeta HTML para cada miembro del equipo
        teamMembers.forEach(member => {
            const memberCardHTML = `
                <div class="team-member bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-all">
                    <div class="mb-4">
                        <img src="${member.image}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-corporate-blue">
                    </div>
                    <h3 class="text-xl font-semibold text-corporate-dark mb-2">${member.name}</h3>
                    <p class="text-gray-600 mb-3">${member.role}</p>
                    <div class="flex justify-center space-x-4">
                        <a href="${member.linkedin_url}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de ${member.name}">
                            <i class="fab fa-linkedin text-2xl text-corporate-blue hover:text-blue-700 transition-colors"></i>
                        </a>
                        <a href="mailto:${member.email}" aria-label="Email de ${member.name}">
                            <i class="fas fa-envelope text-2xl text-gray-400 hover:text-gray-600 transition-colors"></i>
                        </a>
                    </div>
                </div>
            `;
            container.innerHTML += memberCardHTML;
        });

    } catch (error) {
        console.error('No se pudo cargar la información del equipo:', error);
        // Opcionalmente, mostrar un mensaje de error en la página
        const container = document.getElementById('team-container');
        if(container) container.innerHTML = '<p class="text-center text-red-500">Error al cargar la información del equipo.</p>';
    }
}

function setupInteractivePoints() {
    document.body.addEventListener('click', function(event) {
        
        // Lógica para los Puntos de Vista del Experto
        if (event.target.matches('.interactive-button[data-interaction-type="expert-view"]')) {
            const button = event.target;
            const targetId = button.dataset.target;
            const answerDiv = document.getElementById(targetId);
            
            if (answerDiv) {
                const isHidden = answerDiv.classList.contains('hidden');
                answerDiv.classList.toggle('hidden');
                button.textContent = isHidden ? 'Ocultar respuesta' : 'Ver respuesta';
            }
        }

        // Lógica para los Mini-Quizzes
        if (event.target.matches('.quiz-option-btn')) {
            const button = event.target;
            const quizContainer = button.parentElement;
            const feedbackDiv = quizContainer.nextElementSibling;
            const isCorrect = button.dataset.correct === 'true';

            // Deshabilitar todos los botones de este quiz
            quizContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
                btn.disabled = true;
                btn.classList.add('opacity-50', 'cursor-not-allowed');
            });
            
            if (isCorrect) {
                button.classList.remove('border-gray-300');
                button.classList.add('bg-green-100', 'border-green-500');
                feedbackDiv.textContent = '¡Correcto! Excelente trabajo.';
                feedbackDiv.className = 'quiz-feedback mt-4 p-3 rounded-md text-base font-semibold bg-green-100 text-green-800';
            } else {
                button.classList.remove('border-gray-300');
                button.classList.add('bg-red-100', 'border-red-500');
                feedbackDiv.textContent = 'Respuesta incorrecta. La respuesta correcta está resaltada en verde.';
                feedbackDiv.className = 'quiz-feedback mt-4 p-3 rounded-md text-base font-semibold bg-red-100 text-red-800';
                // Resaltar la respuesta correcta
                const correctButton = quizContainer.querySelector('[data-correct="true"]');
                correctButton.classList.remove('border-gray-300');
                correctButton.classList.add('bg-green-100', 'border-green-500');
            }
            
            feedbackDiv.classList.remove('hidden');
        }
    });
}

function setupD3Visualization() {
    const graphData = {
        "nodes": [
            {"id": "NotebookLM", "group": 0, "name": "NotebookLM", "context": "Es el propósito general de la guía. Presenta un índice interactivo con tarjetas de acceso directo a secciones importantes. Se enfoca en la IA como un 'asistente inteligente' para liberar tiempo y potenciar la creatividad."},
            {"id": "Sources", "group": 1, "name": "Fuentes", "context": "Tipos de documentos que NotebookLM puede usar como fuentes: Documentos, Presentaciones de Google, Sitios Web, PDFs, YouTube."},
            {"id": "Documents", "group": 1, "name": "Documentos", "context": "Archivos de texto y otros formatos que sirven como entrada para NotebookLM."},
            {"id": "Google Slides", "group": 1, "name": "Presentaciones de Google", "context": "Presentaciones que pueden ser utilizadas como fuentes de información."},
            {"id": "Websites", "group": 1, "name": "Sitios Web", "context": "Páginas web que pueden ser analizadas por NotebookLM."},
            {"id": "PDFs", "group": 1, "name": "PDFs", "context": "Documentos en formato PDF que pueden ser procesados."},
            {"id": "YouTube", "group": 1, "name": "YouTube", "context": "Videos de YouTube que pueden ser usados como fuentes, permitiendo interactuar con su contenido."},
            {"id": "Features", "group": 2, "name": "Características", "context": "Funcionalidades clave de NotebookLM: Resumir, Hacer Preguntas, Generar Ideas, Esquematizar, Redactar, Explicar, Chatear con Fuentes, Toma de Notas."},
            {"id": "Summarize", "group": 2, "name": "Resumir", "context": "Capacidad de la IA para condensar información. Usado en el Asistente de Redacción para simular resúmenes de escenarios."},
            {"id": "Ask Questions", "group": 2, "name": "Hacer Preguntas", "context": "Permite interactuar con las fuentes para obtener respuestas específicas."},
            {"id": "Generate Ideas", "group": 2, "name": "Generar Ideas", "context": "Ayuda a la lluvia de ideas y la creatividad, potenciando nuevas perspectivas."},
            {"id": "Outline", "group": 2, "name": "Esquematizar", "context": "Crea estructuras y esquemas de contenido a partir de las fuentes."},
            {"id": "Draft", "group": 2, "name": "Redactar", "context": "Asistencia en la creación de borradores de texto, como correos o informes."},
            {"id": "Explain", "group": 2, "name": "Explicar", "context": "Simplifica conceptos complejos o pasajes de texto para una mejor comprensión."},
            {"id": "Chat with Sources", "group": 2, "name": "Chatear con Fuentes", "context": "Permite una interacción conversacional directa con el contenido de los documentos cargados."},
            {"id": "Note-taking", "group": 2, "name": "Toma de Notas", "context": "Facilita la organización y captura de información clave de las fuentes."},
            {"id": "Modales (Ventanas Emergentes)", "group": 2, "name": "Modales (Ventanas Emergentes)", "context": "Ventanas emergentes utilizadas en la sección 'IA en Acción' para mostrar detalles de cada caso de uso sin saturar la página principal."},
            {"id": "Mejorar Tono", "group": 2, "name": "Mejorar Tono", "context": "Funcionalidad para ajustar el estilo y tono de la redacción."},
            {"id": "Laboratorio IA", "group": 2, "name": "Laboratorio IA", "context": "Sección de la guía que ofrece una experiencia práctica y simulada con herramientas de IA."},
            {"id": "Asistente de Redacción", "group": 2, "name": "Asistente de Redacción", "context": "Simulador dentro del Laboratorio IA para elegir escenarios y practicar funciones como 'Resumir' y 'Mejorar Tono'."},
            {"id": "Generador de Fórmulas Excel", "group": 2, "name": "Generador de Fórmulas Excel", "context": "Simulador dentro del Laboratorio IA para generar fórmulas de Excel, con opción de copiar."},

            {"id": "Use Cases", "group": 3, "name": "Casos de Uso", "context": "Ejemplos prácticos de aplicación de la IA: Investigación, Escritura, Aprendizaje, Lluvia de Ideas, Creación de Contenido. Incluye ejemplos como 'Redacción de Correos', 'Análisis de Datos en Excel', 'Resúmenes de Informes'."},
            {"id": "Research", "group": 3, "name": "Investigación", "context": "Uso de IA para analizar y sintetizar grandes volúmenes de información."},
            {"id": "Writing", "group": 3, "name": "Escritura", "context": "Aplicación de IA para la generación y mejora de textos."},
            {"id": "Learning", "group": 3, "name": "Aprendizaje", "context": "Uso de IA para facilitar la comprensión y retención de conocimientos."},
            {"id": "Brainstorming", "group": 3, "name": "Lluvia de Ideas", "context": "La IA como herramienta para generar nuevas ideas y enfoques."},
            {"id": "Content Creation", "group": 3, "name": "Creación de Contenido", "context": "Uso de IA para generar diversos tipos de contenido, desde textos hasta scripts."},
            {"id": "Redacción de Correos", "group": 3, "name": "Redacción de Correos", "context": "Caso de uso práctico de IA para asistir en la creación de correos electrónicos."},
            {"id": "Análisis de Datos en Excel", "group": 3, "name": "Análisis de Datos en Excel", "context": "Caso de uso práctico de IA para ayudar en la manipulación y análisis de datos en hojas de cálculo."},
            {"id": "Resúmenes de Informes", "group": 3, "name": "Resúmenes de Informes", "context": "Caso de uso práctico de IA para generar resúmenes concisos de informes extensos."},

            {"id": "Benefits", "group": 4, "name": "Beneficios", "context": "Ventajas estratégicas de adoptar la IA: Productividad, Eficiencia, Comprensión, Organización, Ahorro de Tiempo. Ayuda a reducir la 'carga cognitiva'."},
            {"id": "Productivity", "group": 4, "name": "Productividad", "context": "La IA permite hacer más en menos tiempo, optimizando procesos."},
            {"id": "Efficiency", "group": 4, "name": "Eficiencia", "context": "Mejora en la ejecución de tareas, minimizando el esfuerzo y los recursos."},
            {"id": "Understanding", "group": 4, "name": "Comprensión", "context": "Facilita el análisis y la asimilación de información compleja."},
            {"id": "Organization", "group": 4, "name": "Organización", "context": "Ayuda a estructurar y gestionar la información de manera efectiva."},
            {"id": "Time Saving", "group": 4, "name": "Ahorro de Tiempo", "context": "Automatización de tareas repetitivas, liberando tiempo para actividades de mayor valor."},
            {"id": "Enfoque en Tareas de Alto Valor", "group": 4, "name": "Enfoque en Tareas de Alto Valor", "context": "Beneficio de la IA que permite a los usuarios concentrarse en actividades más estratégicas y creativas."},
            {"id": "Reducción de Carga Cognitiva", "group": 4, "name": "Reducción de Carga Cognitiva", "context": "Beneficio de la IA que aligera el esfuerzo mental en tareas rutinarias, mejorando la satisfacción laboral."},

            {"id": "AI Models", "group": 5, "name": "Modelos de IA", "context": "Principales modelos de IA mencionados: GPT, Gemini, Claude, DeepSeek, Perplexity, NotebookLM."},
            {"id": "Gemini", "group": 5, "name": "Gemini", "context": "Un modelo de IA avanzado de Google, parte del stack de IA recomendado."},
            {"id": "PaLM 2", "group": 5, "name": "PaLM 2", "context": "Otro modelo de lenguaje grande de Google."},
            {"id": "LLMs", "group": 5, "name": "LLMs", "context": "Modelos de Lenguaje Grandes, la base de muchas aplicaciones de IA como NotebookLM."},
            {"id": "GPT", "group": 5, "name": "GPT", "context": "Familia de modelos de lenguaje generativos desarrollados por OpenAI."},
            {"id": "Claude", "group": 5, "name": "Claude", "context": "Modelo de lenguaje grande desarrollado por Anthropic."},
            {"id": "DeepSeek", "group": 5, "name": "DeepSeek", "context": "Un modelo de IA mencionado en la guía."},
            {"id": "Perplexity", "group": 5, "name": "Perplexity", "context": "Un motor de búsqueda conversacional impulsado por IA, parte del stack de IA recomendado."},
            {"id": "Manus AI", "group": 5, "name": "Manus AI", "context": "Una herramienta de IA mencionada en el stack recomendado."},

            {"id": "Conceptos Clave", "group": 6, "name": "Conceptos Clave", "context": "Conceptos fundamentales para entender la IA, como la relación Entrada-Salida y la calidad de los prompts."},
            {"id": "Calidad de Prompts", "group": 6, "name": "Calidad de Prompts", "context": "La importancia de la calidad de las entradas (prompts) para generar resultados de alta calidad en la IA."},

            {"id": "Tipos de IA", "group": 7, "name": "Tipos de IA", "context": "Clasificación de los diferentes tipos de IA y sus aplicaciones."},
            {"id": "Modelos Conversacionales", "group": 7, "name": "Modelos Conversacionales", "context": "Categoría de IA enfocada en la interacción y diálogo con los usuarios."},
            {"id": "Investigación Abierta", "group": 7, "name": "Investigación Abierta", "context": "Categoría de IA para la exploración y análisis de información sin restricciones."},
            {"id": "Comprensión Textual", "group": 7, "name": "Comprensión Textual", "context": "Categoría de IA dedicada al entendimiento y procesamiento del lenguaje natural."},
            {"id": "Generación de Imágenes", "group": 7, "name": "Generación de Imágenes", "context": "Categoría de IA para la creación de imágenes a partir de descripciones textuales."},
            {"id": "Bioinformática", "group": 7, "name": "Bioinformática", "context": "Aplicación de IA en el análisis de datos biológicos y genéticos."},
            {"id": "IA para CRM", "group": 7, "name": "IA para CRM", "context": "Uso de IA para mejorar la gestión de relaciones con clientes."},

            {"id": "Política de Uso de IA", "group": 8, "name": "Política de Uso de IA", "context": "Directrices para un uso ético y seguro de la IA, incluyendo privacidad de datos, sesgos, supervisión humana y transparencia."},
            {"id": "Privacidad de Datos", "group": 8, "name": "Privacidad de Datos", "context": "Directriz clave sobre la protección de la información sensible al usar IA."},
            {"id": "Sesgos", "group": 8, "name": "Sesgos", "context": "Directriz sobre la identificación y mitigación de sesgos en los sistemas de IA."},
            {"id": "Supervisión Humana", "group": 8, "name": "Supervisión Humana", "context": "Directriz que enfatiza la necesidad de revisión y control humano sobre las decisiones de la IA."},
            {"id": "Transparencia", "group": 8, "name": "Transparencia", "context": "Directriz sobre la claridad en el funcionamiento y las limitaciones de la IA."},

            {"id": "Stack de IA Recomendado", "group": 9, "name": "Stack Recomendado", "context": "Herramientas de IA recomendadas para su uso: Gemini, Perplexity, NotebookLM, Manus AI."},
            {"id": "Roadmap de Capacitación", "group": 10, "name": "Planificación", "context": "Línea de tiempo visual con las fases del plan de implementación de IA en la empresa."},

            {"id": "Interacciones", "group": 11, "name": "Interacciones", "context": "Tipos de interacciones presentes en la guía: Punto de Vista del Experto, Mini-Quiz."},
            {"id": "Punto de Vista del Experto", "group": 11, "name": "Punto de Vista del Experto", "context": "Interacción que presenta la perspectiva de un experto sobre un tema específico de IA."},
            {"id": "Mini-Quiz", "group": 11, "name": "Mini-Quiz", "context": "Interacción para evaluar la comprensión de conceptos clave de IA, como la importancia de los prompts."},
        ],
        "links": [
            {"source": "NotebookLM", "target": "Sources"},
            {"source": "NotebookLM", "target": "Features"},
            {"source": "NotebookLM", "target": "Use Cases"},
            {"source": "NotebookLM", "target": "Benefits"},
            {"source": "NotebookLM", "target": "AI Models"},
            {"source": "NotebookLM", "target": "Conceptos Clave"},
            {"source": "NotebookLM", "target": "Tipos de IA"},
            {"source": "NotebookLM", "target": "Política de Uso de IA"},
            {"source": "NotebookLM", "target": "Stack de IA Recomendado"},
            {"source": "NotebookLM", "target": "Interacciones"},

            {"source": "Sources", "target": "Documents"},
            {"source": "Sources", "target": "Google Slides"},
            {"source": "Sources", "target": "Websites"},
            {"source": "Sources", "target": "PDFs"},
            {"source": "Sources", "target": "YouTube"},

            {"source": "Features", "target": "Summarize"},
            {"source": "Features", "target": "Ask Questions"},
            {"source": "Features", "target": "Generate Ideas"},
            {"source": "Features", "target": "Outline"},
            {"source": "Features", "target": "Draft"},
            {"source": "Features", "target": "Explain"},
            {"source": "Features", "target": "Chat with Sources"},
            {"source": "Features", "target": "Note-taking"},
            {"source": "Features", "target": "Modales (Ventanas Emergentes)"},
            {"source": "Features", "target": "Mejorar Tono"},
            {"source": "Features", "target": "Laboratorio IA"},
            {"source": "Laboratorio IA", "target": "Asistente de Redacción"},
            {"source": "Laboratorio IA", "target": "Generador de Fórmulas Excel"},
            {"source": "Asistente de Redacción", "target": "Summarize"},
            {"source": "Asistente de Redacción", "target": "Mejorar Tono"},

            {"source": "Use Cases", "target": "Research"},
            {"source": "Use Cases", "target": "Writing"},
            {"source": "Use Cases", "target": "Learning"},
            {"source": "Use Cases", "target": "Brainstorming"},
            {"source": "Use Cases", "target": "Content Creation"},
            {"source": "Use Cases", "target": "Redacción de Correos"},
            {"source": "Use Cases", "target": "Análisis de Datos en Excel"},
            {"source": "Use Cases", "target": "Resúmenes de Informes"},

            {"source": "Benefits", "target": "Productivity"},
            {"source": "Benefits", "target": "Efficiency"},
            {"source": "Benefits", "target": "Understanding"},
            {"source": "Benefits", "target": "Organization"},
            {"source": "Benefits", "target": "Time Saving"},
            {"source": "Benefits", "target": "Enfoque en Tareas de Alto Valor"},
            {"source": "Benefits", "target": "Reducción de Carga Cognitiva"},

            {"source": "AI Models", "target": "Gemini"},
            {"source": "AI Models", "target": "PaLM 2"},
            {"source": "AI Models", "target": "LLMs"},
            {"source": "AI Models", "target": "GPT"},
            {"source": "AI Models", "target": "Claude"},
            {"source": "AI Models", "target": "DeepSeek"},
            {"source": "AI Models", "target": "Perplexity"},
            {"source": "AI Models", "target": "Manus AI"},

            {"source": "Conceptos Clave", "target": "Calidad de Prompts"},

            {"source": "Tipos de IA", "target": "Modelos Conversacionales"},
            {"source": "Tipos de IA", "target": "Investigación Abierta"},
            {"source": "Tipos de IA", "target": "Comprensión Textual"},
            {"source": "Tipos de IA", "target": "Generación de Imágenes"},
            {"source": "Tipos de IA", "target": "Bioinformática"},
            {"source": "Tipos de IA", "target": "IA para CRM"},

            {"source": "Política de Uso de IA", "target": "Privacidad de Datos"},
            {"source": "Política de Uso de IA", "target": "Sesgos"},
            {"source": "Política de Uso de IA", "target": "Supervisión Humana"},
            {"source": "Política de Uso de IA", "target": "Transparencia"},

            {"source": "Stack de IA Recomendado", "target": "Gemini"},
            {"source": "Stack de IA Recomendado", "target": "Perplexity"},
            {"source": "Stack de IA Recomendado", "target": "NotebookLM"},
            {"source": "Stack de IA Recomendado", "target": "Manus AI"},

            {"source": "Roadmap de Capacitación", "target": "NotebookLM"}, // Roadmap includes NotebookLM
            {"source": "Roadmap de Capacitación", "target": "Stack de IA Recomendado"}, // Roadmap relates to recommended stack

            // Cross-cutting relationships (inferred or general knowledge)
            {"source": "Summarize", "target": "Productivity"},
            {"source": "Ask Questions", "target": "Understanding"},
            {"source": "Generate Ideas", "target": "Brainstorming"},
            {"source": "Chat with Sources", "target": "Research"},
            {"source": "Note-taking", "target": "Organization"},
            {"source": "Calidad de Prompts", "target": "Ask Questions"},
            {"source": "Calidad de Prompts", "target": "Draft"},
            {"source": "Punto de Vista del Experto", "target": "Interacciones"}, // Link expert view to general interactions
            {"source": "Mini-Quiz", "target": "Interacciones"}, // Link mini-quiz to general interactions
            {"source": "Punto de Vista del Experto", "target": "NotebookLM"}, // Expert view about NotebookLM
            {"source": "Mini-Quiz", "target": "Conceptos Clave"},
            {"source": "Mini-Quiz", "target": "Política de Uso de IA"},
            {"source": "Modales (Ventanas Emergentes)", "target": "Use Cases"},
            {"source": "Enfoque en Tareas de Alto Valor", "target": "Productivity"},
            {"source": "Reducción de Carga Cognitiva", "target": "Benefits"}
        ]
    };

    // Define color scale for node groups
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Define group names for the legend
    const groupNames = {
        0: "Principal",
        1: "Fuentes",
        2: "Características",
        3: "Casos de Uso",
        4: "Beneficios",
        5: "Modelos de IA",
        6: "Conceptos Clave",
        7: "Tipos de IA",
        8: "Gobernanza de IA",
        9: "Stack Recomendado",
        10: "Planificación",
        11: "Interacciones"
    };

    // Get SVG container and its dimensions
    const svg = d3.select("#network-chart");
    const chartContainer = d3.select(".chart-container");
    let width = chartContainer.node().clientWidth;
    let height = chartContainer.node().clientHeight;

    // Create a group for zoom functionality
    const g = svg.append("g");

    // Create a force simulation
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(100)) // Link force with distance
        .force("charge", d3.forceManyBody().strength(-300)) // Node repulsion
        .force("center", d3.forceCenter(width / 2, height / 2)); // Center the graph

    // Function to update SVG dimensions on resize
    function updateSvgDimensions() {
        width = chartContainer.node().clientWidth;
        height = chartContainer.node().clientHeight;
        svg.attr("width", width)
           .attr("height", height);
        simulation.force("center", d3.forceCenter(width / 2, height / 2));
        simulation.alpha(0.3).restart(); // Restart simulation gently
    }

    // Initial setup of SVG dimensions
    updateSvgDimensions();

    // Listen for window resize events
    window.addEventListener('resize', updateSvgDimensions);

    // Create link elements within the zoomable group
    const link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graphData.links)
        .enter().append("line");

    // Create node elements within the zoomable group
    const node = g.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graphData.nodes)
        .enter().append("g")
        .call(d3.drag() // Enable dragging for nodes
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Append circles to nodes
    node.append("circle")
        .attr("r", 8) // Radius of nodes
        .attr("fill", d => color(d.group)) // Color nodes by group
        .on("mouseover", function(event, d) {
            // Show tooltip on hover
            d3.select("#tooltip")
                .style("opacity", 1)
                .html(`<strong>${d.name}</strong>`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");

            // Highlight connected nodes and links
            link.style("stroke-opacity", l => (l.source === d || l.target === d) ? 1 : 0.2);
            node.style("opacity", n => (link.data().some(l => (l.source === d && l.target === n) || (l.target === d && l.source === n)) || n === d) ? 1 : 0.2);
        })
        .on("mouseout", function() {
            // Hide tooltip and reset highlighting
            d3.select("#tooltip").style("opacity", 0);
            link.style("stroke-opacity", 0.6);
            node.style("opacity", 1);
        })
        .on("click", function(event, d) { // Added click event for modal
            // Prevent drag event from triggering click immediately after drag
            if (event.defaultPrevented) return;
            showModal(d.name, d.context);
        });

    // Append text labels to nodes
    node.append("text")
        .attr("dx", 12) // Offset text from circle
        .attr("dy", ".35em")
        .text(d => d.name); // Display node name

    // Update positions of links and nodes on each tick of the simulation
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        d3.select(this).select("circle").style("cursor", "grabbing");
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        d3.select(this).select("circle").style("cursor", "grab");
    }

    // Implement zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.5, 4]) // Set zoom limits (0.5x to 4x)
        .on("zoom", zoomed);

    svg.call(zoom); // Apply zoom behavior to the SVG

    function zoomed(event) {
        g.attr("transform", event.transform); // Apply the zoom transform to the group 'g'
    }

    // Populate the legend
    const legendList = d3.select("#legend-list");
    const uniqueGroups = [...new Set(graphData.nodes.map(d => d.group))].sort((a, b) => a - b);

    uniqueGroups.forEach(group => {
        legendList.append("li")
            .attr("class", "flex items-center space-x-2")
            .html(`
                <span style="background-color: ${color(group)};" class="w-4 h-4 rounded-full inline-block"></span>
                <span>${groupNames[group]}</span>
            `);
    });

    // Modal Logic
    const infoModal = d3.select("#infoModal");
    const modalTitle = d3.select("#modalTitle");
    const modalBody = d3.select("#modalBody");
    const closeModalButton = d3.select("#closeModal");

    function showModal(title, content) {
        modalTitle.text(title);
        modalBody.text(content);
        infoModal.classed("show", true);
    }

    function hideModal() {
        infoModal.classed("show", false);
    }

    closeModalButton.on("click", hideModal);
    infoModal.on("click", function(event) {
        // Close modal if clicked outside the content
        if (event.target === infoModal.node()) {
            hideModal();
        }
    });
}

function setupD3Visualization() {
    // Asegurarse de que el SVG esté limpio antes de dibujar
    d3.select("#network-chart").selectAll("*").remove();

    const graphData = { "nodes": [
                {"id": "NotebookLM", "group": 0, "name": "NotebookLM", "context": "Es el propósito general de la guía. Presenta un índice interactivo con tarjetas de acceso directo a secciones importantes. Se enfoca en la IA como un 'asistente inteligente' para liberar tiempo y potenciar la creatividad."},
                {"id": "Sources", "group": 1, "name": "Fuentes", "context": "Tipos de documentos que NotebookLM puede usar como fuentes: Documentos, Presentaciones de Google, Sitios Web, PDFs, YouTube."},
                {"id": "Documents", "group": 1, "name": "Documentos", "context": "Archivos de texto y otros formatos que sirven como entrada para NotebookLM."},
                {"id": "Google Slides", "group": 1, "name": "Presentaciones de Google", "context": "Presentaciones que pueden ser utilizadas como fuentes de información."},
                {"id": "Websites", "group": 1, "name": "Sitios Web", "context": "Páginas web que pueden ser analizadas por NotebookLM."},
                {"id": "PDFs", "group": 1, "name": "PDFs", "context": "Documentos en formato PDF que pueden ser procesados."},
                {"id": "YouTube", "group": 1, "name": "YouTube", "context": "Videos de YouTube que pueden ser usados como fuentes, permitiendo interactuar con su contenido."},
                {"id": "Features", "group": 2, "name": "Características", "context": "Funcionalidades clave de NotebookLM: Resumir, Hacer Preguntas, Generar Ideas, Esquematizar, Redactar, Explicar, Chatear con Fuentes, Toma de Notas."},
                {"id": "Summarize", "group": 2, "name": "Resumir", "context": "Capacidad de la IA para condensar información. Usado en el Asistente de Redacción para simular resúmenes de escenarios."},
                {"id": "Ask Questions", "group": 2, "name": "Hacer Preguntas", "context": "Permite interactuar con las fuentes para obtener respuestas específicas."},
                {"id": "Generate Ideas", "group": 2, "name": "Generar Ideas", "context": "Ayuda a la lluvia de ideas y la creatividad, potenciando nuevas perspectivas."},
                {"id": "Outline", "group": 2, "name": "Esquematizar", "context": "Crea estructuras y esquemas de contenido a partir de las fuentes."},
                {"id": "Draft", "group": 2, "name": "Redactar", "context": "Asistencia en la creación de borradores de texto, como correos o informes."},
                {"id": "Explain", "group": 2, "name": "Explicar", "context": "Simplifica conceptos complejos o pasajes de texto para una mejor comprensión."},
                {"id": "Chat with Sources", "group": 2, "name": "Chatear con Fuentes", "context": "Permite una interacción conversacional directa con el contenido de los documentos cargados."},
                {"id": "Note-taking", "group": 2, "name": "Toma de Notas", "context": "Facilita la organización y captura de información clave de las fuentes."},
                {"id": "Modales (Ventanas Emergentes)", "group": 2, "name": "Modales (Ventanas Emergentes)", "context": "Ventanas emergentes utilizadas en la sección 'IA en Acción' para mostrar detalles de cada caso de uso sin saturar la página principal."},
                {"id": "Mejorar Tono", "group": 2, "name": "Mejorar Tono", "context": "Funcionalidad para ajustar el estilo y tono de la redacción."},
                {"id": "Laboratorio IA", "group": 2, "name": "Laboratorio IA", "context": "Sección de la guía que ofrece una experiencia práctica y simulada con herramientas de IA."},
                {"id": "Asistente de Redacción", "group": 2, "name": "Asistente de Redacción", "context": "Simulador dentro del Laboratorio IA para elegir escenarios y practicar funciones como 'Resumir' y 'Mejorar Tono'."},
                {"id": "Generador de Fórmulas Excel", "group": 2, "name": "Generador de Fórmulas Excel", "context": "Simulador dentro del Laboratorio IA para generar fórmulas de Excel, con opción de copiar."},

                {"id": "Use Cases", "group": 3, "name": "Casos de Uso", "context": "Ejemplos prácticos de aplicación de la IA: Investigación, Escritura, Aprendizaje, Lluvia de Ideas, Creación de Contenido. Incluye ejemplos como 'Redacción de Correos', 'Análisis de Datos en Excel', 'Resúmenes de Informes'."},
                {"id": "Research", "group": 3, "name": "Investigación", "context": "Uso de IA para analizar y sintetizar grandes volúmenes de información."},
                {"id": "Writing", "group": 3, "name": "Escritura", "context": "Aplicación de IA para la generación y mejora de textos."},
                {"id": "Learning", "group": 3, "name": "Aprendizaje", "context": "Uso de IA para facilitar la comprensión y retención de conocimientos."},
                {"id": "Brainstorming", "group": 3, "name": "Lluvia de Ideas", "context": "La IA como herramienta para generar nuevas ideas y enfoques."},
                {"id": "Content Creation", "group": 3, "name": "Creación de Contenido", "context": "Uso de IA para generar diversos tipos de contenido, desde textos hasta scripts."},
                {"id": "Redacción de Correos", "group": 3, "name": "Redacción de Correos", "context": "Caso de uso práctico de IA para asistir en la creación de correos electrónicos."},
                {"id": "Análisis de Datos en Excel", "group": 3, "name": "Análisis de Datos en Excel", "context": "Caso de uso práctico de IA para ayudar en la manipulación y análisis de datos en hojas de cálculo."},
                {"id": "Resúmenes de Informes", "group": 3, "name": "Resúmenes de Informes", "context": "Caso de uso práctico de IA para generar resúmenes concisos de informes extensos."},

                {"id": "Benefits", "group": 4, "name": "Beneficios", "context": "Ventajas estratégicas de adoptar la IA: Productividad, Eficiencia, Comprensión, Organización, Ahorro de Tiempo. Ayuda a reducir la 'carga cognitiva'."},
                {"id": "Productivity", "group": 4, "name": "Productividad", "context": "La IA permite hacer más en menos tiempo, optimizando procesos."},
                {"id": "Efficiency", "group": 4, "name": "Eficiencia", "context": "Mejora en la ejecución de tareas, minimizando el esfuerzo y los recursos."},
                {"id": "Understanding", "group": 4, "name": "Comprensión", "context": "Facilita el análisis y la asimilación de información compleja."},
                {"id": "Organization", "group": 4, "name": "Organización", "context": "Ayuda a estructurar y gestionar la información de manera efectiva."},
                {"id": "Time Saving", "group": 4, "name": "Ahorro de Tiempo", "context": "Automatización de tareas repetitivas, liberando tiempo para actividades de mayor valor."},
                {"id": "Enfoque en Tareas de Alto Valor", "group": 4, "name": "Enfoque en Tareas de Alto Valor", "context": "Beneficio de la IA que permite a los usuarios concentrarse en actividades más estratégicas y creativas."},
                {"id": "Reducción de Carga Cognitiva", "group": 4, "name": "Reducción de Carga Cognitiva", "context": "Beneficio de la IA que aligera el esfuerzo mental en tareas rutinarias, mejorando la satisfacción laboral."},

                {"id": "AI Models", "group": 5, "name": "Modelos de IA", "context": "Principales modelos de IA mencionados: GPT, Gemini, Claude, DeepSeek, Perplexity, NotebookLM."},
                {"id": "Gemini", "group": 5, "name": "Gemini", "context": "Un modelo de IA avanzado de Google, parte del stack de IA recomendado."},
                {"id": "PaLM 2", "group": 5, "name": "PaLM 2", "context": "Otro modelo de lenguaje grande de Google."},
                {"id": "LLMs", "group": 5, "name": "LLMs", "context": "Modelos de Lenguaje Grandes, la base de muchas aplicaciones de IA como NotebookLM."},
                {"id": "GPT", "group": 5, "name": "GPT", "context": "Familia de modelos de lenguaje generativos desarrollados por OpenAI."},
                {"id": "Claude", "group": 5, "name": "Claude", "context": "Modelo de lenguaje grande desarrollado por Anthropic."},
                {"id": "DeepSeek", "group": 5, "name": "DeepSeek", "context": "Un modelo de IA mencionado en la guía."},
                {"id": "Perplexity", "group": 5, "name": "Perplexity", "context": "Un motor de búsqueda conversacional impulsado por IA, parte del stack de IA recomendado."},
                {"id": "Manus AI", "group": 5, "name": "Manus AI", "context": "Una herramienta de IA mencionada en el stack recomendado."},

                {"id": "Conceptos Clave", "group": 6, "name": "Conceptos Clave", "context": "Conceptos fundamentales para entender la IA, como la relación Entrada-Salida y la calidad de los prompts."},
                {"id": "Calidad de Prompts", "group": 6, "name": "Calidad de Prompts", "context": "La importancia de la calidad de las entradas (prompts) para generar resultados de alta calidad en la IA."},

                {"id": "Tipos de IA", "group": 7, "name": "Tipos de IA", "context": "Clasificación de los diferentes tipos de IA y sus aplicaciones."},
                {"id": "Modelos Conversacionales", "group": 7, "name": "Modelos Conversacionales", "context": "Categoría de IA enfocada en la interacción y diálogo con los usuarios."},
                {"id": "Investigación Abierta", "group": 7, "name": "Investigación Abierta", "context": "Categoría de IA para la exploración y análisis de información sin restricciones."},
                {"id": "Comprensión Textual", "group": 7, "name": "Comprensión Textual", "context": "Categoría de IA dedicada al entendimiento y procesamiento del lenguaje natural."},
                {"id": "Generación de Imágenes", "group": 7, "name": "Generación de Imágenes", "context": "Categoría de IA para la creación de imágenes a partir de descripciones textuales."},
                {"id": "Bioinformática", "group": 7, "name": "Bioinformática", "context": "Aplicación de IA en el análisis de datos biológicos y genéticos."},
                {"id": "IA para CRM", "group": 7, "name": "IA para CRM", "context": "Uso de IA para mejorar la gestión de relaciones con clientes."},

                {"id": "Política de Uso de IA", "group": 8, "name": "Política de Uso de IA", "context": "Directrices para un uso ético y seguro de la IA, incluyendo privacidad de datos, sesgos, supervisión humana y transparencia."},
                {"id": "Privacidad de Datos", "group": 8, "name": "Privacidad de Datos", "context": "Directriz clave sobre la protección de la información sensible al usar IA."},
                {"id": "Sesgos", "group": 8, "name": "Sesgos", "context": "Directriz sobre la identificación y mitigación de sesgos en los sistemas de IA."},
                {"id": "Supervisión Humana", "group": 8, "name": "Supervisión Humana", "context": "Directriz que enfatiza la necesidad de revisión y control humano sobre las decisiones de la IA."},
                {"id": "Transparencia", "group": 8, "name": "Transparencia", "context": "Directriz sobre la claridad en el funcionamiento y las limitaciones de la IA."},

                {"id": "Stack de IA Recomendado", "group": 9, "name": "Stack Recomendado", "context": "Herramientas de IA recomendadas para su uso: Gemini, Perplexity, NotebookLM, Manus AI."},
                {"id": "Roadmap de Capacitación", "group": 10, "name": "Planificación", "context": "Línea de tiempo visual con las fases del plan de implementación de IA en la empresa."},

                {"id": "Interacciones", "group": 11, "name": "Interacciones", "context": "Tipos de interacciones presentes en la guía: Punto de Vista del Experto, Mini-Quiz."},
                {"id": "Punto de Vista del Experto", "group": 11, "name": "Punto de Vista del Experto", "context": "Interacción que presenta la perspectiva de un experto sobre un tema específico de IA."},
                {"id": "Mini-Quiz", "group": 11, "name": "Mini-Quiz", "context": "Interacción para evaluar la comprensión de conceptos clave de IA, como la importancia de los prompts."},
            ],
            "links": [
                {"source": "NotebookLM", "target": "Sources"},
                {"source": "NotebookLM", "target": "Features"},
                {"source": "NotebookLM", "target": "Use Cases"},
                {"source": "NotebookLM", "target": "Benefits"},
                {"source": "NotebookLM", "target": "AI Models"},
                {"source": "NotebookLM", "target": "Conceptos Clave"},
                {"source": "NotebookLM", "target": "Tipos de IA"},
                {"source": "NotebookLM", "target": "Política de Uso de IA"},
                {"source": "NotebookLM", "target": "Stack de IA Recomendado"},
                {"source": "NotebookLM", "target": "Interacciones"},

                {"source": "Sources", "target": "Documents"},
                {"source": "Sources", "target": "Google Slides"},
                {"source": "Sources", "target": "Websites"},
                {"source": "Sources", "target": "PDFs"},
                {"source": "Sources", "target": "YouTube"},

                {"source": "Features", "target": "Summarize"},
                {"source": "Features", "target": "Ask Questions"},
                {"source": "Features", "target": "Generate Ideas"},
                {"source": "Features", "target": "Outline"},
                {"source": "Features", "target": "Draft"},
                {"source": "Features", "target": "Explain"},
                {"source": "Features", "target": "Chat with Sources"},
                {"source": "Features", "target": "Note-taking"},
                {"source": "Features", "target": "Modales (Ventanas Emergentes)"},
                {"source": "Features", "target": "Mejorar Tono"},
                {"source": "Features", "target": "Laboratorio IA"},
                {"source": "Laboratorio IA", "target": "Asistente de Redacción"},
                {"source": "Laboratorio IA", "target": "Generador de Fórmulas Excel"},
                {"source": "Asistente de Redacción", "target": "Summarize"},
                {"source": "Asistente de Redacción", "target": "Mejorar Tono"},

                {"source": "Use Cases", "target": "Research"},
                {"source": "Use Cases", "target": "Writing"},
                {"source": "Use Cases", "target": "Learning"},
                {"source": "Use Cases", "target": "Brainstorming"},
                {"source": "Use Cases", "target": "Content Creation"},
                {"source": "Use Cases", "target": "Redacción de Correos"},
                {"source": "Use Cases", "target": "Análisis de Datos en Excel"},
                {"source": "Use Cases", "target": "Resúmenes de Informes"},

                {"source": "Benefits", "target": "Productivity"},
                {"source": "Benefits", "target": "Efficiency"},
                {"source": "Benefits", "target": "Understanding"},
                {"source": "Benefits", "target": "Organization"},
                {"source": "Benefits", "target": "Time Saving"},
                {"source": "Benefits", "target": "Enfoque en Tareas de Alto Valor"},
                {"source": "Benefits", "target": "Reducción de Carga Cognitiva"},

                {"source": "AI Models", "target": "Gemini"},
                {"source": "AI Models", "target": "PaLM 2"},
                {"source": "AI Models", "target": "LLMs"},
                {"source": "AI Models", "target": "GPT"},
                {"source": "AI Models", "target": "Claude"},
                {"source": "AI Models", "target": "DeepSeek"},
                {"source": "AI Models", "target": "Perplexity"},
                {"source": "AI Models", "target": "Manus AI"},

                {"source": "Conceptos Clave", "target": "Calidad de Prompts"},

                {"source": "Tipos de IA", "target": "Modelos Conversacionales"},
                {"source": "Tipos de IA", "target": "Investigación Abierta"},
                {"source": "Tipos de IA", "target": "Comprensión Textual"},
                {"source": "Tipos de IA", "target": "Generación de Imágenes"},
                {"source": "Tipos de IA", "target": "Bioinformática"},
                {"source": "Tipos de IA", "target": "IA para CRM"},

                {"source": "Política de Uso de IA", "target": "Privacidad de Datos"},
                {"source": "Política de Uso de IA", "target": "Sesgos"},
                {"source": "Política de Uso de IA", "target": "Supervisión Humana"},
                {"source": "Política de Uso de IA", "target": "Transparencia"},

                {"source": "Stack de IA Recomendado", "target": "Gemini"},
                {"source": "Stack de IA Recomendado", "target": "Perplexity"},
                {"source": "Stack de IA Recomendado", "target": "NotebookLM"},
                {"source": "Stack de IA Recomendado", "target": "Manus AI"},

                {"source": "Roadmap de Capacitación", "target": "NotebookLM"}, // Roadmap includes NotebookLM
                {"source": "Roadmap de Capacitación", "target": "Stack de IA Recomendado"}, // Roadmap relates to recommended stack

                // Cross-cutting relationships (inferred or general knowledge)
                {"source": "Summarize", "target": "Productivity"},
                {"source": "Ask Questions", "target": "Understanding"},
                {"source": "Generate Ideas", "target": "Brainstorming"},
                {"source": "Chat with Sources", "target": "Research"},
                {"source": "Note-taking", "target": "Organization"},
                {"source": "Calidad de Prompts", "target": "Ask Questions"},
                {"source": "Calidad de Prompts", "target": "Draft"},
                {"source": "Punto de Vista del Experto", "target": "Interacciones"}, // Link expert view to general interactions
                {"source": "Mini-Quiz", "target": "Interacciones"}, // Link mini-quiz to general interactions
                {"source": "Punto de Vista del Experto", "target": "NotebookLM"}, // Expert view about NotebookLM
                {"source": "Mini-Quiz", "target": "Conceptos Clave"},
                {"source": "Mini-Quiz", "target": "Política de Uso de IA"},
                {"source": "Modales (Ventanas Emergentes)", "target": "Use Cases"},
                {"source": "Enfoque en Tareas de Alto Valor", "target": "Productivity"},
                {"source": "Reducción de Carga Cognitiva", "target": "Benefits"}
            ]/* ... (tus datos de nodos y enlaces van aquí, sin cambios) ... */ };
    
    // --- PEGA TUS DATOS DE graphData AQUÍ ---
    // Simplemente copia y pega la variable 'graphData' completa de tu archivo de visualización.

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
        simulation.force("center", d3.forceCenter(width / 2, height / 2));
        simulation.alpha(0.3).restart();
    }
    updateSvgDimensions();
    window.addEventListener('resize', updateSvgDimensions);

    const link = g.append("g").attr("class", "links").selectAll("line").data(graphData.links).enter().append("line");
    const node = g.append("g").attr("class", "nodes").selectAll("g").data(graphData.nodes).enter().append("g").call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
    
    const tooltip = d3.select("#viz-tooltip"); // ID Corregido

    node.append("circle").attr("r", 8).attr("fill", d => color(d.group))
        .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1).html(`<strong>${d.name}</strong>`).style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 28) + "px");
            link.style("stroke-opacity", l => (l.source === d || l.target === d) ? 1 : 0.2);
            node.style("opacity", n => (link.data().some(l => (l.source === d && l.target === n) || n === d) ? 1 : 0.2);
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

    function dragstarted(event, d) { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; d3.select(this).select("circle").style("cursor", "grabbing"); }
    function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
    function dragended(event, d) { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; d3.select(this).select("circle").style("cursor", "grab"); }

    const zoom = d3.zoom().scaleExtent([0.5, 4]).on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);

    const legendList = d3.select("#legend-list");
    legendList.html(""); // Limpiar leyenda
    [...new Set(graphData.nodes.map(d => d.group))].sort((a,b)=>a-b).forEach(group => {
        legendList.append("li").attr("class", "flex items-center space-x-2").html(`<span style="background-color: ${color(group)};" class="w-3 h-3 rounded-full inline-block"></span><span>${groupNames[group]}</span>`);
    });

    // Lógica del Modal de Detalle (IDs Corregidos)
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
