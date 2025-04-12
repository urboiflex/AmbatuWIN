document.addEventListener('DOMContentLoaded', function() {
    const marqueeContainer = document.querySelector('.marquee-container');
    const marqueeContents = document.querySelectorAll('.marquee-content');
    
    // Function to check if all images have loaded
    function checkImagesLoaded() {
      const images = document.querySelectorAll('.sponsor-logo');
      let allLoaded = true;
      
      images.forEach(img => {
        if (!img.complete) {
          allLoaded = false;
        }
      });
      
      return allLoaded;
    }
    
    // Function to handle loading of images
    function handleImagesLoaded() {
      if (checkImagesLoaded()) {
        // All images are loaded, start the animation
        marqueeContents.forEach(content => {
          content.style.visibility = 'visible';
        });
      } else {
        // If not all images are loaded, check again after a short delay
        setTimeout(handleImagesLoaded, 100);
      }
    }
    
    // Initially hide the marquee content until images load
    marqueeContents.forEach(content => {
      content.style.visibility = 'hidden';
    });
    
    // Check if images are loaded
    handleImagesLoaded();
    
    // Adjust marquee speed based on screen width
    function adjustSpeed() {
      const screenWidth = window.innerWidth;
      let duration;
      
      if (screenWidth < 480) {
        duration = '20s'; // Faster on mobile
      } else if (screenWidth < 768) {
        duration = '25s'; // Medium speed on tablets
      } else {
        duration = '30s'; // Default speed on desktops
      }
      
      marqueeContents.forEach(content => {
        content.style.animationDuration = duration;
      });
    }
    
    // Call it on load
    adjustSpeed();
    
    // And on window resize
    window.addEventListener('resize', adjustSpeed);
    
    // Handle mouse interactions for better user experience
    marqueeContainer.addEventListener('mouseenter', function() {
      marqueeContents.forEach(content => {
        // Store the current position when paused
        const computedStyle = window.getComputedStyle(content);
        const transform = computedStyle.getPropertyValue('transform');
        content.style.transform = transform;
        content.style.animationPlayState = 'paused';
      });
    });
    
    marqueeContainer.addEventListener('mouseleave', function() {
      marqueeContents.forEach(content => {
        // Resume animation
        content.style.animationPlayState = 'running';
        // Reset transform to let the animation continue
        setTimeout(() => {
          content.style.transform = '';
        }, 0);
      });
    });
    
    // Add fallback for missing images
    const logoImages = document.querySelectorAll('.sponsor-logo');
    
    logoImages.forEach(img => {
      img.addEventListener('error', function() {
        // If image fails to load, replace with a placeholder or text
        const sponsorName = this.alt;
        const parent = this.parentNode;
        
        // Create a div with the sponsor name as text
        const textFallback = document.createElement('div');
        textFallback.className = 'sponsor-text-fallback';
        textFallback.textContent = sponsorName;
        
        // Replace the image with the text
        parent.replaceChild(textFallback, this);
      });
    });
  });