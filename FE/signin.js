const signInBtn = document.getElementById("signin");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const error = document.getElementById("error");

async function sendSignInData() {
  error.textContent = "";
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