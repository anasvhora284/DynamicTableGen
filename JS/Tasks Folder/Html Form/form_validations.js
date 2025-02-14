// Function for password validation
function validatePassword() {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  if (!regex.test(password)) {
    alert(
      "Password must contain at least one number, one uppercase and one lowercase letter, and at least 6 or more characters"
    );
    return false;
  }

  if (password !== confirm_password) {
    alert("Password and Confirm Password do not match");
    return false;
  }
  return true;
}

// Function for validating details field
function validateDetails() {
  const details = document.getElementById("details").value;
  if (details.length < 10) {
    alert("Details must be at least 10 characters long.");
    return false;
  }
  return true;
}

// Function for validating the date of birth
function validateDate() {
  const dob = document.getElementById("dob").value;
  const dobDate = new Date(dob);
  const currentDate = new Date();
  if (dobDate > currentDate) {
    alert("Date of Birth cannot be in the future");
    return false;
  } else if (dobDate.getFullYear() < currentDate.getFullYear() - 100) {
    alert("Date of Birth cannot be more than 100 years old");
    return false;
  }
  return true;
}

// Function for validating age
function validateAge() {
  const age = parseInt(document.getElementById("age").value);
  const dob = new Date(document.getElementById("dob").value);
  const currentYear = new Date().getFullYear();
  const calculatedAge = currentYear - dob.getFullYear();

  if (age < 0 || age > 120) {
    alert("Please enter a valid age between 0 and 120.");
    return false;
  }

  if (age !== calculatedAge) {
    alert("Age does not match the Date of Birth.");
    return false;
  }

  return true;
}

// Function for printing form data
function print_form_data(event) {
  event.preventDefault();
  if (
    validatePassword() &&
    validateDetails() &&
    validateDate() &&
    validateAge()
  ) {
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    alert(JSON.stringify(formObject));
    clearFormData();
  }
}

//Function for clearing form data
function clearFormData() {
  document.getElementById("form").reset();
}
