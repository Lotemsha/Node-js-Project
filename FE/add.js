function validateTrail({ NAME, LOCATION, RATING, LENGTH_KM }) {
  if (!NAME.trim() || !LOCATION.trim() || !RATING || !LENGTH_KM) {
    error.textContent = "All fields are required";
    return false;
  }

  if (isNaN(RATING) || RATING < 1 || RATING > 5) {
    error.textContent = "Rating must be between 1 and 5";
    return false;
  }

  if (isNaN(LENGTH_KM) || LENGTH_KM <= 0) {
    error.textContent = "Length must be a positive number";
    return false;
  }

  return true;
}

async function addTrailToDB() {
  const trailName = document.getElementById("trailName");
  const location = document.getElementById("trailLocation");
  const rating = document.getElementById("trailRating");
  const length_km = document.getElementById("trailLength");

  const NAME = trailName.value;
  const LOCATION = location.value;
  const RATING = rating.value;
  const LENGTH_KM = length_km.value;

  error.textContent = "";

  if (!validateTrail({ NAME, LOCATION, RATING, LENGTH_KM })) return;

  try {
    const res = await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NAME, LOCATION, RATING, LENGTH_KM }),
    });

    if (res.ok) {
      alert("Added successfully!");
      window.location.href = "/home.html";
      return;
    }

    switch (res.status) {
      case 400:
        error.textContent = "Missing fields";
        break;
      case 409:
        error.textContent = "Trail already exists";
        break;
      default:
        error.textContent = "Server error";
    }
  } catch {
    alert("Server error. Please try again later.");
  }
}

addTrail.addEventListener("click", (e) => {
  e.preventDefault();
  addTrailToDB();
});
