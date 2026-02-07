// אימות של המסלול שאין שדות ריקים
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

// הוספה של מסלול חדש למאגר
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

  const isEdit = id && id !== "add";
  const url = isEdit ? `/add/${id}` : "/add";
  const method = isEdit ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NAME, LOCATION, RATING, LENGTH_KM }),
    });

    if (res.ok) {
      alert(isEdit ? "Updated successfully!" : "Added successfully!");
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
    error.textContent = "Server error. Please try again later.";
  }
}

// 
async function loadTrail(id) {
  try {
    const res = await fetch(`/trails/${id}`);
    const data = await res.json();

    if (!res.ok) {
      error.textContent = "Failed to load trail";
      return;
    }

    // מילוי השדות
    document.getElementById("trailName").value = data.name;
    document.getElementById("trailLocation").value = data.location;
    document.getElementById("trailRating").value = data.rating;
    document.getElementById("trailLength").value = data.length_km;

    // שינוי טקסט של הכפתור
    addTrail.textContent = "Update Trail";
  } catch (err) {
    console.error(err);
    error.textContent = "Server error";
  }
}

const parts = window.location.pathname.split("/");
const id = parts[parts.length - 1];

if (id && id !== "add") {
  loadTrail(id);
}

addTrail.addEventListener("click", (e) => {
  e.preventDefault();
  addTrailToDB();
});
