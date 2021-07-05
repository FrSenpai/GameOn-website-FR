function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close")
//modal event to trigger closing
closeBtn.forEach((btn) => btn.addEventListener('click', () => closeModal()))

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function validate() {
  //we reset old errors
  const errors = document.getElementsByClassName('error')
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i++) {
      while (errors[i].firstChild) errors[i].removeChild(errors[i].firstChild);
    }
  }

  const invalid = checkFormIsInvalid()
  console.log(invalid)
}

/**
 * @description Check if the form is valid, set errors messages, and return a boolean
 * @returns boolean : errors
 */
function checkFormIsInvalid() {
  //DOM elements
  const firstname = document.getElementById('first').value
  const lastname = document.getElementById('last').value
  const email = document.getElementById('email').value
  const regexEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  const quantity = document.getElementById('quantity').value
  const cgu = document.getElementById("checkbox1").checked
  let error = false; 

  if (firstname.length < 2) {
    let firstnameDOM = document.getElementById('first')
    let span = document.createElement("span")
    span.setAttribute('class', 'error')
    span.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    firstnameDOM.parentNode.appendChild(span)
    error = true
  }

  if (lastname.length < 2) {
    let lastnameDOM = document.getElementById('last')
    let span = document.createElement("span")
    span.setAttribute('class', 'error')
    span.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    lastnameDOM.parentNode.appendChild(span)
    error = true
  }

  if (!email.match(regexEmail)) {
    let emailDOM = document.getElementById('email')
    let span = document.createElement("span")
    span.setAttribute('class', 'error')
    span.innerHTML = "Veuillez entrer une adresse mail valide."
    emailDOM.parentNode.appendChild(span)
    error = true
  }

  if (!quantity) {
    let quantityDOM = document.getElementById('quantity')
    let span = document.createElement("span")
    span.setAttribute('class', 'error')
    span.innerHTML = "Veuillez renseigner votre nombre de tournois."
    quantityDOM.parentNode.appendChild(span)
    error = true
  }

  if (quantity > 99) {
    let quantityDOM = document.getElementById('quantity')
    let span = document.createElement("span")
    span.setAttribute('class', 'error')
    span.innerHTML = "Le nombre de tournois ne doit pas dépasser 99."
    quantityDOM.parentNode.appendChild(span)
    error = true
  }

  if (!checkRadioIsValid()) {
    let radioDOM = document.getElementsByName('location')
    let span = document.createElement("span")
    span.setAttribute('class', 'error')
    span.innerHTML = 'Veuillez choisir une option.'
    radioDOM[0].parentNode.appendChild(span)
    error = true
  }

  if (!cgu) {
    let quantityDOM = document.getElementById('checkbox1')
    let span = document.createElement("span")
    span.setAttribute('class', 'error')
    span.innerHTML = "Veuillez accepter les CGU."
    quantityDOM.parentNode.appendChild(span)
    error = true
  }
  return error
}

/**
 * @description Check if a radio button is checked
 * @returns a boolean --> true if one radio is checked
 */
function checkRadioIsValid() {
  const radio = document.getElementsByName('location')
  let countChecked = 0;
  radio.forEach((r) => {
    if (r.checked) countChecked++;
  })
  return countChecked > 0
}