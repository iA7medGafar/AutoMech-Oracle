class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .navbar {
                    background-color: rgba(18, 18, 18, 0.9);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 95, 21, 0.2);
                }
                
                .nav-link {
                    position: relative;
                    padding-bottom: 2px;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 0;
                    height: 2px;
                    background-color: #FF5F15;
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                    right: auto;
                    left: 0;
                }
                
                .mobile-menu {
                    transition: all 0.3s ease;
                }
            </style>
            <nav class="navbar fixed w-full z-10">
                <div class="container mx-auto px-4 py-3 navbar-content">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <a href="/" class="flex items-center">
                                <i data-feather="package" class="w-6 h-6 text-secondary mr-2"></i>
                                <span class="text-xl font-bold">AutoMech Oracle</span>
                            </a>
                        </div>
                        
                        <div class="hidden md:flex items-center space-x-6 space-x-reverse">
                            <a href="#scan" class="nav-link">الماسح</a>
                            <a href="#how-it-works" class="nav-link">كيف يعمل</a>
                            <a href="#" class="nav-link">المتاجر</a>
                            <a href="#" class="nav-link">حسابي</a>
                            <a href="#" class="bg-secondary text-black px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                                <i data-feather="user" class="inline mr-1"></i> تسجيل دخول
                            </a>
                        </div>
                        
                        <button class="md:hidden p-2" id="mobile-menu-button">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                    
                    <!-- Mobile menu -->
                    <div class="mobile-menu hidden md:hidden py-4" id="mobile-menu">
                        <div class="flex flex-col space-y-4">
                            <a href="#scan" class="nav-link">الماسح</a>
                            <a href="#how-it-works" class="nav-link">كيف يعمل</a>
                            <a href="#" class="nav-link">المتاجر</a>
                            <a href="#" class="nav-link">حسابي</a>
                            <a href="#" class="bg-secondary text-black px-4 py-2 rounded-lg font-bold text-center hover:bg-orange-600 transition-colors">
                                <i data-feather="user" class="inline mr-1"></i> تسجيل دخول
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <script>
                feather.replace();
                
                document.addEventListener('DOMContentLoaded', () => {
                    const menuButton = this.shadowRoot.getElementById('mobile-menu-button');
                    const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
                    
                    menuButton.addEventListener('click', () => {
                        mobileMenu.classList.toggle('hidden');
                        const icon = menuButton.querySelector('[data-feather]');
                        
                        if (mobileMenu.classList.contains('hidden')) {
                            icon.setAttribute('data-feather', 'menu');
                        } else {
                            icon.setAttribute('data-feather', 'x');
                        }
                        feather.replace();
                    });
                });
            </script>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);