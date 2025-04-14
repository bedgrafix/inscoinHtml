/*
Theme: InsCoin
Author: Andrey Galkin
Version: 1.0
*/

document.addEventListener('click', e => {
    const $target = e.target.closest('.dropdown-item');
    if( $target && $target.closest('[data-dropdown-set-val]') ) {
        e.preventDefault();
        const $input = $target.closest('[data-dropdown-set-parent]').querySelector('[data-bs-toggle="dropdown"]');
        if( $input ) $input.value = $target.querySelector('span').innerText;
    }
});

document.addEventListener('change', e => {

    const $target = e.target.closest('[data-change-trigger]');

    if( $target ) {

        const id = $target.getAttribute('data-change-trigger');
        const showVal = $target.getAttribute('data-show-with-val');
        const $syncBlock = document.querySelector(`[data-id="${id}"]`);


        if( showVal == $target.value || ( typeof $target.checked != 'undefined' && showVal == $target.checked.toString()) ) {
            $syncBlock.classList.remove('d-none');
        } else {
            $syncBlock.classList.add('d-none');
        }

    }
});


const inputs = document.querySelectorAll('[data-sync-id]');

function updateDateMask(el) {
    IMask(el, {
        mask: Date,
        min: new Date(1900, 0, 1),
        lazy: false
    });
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const syncGroup = input.getAttribute('data-sync-id');
        const value = input.value;
        const $syncInputs = document.querySelectorAll(`[data-sync-id='${syncGroup}']`);

        // Синхронизируем все инпуты с тем же атрибутом data-sync

        $syncInputs.forEach(otherInput => {
            if (otherInput !== input) {
                otherInput.value = value;

                updateDateMask(otherInput);
                calcPoliseEnd(otherInput);

            }
        });
    });
});



function getFormattedDate(date) {
    let day = String(date.getDate()).padStart(2, '0'); // ДД
    let month = String(date.getMonth() + 1).padStart(2, '0'); // ММ (месяцы начинаются с 0)
    let year = date.getFullYear(); // ГГГГ

    return `${day}${month}${year}`;
}

function addMonths(date, months, dayOut = 0) {
    const newDate = new Date(date);
    // console.log(newDate)
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setDate(newDate.getDate() - dayOut);
    return newDate;
}


document.addEventListener('input', e => {
    const $target = e.target.closest('[data-polise-start]');

    if( $target ) {

        if($target.value.replace(/[._]/g, '').length == 8) {
            calcPoliseEnd($target);
        }
    }

});

function removeFirstLeadingZero(str) {
    return str.replace(/^0/, '');
}

function calcPoliseEnd($target) {
    const selectedMonth = +$target.closest('[data-polise-parent]').querySelector('[data-polise-month]').value;
    const $poliseEnd = $target.closest('[data-polise-parent]').querySelector('[data-polise-end]');

    // console.log(Date.parse($target.value))

    const year = $target.value.split('.')[2];
    const month = removeFirstLeadingZero($target.value.split('.')[1]) - 1;
    const day = removeFirstLeadingZero($target.value.split('.')[0]);

    let date = new Date(year, month, day);


    let newDate = addMonths(date, selectedMonth, 1);

    newDate = getFormattedDate(newDate)

    $poliseEnd.value = newDate;

    updateDateMask($poliseEnd);
}


document.addEventListener('change', e => {
    if( e.target.closest('[data-polise-month]') ) {
        calcPoliseEnd(e.target.closest('[data-polise-parent]').querySelector('[data-polise-start]'));
    }
});



//////////////////////////////////////////////////////////////////
// [ Enable popovers ]

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

//////////////////////////////////////////////////////////////////

// [ Enable tooltips ]
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

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

////////////////////////////////////////////////////////////////////

// custom dropdown selection

document.addEventListener('click', e => {

    const $target = e.target.closest('.dropdown-item');

    if( $target && $target.closest('.js-dropdown-selection') ) {

        const $parent = $target.closest('.js-dropdown-selection');
        const $titleContainer = $parent.querySelector('[data-dropdown-title]');
        const title = $target.innerText;

        $parent.classList.add('js-active');
        $titleContainer.innerText = title;
        $titleContainer.closest('.dropdown-toggle').classList.add('js-dropdown-clear');

        if( $target.getAttribute('data-dropdown-link') ) {
            const $input = $parent.querySelector('[data-dropdown-input]');
            $input.value = $target.getAttribute('data-value');
            $input.dispatchEvent(new Event('change'));
        }

    }

    if( e.target.closest('.js-dropdown-clear') ) {
        const $target = e.target.closest('.js-dropdown-clear');
        e.preventDefault();
        e.stopPropagation();

        const $titleContainer = $target.querySelector('[data-dropdown-title]');
        $titleContainer.innerText = $titleContainer.getAttribute('data-dropdown-title');
        const $parent = $target.closest('.js-dropdown-selection');
        $parent.classList.remove('js-active');
        const $input = $parent.querySelector('[data-dropdown-input]');

        if( $input ) {
            $input.value = '';
            $input.dispatchEvent(new Event('change'));
        }

    }

});

document.addEventListener('keyup', e => {
   const $target = e.target.closest('[data-search-input]');

   if( $target ) {
       const $parent = $target.closest('.search-data');
       if( $target.value ) {
           $parent.classList.add('js-filled');
       } else {
           $parent.classList.remove('js-filled');
       }
   }

});

document.addEventListener('click', e => {
    const $target = e.target.closest('[data-clear-search]');

    if( $target ) {
        $target.closest('.search-data').classList.remove('js-filled');
        $target.closest('.search-data').querySelector('.search-data__input').value = '';
    }

});

// end custom dropdown selection
