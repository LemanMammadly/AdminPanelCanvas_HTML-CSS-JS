"use strict";

let bars = document.querySelector("#bars");
let menuMobile = document.querySelector(".menu-header-mobile");
let xmark = document.querySelector("#xmark");

bars.addEventListener('click', () => {
  menuMobile.classList.toggle("d-none");
  menuMobile.classList.remove("close");
});

xmark.addEventListener('click', () => {
    menuMobile.classList.toggle("d-none");
    menuMobile.classList.add("close");
});

