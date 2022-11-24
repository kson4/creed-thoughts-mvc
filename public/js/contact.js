const contactFormBtn1 = document.querySelector("#contact-form-1");
const contactFormBtn2 = document.querySelector("#contact-form-2");
const contactFormBtn3 = document.querySelector("#contact-form-3");
const contactFormBtn4 = document.querySelector("#contact-form-4");
const conditionAgreeBtn = document.querySelector(".condition-agree");
const contactFormContainer = document.querySelector(".contact-form-container");
const contactForm = document.querySelector(".contact-form");
conditionAgreeBtn.addEventListener("click", () => {
  if (
    contactFormBtn1.checked &&
    contactFormBtn2.checked &&
    contactFormBtn3.checked &&
    contactFormBtn4.checked
  ) {
    contactFormContainer.style.visibility = "hidden";
    contactForm.style.visibility = "visible";
  } else {
    alert("You must confirm all four roles");
  }
});
