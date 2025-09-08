// Функция для переключения вкладок
function switchTab(tabName) {
    // Скрыть все секции
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Показать выбранную секцию
    document.getElementById(tabName).classList.add('active');
    
    // Обновить активную ссылку в меню
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-tab') === tabName) {
            link.classList.add('active');
        }
    });
}

// Функции для модальных окон
function openProjectModal(projectId) {
    const modal = document.getElementById(projectId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
}

function closeModal(projectId) {
    const modal = document.getElementById(projectId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
}

// Функция для анимации элементов "Обо мне"
function initAboutAnimations() {
    const aboutSection = document.querySelector('.about');
    if (aboutSection.classList.contains('active')) {
        // Анимация для карточек ролей
        const roleCards = document.querySelectorAll('.role-card');
        roleCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });
        
        // Анимация для навыков
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.4s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
            }, 300 + index * 50);
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики кликов по меню
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
            
            // Дополнительно: можно обновить URL в адресной строке без перезагрузки
            history.pushState(null, null, `#${tabName}`);
            
            // Инициализируем анимации для активной вкладки
            if (tabName === 'about') {
                setTimeout(initAboutAnimations, 300);
            }
        });
    });
    
    // Обработка хэша в URL при загрузке страницы
    if (window.location.hash) {
        const tabName = window.location.hash.substring(1);
        if (['about', 'experience', 'services', 'projects', 'contacts'].includes(tabName)) {
            switchTab(tabName);
        }
    }
    
    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Закрытие модального окна по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    // Анимация появления элементов шапки
    const stats = document.querySelectorAll('.stat-item');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.6s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 300 + index * 200);
    });
    
    // Инициализация анимаций для активной вкладки
    initAboutAnimations();
    
    // Инициализация аккордеона опыта работы
    initExperienceAccordion();
});

// Инициализация аккордеона опыта работы
function initExperienceAccordion() {
    const timelineItems = document.querySelectorAll('.timeline-item-full');
    
    timelineItems.forEach(item => {
        const card = item.querySelector('.timeline-card-full');
        
        card.addEventListener('click', function() {
            // Закрываем все остальные элементы
            timelineItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });
    
    // Автоматически открываем текущий опыт (первый в списке)
    const currentExperience = document.querySelector('.timeline-item-full.current');
    if (currentExperience) {
        setTimeout(() => {
            currentExperience.classList.add('active');
        }, 500);
    }
}

// Функция для toggle услуг
function toggleService(element) {
    // Закрываем все остальные услуги
    document.querySelectorAll('.service-item').forEach(item => {
        if (item !== element && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Переключаем текущую услугу
    element.classList.toggle('active');
}

// Закрытие при клике вне услуги
document.addEventListener('click', function(e) {
    if (!e.target.closest('.service-item')) {
        document.querySelectorAll('.service-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});