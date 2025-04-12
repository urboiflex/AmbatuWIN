/**
 * Popup Notifications System
 * Shows notifications at the bottom right of the screen when the dashboard loads
 */

$(document).ready(function() {
    // Add the CSS file for popup notifications
    $('<link>')
        .attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: 'popup-notification.css'
        })
        .appendTo('head');
    
    // Create container for popup notifications
    const notificationContainer = $('<div class="popup-notification-container"></div>');
    $('body').append(notificationContainer);
    
    // Notification data (you can replace this with dynamic data from your backend)
    const notifications = [
        {
            title: 'Low Stock Alert',
            text: 'Butter is running low on stock (8 remaining)',
            time: '2 hours ago',
            type: 'warning',
            icon: 'fas fa-exclamation-triangle'
        },
        {
            title: 'Scheduled Maintenance',
            text: 'System maintenance scheduled for Dec 12, 2023 at 02:00 AM',
            time: '5 hours ago',
            type: 'primary',
            icon: 'fas fa-tools'
        },
        {
            title: 'Low Stock Alert',
            text: 'Whipped Cream is running low on stock (3 remaining)',
            time: '1 day ago',
            type: 'danger',
            icon: 'fas fa-exclamation-circle'
        }
    ];
    
    // Function to show a popup notification
    function showPopupNotification(notification, delay = 0) {
        // Create notification element
        const notificationElement = $(`
            <div class="popup-notification ${notification.type}">
                <div class="popup-notification-icon bg-${notification.type}">
                    <i class="${notification.icon}"></i>
                </div>
                <div class="popup-notification-content">
                    <div class="popup-notification-title">${notification.title}</div>
                    <div class="popup-notification-text">${notification.text}</div>
                    <div class="popup-notification-time">${notification.time}</div>
                </div>
                <div class="popup-notification-close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        `);
        
        // Add to container
        $('.popup-notification-container').append(notificationElement);
        
        // Show with delay for sequential appearance
        setTimeout(function() {
            notificationElement.addClass('show');
        }, delay);
        
        // Auto-dismiss after 5 seconds (5000ms + delay)
        setTimeout(function() {
            dismissNotification(notificationElement);
        }, 5000 + delay);
        
        // Close button functionality
        notificationElement.find('.popup-notification-close').on('click', function() {
            dismissNotification(notificationElement);
        });
    }
    
    // Function to dismiss a notification
    function dismissNotification(element) {
        element.removeClass('show');
        
        // Remove from DOM after animation completes
        setTimeout(function() {
            element.remove();
        }, 500); // Match the CSS transition duration
    }
    
    // Show notifications with sequential delays when page loads
    function showInitialNotifications() {
        notifications.forEach((notification, index) => {
            showPopupNotification(notification, index * 700); // 700ms delay between each notification
        });
    }
    
    // Show notifications after a short delay when the page loads
    setTimeout(showInitialNotifications, 1000);
});