class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .footer {
                    background-color: rgba(18, 18, 18, 0.9);
                    border-top: 1px solid rgba(255, 95, 21, 0.2);
                }
                
                .social-icon {
                    transition: all 0.3s ease;
                }
                
                .social-icon:hover {
                    transform: translateY(-3px);
                    color: #FF5F15;
                }
            </style>
            <footer class="footer py-12">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 class="text-xl font-bold mb-4 text-secondary">AutoMech Oracle</h3>
                            <p class="text-gray-400">منصة الذكاء الاصطناعي الرائدة لقطع غيار السيارات في المملكة العربية السعودية</p>
                        </div>
                        
                        <div>
                            <h4 class="font-bold mb-4">روابط سريعة</h4>
                            <ul class="space-y-2">
                                <li><a href="#scan" class="text-gray-400 hover:text-secondary transition-colors">الماسح الذكي</a></li>
                                <li><a href="#how-it-works" class="text-gray-400 hover:text-secondary transition-colors">كيف يعمل</a></li>
                                <li><a href="#" class="text-gray-400 hover:text-secondary transition-colors">المتاجر</a></li>
                                <li><a href="#" class="text-gray-400 hover:text-secondary transition-colors">الشروط والأحكام</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-bold mb-4">تواصل معنا</h4>
                            <ul class="space-y-2">
                                <li class="flex items-center text-gray-400">
                                    <i data-feather="mail" class="w-4 h-4 mr-2"></i> info@automech.com
                                </li>
                                <li class="flex items-center text-gray-400">
                                    <i data-feather="phone" class="w-4 h-4 mr-2"></i> 920000000
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-bold mb-4">تابعنا</h4>
                            <div class="flex space-x-4 space-x-reverse">
                                <a href="#" class="social-icon text-gray-400">
                                    <i data-feather="twitter"></i>
                                </a>
                                <a href="#" class="social-icon text-gray-400">
                                    <i data-feather="instagram"></i>
                                </a>
                                <a href="#" class="social-icon text-gray-400">
                                    <i data-feather="linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                        <p>© 2023 AutoMech Oracle. جميع الحقوق محفوظة</p>
                    </div>
                </div>
            </footer>
            <script>
                feather.replace();
            </script>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);