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
// Функция для проверки, существует ли секция с айди "contacts" на текущей странице
function hasContactsSection() {
  const contactsSection = document.getElementById('contacts');
  return contactsSection !== null;
}

const mobileMenuItems = document.querySelectorAll('.menu-item');
mobileMenuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', function(event) {
      const href = menuItem.getAttribute('href'); // Получаем полный href атрибут

      // Если href содержит #contacts, то убираем всю часть ссылки кроме #contacts
      const targetSectionId = href.includes('#contacts') ? '#contacts' : href;

      // Проверяем, есть ли секция с айди "contacts" на текущей странице
      if (targetSectionId === '#contacts' && hasContactsSection()) {
          event.preventDefault();
          scrollToSection(targetSectionId);
      } else {
          // В данном случае, если секции нет, мы просто переходим на URL
          // без якоря, то есть на страницу index.html
          
      }
  });
});

// Функция для скролла к секции
function scrollToSection(targetSectionId) {
  const targetSection = document.querySelector(targetSectionId);
  
  if (targetSection) { // Проверяем, существует ли секция
      const offsetTop = targetSection.offsetTop;

      window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
      });
  }
}




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
    var targetHref = menuItem.querySelector('a').getAttribute('href');
    var targetId = targetHref.split('#')[1]; // Разделяем URL по символу '#' и берем вторую часть

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
// Проверка элемента на наличие его в DOM 
if (document.querySelector('.color-btn')) {
  // Получаем все кнопки цветов
  const colorButtons = document.querySelectorAll('.color-btn');

  // Получаем элемент .constructor-wrap__result__body
  const carMatBody = document.querySelector('.constructor-wrap__result__body');

  // Функция для установки класса
  function setColorClass(event) {
      const selectedColor = event.target.dataset.color;

      // Удаляем предыдущие классы цветов
      const colorClasses = ['colorBlack', 'colorPeachy', 'colorDarkenGray', 'colorPurple', 'colorOrange', 'colorLightGreen', 'colorDarkGreen', 'colorBlue', 'colorLightBrownishGray', 'colorLightBeige', 'colorDarkBrown', 'colorWhite', 'colorYellow', 'colorDarkBlue'];
      carMatBody.classList.remove(...colorClasses);

      // Добавляем выбранный класс
      carMatBody.classList.add(selectedColor);
  }

  // Добавляем обработчик для каждой кнопки цвета
  colorButtons.forEach(function(button) {
      button.addEventListener('click', setColorClass);
  });
}

// =====================================================================
// Получаем все кнопки цветов контура
// Проверка элемента на наличие его в DOM 
if (document.querySelector('.color-cant-btn')) {
  const colorCantButtons = document.querySelectorAll('.color-cant-btn');

  // Получаем элемент контура
  const carMatCant = document.querySelector('.constructor-wrap__result__cant');
  
  // Функция для установки класса цвета контура
  function setCantColorClass(event) {
      const selectedColor = event.target.dataset.color;
  
      // Удаляем предыдущие классы цветов контура
      const colorClasses = ['colorCantСhartreuse', 'colorCantFeldgrau', 'colorCantLightYellow', 'colorCantYellow', 'colorCantOrange', 'colorCantRed', 'colorCantMaroon', 'colorCantDarkBrown', 'colorCantPurple', 'colorCantDarkBlue', 'colorCantLightBlack', 'colorCantBlue', 'colorCantLilac', 'colorCantCelestial', 'colorCantBrown', 'colorCantYellowishGray', 'colorCantGraniteGray', 'colorCantPearlescentLightGray', 'colorCantTimberWolf', 'colorCantBlack'];
      carMatCant.classList.remove(...colorClasses);
  
      // Добавляем выбранный класс
      carMatCant.classList.add(selectedColor);
  }
  
  // Добавляем обработчик для каждой кнопки цвета контура
  colorCantButtons.forEach(function(button) {
      button.addEventListener('click', setCantColorClass);
  });
}


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


// Слайдер карточки товара коврика
const productCarpetSwiper = new Swiper('.product-section-wrap__gallery', {
  // Скроллбар
  scrollbar: {
      el: '.gallery-swiper-scrollbar',
      draggable: true
  },
  // Количетсво выводимых слайдов
  slidesPerView: 1,
  // Что то
  watchOverflow: true,
  // Отсутпы между слайдами
  spaceBetween: 0,
  // Какой слайд будет первым
  initialSlide: 0,
  // Скорость переключения слайдов
  speed: 500,
  // адаптив
  thumbs: {
    swiper: {
      el: '.product-section-wrap__gallery__thumbs',
      slidesPerView: 5,
      spaceBetween: 10, 
    }
  }
  
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

// Проверка элемента на наличие его в DOM 
if (document.querySelector('#modalConstructor')) {
  // Модальное окно конструктора
  const modalConstructor = document.getElementById('modalConstructor');
  const openModalConstructorBtn = document.querySelectorAll('.openModalConstructorBtn');
  const modalConstructorClose = document.getElementById('modalConstructorClose');

  createModal(modalConstructor, openModalConstructorBtn, modalConstructorClose);
}

// Проверка элемента на наличие его в DOM 
if (document.querySelector('#modal')) {
  // Модальное окно для обратного зовнка
  const modalConsult = document.getElementById('modal');
  const openModalConsultBtn = document.querySelectorAll('.openModal'); // Выбираем все кнопки с классом 'openModal'
  const closeModalConsultBtn = document.getElementById('modalCloseBtn');

  createModal(modalConsult, openModalConsultBtn, closeModalConsultBtn);
}

// Проверка элемента на наличие его в DOM 
if (document.querySelector('#modalOrder')) {
  // Модальное окно для обратного зовнка
  const modalOrder = document.getElementById('modalOrder');
  const openModalOrderBtn = document.querySelectorAll('.openModalOrderBtn'); // Выбираем все кнопки с классом 'openModal'
  const closeModalOrderBtn = document.getElementById('closeModalOrderBtn');

  createModal(modalOrder, openModalOrderBtn, closeModalOrderBtn);
}


// =====================================================================
// Аккордион 
// Проверка элемента на наличие его в DOM 
if (document.querySelector('.accordion-content')) {

  document.addEventListener("DOMContentLoaded", function () {
    const initiallyOpenItem = document.querySelector('.accordion-item.open');
    
    if (initiallyOpenItem) {
        const content = initiallyOpenItem.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
  
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
  
    header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
  
        accordionItems.forEach((otherItem) => {
            otherItem.classList.remove('open');
            otherItem.querySelector('.accordion-content').style.maxHeight = '0';
        });
  
        if (!isOpen) {
            item.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
  });
}


// =====================================================================
// Кнопка скролла наверх для мобилок
const scrollToTopButton = document.getElementById('scrollToTopButton');

// Функция, которая скроллит страницу наверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Показываем или скрываем кнопку при скролле
function toggleScrollButton() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollToTopButton.style.opacity = 1;
    } else {
        scrollToTopButton.style.opacity = 0;
    }
}
// Обработчик события скролла
window.addEventListener('scroll', toggleScrollButton);
// Обработчик клика по кнопке
scrollToTopButton.addEventListener('click', scrollToTop);


// =====================================================================
// Табы в каталоге 
// Проверка элемента на наличие его в DOM 
if (document.querySelector('.tab-button')) {
  // Получаем все кнопки табов и контенты табов
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Добавляем обработчик события на каждую кнопку таба
  tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
          // Убираем класс "active" у всех кнопок и контентов
          tabButtons.forEach((btn) => {
              btn.classList.remove("active");
          });
          tabContents.forEach((content) => {
              content.classList.remove("active");
          });

          // Добавляем класс "active" только к текущей кнопке и соответствующему контенту
          const tabId = button.getAttribute("data-tab");
          const tabContent = document.getElementById(tabId);
          button.classList.add("active");
          tabContent.classList.add("active");
      });
  });
}










// =====================================================================
// Функционал карточки твовара коврика 
// Занесение значений с инпутов с крытые инпуты
// Проверка элемента на наличие его в DOM 
if (document.querySelector('.product-section-carpet')) {
  // Изменяемые инпуты 
  // радио
  const carpetFull = document.getElementById('carpetFull');
  const carpetBoot = document.getElementById('carpetBoot');
  const carpetFullBoot = document.getElementById('carpetFullBoot');
  const carpetFront = document.getElementById('carpetFront');
  const carpetBack = document.getElementById('carpetBack');
  const carpetDriver = document.getElementById('carpetDriver');

  // чекбоксы
  const carpetSaddle = document.getElementById('carpetSaddle');
  const carpetLogo = document.getElementById('carpetLogo');

  // Скрытые инпуты в которые заносим значения
  // радио
  const carpetInputHiden = document.getElementById('carpetInputHiden');

  // чекбоксы
  const carpetSaddleHiden = document.getElementById('carpetSaddleHiden');
  const carpetLogoHiden = document.getElementById('carpetLogoHiden');

    // функция для радио кнопок
  function productOptionInputRadio(input, hiddenInput) {
    input.addEventListener('change', () => {
      if (input.checked) {
        hiddenInput.value = input.value;
      }
    });
  }

  // функция для чекбоксов
  function productOptionInputCheckbox(input, hiddenInput) {
    input.addEventListener('change', () => {
      hiddenInput.value = input.checked ? 'on' : 'off';
    });
  }
  
  
  // Вызов функции для радио кнопок
  productOptionInputRadio(carpetFull, carpetInputHiden);
  productOptionInputRadio(carpetBoot, carpetInputHiden);
  productOptionInputRadio(carpetFullBoot, carpetInputHiden);
  productOptionInputRadio(carpetFront, carpetInputHiden);
  productOptionInputRadio(carpetBack, carpetInputHiden);
  productOptionInputRadio(carpetDriver, carpetInputHiden);

  // Вызов функции для чекбоксов 
  productOptionInputCheckbox(carpetSaddle, carpetSaddleHiden);
  productOptionInputCheckbox(carpetLogo, carpetLogoHiden);

}

// =====================================================================
// Калькулятор в карточке товара коврика
document.addEventListener("DOMContentLoaded", function() {
  // Счетчик в карточке товара логотипа для опций с бортами
  // Проверка элемента на наличие его в DOM 
  if (document.querySelector('.product-section-carpet')) {
    const incrementButton = document.querySelector('.increment');
    const decrementButton = document.querySelector('.decrement');
    const counterInput = document.querySelector('.counter-input');

    const carpetLogoNumHiden = document.getElementById('carpetLogoNumHiden');

    
    incrementButton.addEventListener('click', function() {
      let currentValue = parseInt(counterInput.value); // Получаем текущее значение
      if (currentValue < 8) {
        currentValue++; // Увеличиваем значение на 1
        counterInput.value = currentValue; // Устанавливаем свойство value
        counterInput.setAttribute('value', currentValue); // Устанавливаем атрибут value
        carpetLogoNumHiden.setAttribute('value', currentValue); // Устанавливаем атрибут value
        updateTotalPrice()
      }
    });
    
    decrementButton.addEventListener('click', function() {
      let currentValue = parseInt(counterInput.value); // Получаем текущее значение
      if (currentValue > 1) {
        currentValue--; // Уменьшаем значение на 1
        counterInput.value = currentValue; // Устанавливаем свойство value
        counterInput.setAttribute('value', currentValue); // Устанавливаем атрибут value
        carpetLogoNumHiden.setAttribute('value', currentValue); // Устанавливаем атрибут value
        updateTotalPrice()
      }
    });
  }

  // Расчет Для опций с бортами 
  // Проверка элемента на наличие его в DOM 
  if (document.querySelector('.product-section-carpet')) {
    // Вывод итого 
    let productPriceTag = document.getElementById('productPriceTag');

    // Переменные для расчета 
    const carpetFull = document.getElementById('carpetFull');
    const carpetBoot = document.getElementById('carpetBoot');
    const carpetFullBoot = document.getElementById('carpetFullBoot');
    const carpetFront = document.getElementById('carpetFront');
    const carpetBack = document.getElementById('carpetBack');
    const carpetDriver = document.getElementById('carpetDriver');
    const carpetSaddle = document.getElementById('carpetSaddle');
    const carpetLogo = document.getElementById('carpetLogo');
    const carpetLogoNum = document.getElementById('carpetLogoNum');

    
    
    // Функция для обновления итоговой цены
    function updateTotalPrice() {
      let totalPrice = 0;
      
      

      // Извлекаем значения цены из <span> элементов и добавляем их к totalPrice
      if (carpetFull.checked) {
        totalPrice += parseInt(carpetFullPriceTag.innerHTML);
      }
      if (carpetBoot.checked) {
        totalPrice += parseInt(carpetBootPriceTag.innerHTML);
      }
      if (carpetFullBoot.checked) {
        totalPrice += parseInt(carpetFullBootPriceTag.innerHTML);
      }
      if (carpetFront.checked) {
        totalPrice += parseInt(carpetFrontPriceTag.innerHTML);
      }
      if (carpetBack.checked) {
        totalPrice += parseInt(carpetBackPriceTag.innerHTML);
      }
      if (carpetDriver.checked) {
        totalPrice += parseInt(carpetDriverPriceTag.innerHTML);
      }
      if (carpetSaddle.checked) {
        totalPrice += parseInt(carpetSaddlePriceTag.innerHTML);

      }
      if (carpetLogo.checked) {
        totalPrice += parseInt(carpetLogoPriceTag.innerHTML) * parseInt(carpetLogoNum.value);
      }
      
      

      // Устанавливаем новое значение totalPrice в элементе productPriceTag
      productPriceTag.innerHTML = totalPrice;
    }


    // Добавляем обработчик события change для каждого чекбокса
    carpetFull.addEventListener('change', updateTotalPrice);

    carpetBoot.addEventListener('change', updateTotalPrice);
    carpetFullBoot.addEventListener('change', updateTotalPrice);
    carpetFront.addEventListener('change', updateTotalPrice);
    carpetBack.addEventListener('change', updateTotalPrice);
    carpetDriver.addEventListener('change', updateTotalPrice);
    carpetSaddle.addEventListener('change', updateTotalPrice);
    carpetLogo.addEventListener('change', updateTotalPrice);

    // Вызываем функцию updateTotalPrice для первоначального расчета и отображения итоговой цены
    updateTotalPrice();
  }

  // Счетчик в карточке товара логотипа для опций без бортов
  // Проверка элемента на наличие его в DOM 
  if (document.querySelector('.product-section-carpet')) {
    const incrementButton = document.querySelector('.increment._withoutS');
    const decrementButton = document.querySelector('.decrement._withoutS');
    const counterInput = document.querySelector('.counter-input._withoutS');

    const carpetLogoNumHiden = document.getElementById('carpetLogoNumHiden');

    
    incrementButton.addEventListener('click', function() {
      let currentValue = parseInt(counterInput.value); // Получаем текущее значение
      if (currentValue < 8) {
        currentValue++; // Увеличиваем значение на 1
        counterInput.value = currentValue; // Устанавливаем свойство value
        counterInput.setAttribute('value', currentValue); // Устанавливаем атрибут value
        carpetLogoNumHiden.setAttribute('value', currentValue); // Устанавливаем атрибут value
        updateTotalPriceWithoutS()
      }
    });
    
    decrementButton.addEventListener('click', function() {
      let currentValue = parseInt(counterInput.value); // Получаем текущее значение
      if (currentValue > 1) {
        currentValue--; // Уменьшаем значение на 1
        counterInput.value = currentValue; // Устанавливаем свойство value
        counterInput.setAttribute('value', currentValue); // Устанавливаем атрибут value
        carpetLogoNumHiden.setAttribute('value', currentValue); // Устанавливаем атрибут value
        updateTotalPriceWithoutS()
      }
    });
  }

  // =====================================================================
  // Расчет Для опций без бортов
  // Проверка элемента на наличие его в DOM 
  if (document.querySelector('.product-section-carpet')) {
    // Вывод итого 
    let productPriceTag = document.getElementById('productPriceTag');

    // Переменные для расчета 
    const carpetFullWithoutS = document.getElementById('carpetFullWithoutS');
    const carpetBootWithoutS = document.getElementById('carpetBootWithoutS');
    const carpetFullBootWithoutS = document.getElementById('carpetFullBootWithoutS');
    const carpetFrontWithoutS = document.getElementById('carpetFrontWithoutS');
    const carpetBackWithoutS = document.getElementById('carpetBackWithoutS');
    const carpetDriverWithoutS = document.getElementById('carpetDriverWithoutS');
    const carpetSaddleWithoutS = document.getElementById('carpetSaddleWithoutS');
    const carpetLogoWithoutS = document.getElementById('carpetLogoWithoutS');
    

    // Функция для обновления итоговой цены
    function updateTotalPriceWithoutS() {
      let totalPrice = 0;

      // Извлекаем значения цены из <span> элементов и добавляем их к totalPrice
      if (carpetFullWithoutS.checked) {
        totalPrice += parseInt(carpetFullPriceTagWithoutS.innerHTML);
      }
      if (carpetBootWithoutS.checked) {
        totalPrice += parseInt(carpetBootPriceTagWithoutS.innerHTML);
      }
      if (carpetFullBootWithoutS.checked) {
        totalPrice += parseInt(carpetFullBootPriceTagWithoutS.innerHTML);
      }
      if (carpetFrontWithoutS.checked) {
        totalPrice += parseInt(carpetFrontPriceTagWithoutS.innerHTML);
      }
      if (carpetBackWithoutS.checked) {
        totalPrice += parseInt(carpetBackPriceTagWithoutS.innerHTML);
      }
      if (carpetDriverWithoutS.checked) {
        totalPrice += parseInt(carpetDriverPriceTagWithoutS.innerHTML);
      }
      if (carpetSaddleWithoutS.checked) {
        totalPrice += parseInt(carpetSaddlePriceTagWithoutS.innerHTML);
      }
      if (carpetLogoWithoutS.checked) {
        totalPrice += parseInt(carpetLogoPriceTagWithoutS.innerHTML) * parseInt(carpetLogoNumWithoutS.value);
      }
      
      
      

      // Устанавливаем новое значение totalPrice в элементе productPriceTag
      productPriceTag.innerHTML = totalPrice;
    }

    // Добавляем обработчик события change для каждого чекбокса
    carpetFullWithoutS.addEventListener('change', updateTotalPriceWithoutS);
    carpetBootWithoutS.addEventListener('change', updateTotalPriceWithoutS);
    carpetFullBootWithoutS.addEventListener('change', updateTotalPriceWithoutS);
    carpetFrontWithoutS.addEventListener('change', updateTotalPriceWithoutS);
    carpetBackWithoutS.addEventListener('change', updateTotalPriceWithoutS);
    carpetDriverWithoutS.addEventListener('change', updateTotalPriceWithoutS);
    carpetSaddleWithoutS.addEventListener('change', updateTotalPriceWithoutS);
    carpetLogoWithoutS.addEventListener('change', updateTotalPriceWithoutS);

    // Вызываем функцию updateTotalPrice для первоначального расчета и отображения итоговой цены
    updateTotalPriceWithoutS();
  }



  // =====================================================================
  // Функционал отображения опций с бортами и без 
  // Проверка элемента на наличие его в DOM 
  if (document.querySelector('.product-section-carpet')) {
    const withSideBtn = document.querySelector('#withSide');
    const withoutSideBtn = document.querySelector('#withoutSide');
    
    const withSideContent = document.querySelector('._with-side');
    const withoutSideContent = document.querySelector('._without-side');
    
    withSideBtn.addEventListener('change', function() {
      withSideContent.classList.add('active');
      withoutSideContent.classList.remove('active');
      carpetFull.checked = true;
      carpetFullWithoutS.checked = false;

      updateTotalPrice();
    });
    
    withoutSideBtn.addEventListener('change', function() {
      withoutSideContent.classList.add('active');
      withSideContent.classList.remove('active');
      carpetFull.checked = false;
      carpetFullWithoutS.checked = true;
      updateTotalPriceWithoutS();
    });
  }

  if (document.querySelector('.product-section-carpet')) {
    carpetFull.click();
  }

});













// =====================================================================
// Функционал карточки твовара накидки
// Занесение значений с инпутов с крытые инпуты
// Проверка элемента на наличие его в DOM 
if (document.querySelector('.product-section-cover')) {
  // Изменяемые инпуты 
  // чекбоксы
  const coverPillow = document.getElementById('coverPillow');

  // Скрытые инпуты в которые заносим значения
  // чекбоксы
  const coverPillowHiden = document.getElementById('coverPillowHiden');

  // функция для чекбоксов
  function productOptionInputCheckbox(input, hiddenInput) {
    input.addEventListener('change', () => {
      hiddenInput.value = input.checked ? 'on' : 'off';
    });
  }
  
  // Вызов функции для чекбоксов 
  productOptionInputCheckbox(coverPillow, coverPillowHiden);
}

// =====================================================================
// Калькулятор в карточке товара коврика
document.addEventListener("DOMContentLoaded", function() {
  // Счетчик в карточке товара логотипа для опций с бортами
  // Проверка элемента на наличие его в DOM 
  if (document.querySelector('.product-section-cover')) {
    const incrementButton = document.querySelector('.increment');
    const decrementButton = document.querySelector('.decrement');
    const counterInput = document.querySelector('.counter-input');

    const coverPillowNumHiden = document.getElementById('coverPillowNumHiden');

    
    incrementButton.addEventListener('click', function() {
      let currentValue = parseInt(counterInput.value); // Получаем текущее значение
      if (currentValue < 8) {
        currentValue++; // Увеличиваем значение на 1
        counterInput.value = currentValue; // Устанавливаем свойство value
        counterInput.setAttribute('value', currentValue); // Устанавливаем атрибут value
        coverPillowNumHiden.setAttribute('value', currentValue); // Устанавливаем атрибут value
        updateTotalPrice()
      }
    });
    
    decrementButton.addEventListener('click', function() {
      let currentValue = parseInt(counterInput.value); // Получаем текущее значение
      if (currentValue > 1) {
        currentValue--; // Уменьшаем значение на 1
        counterInput.value = currentValue; // Устанавливаем свойство value
        counterInput.setAttribute('value', currentValue); // Устанавливаем атрибут value
        coverPillowNumHiden.setAttribute('value', currentValue); // Устанавливаем атрибут value
        updateTotalPrice()
      }
    });
  }

  // Расчет Для опций с бортами 
  // Проверка элемента на наличие его в DOM 
  if (document.querySelector('.product-section-cover')) {
    // Вывод итого 
    let productPriceTag = document.getElementById('productPriceTag');

    // Переменные для расчета 
    const coverFront = document.getElementById('coverFront');
    const coverBack = document.getElementById('coverBack');
    const coverFull = document.getElementById('coverFull');
    const coverOne = document.getElementById('coverOne');

    const coverPillow = document.getElementById('coverPillow');
    

    
    
    // Функция для обновления итоговой цены
    function updateTotalPrice() {
      let totalPrice = 0;
      
      

      // Извлекаем значения цены из <span> элементов и добавляем их к totalPrice
      if (coverFront.checked) {
        totalPrice += parseInt(coverFrontPriceTag.innerHTML);
      }
      if (coverBack.checked) {
        totalPrice += parseInt(coverBackPriceTag.innerHTML);
      }
      if (coverFull.checked) {
        totalPrice += parseInt(coverFullPriceTag.innerHTML);
      }
      if (coverOne.checked) {
        totalPrice += parseInt(coverOnePriceTag.innerHTML);
      }
      
      if (coverPillow.checked) {
        totalPrice += parseInt(coverPillowPriceTag.innerHTML) * parseInt(coverPillowNum.value);
      }
      
      

      // Устанавливаем новое значение totalPrice в элементе productPriceTag
      productPriceTag.innerHTML = totalPrice;
    }


    // Добавляем обработчик события change для каждого чекбокса
    coverFront.addEventListener('change', updateTotalPrice);
    coverBack.addEventListener('change', updateTotalPrice);
    coverFull.addEventListener('change', updateTotalPrice);
    coverOne.addEventListener('change', updateTotalPrice);

    coverPillow.addEventListener('change', updateTotalPrice);
    

    // Вызываем функцию updateTotalPrice для первоначального расчета и отображения итоговой цены
    updateTotalPrice();
  }


});















// =====================================================================
// Функционал карточки твовара органайзера
// Калькулятор в карточке товара коврика
document.addEventListener("DOMContentLoaded", function() {
  // Проверка элемента на наличие его в DOM 
  if (document.querySelector('.product-section-organaizer')) {
    // Вывод итого 
    let productPriceTag = document.getElementById('productPriceTag');

    // Переменные для расчета 
    const complect_70_30_30 = document.getElementById('complect_70_30_30');
    const complect_60_30_30 = document.getElementById('complect_60_30_30');
    const complect_50_30_30 = document.getElementById('complect_50_30_30');
    
    // Функция для обновления итоговой цены
    function updateTotalPrice() {
      let totalPrice = 0;
      

      // Извлекаем значения цены из <span> элементов и добавляем их к totalPrice
      if (complect_70_30_30.checked) {
        totalPrice += parseInt(complect_70_30_30_num.innerHTML);
        
      }
      if (complect_60_30_30.checked) {
        totalPrice += parseInt(complect_60_30_30_num.innerHTML);
      }
      if (complect_50_30_30.checked) {
        totalPrice += parseInt(complect_50_30_30_num.innerHTML);
      }
      
      // Устанавливаем новое значение totalPrice в элементе productPriceTag
      productPriceTag.innerHTML = totalPrice;
    }


    // Добавляем обработчик события change для каждого чекбокса
    complect_70_30_30.addEventListener('change', updateTotalPrice);
    complect_60_30_30.addEventListener('change', updateTotalPrice);
    complect_50_30_30.addEventListener('change', updateTotalPrice);

    // Вызываем функцию updateTotalPrice для первоначального расчета и отображения итоговой цены
    updateTotalPrice();
  }
});
































// =====================================================================
// Отложенная загрузка яндекс карт
// Проверка элемента на наличие его в DOM
let divMap = document.querySelector('#yamap');
if (divMap) {
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
}

