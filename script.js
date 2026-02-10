// 1. Initialize EmailJS
(function() {
    emailjs.init("mIExT8vCGHqp2D_Ak");
})();

// 2. State & Elements
let contacts = JSON.parse(localStorage.getItem('britneyContacts')) || [];
const contactForm = document.getElementById('contact-form');
const displayArea = document.getElementById('contacts-display');
const searchBar = document.getElementById('search-bar');
const editIndexField = document.getElementById('edit-index');
const submitBtn = document.getElementById('submit-btn');

// 3. Render List
function renderList(filterText = "") {
    if (!displayArea) return;
    displayArea.innerHTML = "";
    
    const filtered = contacts.filter(c => 
        c.name.toLowerCase().includes(filterText.toLowerCase()) || 
        c.email.toLowerCase().includes(filterText.toLowerCase())
    );

    filtered.forEach((contact, index) => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.style = "border: 1px solid var(--black); padding: 20px; background: var(--white);";
        card.innerHTML = `
            <div>
                <h4 style="font-family: 'Playfair Display';">${contact.name}</h4>
                <p style="font-size: 0.8rem;">${contact.email}</p>
                <p style="font-size: 0.8rem;">${contact.phone}</p>
            </div>
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <button onclick="editEntry(${index})" style="padding: 5px 10px; cursor: pointer; background: transparent; border: 1px solid var(--black);">Edit</button>
                <button onclick="deleteEntry(${index})" style="padding: 5px 10px; cursor: pointer; background: transparent; border: 1px solid #ff4d4d; color: #ff4d4d;">Delete</button>
            </div>
        `;
        displayArea.appendChild(card);
    });
}

// 4. Form Action
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const editIndex = parseInt(editIndexField.value);

        // Send Email
        submitBtn.innerText = "Processing...";
        emailjs.send('service_e2tokf9', 'template_0l3hmaf', {
            user_name: name,
            user_email: email,
            message: `New Contact: ${name}, Phone: ${phone}`
        });

        // Save Local
        const entry = { name, email, phone };
        if (editIndex === -1) {
            contacts.push(entry);
        } else {
            contacts[editIndex] = entry;
            editIndexField.value = "-1";
        }

        localStorage.setItem('britneyContacts', JSON.stringify(contacts));
        contactForm.reset();
        submitBtn.innerText = "Add Contact";
        renderList();
    });
}

// 5. Global Actions
window.deleteEntry = (index) => {
    contacts.splice(index, 1);
    localStorage.setItem('britneyContacts', JSON.stringify(contacts));
    renderList();
};

window.editEntry = (index) => {
    const c = contacts[index];
    document.getElementById('name').value = c.name;
    document.getElementById('email').value = c.email;
    document.getElementById('phone').value = c.phone;
    editIndexField.value = index;
    submitBtn.innerText = "Update Contact";
    window.scrollTo({ top: contactForm.offsetTop - 50, behavior: 'smooth' });
};

// 6. Search
if (searchBar) {
    searchBar.addEventListener('input', (e) => renderList(e.target.value));
}

// 7. Theme & Reveal (UI)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.mode-switcher');
    if (icon) icon.innerHTML = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));

// Startup
renderList();
