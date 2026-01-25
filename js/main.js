// ==================== UTILITY FUNCTIONS ====================

// Get element by ID
function getElement(id) {
    return document.getElementById(id);
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Show element
function showElement(element) {
    if (element) element.style.display = 'block';
}

// Hide element
function hideElement(element) {
    if (element) element.style.display = 'none';
}

// ==================== NAVIGATION ====================

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = getElement('hamburger');
    const navMenu = getElement('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            this.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
});

// ==================== HOME PAGE ====================

// Rotating quotes
if (getElement('rotatingQuote')) {
    let currentQuoteIndex = 0;
    
    function displayQuote() {
        const quoteElement = getElement('rotatingQuote');
        const authorElement = getElement('quoteAuthor');
        
        if (quoteElement && authorElement && bookQuotes.length > 0) {
            quoteElement.style.opacity = '0';
            authorElement.style.opacity = '0';
            
            setTimeout(() => {
                quoteElement.textContent = `"${bookQuotes[currentQuoteIndex].quote}"`;
                authorElement.textContent = `— ${bookQuotes[currentQuoteIndex].author}`;
                
                quoteElement.style.opacity = '1';
                authorElement.style.opacity = '1';
            }, 300);
            
            currentQuoteIndex = (currentQuoteIndex + 1) % bookQuotes.length;
        }
    }
    
    // Display first quote immediately
    displayQuote();
    
    // Rotate quotes every 5 seconds
    setInterval(displayQuote, 5000);
}

// Author of the Day (changes based on day of year)
if (getElement('authorCard')) {
    function getAuthorOfDay() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const authorIndex = dayOfYear % authorsData.length;
        return authorsData[authorIndex];
    }
    
    function displayAuthorOfDay() {
        const author = getAuthorOfDay();
        const nameElement = getElement('authorName');
        const bioElement = getElement('authorBio');
        const booksElement = getElement('authorBooks');
        
        if (nameElement && bioElement && booksElement) {
            nameElement.textContent = author.name;
            bioElement.textContent = author.bio;
            booksElement.textContent = author.books;
        }
    }
    
    displayAuthorOfDay();
}

// Newsletter subscription
const newsletterForm = getElement('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = getElement('newsletterEmail');
        const messageElement = getElement('newsletterMessage');
        const email = emailInput.value;
        
        // Store in localStorage
        localStorage.setItem('newsletterEmail', email);
        
        // Show success message
        if (messageElement) {
            messageElement.textContent = 'Thank you for subscribing! 🎉';
            messageElement.style.color = '#10b981';
        }
        
        // Clear form
        emailInput.value = '';
        
        // Hide message after 3 seconds
        setTimeout(() => {
            if (messageElement) {
                messageElement.textContent = '';
            }
        }, 3000);
    });
}

// ==================== BOOK EXPLORER PAGE ====================

if (getElement('booksGrid')) {
    const booksGrid = getElement('booksGrid');
    const searchInput = getElement('searchInput');
    const genreFilter = getElement('genreFilter');
    const noResults = getElement('noResults');
    const modal = getElement('bookModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Display all books initially
    function displayBooks(books) {
        booksGrid.innerHTML = '';
        
        if (books.length === 0) {
            showElement(noResults);
            return;
        }
        
        hideElement(noResults);
        
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <div class="book-card-image">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="book-card-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>
            `;
            
            bookCard.addEventListener('click', () => openBookModal(book));
            booksGrid.appendChild(bookCard);
        });
    }
    
    // Open book modal
    function openBookModal(book) {
        getElement('modalTitle').textContent = book.title;
        getElement('modalAuthor').textContent = `by ${book.author}`;
        getElement('modalSynopsis').textContent = book.synopsis;
        getElement('modalImage').src = book.image;
        getElement('modalImage').alt = book.title;
        
        // Series information
        const seriesSection = getElement('seriesSection');
        const seriesList = getElement('modalSeries');
        
        if (book.series && book.series.length > 0) {
            showElement(seriesSection);
            seriesList.innerHTML = book.series.map(s => `<li>${s}</li>`).join('');
        } else {
            hideElement(seriesSection);
        }
        
        // Reviews table
        const reviewsBody = getElement('modalReviews');
        reviewsBody.innerHTML = book.reviews.map(review => `
            <tr>
                <td>${review.source}</td>
                <td>${review.rating}</td>
                <td>${review.reviews}</td>
            </tr>
        `).join('');
        
        showElement(modal);
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            hideElement(modal);
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideElement(modal);
        }
    });
    
    // Search and filter functionality
    function filterBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        
        const filteredBooks = booksData.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                                book.author.toLowerCase().includes(searchTerm);
            const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
            
            return matchesSearch && matchesGenre;
        });
        
        displayBooks(filteredBooks);
    }
    
    searchInput.addEventListener('input', filterBooks);
    genreFilter.addEventListener('change', filterBooks);
    
    // Display all books on page load
    displayBooks(booksData);
}

// ==================== READING TRACKER PAGE ====================

if (getElement('trackerForm')) {
    const trackerForm = getElement('trackerForm');
    const resultsSection = getElement('resultsSection');
    const saveProgressBtn = getElement('saveProgress');
    const savedBooksList = getElement('savedBooksList');
    
    trackerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bookTitle = getElement('bookTitle').value;
        const totalPages = parseInt(getElement('totalPages').value);
        const pagesRead = parseInt(getElement('pagesRead').value);
        const readingSpeed = parseInt(getElement('readingSpeed').value);
        
        // Validate input
        if (pagesRead > totalPages) {
            alert('Pages read cannot be more than total pages!');
            return;
        }
        
        // Calculate progress
        const percentComplete = Math.round((pagesRead / totalPages) * 100);
        const pagesRemaining = totalPages - pagesRead;
        const daysRemaining = Math.ceil(pagesRemaining / readingSpeed);
        
        // Calculate finish date
        const finishDate = new Date();
        finishDate.setDate(finishDate.getDate() + daysRemaining);
        
        // Display results
        getElement('percentComplete').textContent = percentComplete + '%';
        getElement('pagesRemaining').textContent = pagesRemaining;
        getElement('daysRemaining').textContent = daysRemaining + (daysRemaining === 1 ? ' day' : ' days');
        getElement('finishDate').textContent = formatDate(finishDate);
        
        // Update progress bar
        const progressFill = getElement('progressFill');
        const progressText = getElement('progressText');
        progressFill.style.width = percentComplete + '%';
        progressText.textContent = percentComplete + '% Complete';
        
        // Show results section and save button
        showElement(resultsSection);
        showElement(saveProgressBtn);
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Save progress
    if (saveProgressBtn) {
        saveProgressBtn.addEventListener('click', function() {
            const bookTitle = getElement('bookTitle').value;
            const totalPages = parseInt(getElement('totalPages').value);
            const pagesRead = parseInt(getElement('pagesRead').value);
            const readingSpeed = parseInt(getElement('readingSpeed').value);
            const percentComplete = Math.round((pagesRead / totalPages) * 100);
            
            // Get existing saved books
            let savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
            
            // Add new book
            const newBook = {
                id: Date.now(),
                title: bookTitle,
                totalPages,
                pagesRead,
                readingSpeed,
                percentComplete,
                savedDate: new Date().toISOString()
            };
            
            savedBooks.push(newBook);
            localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
            
            alert('Progress saved! ✓');
            displaySavedBooks();
        });
    }
    
    // Display saved books
    function displaySavedBooks() {
        const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
        
        if (savedBooks.length === 0) {
            savedBooksList.innerHTML = '<p class="no-saved">No saved books yet. Track a book and save your progress!</p>';
            return;
        }
        
        savedBooksList.innerHTML = savedBooks.map(book => `
            <div class="saved-book-item">
                <div class="saved-book-info">
                    <h4>${book.title}</h4>
                    <p>${book.pagesRead} / ${book.totalPages} pages (${book.percentComplete}%)</p>
                    <p style="font-size: 0.85rem; color: #64748b;">Saved on ${formatDate(book.savedDate)}</p>
                </div>
                <button class="delete-btn" onclick="deleteSavedBook(${book.id})">Delete</button>
            </div>
        `).join('');
    }
    
    // Delete saved book
    window.deleteSavedBook = function(bookId) {
        let savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
        savedBooks = savedBooks.filter(book => book.id !== bookId);
        localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
        displaySavedBooks();
    };
    
    // Display saved books on page load
    displaySavedBooks();
}

// ==================== BOOK RECOMMENDER PAGE ====================

if (getElement('getRecommendation')) {
    const genreSelect = getElement('genreSelect');
    const lengthSelect = getElement('lengthSelect');
    const getRecommendationBtn = getElement('getRecommendation');
    const recommendationResult = getElement('recommendationResult');
    const pickAgainBtn = getElement('pickAgain');
    const saveToListBtn = getElement('saveToList');
    const readingList = getElement('readingList');
    
    let currentRecommendation = null;
    
    // Get recommendation
    getRecommendationBtn.addEventListener('click', function() {
        const selectedGenre = genreSelect.value;
        const selectedLength = lengthSelect.value;
        
        if (!selectedGenre || !selectedLength) {
            alert('Please select both genre and length!');
            return;
        }
        
        // Filter books
        const filteredBooks = booksData.filter(book => 
            book.genre === selectedGenre && book.length === selectedLength
        );
        
        if (filteredBooks.length === 0) {
            alert('No books found matching your criteria. Try different options!');
            return;
        }
        
        // Get random book
        const randomBook = filteredBooks[Math.floor(Math.random() * filteredBooks.length)];
        displayRecommendation(randomBook);
    });
    
    // Display recommendation
    function displayRecommendation(book) {
        currentRecommendation = book;

        // Set book image 
        const recBookImage = getElement('recBookImage');
        if (recBookImage) {
            if (book.image) {
                recBookImage.src = book.image;
                recBookImage.alt = book.title;
                recBookImage.style.display = 'block';
            } else {
                recBookImage.style.display = 'none';
            }
        }
        
        getElement('recBookTitle').textContent = book.title;
        getElement('recBookAuthor').textContent = `by ${book.author}`;
        getElement('recBookSynopsis').textContent = book.synopsis;
        getElement('recBookGenre').textContent = book.genre.charAt(0).toUpperCase() + book.genre.slice(1);
        getElement('recBookPages').textContent = `${book.pages} pages`;
        
        // Add animation
        recommendationResult.style.animation = 'none';
        setTimeout(() => {
            recommendationResult.style.animation = 'fadeInUp 0.5s ease';
        }, 10);
        
        showElement(recommendationResult);
        recommendationResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Pick again
    if (pickAgainBtn) {
        pickAgainBtn.addEventListener('click', function() {
            getRecommendationBtn.click();
        });
    }
    
    // Save to reading list
    if (saveToListBtn) {
        saveToListBtn.addEventListener('click', function() {
            if (!currentRecommendation) return;
            
            // Get existing reading list
            let readingListData = JSON.parse(localStorage.getItem('readingList') || '[]');
            
            // Check if already in list
            const alreadyExists = readingListData.some(book => book.id === currentRecommendation.id);
            
            if (alreadyExists) {
                alert('This book is already in your reading list!');
                return;
            }
            
            // Add to list
            readingListData.push({
                id: currentRecommendation.id,
                title: currentRecommendation.title,
                author: currentRecommendation.author,
                genre: currentRecommendation.genre,
                addedDate: new Date().toISOString()
            });
            
            localStorage.setItem('readingList', JSON.stringify(readingListData));
            
            alert('Added to your reading list! ❤️');
            displayReadingList();
        });
    }
    
    // Display reading list
    function displayReadingList() {
        const readingListData = JSON.parse(localStorage.getItem('readingList') || '[]');
        
        if (readingListData.length === 0) {
            readingList.innerHTML = '<p class="no-saved">Your reading list is empty. Save some recommendations!</p>';
            return;
        }
        
        readingList.innerHTML = readingListData.map(book => `
            <div class="reading-list-item">
                <div>
                    <h4>${book.title}</h4>
                    <p>${book.author} • ${book.genre}</p>
                    <p style="font-size: 0.85rem; color: #64748b;">Added on ${formatDate(book.addedDate)}</p>
                </div>
                <button class="delete-btn" onclick="removeFromReadingList(${book.id})">Remove</button>
            </div>
        `).join('');
    }
    
    // Remove from reading list
    window.removeFromReadingList = function(bookId) {
        let readingListData = JSON.parse(localStorage.getItem('readingList') || '[]');
        readingListData = readingListData.filter(book => book.id !== bookId);
        localStorage.setItem('readingList', JSON.stringify(readingListData));
        displayReadingList();
    };
    
    // Display reading list on page load
    displayReadingList();
}

// ==================== READING FLOW PAGE ====================

if (document.querySelector('.sounds-section')) {

    // audio files
    const sounds = {
        rain: new Audio('sounds/rain.mp3'),
        forest: new Audio('sounds/forest.mp3'),
        piano: new Audio('sounds/piano.mp3')
    };

    // Configure sounds
    Object.values(sounds).forEach(sound => {
        sound.loop = true;     // keep playing
        sound.volume = 0.5;   // default volume
    });

    const soundButtons = document.querySelectorAll('.sound-btn');
    const volumeSliders = document.querySelectorAll('.volume-slider');

    // Play / Pause sounds
    soundButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const soundType = this.dataset.sound;
            const sound = sounds[soundType];

            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                sound.play();
            } else {
                sound.pause();
            }
        });
    });

    // Volume control
    volumeSliders.forEach(slider => {
        slider.addEventListener('input', function () {
            const soundType = this.dataset.sound;
            sounds[soundType].volume = this.value / 100;
        });
    });
    
    // Book completion tracker
    const completionForm = getElement('completionForm');
    const completedBooksList = getElement('completedBooksList');
    
    if (completionForm) {
        completionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const bookTitle = getElement('completedBookTitle').value;
            const bookAuthor = getElement('completedBookAuthor').value;
            const completionDate = getElement('completionDate').value;
            const bookRating = getElement('bookRating').value;
            
            // Get existing completed books
            let completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
            
            // Add new completed book
            const newBook = {
                id: Date.now(),
                title: bookTitle,
                author: bookAuthor,
                completionDate: completionDate,
                rating: parseInt(bookRating)
            };
            
            completedBooks.push(newBook);
            localStorage.setItem('completedBooks', JSON.stringify(completedBooks));
            
            // Reset form
            completionForm.reset();
            
            // Show success message
            alert('Book added to completed list! 🎉');
            
            // Update display
            displayCompletedBooks();
        });
    }
    
    // Display completed books
    function displayCompletedBooks() {
        const completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
        
        if (completedBooks.length === 0) {
            completedBooksList.innerHTML = '<p class="no-saved">No completed books yet. Start tracking your reading achievements!</p>';
            return;
        }
        
        completedBooksList.innerHTML = completedBooks.map(book => {
            const stars = '⭐'.repeat(book.rating);
            return `
                <div class="completed-item">
                    <div class="completed-info">
                        <h4>${book.title}</h4>
                        <p>${book.author}</p>
                        <p style="font-size: 0.85rem; color: #64748b;">Completed on ${formatDate(book.completionDate)}</p>
                    </div>
                    <div>
                        <div class="completed-rating">${stars}</div>
                        <button class="delete-btn" onclick="deleteCompletedBook(${book.id})">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Delete completed book
    window.deleteCompletedBook = function(bookId) {
        let completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
        completedBooks = completedBooks.filter(book => book.id !== bookId);
        localStorage.setItem('completedBooks', JSON.stringify(completedBooks));
        displayCompletedBooks();
    };
    
    // Display completed books on page load
    displayCompletedBooks();
}

// ==================== FEEDBACK PAGE ====================

if (getElement('feedbackForm')) {
    const feedbackForm = getElement('feedbackForm');
    const feedbackConfirmation = getElement('feedbackConfirmation');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = getElement('userName').value.trim();
        const userEmail = getElement('userEmail').value.trim();
        const feedbackType = getElement('feedbackType').value;
        const userMessage = getElement('userMessage').value.trim();
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        // Validation
        let isValid = true;
        
        if (userName.length < 2) {
            getElement('nameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userEmail)) {
            getElement('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (userMessage.length < 10) {
            getElement('messageError').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Store feedback in localStorage
        const feedback = {
            id: Date.now(),
            name: userName,
            email: userEmail,
            type: feedbackType,
            message: userMessage,
            date: new Date().toISOString()
        };
        
        let feedbackList = JSON.parse(localStorage.getItem('feedbackList') || '[]');
        feedbackList.push(feedback);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
        
        // Hide form and show confirmation
        feedbackForm.style.display = 'none';
        showElement(feedbackConfirmation);
        
        // Reset form
        feedbackForm.reset();
        
        // Show form again after 5 seconds
        setTimeout(() => {
            feedbackForm.style.display = 'block';
            hideElement(feedbackConfirmation);
        }, 5000);
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ==================== SMOOTH SCROLL ====================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================

// Reveal elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .author-card, .book-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== PWA REGISTRATION ====================

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// ==================== THEME TOGGLE (Optional Enhancement) ====================

// Add theme toggle functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme on page load
initTheme();

// ==================== PERFORMANCE OPTIMIZATION ====================

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ==================== ACCESSIBILITY ENHANCEMENTS ====================

// Keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        const modal = getElement('bookModal');
        if (modal && modal.style.display === 'block') {
            hideElement(modal);
        }
    }
});

// Focus trap for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ==================== FORM VALIDATION HELPERS ====================

// Real-time email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add input validation styling
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value && validateEmail(this.value)) {
                this.style.borderColor = '#10b981';
            }
        });
    });
});

// ==================== LOCAL STORAGE CLEANUP ====================

// Function to clear all app data (useful for testing)
function clearAllData() {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
        localStorage.clear();
        alert('All data has been cleared. The page will now reload.');
        location.reload();
    }
}

// Add to window for console access
window.clearAllData = clearAllData;

// ==================== ANALYTICS  ====================

// Track page views
function trackPageView() {
    const page = window.location.pathname;
    console.log('Page view:', page);
    // In production, send to analytics service
}

// Track user interactions
function trackEvent(category, action, label) {
    console.log('Event:', category, action, label);
    // In production, send to analytics service
}

// Initialize analytics
trackPageView();

// ==================== ERROR HANDLING ====================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // In production, send to error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, send to error tracking service
});

// ==================== CONSOLE MESSAGE ====================

console.log('%c📚 Readify', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome to Readify! Happy reading! 📖', 'font-size: 14px; color: #8b5cf6;');
console.log('%cTip: Use clearAllData() to reset all saved data', 'font-size: 12px; color: #64748b;');