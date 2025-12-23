// Burger menu
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
const body = document.body;

if (burgerBtn && navMenu) {
    // Открытие/закрытие
    burgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            // Закрываем
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            burgerBtn.textContent = '☰';
            body.style.overflow = '';
        } else {
            // Открываем
            navMenu.classList.add('active');
            body.classList.add('menu-open');
            burgerBtn.textContent = '✕';
            body.style.overflow = 'hidden';
        }
    });

    // Закрытие по клику на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            burgerBtn.textContent = '☰';
            body.style.overflow = '';
        });
    });

    // Закрытие по клику вне меню
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !burgerBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            burgerBtn.textContent = '☰';
            body.style.overflow = '';
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            burgerBtn.textContent = '☰';
            body.style.overflow = '';
        }
    });
}

// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');

function checkScroll() {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    reveals.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            box.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const checkbox = form.querySelector('input[type="checkbox"]');
        if (checkbox && !checkbox.checked) {
            alert('Пожалуйста, подтвердите согласие на обработку персональных данных.');
            return;
        }
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
        form.reset();
    });
});

// Show more button functionality (заглушка)
const showMoreBtn = document.getElementById('showMoreBtn');
if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
        alert('Функция "Показать ещё" будет доступна после подключения к базе данных.');
    });
}