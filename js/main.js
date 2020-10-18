
'use strict'
$(document).ready(function () {

    /*попап*/

    function openPopup(id, ths) {
        let popup = $(".js-popup[data-id-popup='" + id + "']")
        popup.fadeIn(300);
        $('body').addClass('lock');

        if (popup.hasClass('js-popup-galery')) {
            let closGalery = ths.closest('.js-galery-item');
            popupGalery(closGalery);
        }

    }

    function close_popup() {
        $('.js-popup').fadeOut(300);
        $('body').removeClass('lock');
    }

    $('.js-popup__close').click(close_popup);

    $('.js-btn-popup').click(function (e) {
        e.preventDefault();

        let index_btn_popup = $(this).attr('href');
        openPopup(index_btn_popup, $(this));
    });

    $('.js-prev').click(function (event) {
        event.preventDefault();
    })

    $('.js-popup').click(function (e) {
        let popup = $('.js-popup__wrapp');
        if (!popup.is(e.target) && popup.has(e.target).length === 0)
            close_popup();
    });



    $('.language').click(function (event) {
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

        $('.plan-img__item').each(function (e1, e) {
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

    const $POLYGON = $('.js-svg-g');

    $('.btn-inf').click(function (event, event2) {
        // event.preventDefault();
        event = $(this).closest('.wrapper-buttons').find('.btn-inf.active');
        event.removeClass('active');

        $(this).addClass('active');
        let idFloor = $(this).attr('data-id-btn-inf');

        $('.plan-img__item').each(function (e1, e) {
            e = $(this).closest('.plan-img').find('.plan-img__item.active');
            e1 = $(this).closest('.wrapper-inf-text').find('.plan-img__item.active');
            let idItem = $(this).attr('data-id-inf');

            if (idFloor == idItem) {
                e.removeClass('active');
                e1.removeClass('active');
                $(this).addClass('active');
            }
        });

        let idBtnGenplan = $(this).attr('data-id-genplan');

        $('.wrapper-genplan-img').each(function (e1, e) {
            e = $(this).closest('.genplan__left').find('.wrapper-genplan-img.active');
            e1 = $(this).closest('.svg-content').find('.wrapper-genplan-img.active');
            let idGEnplan = $(this).attr('data-genplan-content');

            if (idBtnGenplan == idGEnplan) {
                e.removeClass('active');
                e1.removeClass('active');
                $(this).addClass('active');
            }
        });

        event2 = $(this).closest('.wrappers-genplan-btn').find('.btn-inf.active');
        event2.removeClass('active');
        $(this).addClass('active');

        $('.wrapper-gen-svg').each(function (e1, e) {
            e = $(this).closest('.wrappers-genplan-btn').find('.wrapper-genplan-img.active');
            e1 = $(this).closest('.all-svg').find('.wrapper-gen-svg.active');
            let idGEnplan = $(this).attr('data-genplan-content');

            if (idBtnGenplan == idGEnplan) {
                e.removeClass('active');
                e1.removeClass('active');
                $(this).addClass('active');
            }
        });


        $POLYGON.removeClass('active');

        $POLYGON.each(function (e, elem) {

            if ($(elem).attr('data-g') == idBtnGenplan) {
                $(elem).addClass('active');
            }
        });
      
    });



    let heightHeader = $(".header").height();
    $('.anchor').css('height', heightHeader);
    $('.anchor').css('margin-top', -heightHeader);
    $('.header__burger').click(function () {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock1');
        $('.header__menu.active').css('top', heightHeader);
    });
    
        $(document).mouseup(function (e) {
            let $target = $(e.target);
            if ($target.closest(".header__menu").length == 0 && $target.closest(".header__burger").length == 0) {
                $('.header__burger,.header__menu').removeClass('active');
            }
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
        centerMode: true,
        centerPadding: 0
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
        if (container.has(e.target).length === 0 && select.has(e.target).length === 0) {
            select.removeClass('is-active');
        }
    });

    select();


    $('.js-cott-img').mousemove(function (e) {
        let ofsetX = (e.pageX - $(this).offset().left);

        $('.js-img-bos').css('width', ofsetX + 'px');
    });

    /*галерея*/
    const $GALERY_ITEM = $('.js-galery-item');
    const $BNT_NEXT = $('.js-bnt-next');
    const $BTN_PREV = $('.js-bnt-prev');
    const $POP_IMG = $('.js-gal-img');
    const $POP_TEXT = $('.js-gal-title');
    const $POP_GALERY = $('.js-popup-galery');

    let dataGalery = [];

    class MyGalery {
        constructor(idPos, id, img, text) {
            this.idPos = idPos;
            this.id = id;
            this.img = img;
            this.text = text;
        }

        set idPos(value) {
            if (value) {
                this._idPos = value;
            }
        }
    }

    for (let i = 0; i < $GALERY_ITEM.length; i++) {
        let galery = new MyGalery(
            $GALERY_ITEM[i].getAttribute('data-it-pos'),
            $GALERY_ITEM[i].getAttribute('data-it'),
            $GALERY_ITEM[i].getAttribute('data-it-img'),
            $GALERY_ITEM[i].getAttribute('data-it-text')
        );

        dataGalery.push(galery);
    }

    function inContent(id, img, text) {
        $POP_GALERY[0].setAttribute('data-pop-gal', id);
        $POP_IMG[0].setAttribute('src', img);
        $POP_TEXT[0].innerText = text;
    }

    function popupGalery(itGalery) {
        let id = itGalery[0].getAttribute('data-it');

        for (let i = 0; i < dataGalery.length; i++) {

            if (dataGalery[i].id == id) {
                inContent(dataGalery[i].id, dataGalery[i].img, dataGalery[i].text);
                $POP_GALERY[0].setAttribute('data-pop-gal', id);

                if (dataGalery[i]._idPos == 'end') {
                    $BNT_NEXT.addClass('no-link');
                } else if (dataGalery[i]._idPos == 'start') {
                    $BTN_PREV.addClass('no-link');
                }

                break;
            }
        }
    }

    $BNT_NEXT.click(function (e) {
        e.preventDefault();

        let ths = $(this);
        let clos = ths.closest('.js-popup-galery');
        let idPop = +clos[0].getAttribute('data-pop-gal');
        idPop += 1;

        for (let i = 0; i < dataGalery.length; i++) {

            if (dataGalery[i].id == idPop) {
                inContent(dataGalery[i].id, dataGalery[i].img, dataGalery[i].text);
                $POP_GALERY[0].setAttribute('data-pop-gal', idPop);

                if ($BTN_PREV.hasClass('no-link')) {
                    $BTN_PREV.removeClass('no-link');
                }

                if (dataGalery[i]._idPos == 'end') {
                    ths.addClass('no-link');
                }

                break;
            }
        }
    });

    $BTN_PREV.click(function (e) {
        e.preventDefault();

        let ths = $(this);
        let clos = ths.closest('.js-popup-galery');
        let idPop = +clos[0].getAttribute('data-pop-gal');
        idPop -= 1;

        for (let i = 0; i < dataGalery.length; i++) {

            if (dataGalery[i].id == idPop) {
                inContent(dataGalery[i].id, dataGalery[i].img, dataGalery[i].text);
                $POP_GALERY[0].setAttribute('data-pop-gal', idPop);

                if ($BNT_NEXT.hasClass('no-link')) {
                    $BNT_NEXT.removeClass('no-link');
                }

                if (dataGalery[i]._idPos == 'start') {
                    ths.addClass('no-link');
                }

                break;
            }
        }
    });

    /*end галерея*/

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