document.getElementById('beta-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const newsletterChecked = document.getElementById('newsletter').checked;
    
    try {
        // Google Forms submission (using no-cors mode)
        const formData = new FormData(e.target);
        await fetch(e.target.action, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
        
        // SendFox submission if newsletter is checked
        if (newsletterChecked) {
            console.log('Sending to SendFox:', email);
            const response = await fetch('/.netlify/functions/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Newsletter subscription failed');
            }
        }
        
        document.querySelector('.success-message').style.display = 'block';
        document.querySelector('.error-message').style.display = 'none';
        e.target.reset(); // Clear the form
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.success-message').style.display = 'none';
        document.querySelector('.error-message').style.display = 'block';
    }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const mockups = document.querySelectorAll('.phone-mockup');
    let currentIndex = 0;

    function updateSlide() {
        mockups.forEach(mockup => mockup.classList.remove('active'));
        mockups[currentIndex].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % mockups.length;
        updateSlide();
    }

    // Auto advance slides every 5 seconds (5000 milliseconds)
    setInterval(nextSlide, 7000);
});