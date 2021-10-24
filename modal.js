function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    document.getElementsByClassName('main-navbar')[0].setAttribute('class', 'main-navbar show')
  } else {
    x.className = "topnav";
    document.getElementsByClassName('main-navbar')[0].setAttribute('class', 'main-navbar')
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
  modalbg.style.display = "flex";
}

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function validate() {
  //we reset old errors
  removeErrors()

  checkFormIsInvalid().then((invalid) => {
    if (!invalid) {
      createSuccessDialog()
    }
  })
}

/**
 * @description Check if the form is valid, set errors messages, and return a boolean
 * @returns boolean : errors
 */
function checkFormIsInvalid() {
  let error = false;
  const inputs = document.getElementsByClassName('checkedControl')
   return fetch('assets/formValidators.json').then((rep) => rep.json()).then((validators) => {
    for (let i = 0; i < inputs.length; i++) {
      const attr = inputs[i].name
      //we need to check if cgu is checked so we test a wrong regex which always return false to trigger the checked verification
      
      if (!(inputs[i].value.match(validators[attr].regex) || inputs[i].checked)) {
        if (attr !== 'cgu') inputs[i].setAttribute('class', 'text-control checkedControl inpError')
        
        createDomError(attr, validators[attr].error)
        error = true
      }
    }
    //we check radio now
    if (!checkRadioIsValid()) {
      let radioDOM = document.getElementsByName('location')
      let span = document.createElement("span")
      span.setAttribute('class', 'error')
      span.innerHTML = 'Veuillez choisir une option.'
      radioDOM[0].parentNode.appendChild(span)
      error = true
    }

    return error
  })

  
}

function createDomError(name, error) {
  let dom = null;
  if (name === 'cgu') dom = document.getElementById('checkbox1')
  else dom = document.getElementById(name)
  let span = document.createElement("span")
  span.setAttribute('class', 'error')
  span.innerHTML = error
  dom.parentNode.appendChild(span)
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

function removeErrors() {
  const errors = document.getElementsByClassName('error')
  let inpError = document.getElementsByClassName('inpError')
  //we reset classname of inputs
  if (inpError.length > 0) {
    for (let i = 0; i < inpError.length; i++) {
      inpError[i].setAttribute('class','text-control checkedControl')
    }
  }
  // we remove errors span
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i++) {
      while (errors[i].firstChild) {
        errors[i].removeChild(errors[i].firstChild);
        
      } 
    }
  }
}

function createSuccessDialog() {
  const form = document.getElementsByName('reserve')[0]
  form.style.display = 'none'
  const popup = document.getElementsByClassName('modal-body')[0]
  //creation of success msg
  const divConfirmMsg = document.createElement('div')
  const confirmMsg = document.createElement('p')
  divConfirmMsg.appendChild(confirmMsg)
  confirmMsg.setAttribute('class', 'confirm')
  divConfirmMsg.setAttribute('class', 'ctnSuccess')
  confirmMsg.innerHTML = "Votre réservation à bien été prise en compte."

  //adapt modal body
  let modal = document.getElementsByClassName('modal-body').item(0).setAttribute('class', 'modal-body successModal')
  popup.appendChild(divConfirmMsg)
}