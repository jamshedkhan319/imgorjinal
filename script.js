// === আপনার API Key গুলো এখানে বসান ===
const UNSPLASH_KEY = "YOs2WDmFEzBckaZcpIfErIeWRqvL1PvUpIKlCbWKseU";
const GOOGLE_CX = "62384ed4a547c4614";
const GOOGLE_KEY = "AIzaSyC9Z8cVk0jvJkGW7NjieCx8C8zSjXUmhnE";
// =======================================

let page = 1;
let query = "";
let selectedAPI = "unsplash";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const apiSelector = document.getElementById("apiSelector");
const imageGrid = document.getElementById("imageGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

apiSelector.addEventListener("change", () => {
  selectedAPI = apiSelector.value;
});

searchBtn.addEventListener("click", () => {
  query = searchInput.value.trim();
  if (!query) return;
  page = 1;
  imageGrid.innerHTML = "";
  loadMoreBtn.style.display = "none"; // সার্চ শুরু করলে hide
  fetchImages();
});

loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchImages();
});

async function fetchImages() {
  if (!query) return;

  let url = "";
  if (selectedAPI === "unsplash") {
    url = `https://api.unsplash.com/search/photos?page=${page}&per_page=10&query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}`;
  } else if (selectedAPI === "google") {
    url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${GOOGLE_CX}&searchType=image&start=${(page-1)*10+1}&key=${GOOGLE_KEY}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    let images = [];

    if (selectedAPI === "unsplash") {
      images = (data.results || []).map(img => img.urls?.small).filter(Boolean);
    } else if (selectedAPI === "google") {
      if (!data.items) {
        if (page === 1) imageGrid.innerHTML = "<p>No images found!</p>";
        return;
      }
      images = data.items.map(item => item.link).filter(Boolean);
    }

    if (images.length === 0 && page === 1) {
      imageGrid.innerHTML = "<p>No images found!</p>";
      return;
    }

    images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Image Result";
      img.loading = "lazy";

      // ইমেজ লোড না হলে রিমুভ করে দাও
      img.onerror = function () {
        this.remove();
      };

      img.onclick = () => openViewPage(src);
      imageGrid.appendChild(img);
    });

    if (images.length > 0) {
      loadMoreBtn.style.display = "block";
    }

  } catch (err) {
    console.error("Error fetching images:", err);
    if (page === 1) {
      imageGrid.innerHTML = "<p>Error loading images.</p>";
    }
  }
}

function openViewPage(src) {
  localStorage.setItem("selectedImageURL", src);
  window.location.href = "download.html";
}
