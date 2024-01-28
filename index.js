"use strict";

class App {
  // variables for stikcy navigation
  prevScrollY = window.scrollY;
  isSticky = false;

  // variables for carousel
  carouselContainer = document.querySelector(".carousel-container");
  allSlides = document.querySelectorAll(".carousel-items");
  slide1 = document.querySelector(".carousel-page-1");
  slide2 = document.querySelector(".carousel-page-2");
  slide3 = document.querySelector(".carousel-page-3");
  slidesPositionArr = [-100, 0, 100];
  allDots = document.querySelectorAll(".dot");
  currentSlide = 0;
  maxSlide = this.allSlides.length - 1;

  intervalId = this.myInterval(this.carouselSelfMove);

  // variables for questions section
  questions = document.querySelector(".questions-container");
  answersButton = document.querySelector(".questions-container");
  answers = document.querySelectorAll(".answer-container");

  constructor() {
    this.openMenu();
    this.stickyHeader();
    this.carouselMove();
    this.openAnswer();
  }

  // open navigation menu for mobile
  openMenu() {
    document.querySelector("header").addEventListener("click", (e) => {
      if (
        e.target.closest(".header-button-container") &&
        e.target.closest(".header-button-container") ==
          document.querySelector(".header-button-container")
      ) {
        document.querySelector("nav").classList.toggle("not-visible");
        document
          .querySelector(".header-open-menu-container")
          .classList.toggle("header-open-menu-position-absolute");
        document
          .querySelector(".header-button-nav-container")
          .classList.toggle("header-button-nav-container-open");
        document.querySelector(".line-1").classList.toggle("line-1-animation");
        document.querySelector(".line-2").classList.toggle("line-2-animation");
        document.querySelector(".line-3").classList.toggle("line-3-animation");
      }
    });
  }

  // show navigation when scroll up
  stickyHeader() {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < this.prevScrollY && !this.isSticky) {
        this.isSticky = true;
        document.querySelector("header").classList.add("sticky");
      }
      // Check if scrolling down and already sticky
      else if (currentScrollY > this.prevScrollY && this.isSticky) {
        this.isSticky = false;
        document.querySelector("header").classList.remove("sticky");
      }
      this.prevScrollY = currentScrollY;
    });
  }

  carouselMove() {
    // store interval
    this.intervalId = this.myInterval(this.carouselSelfMove);

    // use event pagination and closest method to have only one event listener for arrows and dots
    this.carouselContainer.addEventListener("click", (e) => {
      this.carouselMoveWithDots(e);
      this.carouselMoveWithArrow(e);
    });
  }

  myInterval(myFunc) {
    return setInterval(myFunc, 2000);
  }

  carouselMoveWithDots(e) {
    if (e.target.closest(".dot")) {
      // clear interval to stop on selected slide
      clearInterval(this.intervalId);

      // update currentSlide value
      this.currentSlide >= 3 ? (this.currentSlide = 0) : this.currentSlide++;
      this.currentSlide = e.target.closest(".dot").dataset.index - 1;

      // this.allSlides[this.currentSlide].style.transform = `translateX(0%)`;

      // show selected slide and hide others
      this.allSlides.forEach((slide, i) => {
        if (i === this.currentSlide) {
          slide.style.transform = `translateX(0%)`;
          slide.style.visibility = `visible`;
        } else {
          slide.style.transform = `translateX(${100}%)`;
          this.activeCarouselDots();
        }
      });

      // run interval to strat from selected slide
      this.intervalId = this.myInterval(this.carouselSelfMove);
    }
  }

  carouselMoveWithArrow(e) {
    // move to left
    if (e.target.closest(".arrow-left")) {
      this.currentSlide - 1 < 0 ? (this.currentSlide = 2) : this.currentSlide--;

      this.helperCarouselMoveWithArrow();
    }
    // move to right
    if (e.target.closest(".arrow-right")) {
      this.currentSlide + 1 > 2 ? (this.currentSlide = 0) : this.currentSlide++;

      this.helperCarouselMoveWithArrow();
    }
  }

  // this function is for function carouselMoveWithArrow to not repeat yourself
  helperCarouselMoveWithArrow() {
    // clear interval to stop on selected slide
    clearInterval(this.intervalId);

    this.helperHideVisibleSlides();

    this.activeCarouselDots();

    // run interval to strat from selected slide
    this.intervalId = this.myInterval(this.carouselSelfMove);
  }

  // this function is for interval to move slides automatically
  carouselSelfMove = () => {
    // define current slide
    this.currentSlide == 2 ? (this.currentSlide = 0) : this.currentSlide++;

    this.helperHideVisibleSlides();
    
  };

  // helper function: hide/make visible slides
  helperHideVisibleSlides() {
    this.allSlides.forEach((el, i) => {
      if (i - this.currentSlide != 0) {
        el.style.visibility = "hidden";
      } else {
        el.style.visibility = "visible";

        el.style.transform = `translateX(${100 * (i - this.currentSlide)}%)`;
      }
    });
    this.activeCarouselDots();
  }

  // function for dots to follow active slide
  activeCarouselDots() {
    // remove active from all dots
    this.allDots.forEach((dot, i) => {
      if (i != this.currentSlide && dot.classList.contains("active")) {
        dot.classList.remove("active");
      }

      // active dot for activeslide
      if (!dot.classList.contains("active")) {
        this.allDots[this.currentSlide].classList.add("active");
      }
    });
  }

  // function for questions/answers section
  openAnswer() {
    this.answersButton.addEventListener("click", (e) => {
      if (e.target.closest(".question-title-icon")) {
        const answerContainer = e.target
          .closest(".question")
          .querySelector(".answer-container");

        // make visible chosen answer and hide others
        this.answers.forEach((el, i) => {
          if (
            +answerContainer.getAttribute("data-answer-id") === i &&
            el.style.display === "none"
          ) {
            el.style.display = "block";
          } else {
            el.style.display = "none";
          }
        });
      }
    });
  }
}

const myApp = new App();
