//Slider
let titleSlider = new Swiper('.title-slider__swiper', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.title-slider__arrow-right',
        prevEl: '.title-slider__arrow-left',
    },
});

// header menu Burger
const burger = document.querySelector('.burger');
const headerMenu = document.querySelector('.header__list');

if(burger) {
    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        headerMenu.classList.toggle('active');
    });
}

if(headerMenu) {
    headerMenu.addEventListener('click', function() {
        headerMenu.classList.remove('active');
        burger.classList.remove('active');
    });
}

//form mask input tel.
let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+38 (999) 999-99-99');
im.mask(selector);

//validate form
'use strict'


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('sending');
            let response = await fetch('sendmail.php', {
                method: 'POST', // method: 'GET',
                body: formData,
            });
            if(response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('sending');
            } else {
                alert('Помилка');
                form.classList.remove('sending');
            }

        } else {
            alert('Заповніть обовязкові поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');

        for(let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('email')) {
                if(emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            // } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
            //     formAddError(input);
            //     error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
})