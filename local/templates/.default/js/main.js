/* Сервис-функция асинхронного поучения данных с сервера */
const getResource = async (url, form) => {

    const response = (form === undefined)
        ? await fetch(url)
        : await fetch(url, {
            method: 'POST',
            cache  : 'no-cache',
            body: new FormData(form)
        });

    if (!response.ok) {
        throw new Error('Не удалось получить данные от ' + url +  '. Получен ответ: ' . response.status);
    }

    try {
        return await response.text();
    } catch (error) {
        throw new TypeError('Полученные данные должны быть в формате JSON. Произошла ошибка на URL: ' + response.url);
    }
};

/* Функция для валидации электронной почты */
function validMail(mail) {
    let regular = /.+@.+\..+/i;
    return regular.test(mail);
}

/* Функция для валидации телефона */
function validPhone(phone) {
    let regular = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{6,10}$/;
    return regular.test(phone);
}

/* Функция для валидации даты */
function validDate(date) {
    let regular = /^\d{2}\.\d{2}\.\d{4}$/
    return regular.test(date);
}

document.addEventListener("DOMContentLoaded",() => {
    const body = document.body;
    const dropLinks = document.querySelectorAll(".products__link.drop");
    const navLinks = document.querySelectorAll(".nav__item.drop");
    const faqLinks = document.getElementsByClassName("faq__item");
    let windowWidth = window.innerWidth;

    const closeAccordion = () => {
        for (let i = 0; i < dropLinks.length; ++i) {
            dropLinks[i]
                .parentElement
                .classList
                .remove('visible');
        }

        for (let i = 0; i < navLinks.length; ++i) {
            navLinks[i]
                .classList
                .remove('visible');
        }
    };

    window.addEventListener('resize', (event) => {
        windowWidth = window.innerWidth;

        windowWidth >= 768
            ? replaceCart(true) // replace cart to top
            : replaceCart(false);  // replace cart to bottom

        windowWidth >= 1250
            ? replaceNav(true) // replace nav after logo
            : replaceNav(false);

        windowWidth >= 768
            ? replaceOperating(true) // Replace operating after initial page
            : replaceOperating(false);


        // roll up all drop navigation when user resize window
        for (let j = 0; j < dropLinks.length; ++j) {
            dropLinks[j]
                .parentElement
                .classList
                .remove('visible');
        }

        // Hide header nav and header phone
        body.classList.remove('phone-visible');
        body.classList.remove('nav-visible');

        // Hide city select
        region.classList.remove("city-select-visible");

    });

    /* Toggle phone at the header on mobile screen */
    const headerPhoneBtn = document.getElementById('headerPhoneBtn');
    const toggleHeaderPhone = () => {
        body
            .classList
            .toggle('phone-visible');
        body
            .classList
            .remove('nav-visible');

        closeAccordion();
    };
    headerPhoneBtn.addEventListener('click', toggleHeaderPhone);

    /* Toggle navigation at the header on mobile screen */
    const navTgglr = document.getElementById('navTgglr');
    const toggleHeaderNav = () => {
        body
            .classList
            .toggle('nav-visible');

        body
            .classList
            .remove('phone-visible');

        closeAccordion();
    };
    navTgglr.addEventListener('click', toggleHeaderNav);

    /* Toggle city selector at the header on mobile screen */
    const region = document.getElementById("region");

    region.addEventListener("click", event => {
        let el = event.target;

        if (el.closest('#region')) {
            region
                .classList
                .toggle("city-select-visible");
        }

        body
            .classList
            .remove('phone-visible');
        body
            .classList
            .remove('nav-visible');

        closeAccordion();
    });

    /* Replace cart at the header on mobile screen */
    const cart = document.getElementById("cart");
    const headerBottom = document.getElementById("headerBottom");
    const headerTop = document.querySelector("#headerTop .header__top__body");

    const replaceCart = (move) => {
        move
            ? headerTop.appendChild(cart)
            : headerBottom.appendChild(cart);
    };

    /* Replace cart after initial page */
    windowWidth >= 768
        ? replaceCart(true)
        : replaceCart(false);

    /* Replace operating at the header on mobile screen */
    const operating = document.getElementById("operating");

    const replaceOperating = (move) => {
        move
            ? headerBottom.appendChild(operating)
            : body.prepend(operating);
    };

    /* Replace operating after initial page */
    windowWidth >= 768
        ? replaceOperating(true)
        : replaceOperating(false);

    /* Replace navigation at the header on mobile screen */
    const headerBottomContainer = document.getElementById("headerBottomContainer");
    const headerTopNav = document.getElementById("headerTopNav");
    const nav = document.getElementById("nav");
    const prodContainer = document.getElementById("prodContainer");
    const navContainer = document.getElementById("navContainer");

    const replaceNav = (move) => {
        if (move) {
            prodContainer.appendChild(nav);
            navContainer.appendChild(headerTopNav);
        } else {
            nav.appendChild(headerTopNav);
            headerBottomContainer.prepend(nav);
        }
    };

    windowWidth >= 1250
        ? replaceNav(true) // replace nav after logo
        : replaceNav(false);

    /* Nav accordion for mobile version */
    if (windowWidth <=1250) {

        // Toggle product dropdown
        for (let i = 0; i < dropLinks.length; ++i) {
            dropLinks[i].addEventListener('click', event => {

                event.preventDefault(); // stopping click on link

                let prntClasses = event.target.parentElement.classList;
                let isVisible = prntClasses.contains('visible');

                closeAccordion();

                isVisible
                    ? prntClasses.remove('visible')
                    : prntClasses.add('visible');
            });
        }

        // Toggle nav dropdown
        for (let i = 0; i < navLinks.length; ++i) {
            navLinks[i].addEventListener('click', event => {
                let elClasses = event.target.classList;
                let isVisible = elClasses.contains('visible');

                closeAccordion();

                isVisible
                    ? elClasses.remove('visible')
                    : elClasses.add('visible');
            });
        }


    }

    /* FAQ accordion */
    const closeFaqAccordion = () => {
        for (let i = 0; i < faqLinks.length; ++i) {
            faqLinks[i].classList.remove("visible");
        }
    };

    if (faqLinks.length > 0) {
        for (let i = 0; i < faqLinks.length; ++i) {
            faqLinks[i].addEventListener('click', event => {
                let li = event.target.closest('li');
                let isVisible = li.classList.contains('visible');

                closeFaqAccordion();

                isVisible
                    ? li.classList.remove('visible')
                    : li.classList.add('visible');
            });
        }  }

    /* Input FILE */
    let inputs = document.querySelectorAll(".label_file input");

    for (let i = 0; i < inputs.length; i++) {
        let controller = inputs[i].nextElementSibling;

        inputs[i].addEventListener('change', (event) => {
            controller.innerHTML = event.target.value.split('\\').pop();
        });
    }

    /* Show, hide modals */
    let btns = document.getElementsByClassName('show-modal');

    const toggleModal = (modal, action) => {
        if (action) {
            body.classList.add("modal-open");
            modal.classList.add("show");
        } else {
            body.classList.remove("modal-open");
            modal.classList.remove("show");
            modalBody.classList.remove('hide');
            sendMsgTrue.classList.remove('visible');

            const errors = modalBody.getElementsByClassName("err__msg");
            const labels = modalBody.getElementsByClassName("label");
            const inputs = modalBody.getElementsByClassName("input");
            const texts = modalBody.getElementsByClassName("textarea");

            if (errors.length > 0) {
                for (let i = 0; i < errors.length; i++) {
                    errors[i].innerHTML = '';
                }
            }

            if (labels.length > 0) {
                for (let i = 0; i < labels.length; i++) {
                    labels[i].classList.remove("has__error");
                }
            }

            if (inputs.length > 0) {
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
                }
            }

            if (texts.length > 0) {
                for (let i = 0; i < texts.length; i++) {
                    texts[i].value = '';
                }
            }
        }
    };

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', event => {
            event.preventDefault();

            const modalId = event.target.dataset.modalId;
            const modal = document.getElementById(modalId);

            if (modal) {
                const btnClose = modal.querySelector(".modal__close");

                btnClose.addEventListener("click",
                    () => toggleModal(modal, false));

                modal.addEventListener("click", event => {
                    if (event.target.id ===  modalId) {
                        toggleModal(modal, false);
                    }
                });

                toggleModal(modal, true);
            }
        });
    }

    /* Show, hide comments for product on product page */
    const tgglr = document.querySelector(".description__toggler");

    if (tgglr) {
        const prodTxt = tgglr.closest(".description");

        tgglr.addEventListener("click", () => {
            prodTxt.classList.toggle("show");

            tgglr.innerHTML === "Развернуть"
                ? tgglr.innerHTML = "Свернуть"
                : tgglr.innerHTML = "Развернуть";
        });
    }

    /* Click outside any elements */
    document.addEventListener("click", event => {
        const el = event.target.parentElement;

        if (!el.closest('#region')) {
            region.classList.remove("city-select-visible");
        }



        // el.closest('#region') || el.id === "region"

        // Click outside city select
        // if (el.id !== "region" && region.classList.contains("city-select-visible")) {
        //   region.classList.remove("city-select-visible");
        // }
    });

    /* Slider for small image at the block */
    const pics = document.querySelectorAll(".sml-img-slider__item");

    for (let i = 0; i < pics.length; i++) {
        pics[i].addEventListener("click", event => {
            const el = event.target;

            if (el.classList.contains("back")) {
                const before = el.previousElementSibling;
                const after = el.nextElementSibling;
                const parent = el.parentElement;

                if (after) {
                    before.classList.remove("front");
                    el.classList.remove("back");
                    el.classList.add("front");
                    after.classList.add("back");
                    parent.append(before);
                } else {
                    before.classList.remove("front");
                    before.classList.add("back");
                    el.classList.remove("back");
                    el.classList.add("front");
                    parent.append(before);
                }
            }
        });
    }

    /* Breakstone page accordion */
    const bsBtns = document.querySelectorAll(".breakstone__accordion-caption");
    const bsTxts = document.querySelectorAll(".breakstone__accordion-content");
    const closeBreakstoneAccordion = () => {
        for (let i = 0; i < bsBtns.length; i++) {
            bsBtns[i].classList.remove("active");
            bsTxts[i].classList.remove("visible");
        }
    };

    for (let i = 0; i < bsBtns.length; i++) {
        bsBtns[i].addEventListener("click", event => {
            const el = event.target;
            const elCaptionMark = el.dataset.captionMark;
            const elContent = el.parentElement.querySelector(`[data-caption-for="${elCaptionMark}"]`);

            // Off oll buttons and all content blocks
            if (!el.classList.contains("active")) {
                closeBreakstoneAccordion();
            }

            el.classList.toggle("active");
            elContent.classList.toggle("visible");
        });
    }

    /*
     * Работа с городом пользователя.
     *
     * Смтотрим город в Storage, елси его нет, то создаём перемунную
     * с городом по умолчанюи (Москва).
     *
     * Размещаем город по умолчанию в выпадающем меню выбора города
     * в хедере.
     * */
    if (storageAvailable('localStorage')) {
        if(!localStorage.getItem('usrCity')) {
            localStorage.setItem('usrCity', 'Москва'); // Устанавливаем город по умолчанию в localStorage
        }
    }
    else {
        console.log(
            'Браузер не поддерживает localStorage, возможно находится в режиме Инкогнито',
            'Необходима реализация поддержки выбора города на альтернативной технологии.'
        );
    }
    /*
     * Меняем город пользователя по клику на пунке города
     * в выпадающем меню в хедере
     * */
    let cities = document.querySelectorAll(".region__item");
    let cityContainer = document.getElementById("regionCity");

    const activeSelectedCity = () => {
        let usrCity = localStorage.getItem('usrCity');
        let cityItems = document.getElementsByClassName("region__item");

        for (let i = 0; i < cityItems.length; i++) {
            usrCity === cityItems[i].dataset.regionCity
                ? cityItems[i].classList.add('active')
                : cityItems[i].classList.remove('active');
        }
    };

    /* Размещаем город пользователя как выбранный в хедере */
    cityContainer.innerHTML = localStorage.getItem('usrCity');

    /* Делаем выбранный город пользователя скрытым при инициализации страницы */
    activeSelectedCity();

    for (let i = 0; i < cities.length; i++) {
        cities[i].addEventListener("click", event => {
            let cityItem = event.target.closest(".region__item");

            // Получаем город по которому кликнул пользователь
            let city = cityItem.dataset.regionCity
                ? cityItem.dataset.regionCity
                : event.target.closest(".region__item").dataset.regionCity;

            // Меняем город в контейнере
            cityContainer.innerHTML = city;

            // Меняем город пользователя в localStorage
            localStorage.setItem('usrCity', city);

            activeSelectedCity();
        });
    }

    /* Yandex maps -- START
     *
     * Функция ymaps.ready() будет вызвана, когда
     * загрузятся все компоненты API,
     * а также когда будет готово DOM-дерево.
     */
    if (document.getElementById("indexMap")
            || document.getElementById("contactsMap")
            || document.getElementById("deliveryMap")) {
        ymaps.ready(init);
    }
    function init() {
        // Создаём метки один раз, а длее пушим их в нужную карту
        const myPlacemarkMsk = new ymaps.Placemark(
            [55.77380806896347,37.50681899999997],
            {
                balloonContentHeader: "АО «Евробетон»<br>Головной офис в Москве",
                balloonContentBody: "123308, Россия, г. Москва,<br>Силикатный проезд, д. 10, стр. 15"
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/img/mark-contacts.png',
                iconImageSize: [179, 44],
                iconImageOffset: [-15, -44]
            });
        const myPlacemarkKstovo = new ymaps.Placemark(
            [56.179510068572036,44.15730749999993],
            {
                balloonContentHeader: "Кстовский филиал",
                balloonContentBody: "г. Кстово, ул. Магистральная, д. 1"
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/img/mark.png',
                iconImageSize: [36, 43],
                iconImageOffset: [-15, -43]
            });
        const myPlacemarkLipetsk = new ymaps.Placemark(
            [52.60358425779388,39.59623749999995],
            {
                balloonContentHeader: "Липецкий филиал",
                balloonContentBody: "г. Липецк, район Цемзавода, 398027"
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/img/mark.png',
                iconImageSize: [36, 43],
                iconImageOffset: [-15, -43]
            });
        const myPlacemarkGranitstroy = new ymaps.Placemark(
            [56.00991906873449,37.436966],
            {
                balloonContentHeader: "Гранитстрой",
                balloonContentBody: "г. Лобня, Краснополянский проезд, д. 5"
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/img/mark.png',
                iconImageSize: [36, 43],
                iconImageOffset: [-15, -43]
            });
        const myPlacemarkStroyRegion = new ymaps.Placemark(
            [56.86988406782098,60.59384549999995],
            {
                balloonContentHeader: "ООО «СтройРегион-Трейд ЕК»",
                balloonContentBody: "г. Екатеринбург, ул. Артинская, д. 18"
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/img/mark.png',
                iconImageSize: [36, 43],
                iconImageOffset: [-15, -43]
            });
        const myPlacemarkEvrobeton = new ymaps.Placemark(
            [55.77380806896347,37.50681899999997],
            {
                balloonContentHeader: "Москва: ЖБИ АО «Евробетон»",
                balloonContentBody: "г. Москва, 3-й Силикатный проезд, д. 10 , стр. 15"
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/img/mark.png',
                iconImageSize: [36, 43],
                iconImageOffset: [-15, -43]
            });
        const myPlacemarkMedvedkovo = new ymaps.Placemark(
            [55.88525156886214,37.62130049999999],
            {
                balloonContentHeader: "Филиала Медведково АО «ЕВРОБЕТОН»",
                balloonContentBody: "ул. Чермянская, д.5"
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/img/mark.png',
                iconImageSize: [36, 43],
                iconImageOffset: [-15, -43]
            });

        // Карта на Главной старнице
        if (document.getElementById("indexMap")) {
            let map = new ymaps.Map("indexMap", {
                    // Координаты центра карты.
                    // Порядок по умолчанию: «широта, долгота».
                    // Чтобы не определять координаты центра карты вручную,
                    // воспользуйтесь инструментом Определение координат.
                    center: [55.38046857198313,41.687034406250014],
                    // Уровень масштабирования. Допустимые значения:
                    // от 0 (весь мир) до 19.
                    zoom: 6,
                    controls: [],
                });
            // Пушим метки в карту indexMap
            map.geoObjects
                .add(myPlacemarkKstovo)
                .add(myPlacemarkLipetsk)
                .add(myPlacemarkGranitstroy)
                .add(myPlacemarkEvrobeton)
                .add(myPlacemarkMedvedkovo)
                .add(myPlacemarkStroyRegion);
            map.controls.add('zoomControl');
            map.behaviors.disable('scrollZoom');
        }

        // Карта на старнице Контакты
        if (document.getElementById("contactsMap")) {
            let map = new ymaps.Map("contactsMap", {
                    center: [55.77380806896347,37.50681899999997],
                    zoom: 16,
                    controls: [],
                });
            map.geoObjects.add(myPlacemarkMsk);
            map.controls.add('zoomControl');
            map.behaviors.disable('scrollZoom');
        }

        // Карта на старнице Доставка
        if (document.getElementById("deliveryMap")) {
            let map = new ymaps.Map("deliveryMap", {
                    center: [55.907807031377885,37.54312876660157],
                    zoom: 10,
                    controls: [],
                });
            map.geoObjects
                .add(myPlacemarkKstovo)
                .add(myPlacemarkLipetsk)
                .add(myPlacemarkGranitstroy)
                .add(myPlacemarkEvrobeton)
                .add(myPlacemarkMedvedkovo)
                .add(myPlacemarkStroyRegion);
            map.controls.add('zoomControl');
            map.behaviors.disable('scrollZoom');
        }
    }
    /* Yandex maps -- END */

    /* Yandex maps на страницах Производство бетона и Производства щебня бетона товарного -- START */
    if (document.getElementById("prodMap")) {
        const btnsOpenMap = document.getElementsByClassName("open-map");
        const prodMap = document.getElementById('prodMap');
        const btnClose = document.getElementById('prodMapCloser');

        btnClose.addEventListener('click', () => {
            prodMap.classList.remove('visible');
        });

        // Создаём карту
        ymaps.ready(function () {
            let prodYaMap = new ymaps.Map("prodMap", {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                // Чтобы не определять координаты центра карты вручную,
                // воспользуйтесь инструментом Определение координат.
                center: [55.75652310301268,37.616237390624995],
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 5,
                controls: ['default', 'routeButtonControl'],
            });

            // Собираем метки и добавляем на карту
            for (let i = 0; i < btnsOpenMap.length; i++) {
                const coordinate = btnsOpenMap[i].dataset.coord;
                const hint = btnsOpenMap[i].dataset.hintDesc;

                const myPlacemark = new ymaps.Placemark(
                    JSON.parse(coordinate),
                    { balloonContentBody: hint },
                    {
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: '/local/templates/.default/img/mark.png',
                        iconImageSize: [36, 43],
                        iconImageOffset: [-15, -43]
                    }
                );
                // Добавляем созданную метку на карту
                prodYaMap.geoObjects.add(myPlacemark);
            }

            prodYaMap.behaviors.disable('scrollZoom');

            // Открываем крту при клике на люой из кнопок
            for (let i = 0; i < btnsOpenMap.length; i++) {
                btnsOpenMap[i].addEventListener('click', evt => {
                    evt.preventDefault();
                    prodMap.classList.add('visible');

                    //Забираем координаты из кнопки
                    let local = btnsOpenMap[i].dataset.coord;
                    local = JSON.parse(local);
                    //Увеличиваем карту до нужного размера
                    prodYaMap.setZoom(18,{smooth:true,centering:true});
                    //Перемещаем карту к нужной метке
                    prodYaMap.panTo(local);
                });
            }
        });
    }
    /* Yandex maps на странице Производство бетона товарного -- END */







    /* Обработчик отправки формы Сообщение с сайта -- Start */
    const cleanErrs = (name, mail, phone, msg) => {
        // Чистим контейнеры для сообщений об ошибках
        name.nextSibling.innerHTML = '';
        mail.nextSibling.innerHTML = '';
        phone.nextSibling.innerHTML = '';
        msg.nextSibling.innerHTML = '';

        // Удаляем класс ошибки у родительского узла
        name.parentElement.classList.remove('has__error');
        mail.parentElement.classList.remove('has__error');
        phone.parentElement.classList.remove('has__error');
        msg.parentElement.classList.remove('has__error');
    };

    const cleanFields = (name, mail, phone, msg) => {
        name.value = '';
        mail.value = '';
        phone.value = '';
        msg.value = '';
    };

    const form          = document.getElementById('formFeedback');
    const name          = document.getElementById('formFeedbackName');
    const mail          = document.getElementById('formFeedbackMail');
    const phone         = document.getElementById('formFeedbackPhone');
    const msg           = document.getElementById('formFeedbackMsg');
    const modalSetOrder = document.getElementById('modalSetOrder');
    const modalBody     = document.getElementById('modalDialogFeedback');
    const sendMsgTrue   = document.getElementById("sendMsgTrue");
    const btnFBClose    = document.getElementById("btnFBClose");

    btnFBClose
        .addEventListener("click", () =>  toggleModal(modalSetOrder, false));

    form.addEventListener('submit', evt => {
        evt.preventDefault();
        cleanErrs(name, mail, phone, msg);
        let formValid = true;

        if (msg.value === '') {
            let err = msg.nextElementSibling;
            err.innerHTML = 'Напишите вопрос';
            msg.parentElement.classList.add('has__error');
            msg.focus();
            formValid = false;
        }

        if (phone.value === '') {
            let err = phone.nextElementSibling;
            err.innerHTML = 'Укажите телефон';
            phone.parentElement.classList.add('has__error');
            formValid = false;
            phone.focus();
        } else {
            if (validPhone(phone.value) === false) {
                let err =  phone.nextElementSibling;
                err.innerHTML = 'Некорректный телефон';
                phone.parentElement.classList.add('has__error');
                formValid = false;
                phone.focus();
            }
        }

        if (mail.value === '') {
            let err =  mail.nextElementSibling;
            err.innerHTML = 'Укажите e-mail';
            mail.parentElement.classList.add('has__error');
            formValid = false;
            mail.focus();
        } else {
            if (validMail(mail.value) === false) {
                let err =  mail.nextElementSibling;
                err.innerHTML = 'Некорректный e-mail';
                mail.parentElement.classList.add('has__error');
                formValid = false;
                mail.focus();
            }
        }

        if (name.value === '') {
            let err =  name.nextElementSibling;
            err.innerHTML = 'Укажите имя';
            name.parentElement.classList.add('has__error');
            name.focus();
            formValid = false;
        }

        if (formValid) {
            spinner.classList.add('visible');
            getResource(form.action, form)
                .then(response  => {
                    spinner.classList.remove('visible');

                    if (response['IS_ERRORS']) {
                        alert('Сообщение не отправлено. Произошла ошибка. Попробуйте немного позже.')
                    } else {
                        cleanFields(name, mail, phone, msg);
                        modalBody.classList.add('hide');
                        sendMsgTrue.classList.add("visible");
                    }
                });
        }
    });
    /* Обработчик отправки формы Сообщение с сайта -- End */

    /* Обработчик отправки формы "Записать на собеседование" -- Start */
    const cleanErrsVacancy = (
        name, birthday, phone,
        email, position, questionary,
        photo) => {

        // Чистим контейнеры для сообщений об ошибках
        name.nextSibling.innerHTML = '';
        birthday.nextSibling.innerHTML = '';
        phone.nextSibling.innerHTML = '';
        email.nextSibling.innerHTML = '';
        position.nextSibling.innerHTML = '';
        questionary.nextSibling.nextSibling.innerHTML = ''; // у этого инпута span с ошибкой стоит чере одно поле, которое служит для отображения выбранного файла
        photo.nextSibling.nextSibling.innerHTML = ''; // у этого инпута span с ошибкой стоит чере одно поле, которое служит для отображения выбранного файла

        // Удаляем класс ошибки у родительского узла
        name.parentElement.classList.remove('has__error');
        birthday.parentElement.classList.remove('has__error');
        phone.parentElement.classList.remove('has__error');
        email.parentElement.classList.remove('has__error');
        position.parentElement.classList.remove('has__error');
        questionary.parentElement.classList.remove('has__error');
        photo.parentElement.classList.remove('has__error');
    };

    const cleanFieldsVacancy = (
        name, birthday, phone,
        email, position, questionary,
        photo) => {

        name.value = '';
        birthday.value = '';
        phone.value = '';
        email.value = '';
        position.value = '';
        questionary.value = '';
        photo.value = '';
        questionary.nextElementSibling.innerHTML = '';
        photo.nextElementSibling.innerHTML = '';
    };

    const formVacancy        = document.getElementById('formVacancy');
    const nameVacancy        = document.getElementById('formVacancyName');
    const birthdayVacancy    = document.getElementById('formVacancyBirthday');
    const phoneVacancy       = document.getElementById('formVacancyPhone');
    const emailVacancy       = document.getElementById('formVacancyEmail');
    const positionVacancy    = document.getElementById('formVacancyPosition');
    const questionaryVacancy = document.getElementById('formVacancyQuestionary');
    const photoVacancy       = document.getElementById('formVacancyPhoto');

    formVacancy.addEventListener('submit', evt => {
        evt.preventDefault();
        cleanErrsVacancy(
            nameVacancy, birthdayVacancy, phoneVacancy,
            emailVacancy, positionVacancy, questionaryVacancy,
            photoVacancy);
        let formValid = true;

        questionaryVacancy.nextElementSibling.innerHTML = questionaryVacancy.value.split('\\').pop();
        photoVacancy.nextElementSibling.innerHTML = photoVacancy.value.split('\\').pop();

        // Фото можно не добавлять, нет проверки на пустое поле.
        if (photoVacancy.value !== '') {
            let type = photoVacancy
                .files[0]
                .name
                .split(".")
                .splice(-1,1)[0];

            if (!(type === 'jpg' || type === 'gif' || type === 'bmp' || type === 'png' || type === 'jpeg')) {
                let err =  photoVacancy.nextElementSibling.nextElementSibling;
                err.innerHTML = 'Выбранный файл - не картинка. Допускаются файлы jpg, gif, bmp, png, jpeg';
                photoVacancy.parentElement.classList.add('has__error');
                formValid = false;
            }
        }

        if (questionaryVacancy.value === '') {
            let err = questionaryVacancy.nextElementSibling.nextElementSibling;
            err.innerHTML = 'Заполните и прикрепите анкету';
            questionaryVacancy.parentElement.classList.add('has__error');
            formValid = false;
        } else {
            let type = questionaryVacancy
                .files[0]
                .name
                .split(".")
                .splice(-1,1)[0];

            if (!(type === 'txt' || type === 'doc' || type === 'rtf')) {
                let err =  questionaryVacancy.nextElementSibling.nextElementSibling;
                err.innerHTML = 'Ошибка формата. Допускаются txt, doc, rtf';
                questionaryVacancy.parentElement.classList.add('has__error');
                formValid = false;
            }
        }

        if (positionVacancy.value === '') {
            let err = positionVacancy.nextElementSibling;
            err.innerHTML = 'Укажите желаемую должность';
            positionVacancy.parentElement.classList.add('has__error');
            positionVacancy.focus();
            formValid = false;
        }

        if (emailVacancy.value === '') {
            let err = emailVacancy.nextElementSibling;
            err.innerHTML = 'Укажите Ваш Е-мэйл';
            emailVacancy.parentElement.classList.add('has__error');
            emailVacancy.focus();
            formValid = false;
        } else {
            if (validMail(emailVacancy.value) === false) {
                let err =  emailVacancy.nextElementSibling;
                err.innerHTML = 'Е-мэйл указан некорректно';
                emailVacancy.parentElement.classList.add('has__error');
                emailVacancy.focus();
                formValid = false;
            }
        }

        if (phoneVacancy.value === '') {
            let err = phoneVacancy.nextElementSibling;
            err.innerHTML = 'Укажите Ваш телефон';
            phoneVacancy.parentElement.classList.add('has__error');
            phoneVacancy.focus();
            formValid = false;
        } else {
            if (validPhone(phoneVacancy.value) === false) {
                let err =  phoneVacancy.nextElementSibling;
                err.innerHTML = 'Телефон указан некорректно';
                phoneVacancy.parentElement.classList.add('has__error');
                phoneVacancy.focus();
                formValid = false;
            }
        }

        if (birthdayVacancy.value === '') {
            let err = birthdayVacancy.nextElementSibling;
            err.innerHTML = 'Укажите дату рождения';
            birthdayVacancy.parentElement.classList.add('has__error');
            birthdayVacancy.focus();
            formValid = false;
        } else {
            if (validDate(birthdayVacancy.value) === false) {
                let err =  birthdayVacancy.nextElementSibling;
                err.innerHTML = 'Формат даты должен быть ДД.ММ.ГГГГ';
                birthdayVacancy.parentElement.classList.add('has__error');
                birthdayVacancy.focus();
                formValid = false;
            }
        }

        if (nameVacancy.value === '') {
            let err = nameVacancy.nextElementSibling;
            err.innerHTML = 'Заполните поле имя';
            nameVacancy.parentElement.classList.add('has__error');
            nameVacancy.focus();
            formValid = false;
        }

        if (formValid) {
            spinner.classList.add('visible');
            getResource(formVacancy.action, formVacancy)
                .then(response  => {
                    spinner.classList.remove('visible');

                    if (response['IS_ERRORS']) {
                        alert('Данные не добавлены. Произошла ошибка. Попробуйте немного позже.')
                    } else {
                        cleanFieldsVacancy(
                            nameVacancy, birthdayVacancy, phoneVacancy,
                            emailVacancy, positionVacancy, questionaryVacancy,
                            photoVacancy);

                        let modal = document.getElementById('modalVacancy');
                        let modalDialog = modal.getElementsByClassName('send-msg-true')[0];
                        let btnClose = document.getElementById('btnVacancyClose');

                        modal.classList.add('show');
                        body.classList.add('modal-open');
                        modalDialog.classList.add('visible');

                        btnClose.addEventListener('click', () => {
                            modal.classList.remove('show');
                            body.classList.remove('modal-open');
                            modalDialog.classList.remove('visible');
                        });
                    }
                });
        }
    });
    /* Обработчик отправки формы "Записать на собеседование" -- End */







});


/*
 * Функция проверки поддержки localStorage
 * if (storageAvailable('localStorage')) {
 * 	// Yippee! We can use localStorage awesomeness
 * }
 * else {
 * 	// Too bad, no localStorage for us
 * }
 * */
function storageAvailable(type) {
    try {
        let storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

// Полифилы -- Start
(function() {
    // проверяем поддержку
    if (!Element.prototype.closest) {
        // реализуем
        Element.prototype.closest = function(css) {
            let node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function() {
    // проверяем поддержку
    if (!Element.prototype.matches) {
        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('prepend')) {
            return;
        }
        Object.defineProperty(item, 'prepend', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function prepend() {
                let argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    let isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.insertBefore(docFrag, this.firstChild);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
// Полифилы -- End