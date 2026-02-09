// --- 1. EmailJS Configuration ---
(function() {
    // Replace "YOUR_PUBLIC_KEY" with the key from EmailJS Account > API Keys
    emailjs.init("mIExT8vCGHqp2D_Ak"); 
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    
    btn.innerHTML = "Sending...";
    
    // service_e2tokf9 is your Service ID
    // Replace "YOUR_TEMPLATE_ID" with the ID from your EmailJS Email Templates tab
    emailjs.sendForm('service_e2tokf9', 'template_0l3hmaf', this)
        .then(function() {
            status.innerHTML = "Success! Message sent to Britney.";
            btn.innerHTML = "Submit";
            document.getElementById('contact-form').reset();
        }, function(error) {
            status.innerHTML = "Failed to send. Check console for error.";
            btn.innerHTML = "Submit";
            console.error('FAILED...', error);
        });
});

// --- 2. Theme Toggle Logic ---
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.mode-switcher');
    // Swaps the emoji based on the mode
    icon.innerHTML = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
}

// --- 3. Scroll Reveal Logic ---
// This makes sections slide in as you scroll down
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Selects all elements with reveal classes to monitor them
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));