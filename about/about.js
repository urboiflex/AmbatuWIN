document.addEventListener('DOMContentLoaded', function() {
  // Animate elements when they enter the viewport
  const animateOnScroll = () => {
      const featureCards = document.querySelectorAll('.feature-card');
      
      featureCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          
          // Check if element is in viewport
          if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
              // Add animation with delay based on index
              setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
              }, index * 150);
          }
      });
  };

  // Apply initial styles for animation
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Trigger animation on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Interactive feature cards with image hover effect
  featureCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          const featureImage = this.querySelector('.feature-image');
          if (featureImage) {
              featureImage.style.transition = 'all 0.3s ease';
              featureImage.style.transform = 'scale(1.05)';
          }
      });

      card.addEventListener('mouseleave', function() {
          const featureImage = this.querySelector('.feature-image');
          if (featureImage) {
              featureImage.style.transform = 'scale(1)';
          }
      });
  });

  // Arrow button click handler
  const arrowButtons = document.querySelectorAll('.feature-link');
  arrowButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          const card = this.closest('.feature-card');
          const cardContent = card.querySelector('p').textContent;
          
          // Create and show tooltip with more information
          const tooltip = document.createElement('div');
          tooltip.className = 'feature-tooltip';
          tooltip.textContent = 'Learn more about this feature coming soon!';
          tooltip.style.position = 'absolute';
          tooltip.style.bottom = '80px';
          tooltip.style.left = '50%';
          tooltip.style.transform = 'translateX(-50%)';
          tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
          tooltip.style.color = '#fff';
          tooltip.style.padding = '10px 15px';
          tooltip.style.borderRadius = '6px';
          tooltip.style.fontSize = '14px';
          tooltip.style.zIndex = '100';
          tooltip.style.opacity = '0';
          tooltip.style.transition = 'opacity 0.3s ease';
          
          card.appendChild(tooltip);
          
          // Animate tooltip
          setTimeout(() => {
              tooltip.style.opacity = '1';
          }, 10);
          
          // Remove tooltip after delay
          setTimeout(() => {
              tooltip.style.opacity = '0';
              setTimeout(() => {
                  tooltip.remove();
              }, 300);
          }, 2000);
      });
  });
});