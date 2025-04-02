function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    return isEmailValid && isNameValid;
}

function validateName() {
    let x = document.forms["form"]["name"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }

    return true;
}

function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const email = emailInput.value.trim();

    emailError.textContent = "";
    emailError.style.display = "none";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = "Invalid email address.";
        emailError.style.display = "block";
        return false;
    }

    return true;
}