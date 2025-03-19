// Drinks data
const beverages = [
    {
        id: 1,
        name: "Sobolo",
        description: "Sobolo is a refreshing, natural drink made from hibiscus flowers, ginger, and spices.",
        price: 10.00,
        image: "images/Sobolo1.jpg",
        category: "sobolo",
        orderLink:"https://selar.com/7i2273"
    },
    {
        id: 2,
        name: "Millet",
        description: "Millet Drink is a rich, natural drink made from millet grains. It’s smooth, nourishing, and great for energy and good health!",
        price: 10.00,
        image: "images/Millet.jpg",
        category: "millet",
        orderLink: "https://selar.com/p7x12l"
    },
    {
        id: 3,
        name: "Brukina",
        description: "Brukina is a delicious, healthy drink made from millet and fresh milk — smooth, filling, and packed with energy!",
        price: 15.00,
        image: "images/Brukina.jpg",
        category: "brukina",
        orderLink: "https://selar.com/8216r1"
    },
    
];

// DOM elements
const menuItemsContainer = document.getElementById('menuItems');
const categoryButtons = document.querySelectorAll('#beverageTab button');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Display all menu items initially
    displayMenuItems('all');
    
    // Set up category filter buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Display items for selected category
            displayMenuItems(button.getAttribute('data-category'));
        });
    });
    
    // Handle smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#' && !this.hasAttribute('data-bs-toggle')) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Get all nav links and navbar collapse element
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});

    // Add click event listener to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) { // Only trigger on mobile devices
                bsCollapse.hide();
            }
        });
    });
});

// Scroll to Top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when button is clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Display menu items based on category
function displayMenuItems(category) {
    // Filter beverages by category
    const filteredItems = category === 'all' ? 
        beverages : 
        beverages.filter(item => item.category === category);
    
    // Clear the container
    menuItemsContainer.innerHTML = '';
    
    // Display filtered items
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'col-md-6 col-lg-4 col-xl-3 menu-item';
        itemElement.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${item.image}" class="card-img-top img-fluid" alt="${item.name}">
                <div class="card-body d-flex flex-column">
                <div class="menu-item-header mb-3">
                    <h5 class="card-title item-name fw-bold text-primary mb-0">${item.name}</h5>
                    <div calss="price-badge">
                    <span class="badge bg-success fs-6">₵${item.price.toFixed(2)}</span>
                    </div>
                </div>
                    <p class="card-text flex-grow-1 text-muted fst-italic">${item.description}</p>

                    <div class="text-end mt-3">
                         <a href="${item.orderLink}" class="btn btn-sm btn-order-menu" target="_blank" rel="noopener noreferrer">

                            Order Now <i class="fas fa-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        menuItemsContainer.appendChild(itemElement);
    });
}

// Prevent form submission (for demo purposes)
document.addEventListener('submit', (e) => {
    if (e.target.id === 'contactForm') {
        e.preventDefault();
        showToast('Message sent successfully!');
        e.target.reset();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Prevent double-tap zoom on mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar-collapse');
        const toggleButton = document.querySelector('.navbar-toggler');
        
        if (navbar.classList.contains('show') && 
            !navbar.contains(event.target) && 
            !toggleButton.contains(event.target)) {
            navbar.classList.remove('show');
        }
    });

    // Smooth scroll for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
});

// Hide preloader when page is loaded
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.style.display = 'block';
    }
    
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.display = 'none';
        // Enable analytics or other cookie-dependent features here
    });
    
    declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.style.display = 'none';
        // Disable analytics or other cookie-dependent features here
    });
    
    // Optional: Add expiry to cookie consent
    function checkCookieConsentExpiry() {
        const consentDate = localStorage.getItem('cookieConsentDate');
        if (consentDate) {
            // Check if consent is older than 6 months
            const sixMonths = 180 * 24 * 60 * 60 * 1000; // 180 days in milliseconds
            if (Date.now() - new Date(consentDate).getTime() > sixMonths) {
                localStorage.removeItem('cookieConsent');
                localStorage.removeItem('cookieConsentDate');
                cookieConsent.style.display = 'block';
            }
        } else if (localStorage.getItem('cookieConsent')) {
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
        }
    }
    
    checkCookieConsentExpiry();
});

// Interactive Elements Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to Top Button
    const scrollBtn = document.getElementById('scrollToTop');
    let isScrolling = false;

    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                if (window.pageYOffset > 300) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced Search Functionality
    const searchBar = document.getElementById('searchBar');
    const menuItems = document.getElementById('menuItems');
    let searchTimeout;

    searchBar.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchText = searchBar.value.toLowerCase().trim();
            const items = menuItems.getElementsByClassName('menu-item');

            Array.from(items).forEach(function(item) {
                const itemName = item.querySelector('.item-name').textContent.toLowerCase();
                const description = item.querySelector('.card-text').textContent.toLowerCase();
                
                if (itemName.includes(searchText) || description.includes(searchText)) {
                    item.style.display = '';
                    item.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    item.style.display = 'none';
                }
            });
        }, 300);
    });

    // Add keyboard navigation
    searchBar.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchBar.value = '';
            searchBar.blur();
            Array.from(menuItems.getElementsByClassName('menu-item')).forEach(item => {
                item.style.display = '';
            });
        }
    });
});

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Keyboard navigation for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.querySelector('.btn-order-menu').click();
            }
        });
    });

    // Enhanced focus management for modals and overlays
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Trap focus in cookie consent banner
    const cookieConsent = document.getElementById('cookieConsent');
    if (cookieConsent) {
        const focusableContent = cookieConsent.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && cookieConsent.style.display !== 'none') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Announce search results to screen readers
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', function() {
        const visibleItems = document.querySelectorAll('.menu-item:not([style*="display: none"])');
        const announcement = `Found ${visibleItems.length} items`;
        
        // Create and update live region
        let liveRegion = document.getElementById('searchResults');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'searchResults';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.className = 'visually-hidden';
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = announcement;
    });
});

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!contactForm.checkValidity()) {
            event.stopPropagation();
            contactForm.classList.add('was-validated');
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission (replace with actual API call)
        submitForm(formData);
    });
    
    
        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            contactForm.classList.remove('was-validated');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success modal
            successModal.show();
        }, 1500);
    }
);

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    let successModal;

    // Initialize modal
    if (document.getElementById('successModal')) {
        successModal = new bootstrap.Modal(document.getElementById('successModal'));
    }

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Check form validity
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Store original button content
            const originalContent = submitBtn.innerHTML;

            try {
                // Update button to loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

                // Simulate form submission delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Reset form
                contactForm.reset();
                contactForm.classList.remove('was-validated');

                // Show success modal
                if (successModal) {
                    successModal.show();
                    
                    // Auto hide modal after 3 seconds
                    setTimeout(() => {
                        successModal.hide();
                    }, 3000);
                }

            } catch (error) {
                console.error('Error:', error);
            } finally {
                // Always reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }
        });
    }
});