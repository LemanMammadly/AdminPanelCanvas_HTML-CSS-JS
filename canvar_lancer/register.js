"use strict";

let form = document.querySelector("form");

form.addEventListener("submit", Register);

async function Register(e) {
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
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      let result = await response.json();
  } catch (error) {
    console.log(error);
  }
}
