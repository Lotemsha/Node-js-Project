const signInBtn = document.getElementById("signin");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const error = document.getElementById("error");

// בדיקת שם: אותיות בלבד ולפחות 2 תווים
function isValidName(name) {
  const nameRegex = /^[A-Za-z0-9]{2,}$/;
  return nameRegex.test(String(name).toLowerCase());
}

// בדיקת סיסמה: אלפאנומרית, 3–8 תווים, לפחות ספרה אחת ולפחות אות אחת
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{3,8}$/;
  return passwordRegex.test(password);
}

function validateEmail(email) {
  // Method to validate email (פונקצייה מיובאת)
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// שליחת המשתמש החדש
async function sendSignInData() {
  error.textContent = "";

  if (!isValidPassword(password.value) || !isValidName(userName.value)) {
    error.textContent = "Unvalid user name or password";
    return;
  }

  if (!validateEmail(email.value)) {
    error.textContent = "Unvalid email";
    return;
  }

  try {
    const res = await fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: userName.value,
        password: password.value,
        email: email.value,
      }),
    });

    if (res.ok) {
      alert("Sign up successful!");
      window.location.href = "/login.html";
      return;
    }

    switch (res.status) {
      case 400:
        error.textContent = "Missing fields";
        break;
      case 422:
        error.textContent = "Please enter a valid email";
        break;
      case 409:
        error.textContent = "User already exists";
        break;
      default:
        error.textContent = "Server error";
    }
  } catch {
    alert("Server error. Please try again later.");
  }
}

function handleSignInClick(e) {
  e.preventDefault();
  sendSignInData();
}

signInBtn.addEventListener("click", handleSignInClick);
