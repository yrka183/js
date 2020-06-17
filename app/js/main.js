window.onload = function() {

    function burger() {
        let burger = document.querySelector(".burger");
        let burgerIcon = burger.querySelector(".fal");
        let burgerMenu = burger.querySelector(".header__middle-menu");

        burger.addEventListener("click", function (e) {

            if((this.firstElementChild.classList.contains("fa-bars"))) {
              open(this);
              burgerMenu.style.display = "block";
               document.body.style.overflow = "hidden";
            } else if((this.firstElementChild.classList.contains("fa-times"))) {
                close(this);
                burgerMenu.style.display = "none";
                document.body.style.overflow = "visible";
            }
        })

    }

    function open(elem) {
        elem.firstElementChild.classList.add("fa-times");
        elem.firstElementChild.classList.remove("fa-bars");

    }

    function close(elem) {
        elem.firstElementChild.classList.remove("fa-times");
        elem.firstElementChild.classList.add("fa-bars");
    }

    burger();

    function slider () {
        let slider = document.querySelector(".header__block");
        let sliderContent = document.querySelectorAll(".header__slider__content");
        let sliderPrew = document.querySelector(".header__prew");
        console.log(sliderPrew);
        let sliderNavigation = document.querySelectorAll(".header__navigation");
        console.log(sliderNavigation);
        let sliderNext = document.querySelector(".header__next");
        console.log(sliderNext);
        let current =0;
        //listeners

       slider.addEventListener("click",function (e) {
          for(let i = 0; i < sliderContent.length;i++) {
              if(e.target.classList.contains("fa-chevron-square-right")) {
                  sliderContent[i].classList.remove("currentSlide");
                  sliderContent[i]++;
                  sliderContent[i].classList.add("currentSlide")
              }
          }
       });
    }

    slider();
};



