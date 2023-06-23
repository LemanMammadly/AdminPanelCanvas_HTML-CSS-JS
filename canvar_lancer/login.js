"use strict";

let form = document.querySelector("form");

form.addEventListener("submit", Login);

async function Login(e) {
  e.preventDefault();

  let API_KEY = "AIzaSyB33sfYTu0ksWrqVIkLvhmlHv4DC_Qh2jo";
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#pass").value;

  let user = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    let response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let result = await response.json();

    if (result.idToken) {
      let admin="../admin_canvas/index.html"
      location.replace(admin);
    }
  } catch (error) {
    console.log(error);
  }
}
