// Header functionality - This file contains all the JavaScript for the header
$(document).ready(function() {
    // Force "Home" to be active on initial page load
    if (!window.location.hash || window.location.hash === "#" || window.location.hash === "#home") {
        $('.nav-item').removeClass('active');
        $('.nav-item[href="#home"]').addClass('active');
    } else if (window.location.hash === "#about") {
        // If page loads directly at #about
        $('.nav-item').removeClass('active');
        $('.nav-item[href="#about"]').addClass('active');
    }
    
    // Add scroll event listener to change header style on scroll
    $(window).scroll(function() {
        // Add scrolled class to header when scrolled down
        if ($(window).scrollTop() > 50) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
        
        // Update active nav item based on scroll position
        updateActiveNavOnScroll();
    });
    
    // Function to update active navigation based on scroll position
    function updateActiveNavOnScroll() {
        const scrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();
        const headerHeight = $('#header').outerHeight();
        
        // Check if we're at the top of the page (with some buffer)
        if (scrollPosition < windowHeight * 0.3) {
            animateNavChange('#home');
            return;
        }
        
        // Check which section is visible using an improved approach
        $('section, main').each(function() {
            const section = $(this);
            const sectionId = section.attr('id');
            if (!sectionId) return; // Skip if no ID
            
            const sectionTop = section.offset().top - headerHeight - 10;
            const sectionBottom = sectionTop + section.outerHeight();
            
            // If scrolled position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                animateNavChange('#' + sectionId);
                return false; // Break the loop once found
            }
        });
    }
    
    // Animate the navigation change smoother
    function animateNavChange(targetId) {
        // Only change if it's different from current active
        if (!$('.nav-item[href="' + targetId + '"]').hasClass('active')) {
            // Remove active class with fade
            $('.nav-item.active').css({
                'transition': 'all 0.3s ease-out'
            }).removeClass('active');
            
            // Add active class with a slight delay for smoother transition
            setTimeout(function() {
                $('.nav-item[href="' + targetId + '"]').css({
                    'transition': 'all 0.3s ease-in'
                }).addClass('active');
            }, 50);
        }
    }
    
    // Add click event for navigation items
    $('.nav-item').on('click', function(e) {
        // Skip processing for links that aren't anchor links
        if (!$(this).attr('href').startsWith('#')) {
            return;
        }
        
        // Get the target section id from the href attribute
        const targetId = $(this).attr('href');
        
        // Scroll to the target section with an offset for the fixed header
        const targetSection = $(targetId);
        if (targetSection.length) {
            const headerHeight = $('#header').outerHeight();
            
            // More precise scrolling control
            e.preventDefault();
            
            // Smoothly update the navigation
            animateNavChange(targetId);
            
            // Smooth scroll to section
            $('html, body').animate({
                scrollTop: targetSection.offset().top - headerHeight
            }, 800, 'easeInOutQuart'); // Add easing for smoother scrolling
        }
    });
    
    // Add custom easing function for smoother scrolling
    $.easing.easeInOutQuart = function(x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    };
    
    // Run initial check for active section on page load
    setTimeout(function() {
        updateActiveNavOnScroll();
    }, 100);
});