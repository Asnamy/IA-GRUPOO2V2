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
