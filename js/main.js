// =====================================================================
// Мобильное меню
const mobileMenuBtns = document.querySelectorAll('.mobile__btn');

mobileMenuBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.toggle('active');
    });
});

// Обработчик клика на документе для закрытия модального окна при клике вне него
document.addEventListener('click', function(event) {
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(event.target) && !Array.from(mobileMenuBtns).some(btn => btn.contains(event.target))) {
        mobileMenu.classList.remove('active');
    }
});

// =====================================================================
// Фиксированный header 
let prevScrollpos = window.scrollY;
const staticHeader = document.querySelector('.static-header');
const fixedHeader = document.querySelector('.fixed-header');
const mobileMenu = document.querySelector('.mobile-menu'); // Добавляем выбор мобильного меню



window.onscroll = function() {
  const currentScrollPos = window.scrollY;
  const windowWidth = window.innerWidth;

  if (windowWidth <= 690) {
    // Если ширина экрана 690 пикселей или меньше, не выполнять скрытие меню и шапки при скролле
    return;
  }

  if (currentScrollPos === 0) {
    fixedHeader.style.transform = 'translateY(-100%)';
    mobileMenu.classList.remove('active');
  } else if (currentScrollPos > prevScrollpos && currentScrollPos > staticHeader.clientHeight) {
    fixedHeader.style.transform = 'translateY(-100%)';
    mobileMenu.classList.remove('active');
  } else {
    fixedHeader.style.transform = 'translateY(0)';
    // Закрываем мобильное меню при скроллинге вверх
    mobileMenu.classList.remove('active');
  }
  
  prevScrollpos = currentScrollPos;
}

// Активный пункт меню в шапке при скролле 
// Функция для определения, находится ли элемент в видимой области окна
function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// =====================================================================
// Отложенная загрузка яндекс карт
// Проверка элемента на наличие его в DOM 

let ok = false;

  function loadMap(mapUrl, targetElementId) {
    if (ok === false) {
        ok = true;
        setTimeout(() => {
            let script = document.createElement('script');
            script.src = mapUrl;
            document.getElementById(targetElementId).replaceWith(script);
        }, 3500);
    }
  }

  // Вешаем обработчик
  window.addEventListener('scroll', function () {
    loadMap('https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ae588bc8558c4d51c7308a36ae9729e8993abf3c8fc46f0339f06d0ad05ceee75&amp;width=100%25&amp;height=509&amp;lang=ru_RU&amp;scroll=true', 'yamap');
  });
