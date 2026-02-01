const signInBtn = document.getElementById("singUpBtn");

logInBtn.addEventListener("click", () => {
  handleLogin();
});

singUpBtn.addEventListener("click", () => {
  window.location.href = "/signIn.html";
});

async function handleLogin() {
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error");

  errorEl.textContent = "";

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: userName,
        password: password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/home";
    } else {
      errorEl.textContent = "Login failed";
    }
  } catch (err) {
    console.error("Login error:", err);
    errorEl.textContent = "Server error. Please try again later.";
  }
}
