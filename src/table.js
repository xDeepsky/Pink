"use strict";
function table() {
    let table = document.querySelector('.slider-price--wrapper'),
        priceButtons = document.querySelector('.price__toggles'),
        btnToggles = priceButtons.querySelectorAll('.toggle'),
        btnLeft = priceButtons.querySelector('.toggle-left'),
        btnCenter = priceButtons.querySelector('.toggle-center'),
        btnRight = priceButtons.querySelector('.toggle-right');

        function hideBtn() {
            btnToggles.forEach((btn) => {
                btn.classList.remove('toggle--current');
            });
        };

        function currentBtn(i = 1) {
            btnToggles[i].classList.add('toggle--current');
        }

    hideBtn()
    currentBtn();

    priceButtons.addEventListener('click', function(evt) {
        let target = evt.target;
        if (target && target.classList.contains('toggle')) {
            for (let i = 0; i < btnToggles.length; i++) {
                switch (target) {
                    case btnLeft: 
                        hideBtn();
                        currentBtn(0);
                        table.style.transform = `translateX(33.3%)`;
                        return;
                    case btnCenter:
                        hideBtn();
                        currentBtn(1);
                        table.style.transform = ``;
                        return;
                    case btnRight:
                        hideBtn();
                        currentBtn(2);
                        table.style.transform = `translateX(-33.3%)`;
                        return;
                }
            }
        }
        
    });

    window.addEventListener(`resize`, event => {
        if (window.innerWidth > 659) {
            table.style.transform = ``;
            currentBtn();
        };
    }, false);
};

export default table;