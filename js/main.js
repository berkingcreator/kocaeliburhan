<script>
        document.addEventListener("DOMContentLoaded", () => {
            const mobileMenu = document.getElementById('mobile-menu');
            const navLinks = document.getElementById('nav-links');

            if (mobileMenu && navLinks) {
                mobileMenu.addEventListener('click', () => {
                    // Menüyü aç / kapat
                    navLinks.classList.toggle('mobile-active');
                    
                    // İkonu değiştir (Bars <-> Times)
                    const icon = mobileMenu.querySelector('i');
                    if(navLinks.classList.contains('mobile-active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                        mobileMenu.style.transform = 'rotate(90deg)'; // Şık bir dönüş efekti
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        mobileMenu.style.transform = 'rotate(0deg)';
                    }
                });
            }
        });
    </script>