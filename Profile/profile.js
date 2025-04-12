// Profile Page JavaScript

$(document).ready(function() {
    // Toggle mobile menu
    $(".menu-toggle").click(function() {
        $(".sidebar").toggleClass("active");
    });

    // Toggle notification dropdown
    $(".notification-bell").click(function(e) {
        e.stopPropagation();
        $(".notification-dropdown").toggleClass("show");
    });

    // Close notification dropdown when clicking outside
    $(document).click(function() {
        $(".notification-dropdown").removeClass("show");
    });

    // Edit section buttons functionality
    $(".edit-section-btn").click(function() {
        const section = $(this).data("section");
        $(`#${section}-info-view`).addClass("hidden");
        $(`#${section}-info-edit`).removeClass("hidden");
    });

    // Cancel edit buttons functionality
    $(".cancel-edit").click(function() {
        const section = $(this).data("section");
        $(`#${section}-info-edit`).addClass("hidden");
        $(`#${section}-info-view`).removeClass("hidden");
    });

    // Form submission handling
    $("#personal-info-form").submit(function(e) {
        e.preventDefault();
        // Get form values
        const fullName = $("#fullname").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const location = $("#location").val();
        
        // Update displayed values
        $("#personal-info-view .info-row:nth-child(1) .info-value").text(fullName);
        $("#personal-info-view .info-row:nth-child(2) .info-value").text(email);
        $("#personal-info-view .info-row:nth-child(3) .info-value").text(phone);
        $("#personal-info-view .info-row:nth-child(4) .info-value").text(location);
        
        // Update profile header name
        $(".profile-info h2").text(fullName);
        $(".profile-name").text(fullName);
        
        // Hide edit form, show view
        $("#personal-info-edit").addClass("hidden");
        $("#personal-info-view").removeClass("hidden");
        
        // Show success message
        showNotification("Personal information updated successfully", "success");
    });

    $("#business-info-form").submit(function(e) {
        e.preventDefault();
        // Get form values
        const businessName = $("#business-name").val();
        const businessType = $("#business-type").val();
        const address = $("#address").val();
        const hours = $("#hours").val();
        
        // Update displayed values
        $("#business-info-view .info-row:nth-child(1) .info-value").text(businessName);
        $("#business-info-view .info-row:nth-child(2) .info-value").text(
            businessType === "restaurant" ? "Restaurant" : 
            businessType === "cafe" ? "Cafe" : "Food Stall"
        );
        $("#business-info-view .info-row:nth-child(3) .info-value").text(address);
        $("#business-info-view .info-row:nth-child(4) .info-value").text(hours);
        
        // Hide edit form, show view
        $("#business-info-edit").addClass("hidden");
        $("#business-info-view").removeClass("hidden");
        
        // Show success message
        showNotification("Business information updated successfully", "success");
    });

    $("#security-info-form").submit(function(e) {
        e.preventDefault();
        // Get form values
        const currentPassword = $("#current-password").val();
        const newPassword = $("#new-password").val();
        const confirmPassword = $("#confirm-password").val();
        const twoFactor = $("#two-factor").is(":checked");
        
        // Validate passwords
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification("Please fill in all password fields", "error");
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification("New passwords do not match", "error");
            return;
        }
        
        // Update displayed values
        $("#security-info-view .info-row:nth-child(2) .info-value").text(
            twoFactor ? "Enabled" : "Disabled"
        );
        
        // Clear password fields
        $("#current-password").val("");
        $("#new-password").val("");
        $("#confirm-password").val("");
        
        // Hide edit form, show view
        $("#security-info-edit").addClass("hidden");
        $("#security-info-view").removeClass("hidden");
        
        // Show success message
        showNotification("Security information updated successfully", "success");
    });

    // Edit profile button
    $(".btn-primary").click(function() {
        if ($(this).text().includes("Edit Profile")) {
            $("#personal-info-view").addClass("hidden");
            $("#personal-info-edit").removeClass("hidden");
        }
    });

    // Edit avatar button
    $(".edit-avatar-btn").click(function() {
        // In a real application, this would open a file picker
        // For this demo, we'll just show a notification
        showNotification("Avatar upload functionality would open here", "info");
    });

    // Function to show notifications
    function showNotification(message, type) {
        // Create notification element
        const notification = $(`<div class="profile-notification ${type}">${message}</div>`);
        $("body").append(notification);
        
        // Show notification
        setTimeout(function() {
            notification.addClass("show");
        }, 100);
        
        // Hide and remove notification after 3 seconds
        setTimeout(function() {
            notification.removeClass("show");
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add notification styles dynamically
    const notificationStyles = `
        .profile-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        .profile-notification.show {
            transform: translateX(0);
        }
        .profile-notification.success {
            background-color: #28a745;
        }
        .profile-notification.error {
            background-color: #dc3545;
        }
        .profile-notification.info {
            background-color: #17a2b8;
        }
    `;
    
    $('<style>').text(notificationStyles).appendTo('head');
});