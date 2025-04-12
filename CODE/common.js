// Common JavaScript functions for all pages

$(document).ready(function() {
    // Check if language is stored in localStorage
    let currentLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Function to update greeting based on time of day and language
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
        $('.notification-item:nth-child(2) .notification-title').text(translations[currentLang].scheduledMaintenance);
        $('.notification-item:nth-child(3) .notification-title').text(translations[currentLang].lowStockAlert);
        
        // Update greeting
        updateGreeting();
        
        // Update current language display
        $('.current-language').text(currentLang.toUpperCase());
    }
    
    // Add language selector to all pages if it doesn't exist
    function addLanguageSelector() {
        if ($('.language-selector').length === 0 && $('.top-bar-right').length > 0) {
            const languageSelector = $(`
                <div class="language-selector">
                    <div class="language-button">
                        <span class="current-language">${currentLang.toUpperCase()}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="language-dropdown">
                        <div class="language-option" data-lang="en">English</div>
                        <div class="language-option" data-lang="zh">中文 (简体)</div>
                    </div>
                </div>
            `);
            
            // Insert before the first element in top-bar-right
            $('.top-bar-right').prepend(languageSelector);
            
            // Set active class on current language
            $(`.language-option[data-lang="${currentLang}"]`).addClass('active');
        }
    }
    
    // Initialize language selector
    addLanguageSelector();
    
    // Run the greeting update function
    updateGreeting();
    
    // Initialize UI with default language
    updateUILanguage();
    
    // Language selector toggle
    $(document).on('click', '.language-button', function(e) {
        e.stopPropagation();
        $('.language-dropdown').toggleClass('show');
    });
    
    // Language option selection
    $(document).on('click', '.language-option', function() {
        const selectedLang = $(this).data('lang');
        currentLang = selectedLang;
        
        // Save to localStorage
        localStorage.setItem('selectedLanguage', currentLang);
        
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
    
    // Close dropdowns when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.language-dropdown').length && 
            !$(e.target).closest('.language-button').length) {
            $('.language-dropdown').removeClass('show');
        }
    });
});