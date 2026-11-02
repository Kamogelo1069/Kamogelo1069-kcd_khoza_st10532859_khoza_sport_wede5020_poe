/* ==========================================================================
   KHOZA SPORT - MAIN JASCRIPT (js/main.js)
   - Product Filtering / Search Functionality
   - Image Lightbox Modal
   - Dynamic Form Handling & Client-Side Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRODUCT SEARCH & FILTERING ---
    const searchInput = document.getElementById('product-search');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            productCards.forEach(card => {
                const productName = card.querySelector('h4')?.textContent.toLowerCase() || '';
                if (productName.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- 2. LIGHTBOX IMAGE GALLERY ---
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.cssText = `
        display: none; position: fixed; z-index: 2000; top: 0; left: 0;
        width: 100%; height: 100%; background-color: rgba(0,0,0,0.85);
        align-items: center; justify-content: center; cursor: pointer;
    `;
    const modalImg = document.createElement('img');
    modalImg.style.cssText = 'max-width: 90%; max-height: 80%; border-radius: 8px; border: 2px solid #fff;';
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    document.querySelectorAll('.product-card img').forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // --- 3. FORM VALIDATION & AJAX SUBMISSION (contact.html & enquiry.html) ---
    const handleFormSubmit = (formId, responseMessageId) => {
        const form = document.getElementById(formId);
        const responseDiv = document.getElementById(responseMessageId);

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard page reload

            // Basic Client-side validation
            const nameInput = form.querySelector('[name="name"]');
            const emailInput = form.querySelector('[name="email"]');
            const phoneInput = form.querySelector('[name="phone"]');

            if (nameInput && nameInput.value.trim() === '') {
                showResponse(responseDiv, 'Please enter your full name.', 'error');
                return;
            }

            if (emailInput && !validateEmail(emailInput.value)) {
                showResponse(responseDiv, 'Please provide a valid email address.', 'error');
                return;
            }

            if (phoneInput && phoneInput.value && !/^\d{10}$/.test(phoneInput.value.trim())) {
                showResponse(responseDiv, 'Phone number must be exactly 10 digits.', 'error');
                return;
            }

            // AJAX Form Simulation
            showResponse(responseDiv, 'Processing your request...', 'info');

            setTimeout(() => {
                if (formId === 'enquiry-form') {
                    showResponse(responseDiv, 'Thank you! Your enquiry has been processed. Our sales team will get back to you with pricing and availability shortly.', 'success');
                } else {
                    showResponse(responseDiv, 'Thank you! Your contact message has been sent successfully.', 'success');
                }
                form.reset();
            }, 1200);
        });
    };

    handleFormSubmit('enquiry-form', 'form-response');
    handleFormSubmit('contact-form', 'form-response');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showResponse(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.style.padding = '10px';
        element.style.marginTop = '15px';
        element.style.borderRadius = '5px';
        element.style.fontWeight = 'bold';

        if (type === 'error') {
            element.style.backgroundColor = '#f8d7da';
            element.style.color = '#721c24';
        } else if (type === 'success') {
            element.style.backgroundColor = '#d4edda';
            element.style.color = '#155724';
        } else {
            element.style.backgroundColor = '#cce5ff';
            element.style.color = '#004085';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('product-search');
    const searchBtn = document.getElementById('search-btn');
    const productCards = document.querySelectorAll('.product-card');

    function filterProducts() {
        if (!searchInput) return;
        const searchTerm = searchInput.value.toLowerCase().trim();

        productCards.forEach(card => {
            const productName = card.querySelector('h4')?.textContent.toLowerCase() || '';
            if (productName.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter as user types
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // Filter when search button is clicked
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            filterProducts();
        });
    }
});