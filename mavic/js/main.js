$(function () {
  $('.products__slider').slick({
    prevArrow:
      '<botton class="slider-btn slider-btn__left"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.21839 1L1 9L9.21839 17"/></svg></botton>',
    nextArrow:
      '<botton class="slider-btn slider-btn__right"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.78161 17L9 9L0.78161 1"/></svg></botton>',
    infinite: false,
  });

  $('.questions__item-title').on('click', function () {
    console.log('click');
    $('.questions__item').removeClass('questions__item--active');
    $(this).parent().addClass('questions__item--active');
  });
});

const openMenu = document.querySelector('.burger__menu');
const pageSectionWrapper = document.querySelector('.page-section__wrapper');
const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const headerPhone = document.querySelector('.header__phone');

openMenu.addEventListener('click', () => {
  openMenu.classList.toggle('open__menu');
  pageSectionWrapper.classList.toggle('open__menu');
  header.classList.toggle('open__menu');
  menu.classList.toggle('open__menu');
  headerPhone.classList.toggle('open__menu');
});
