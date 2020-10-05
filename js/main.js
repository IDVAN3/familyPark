
'use strict'
$(document).ready(function() {

    /*ibg*/

    function ibg() {
        $.each($('.ibg'), function(index, val) {
            if ($(this).find('img').length > 0) {
                let src_img = $(this).find('img').attr('src');
                $(this).css('backgroundImage', 'url("' + src_img + '")');
            }
        });
    }

    ibg();

    // function openGalery(id) {
    //     $(".galery-sub__item[data-galery='" + id + "']").fadeIn(300);
    // }

    // function closeGalery() {
    //     $('.galery-sub__item').fadeOut(300);
    // }

    // $('.galery-sub__item').click(function(e) {
    //     e.preventDefault();
    //     let index_btn_popup = $(this).attr('href');
    //     openPopup(index_btn_popup);
    // });

    /*попап*/

    function openPopup(id) {
        $(".js-popup[data-id-popup='" + id + "']").fadeIn(300);
    }

    function close_popup() {
        $('.js-popup').fadeOut(300);
    }

    $('.js-popup__close').click(close_popup);

    $('.js-btn-popup').click(function(e) {
        e.preventDefault();
        let index_btn_popup = $(this).attr('href');
        openPopup(index_btn_popup);
    });

    $('.js-prev').click(function(event) {
        event.preventDefault();
        
    })

    $('.js-popup').click(function(e) {
        let popup = $('.js-popup__wrapp');
        if (!popup.is(e.target) && popup.has(e.target).length === 0)
            close_popup();
    });

    $('.language').click(function(event) {
        event = $(this).closest('.list-language').find('.language.active');
        event.removeClass('active');
        $(this).addClass('active');
    })

    $('.floor-btn').click(function (event) {
        event.preventDefault();
        event = $(this).closest('.wrapper-btns').find('.floor-btn.active');
        event.removeClass('active');
        $(this).addClass('active');
        let idFloor = $(this).attr('data-id-floor');

        $('.plan-img__item').each(function(e1, e) {
            e = $(this).closest('.plan-img').find('.plan-img__item.active');
            e1 = $(this).closest('.wrapper-info').find('.plan-img__item.active');
            let idItem = $(this).attr('data-id-item');
            
            if (idFloor == idItem) {
                e.removeClass('active');
                e1.removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    let heightHeader = $(".header").height();
    $('.header__burger').click(function(event) {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
        $('.header__menu.active').css('top', heightHeader);
    });

    //slider 
    $('.house-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [{
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.sliderbig').slick({
        arrows: false,
        fade: true,
        asNavFor: ".slider-product",
    });

    $('.slider-product').slick({
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".sliderbig",
        focusOnSelect: true,
    });

    //end slider

    let select = function () {
        let selectHeader = document.querySelectorAll('.select__header');
        let selectItem = document.querySelectorAll('.select__item');

        selectHeader.forEach(item => {
            item.addEventListener('click', selectToggle);
        });

        selectItem.forEach(item => {
            item.addEventListener('click', selectChoose);
        });

        function selectToggle() {
            //add 
            $('.is-active').removeClass('is-active')
            this.parentElement.classList.toggle('is-active');
            
        }

        function selectChoose() {
            let text = this.innerText,
                select = this.closest('.select'),
                currentText = select.querySelector('.select__current');
            currentText.innerText = text;
            select.classList.remove('is-active');

        }

    };


    let container = $(".select__body");
    
    $(document).mouseup(function (e) {
        select = $('.select');
        if (container.has(e.target).length === 0 &&  select.has(e.target).length === 0){
            select.removeClass('is-active');
        }       
    });

    select();
    
});
/*кнопка прокрутки вверх*/

const offset = 100;
const scrollUp = document.querySelector('.js-scroll-up');
const scrollUpSvgPath = document.querySelector('.js-scroll-up__path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = '\'' + pathLength + pathLength + '\'';
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

// getTop
const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

//updateDashoffset

const updateDashoffset = () => {
    const heigth = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / heigth);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
}

// onScroll
window.addEventListener('scroll', () => {
    updateDashoffset();
    getTop() > offset ? scrollUp.classList.add('scroll-up_active') : scrollUp.classList.remove('scroll-up_active');
});

// click
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

/*скрол по якорю*/