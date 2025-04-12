$(document).ready(function() {
    // Current language (default: English)
    let currentLang = 'en';
    
    // Update greeting based on time of day and language
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting;
        
        if (hour < 12) {
            greeting = translations[currentLang].goodMorning;
        } else if (hour < 18) {
            greeting = translations[currentLang].goodAfternoon;
        } else {
            greeting = translations[currentLang].goodEvening;
        }
        
        $('.welcome-msg p').text(greeting);
    }
    
    // Function to update all UI text based on selected language
    function updateUILanguage() {
        // Update sidebar text
        $('.sidebar-menu .nav-item:nth-child(1) span').text(translations[currentLang].dashboard);
        $('.sidebar-menu .nav-item:nth-child(2) span').text(translations[currentLang].vouch);
        $('.sidebar-menu .nav-item:nth-child(3) span').text(translations[currentLang].analytics);
        $('.sidebar-menu .nav-item:nth-child(4) span').text(translations[currentLang].inventory);
        $('.sidebar-menu .nav-item:nth-child(5) span').text(translations[currentLang].profile);
        $('.sidebar-menu .nav-item:nth-child(6) span').text(translations[currentLang].settings);

        
        // Update notifications text
        $('.notification-header h3').text(translations[currentLang].notifications);
        $('.notification-count').text(translations[currentLang].newNotifications);
        $('.notification-footer a').text(translations[currentLang].viewAllNotifications);
        
        // Update notification items
        $('.notification-item:nth-child(1) .notification-title').text(translations[currentLang].lowStockAlert);
        $('.notification-item:nth-child(1) .notification-text').text(translations[currentLang].butterLowStock);
        $('.notification-item:nth-child(2) .notification-title').text(translations[currentLang].scheduledMaintenance);
        $('.notification-item:nth-child(2) .notification-text').text(translations[currentLang].maintenanceScheduled);
        $('.notification-item:nth-child(3) .notification-title').text(translations[currentLang].lowStockAlert);
        $('.notification-item:nth-child(3) .notification-text').text(translations[currentLang].whippedCreamLowStock);
        
        // Update stat cards
        $('.stat-card:nth-child(1) .card-subtitle').text(translations[currentLang].overallPerformance);
        $('.stat-card:nth-child(1) .card-stat span:nth-child(2)').text(translations[currentLang].sinceYesterday);
        
        $('.stat-card:nth-child(2) .card-title').text(translations[currentLang].ordersCompleted);
        $('.stat-card:nth-child(2) .card-subtitle').text(translations[currentLang].processingStatus);
        $('.stat-card:nth-child(2) .card-stat span:nth-child(2)').text(translations[currentLang].sinceLastWeek);
        
        $('.stat-card:nth-child(3) .card-title').text(translations[currentLang].mostBoughtMenuToday);
        $('.stat-card:nth-child(3) .card-subtitle').text(translations[currentLang].customerFavorites);
        $('.stat-card:nth-child(3) .card-stat span:nth-child(2)').text(translations[currentLang].today);
        
        $('.stat-card:nth-child(4) .card-stat span:nth-child(2)').text(translations[currentLang].thanLastMonth);
        
        // Update greeting
        updateGreeting();
        
        // Update current language display
        $('.current-language').text(currentLang.toUpperCase());
    }
    
    // Run the greeting update function
    updateGreeting();
    
    // Initialize UI with default language
    updateUILanguage();
    
    // Mobile sidebar toggle
    $('.menu-toggle').on('click', function() {
        $('.sidebar').toggleClass('active');
    });
    
    // Language selector toggle
    $('.language-button').on('click', function(e) {
        e.stopPropagation();
        $('.language-dropdown').toggleClass('show');
    });
    
    // Language option selection
    $('.language-option').on('click', function() {
        const selectedLang = $(this).data('lang');
        currentLang = selectedLang;
        
        // Update active class
        $('.language-option').removeClass('active');
        $(this).addClass('active');
        
        // Update current language display
        $('.current-language').text(currentLang.toUpperCase());
        
        // Update all UI text
        updateUILanguage();
        
        // Close dropdown
        $('.language-dropdown').removeClass('show');
    });
    
    // Set active class on current language
    $(`.language-option[data-lang="${currentLang}"]`).addClass('active');
    
    // Notification bell toggle
    $('.notification-bell').on('click', function(e) {
        e.stopPropagation();
        $('.notification-dropdown').toggleClass('show');
    });
    
    // Close dropdowns when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.notification-dropdown').length && 
            !$(e.target).closest('.notification-bell').length) {
            $('.notification-dropdown').removeClass('show');
        }
        
        if (!$(e.target).closest('.language-dropdown').length && 
            !$(e.target).closest('.language-button').length) {
            $('.language-dropdown').removeClass('show');
        }
    });
    
    // Close sidebar when clicking outside on mobile
    $(document).on('click', function(e) {
        if ($(window).width() <= 992 && 
            !$(e.target).closest('.sidebar').length && 
            !$(e.target).closest('.menu-toggle').length) {
            $('.sidebar').removeClass('active');
        }
    });
    
    // Handle navigation item clicks
    $('.nav-item').on('click', function() {
        if (!$(this).attr('id') === 'vouch-link') {
            $('.nav-item').removeClass('active');
            $(this).addClass('active');
        }
    });
    
    // Add pulse animation to stat indicators
    $('.stat-up, .stat-down').append('<span class="pulse-dot"></span>');
    
    // Add CSS for the pulse animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .pulse-dot {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                margin-left: 5px;
                animation: pulse 1.5s infinite;
            }
            
            .stat-up .pulse-dot {
                background-color: var(--success-color);
            }
            
            .stat-down .pulse-dot {
                background-color: var(--danger-color);
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(0.95);
                    opacity: 0.5;
                }
                50% {
                    transform: scale(1.1);
                    opacity: 1;
                }
                100% {
                    transform: scale(0.95);
                    opacity: 0.5;
                }
            }
        `)
        .appendTo('head');
    
    // Initialize Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales',
                data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 350, 400, 500],
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderColor: '#000000',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#000000'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    }
                }
            }
        }
    });

    // Initialize Users Chart
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    const usersChart = new Chart(usersCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Active Users',
                data: [1800, 1600, 2300, 2200, 3000, 2500, 2800, 2100, 2900, 3200, 3500, 3800],
                backgroundColor: '#333333',
                borderRadius: 5,
                barThickness: 12,
                maxBarThickness: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    }
                }
            }
        }
    });

    
});