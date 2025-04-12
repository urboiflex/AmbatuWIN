$(document).ready(function() {
    // Settings Navigation
    $('.settings-nav-item').on('click', function() {
        // Remove active class from all nav items and sections
        $('.settings-nav-item').removeClass('active');
        $('.settings-section').removeClass('active');
        
        // Add active class to clicked nav item
        $(this).addClass('active');
        
        // Show corresponding section
        const targetSection = $(this).data('target');
        $('#' + targetSection).addClass('active');
    });
    
    // Form Validation
    $('.btn-primary').on('click', function(e) {
        e.preventDefault();
        
        // Simple validation example
        let isValid = true;
        const currentSection = $('.settings-section.active');
        
        // Check required fields
        currentSection.find('input[required]').each(function() {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).css('border-color', 'var(--danger-color)');
            } else {
                $(this).css('border-color', 'rgba(255, 255, 255, 0.1)');
            }
        });
        
        // Email validation for email fields
        currentSection.find('input[type="email"]').each(function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if ($(this).val() !== '' && !emailRegex.test($(this).val())) {
                isValid = false;
                $(this).css('border-color', 'var(--danger-color)');
            }
        });
        
        if (isValid) {
            // Save settings
            saveSettings(currentSection.attr('id'));
        } else {
            // Show error message
            alert('Please fill in all required fields correctly.');
        }
    });
    

    
    // Toggle switches
    $('.toggle input').on('change', function() {
        const settingName = $(this).closest('.toggle-group').find('.toggle-label').text();
        const isEnabled = $(this).is(':checked');
        
        // Save toggle state
        saveToggleSetting(settingName, isEnabled);
    });
    
    // Load saved toggle settings
    loadSavedSettings();
    
    // Mobile menu toggle
    $('.menu-toggle').on('click', function() {
        $('.sidebar').toggleClass('active');
    });
    
    // Notification dropdown
    $('.notification-bell').on('click', function(e) {
        e.stopPropagation();
        $('.notification-dropdown').toggleClass('show');
    });
    
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.notification').length) {
            $('.notification-dropdown').removeClass('show');
        }
    });
});



// Function to save settings
function saveSettings(sectionId) {
    const settings = {};
    
    // Get all input values from the section
    $(`#${sectionId} input, #${sectionId} select`).each(function() {
        const inputName = $(this).attr('id');
        if (inputName) {
            if ($(this).attr('type') === 'checkbox') {
                settings[inputName] = $(this).is(':checked');
            } else {
                settings[inputName] = $(this).val();
            }
        }
    });
    
    // Save to localStorage
    localStorage.setItem(`settings_${sectionId}`, JSON.stringify(settings));
    
    // Show success message
    showNotification('Settings saved successfully!', 'success');
}

// Function to save toggle setting
function saveToggleSetting(settingName, isEnabled) {
    // Get existing toggle settings or initialize empty object
    const toggleSettings = JSON.parse(localStorage.getItem('toggleSettings') || '{}');
    
    // Update setting
    toggleSettings[settingName] = isEnabled;
    
    // Save back to localStorage
    localStorage.setItem('toggleSettings', JSON.stringify(toggleSettings));
}

// Function to load saved settings
function loadSavedSettings() {
    // Load toggle settings
    const toggleSettings = JSON.parse(localStorage.getItem('toggleSettings') || '{}');
    
    // Apply toggle settings
    $('.toggle-group').each(function() {
        const settingName = $(this).find('.toggle-label').text();
        if (toggleSettings.hasOwnProperty(settingName)) {
            $(this).find('input[type="checkbox"]').prop('checked', toggleSettings[settingName]);
        }
    });
    
    // Load form settings for each section
    $('.settings-section').each(function() {
        const sectionId = $(this).attr('id');
        const sectionSettings = JSON.parse(localStorage.getItem(`settings_${sectionId}`) || '{}');
        
        // Apply settings to form fields
        for (const [key, value] of Object.entries(sectionSettings)) {
            const input = $(`#${key}`);
            if (input.length) {
                if (input.attr('type') === 'checkbox') {
                    input.prop('checked', value);
                } else {
                    input.val(value);
                }
            }
        }
    });
}

// Function to show notification
function showNotification(message, type) {
    // Create notification element
    const notification = $('<div class="settings-notification"></div>');
    notification.addClass(type);
    notification.text(message);
    
    // Add to body
    $('body').append(notification);
    
    // Show notification
    setTimeout(() => {
        notification.addClass('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.removeClass('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}