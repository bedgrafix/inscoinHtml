/*
Theme: InsCoin
Author: Andrey Galkin
Version: 1.0
*/

//////////////////////////////////////////////////////////////////
// [ Enable popovers ]

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

//////////////////////////////////////////////////////////////////
// [ Top Menu Shadow ]

window.onscroll = function () {
    const windowScroll = window.scrollY;
    const fixedMenu = document.querySelector('.sticky-heading');
    if (windowScroll > 150) {
        fixedMenu.style.borderBottom = '1px solid #D5D8DE';
    }
    else {
        fixedMenu.style.borderBottom = 'none';
    }
}

//////////////////////////////////////////////////////////////////
// [ Fancybox Lightbox ]
// https://fancyapps.com/fancybox/

Fancybox.bind('[data-fancybox]', {
    // Custom options
});

//////////////////////////////////////////////////////////////////
// [ iMask ]
// https://imask.js.org/guide.html#masked-date

var maskDate = document.querySelectorAll('.maskDate');
maskDate.forEach(function (el) {
    IMask(el, {
        mask: Date,
        min: new Date(1900, 0, 1),
        lazy: false
    });
});

//////////////////////////////////////////////////////////////////
// [Charts]
// https://echarts.apache.org/en/index.html

document.addEventListener('DOMContentLoaded', function () {
    var echart = document.querySelectorAll('.echart-contact-by-source');
    var charts = [];

    echart.forEach(function (el) {
        var chart = echarts.init(el);
        charts.push(chart);

        // Здесь вы можете настроить и нарисовать график с помощью ECharts
        var options = {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: 30,
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        { value: 104000, name: 'ДМС' },
                        { value: 36000, name: 'КАСКО' },
                        { value: 32000, name: 'ОСАГО' },
                        { value: 16000, name: 'Квартира' },
                        { value: 8000, name: 'Страхование б/с' },
                        { value: 4000, name: 'ВЗР' }
                    ]
                }
            ]
        };

        chart.setOption(options);
    });

    // Функция для изменения размеров графиков при изменении размеров окна браузера
    function resizeCharts() {
        charts.forEach(function (chart) {
            chart.resize();
        });
    }

    // Вызов функции resizeCharts при изменении размеров окна браузера
    window.addEventListener('resize', resizeCharts);
});

//////////////////////////////////////////////////////////////////
// [Datepicker]
// https://mymth.github.io/vanillajs-datepicker/

var datepickerInputs = document.querySelectorAll('.datepicker-js');

datepickerInputs.forEach(function (input) {
    new DateRangePicker(input, {
        format: 'dd.mm.yyyy',
        language: 'ru',
    });
});

//////////////////////////////////////////////////////////////////
// [ choices JS ]
// https://choices-js.github.io/Choices/

document.addEventListener('DOMContentLoaded', function () {
    const multipleSelects = document.querySelectorAll('.choices-multiple');

    multipleSelects.forEach(function (el) {
        new Choices(el, {
            removeItems: true,
            removeItemButton: true,
            maxItemCount: 2,
            loadingText: 'Загрузка...',
            noResultsText: 'Результатов не найдено',
            noChoicesText: 'Нет выбора',
            itemSelectText: 'Выбрать',
            uniqueItemText: 'Только уникальные значения',
            customAddItemText: 'Только значения, соответствующие определенным условиям',
            addItemText: (value) => {
                return `Нажмите Enter для добавления <b>"${value}"</b>`;
            },
            maxItemText: (maxItemCount) => {
                return `Только ${maxItemCount} можно добавить`;
            },
        });
    });
});

//////////////////////////////////////////////////////////////////
// [ Скрывать текст по клику ]
document.querySelectorAll('.card-hidden-text').forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('js-open');
    });
});

let rewardItems = document.querySelectorAll('.reward-item');

if (rewardItems.length) {
    rewardItems.forEach(item => {
        const rewardBtn = item.querySelector('.reward-item__btn');
        const rewarContent = item.querySelector('.reward-item__content');

        rewardBtn.addEventListener('click', () => {
            rewardBtn.classList.toggle('active');
            rewarContent.classList.toggle('show');
        });
    });
}

//////////////////////////////////////////////////////////////////
// После авторизации показать окно ввода СМС
const signInForm = document.getElementById('form-auth');
const offcanvasSms = document.getElementById('offcanvas-sms-auth');
const pinCodeForm = document.querySelector('.form-pin-code');
const offcanvasLogofs = document.querySelector('.offcanvas-fullscreen-logo');

if (signInForm) {
    signInForm.addEventListener('submit', function (e) {
        e.preventDefault();
        offcanvasSms.classList.add('show');
    });
}

// pin code
// var pinContainer = document.getElementsByClassName("pin-code")[0];
var pinContainer = document.querySelector(".pin-code-wrap");
console.log('There is ' + pinContainer.length + ' Pin Container on the page.');

pinContainer.addEventListener('keyup', function (event) {
    var target = event.srcElement;

    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
    var myLength = target.value.length;

    if (myLength >= maxLength) {
        var next = target;
        while (next = next.nextElementSibling) {
            if (next == null) break;
            if (next.tagName.toLowerCase() == "input") {
                next.focus();
                break;
            }
        }
    }

    if (myLength === 0) {
        var next = target;
        while (next = next.previousElementSibling) {
            if (next == null) break;
            if (next.tagName.toLowerCase() == "input") {
                next.focus();
                break;
            }
        }
    }
}, false);

pinContainer.addEventListener('keydown', function (event) {
    var target = event.srcElement;
    target.value = "";
}, false);
