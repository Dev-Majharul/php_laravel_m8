// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections for scroll animation
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    
    // Add parallax-section class to all sections
    sections.forEach(section => {
        section.classList.add('parallax-section');
    });
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Function to apply 45-degree angle animation effect
    function apply45DegreeEffect(element, scrollY) {
        const speed = 0.05; // Adjust the parallax speed
        const xOffset = scrollY * speed;
        const yOffset = scrollY * speed;
        const zOffset = scrollY * 0.1;
        
        // Apply transform with 45-degree movement (both x and y directions)
        element.style.transform = `translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px) rotate3d(1, 1, 0, ${scrollY * 0.01}deg)`;
    }
    
    // Initial check for elements in viewport
    function checkElements() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('scroll-animate');
            }
        });
    }
    
    // Apply parallax effect on scroll
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Parallax effect for header
        header.style.transform = `translateZ(${50 - scrollY * 0.05}px)`;
        
        // Check each section
        sections.forEach(section => {
            // If the section is in viewport
            if (isInViewport(section)) {
                // Add the animation class if not already there
                if (!section.classList.contains('scroll-animate')) {
                    section.classList.add('scroll-animate');
                }
                
                // Calculate the offset for this specific section
                const sectionTop = section.getBoundingClientRect().top;
                const offset = (window.innerHeight - sectionTop) * 0.1;
                
                // Apply the 45-degree parallax effect
                apply45DegreeEffect(section, offset);
            }
        });
    }
    
    // Apply 3D hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            // Calculate mouse position relative to card center
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation values (max 10 degrees)
            const rotateY = mouseX * 0.05;
            const rotateX = -mouseY * 0.05;
            
            // Apply the transform
            this.style.transform = `translate3d(20px, -20px, 40px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform on mouse leave
            this.style.transform = '';
        });
    });
    
    // Add 3D effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate position values
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const posX = (x - centerX) / centerX;
            const posY = (y - centerY) / centerY;
            
            // Apply the transform
            this.style.transform = `translateZ(25px) scale(1.05) rotateX(${posY * 10}deg) rotateY(${-posX * 10}deg)`;
        });
        
        button.addEventListener('mouseleave', function() {
            // Reset transform on mouse leave with a transition
            this.style.transform = 'translateZ(15px)';
        });
    });
    
    // Add special 3D effect to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            heroContent.style.transform = `translate3d(${mouseX * 30}px, ${mouseY * 30}px, 20px) 
                                          rotateX(${-mouseY * 10}deg) rotateY(${mouseX * 10}deg)`;
        });
    }
    
    // Initialize checks
    checkElements();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to handleScroll
    handleScroll();
}); 