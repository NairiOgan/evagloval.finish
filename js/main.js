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

// window.onscroll = function() {
//   const currentScrollPos = window.scrollY;

//   if (currentScrollPos === 0) {
//     fixedHeader.style.transform = 'translateY(-100%)';
//     mobileMenu.classList.remove('active');
//   } else if (currentScrollPos > prevScrollpos && currentScrollPos > staticHeader.clientHeight) {
//     fixedHeader.style.transform = 'translateY(-100%)';
//     mobileMenu.classList.remove('active');
//   } else {
//     fixedHeader.style.transform = 'translateY(0)';
//     // Закрываем мобильное меню при скроллинге вверх
//     mobileMenu.classList.remove('active');
//   }
  
//   prevScrollpos = currentScrollPos;
// }

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
// Функция для прокрутки к целевой секции при нажатии на ссылки в меню
function scrollToSection(targetSectionId) {
    const targetSection = document.getElementById(targetSectionId);
    
    if (targetSection) { // Проверяем, существует ли секция
        const offsetTop = targetSection.offsetTop;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Получаем ссылки из мобильного меню и назначаем обработчик события при клике
const mobileMenuItems = document.querySelectorAll('.menu-item');
mobileMenuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', function(event) {
        event.preventDefault();
        const targetSectionId = menuItem.getAttribute('href').substring(1); // Получаем id секции из атрибута href
        scrollToSection(targetSectionId);
    });
});

// =====================================================================
// Функция для обновления активного пункта меню при прокрутке страницы
// Прослушиваем событие прокрутки страницы
window.addEventListener('scroll', function() {
    // Получаем текущую позицию прокрутки страницы
    var scrollPosition = window.scrollY;
  
    // Получаем все пункты меню
    var menuItems = document.querySelectorAll('.header-menu__list__item');
  
    // Проходим по каждому пункту меню и проверяем, находится ли соответствующая секция в видимой области
    menuItems.forEach(function(menuItem) {
      var targetId = menuItem.querySelector('a').getAttribute('href').substring(1);
      var targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        var sectionTop = targetSection.offsetTop;
        var sectionHeight = targetSection.offsetHeight;
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Если секция видима на экране, добавляем класс active
          menuItem.classList.add('active');
        } else {
          // В противном случае удаляем класс active
          menuItem.classList.remove('active');
        }
      }
    });
});

// Вызываем событие прокрутки страницы при загрузке страницы для установки начального состояния
window.dispatchEvent(new Event('scroll'));
  
// =====================================================================
// Селекты в конструкторе
document.addEventListener("DOMContentLoaded", function() {
    // Функция для закрытия всех селектов
    function closeAllSelect(elmnt) {
      let x, y, i, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.remove("select-show");
        }
      }
    }
  
    // Закрываем селекты при клике вне них
    document.addEventListener("click", function(e) {
      closeAllSelect(e.target);
    });
  
    // Обработчик клика для кастомного селекта
    let customSelects = document.getElementsByClassName("custom-select");
    for (let i = 0; i < customSelects.length; i++) {
      customSelects[i].addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.getElementsByTagName("div")[1].classList.toggle("select-show");
        this.getElementsByTagName("div")[0].classList.toggle("select-arrow-active");
        
        // Отладочный вывод
        console.log("Custom select clicked.");
      });
  
      // Обработчик клика для опций селекта
      let selectItems = customSelects[i].querySelectorAll(".select-items__item");
      for (let j = 0; j < selectItems.length; j++) {
        selectItems[j].addEventListener("click", function(e) {
          e.stopPropagation();
          let parent = this.parentElement.parentElement;
          parent.getElementsByTagName("div")[0].innerHTML = this.innerHTML;
          
          // Найти форму по id "carForm"
          let form = document.getElementById("carForm");
          
          if (form) {
            // Поиск скрытого инпута внутри формы с заданным именем
            let hiddenInput = form.querySelector("input[type='hidden'][name='" + parent.getAttribute("data-input-name") + "']");
            
            // Отладочный вывод
            console.log("Hidden input:", hiddenInput);
            
            if (hiddenInput) {
              hiddenInput.value = this.getAttribute("data-value");
            } else {
              console.error("Hidden input not found.");
            }
          } else {
            console.error("Form with id 'carForm' not found.");
          }
          
          closeAllSelect(parent);
        });
      }
    }
});

// =====================================================================
// Изменение цветов в конструкторе
// Получаем все кнопки цветов
const colorButtons = document.querySelectorAll('.color-btn');

// Получаем элемент .constructor-wrap__result__body
const carMatBody = document.querySelector('.constructor-wrap__result__body');

// Функция для установки класса
function setColorClass(event) {
    const selectedColor = event.target.dataset.color;

    // Удаляем предыдущие классы цветов
    const colorClasses = ['colorBlack', 'colorDarkenGray', 'colorGray', 'colorLightBlue', 'colorRed', 'colorOrange', 'colorBrown', 'colorLightBrown', 'colorYellow', 'colorLightGreen', 'colorGreen', 'colorBlue', 'colorMaroon'];
    carMatBody.classList.remove(...colorClasses);

    // Добавляем выбранный класс
    carMatBody.classList.add(selectedColor);
}

// Добавляем обработчик для каждой кнопки цвета
colorButtons.forEach(function(button) {
    button.addEventListener('click', setColorClass);
});

// =====================================================================
// Получаем все кнопки цветов контура
const colorCantButtons = document.querySelectorAll('.color-cant-btn');

// Получаем элемент контура
const carMatCant = document.querySelector('.constructor-wrap__result__cant');

// Функция для установки класса цвета контура
function setCantColorClass(event) {
    const selectedColor = event.target.dataset.color;

    // Удаляем предыдущие классы цветов контура
    const colorClasses = ['colorCantBlack', 'colorCantDarkenGray', 'colorCantGray', 'colorCantLightBlue', 'colorCantRed', 'colorCantOrange', 'colorCantBrown', 'colorCantLightBrown', 'colorCantYellow', 'colorCantLightGreen', 'colorCantGreen', 'colorCantBlue', 'colorCantMaroon'];
    carMatCant.classList.remove(...colorClasses);

    // Добавляем выбранный класс
    carMatCant.classList.add(selectedColor);
}

// Добавляем обработчик для каждой кнопки цвета контура
colorCantButtons.forEach(function(button) {
    button.addEventListener('click', setCantColorClass);
});

// =====================================================================
// Слайдер вариантов ковриков
const carMatsCategoryesSwiper = new Swiper('.deafult-slider', {
    // Стрелочки
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Скроллбар
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
    },
    // Количетсво выводимых слайдов
    slidesPerView: 3,
    // Что то
    watchOverflow: true,
    // Отсутпы между слайдами
    spaceBetween: 150,
    // Что то
    initialSlide: 1,
    // Скорость переключения слайдов
    speed: 500,
    // Режим активного слайда по центру
    centeredSlides: true,
    roundLengths: true,
    // autoHeight: true,
    // адаптив
    breakpoints: {
        320: {
            spaceBetween: 80,
            slidesPerView: 1,
        },
        958: {
            spaceBetween: 80,
            slidesPerView: 1.5,
        },
        1180: {
            spaceBetween: 140,
            slidesPerView: 2.5,
        },
        1290: {
            spaceBetween: 140,
            slidesPerView: 2.3,
        },
        1646: {
            spaceBetween: 150,
            slidesPerView: 3,
        },
    },
});

// Слайдер аксессуаров
const accessoriesSwiper = new Swiper('.accessoriesSlider', {
    // Стрелочки
    navigation: {
        nextEl: '.accessoriesSlider-swiper-button-next',
        prevEl: '.accessoriesSlider-swiper-button-prev',
    },
    // Скроллбар
    scrollbar: {
        el: '.accessoriesSlider-swiper-scrollbar',
        draggable: true
    },
    // Количетсво выводимых слайдов
    slidesPerView: 2,
    // Что то
    watchOverflow: true,
    // Отсутпы между слайдами
    spaceBetween: 140,
    // Что то
    initialSlide: 0,
    // Скорость переключения слайдов
    speed: 500,
    // Режим активного слайда по центру
    centeredSlides: true,
    roundLengths: true,
    // адаптив
    breakpoints: {
        320: {
            spaceBetween: 80,
            slidesPerView: 1,
            
        },
        958: {
            spaceBetween: 80,
            slidesPerView: 1.5,
        },
        1180: {
            spaceBetween: 140,
            slidesPerView: 2.6,
        },
        1646: {
            spaceBetween: 30,
            slidesPerView: 3,
            centeredSlides: false,
            roundLengths: false,
        },
    },
});


// =====================================================================
// Модальные окна
function createModal(modalElement, openButtons, closeButton) {
    // Открываем модальное окно при клике на кнопку(и)
    openButtons.forEach(function(openButton) {
      openButton.onclick = function() {
        showModal(modalElement);
      }
    });
  
    // Закрываем модальное окно при клике на крестик
    closeButton.onclick = function() {
      closeModal(modalElement);
    }
  
    // Закрываем модальное окно при клике на затемненный фон
    window.onclick = function(event) {
      if (event.target == modalElement) {
        closeModal(modalElement);
      }

    }

    // Функция для показа модального окна - с анимацией
    function showModal(modalElement) {
    modalElement.style.display = 'block';
    setTimeout(function() {
        modalElement.classList.add('show');
        document.body.classList.add('no-scroll');
    }, 10); // Задержка для активации анимации
    }

    // Функция для закрытия модального окна - с анимацией
    function closeModal(modalElement) {
    modalElement.classList.remove('show');
    setTimeout(function() {
        modalElement.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }, 300); // Задержка для завершения анимации
    }
}

// Модальное окно конструктора
const modalConstructor = document.getElementById('modalConstructor');
const openModalConstructorBtn = document.querySelectorAll('.openModalConstructorBtn');
const modalConstructorClose = document.getElementById('modalConstructorClose');

createModal(modalConstructor, openModalConstructorBtn, modalConstructorClose);

// Модальное окно для обратного зовнка
const modalConsult = document.getElementById('modal');
const openModalConsultBtn = document.querySelectorAll('.openModal'); // Выбираем все кнопки с классом 'openModal'
const closeModalConsultBtn = document.getElementById('modalCloseBtn');

createModal(modalConsult, openModalConsultBtn, closeModalConsultBtn);

// Модальное окно для обратного зовнка
// const modalOrder = document.getElementById('modalOrder');
// const openModalOrderBtn = document.querySelectorAll('.openModalOrderBtn'); // Выбираем все кнопки с классом 'openModal'
// const closeModalOrderBtn = document.getElementById('closeModalOrderBtn');

// createModal(modalOrder, openModalOrderBtn, closeModalOrderBtn);


// =====================================================================
// Отложенная загрузка яндекс карт
document.addEventListener("DOMContentLoaded", function() {
    let ok = false;

    function loadMap(mapUrl, targetElementId) {
        if (ok === false) {
            ok = true;
            setTimeout(() => {
                let script = document.createElement('script');
                script.src = mapUrl;
                document.getElementById(targetElementId).replaceWith(script);
            }, 5000);
        }
        
    }

    // Вешаем обработчик
    window.addEventListener('scroll', function () {
        loadMap('https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ae588bc8558c4d51c7308a36ae9729e8993abf3c8fc46f0339f06d0ad05ceee75&amp;width=100%25&amp;height=509&amp;lang=ru_RU&amp;scroll=true', 'yamap');
    });
});
