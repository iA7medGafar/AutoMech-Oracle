// Initialize PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
// Initialize AI Scanner functionality
document.addEventListener('DOMContentLoaded', () => {
    const cameraInput = document.getElementById('camera-input');
    if (cameraInput) {
        cameraInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const label = cameraInput.closest('label');
                if (label) {
                    label.innerHTML = '<i data-feather="loader" class="animate-spin w-6 h-6"></i>';
                    feather.replace();
                    
                    // In a real app, upload the image to your AI API here
                    setTimeout(() => {
                        // Simulate API processing
                        const resultsSection = document.querySelector('#scan .lg\\:w-1\\/2');
                        if (resultsSection) {
                            resultsSection.classList.add('glow');
                            setTimeout(() => resultsSection.classList.remove('glow'), 2000);
                        }
                        
                        label.innerHTML = '<i data-feather="camera" class="w-6 h-6"></i>';
                        feather.replace();
                        
                        // Scroll to results
                        document.querySelector('#scan').scrollIntoView({ behavior: 'smooth' });
                    }, 2000);
                }
            }
        });
    }
// Predictive fault engine simulation
    const predictiveCheckboxes = document.querySelectorAll('#scan input[type="checkbox"]');
    predictiveCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const parentDiv = e.target.closest('div');
            if (parentDiv) {
                if (e.target.checked) {
                    parentDiv.classList.add('border', 'border-secondary');
                } else {
                    parentDiv.classList.remove('border', 'border-secondary');
                }
            }
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i data-feather="moon"></i>';
    darkModeToggle.className = 'p-2 rounded-full hover:bg-gray-700';
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const icon = darkModeToggle.querySelector('[data-feather]');
        if (document.documentElement.classList.contains('dark')) {
            icon.setAttribute('data-feather', 'sun');
        } else {
            icon.setAttribute('data-feather', 'moon');
        }
        feather.replace();
    });
    
    const navbar = document.querySelector('custom-navbar');
    if (navbar) {
        navbar.shadowRoot.querySelector('.navbar-content').appendChild(darkModeToggle);
    }
});

// RFQ (Request for Quote) functionality
function simulateRFQ() {
    // In a real app, this would send data to backend and connect with sellers
    console.log('RFQ submitted with selected parts');
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 bg-secondary text-black px-6 py-3 rounded-lg shadow-lg flex justify-between items-center z-50';
    notification.innerHTML = `
        <div class="flex items-center">
            <i data-feather="check-circle" class="mr-2"></i>
            <span>تم إرسال طلب الأسعار بنجاح!</span>
        </div>
        <button class="ml-4" onclick="this.parentElement.remove()">
            <i data-feather="x"></i>
        </button>
    `;
    document.body.appendChild(notification);
    feather.replace();
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}