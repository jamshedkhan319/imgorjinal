= "AIzaSyC9Z8cVk0jvJkGW7NjieCx8C8zSjXUmhnE";

let page = 1;
let query = "";
let selectedAPI = "google";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const apiSelector = document.getElementById("apiSelector");
const imageGrid = document.getElementById("imageGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// API select change
apiSelector.addEventListener("change", () => {
  selectedAPI = apiSelector.value;
});

// Search button click
searchBtn.addEventListener("click", () => {
  query = searchInput.value.trim();
  if (!query) return;
  page = 1;
  imageGrid.innerHTML = "";
  loadMoreBtn.style.display = "none";
  fetchImages();
});

// Load more button
loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchImages();
});

async function fetchImages() {
  selectedAPI = apiSelector.value;
  if (!query) return;

  // ✅ যদি query "jk" হয়, তাহলে আলাদা JS ফাইল থেকে লোড করবো
  if (query.toLowerCase() === "jk") {
    loadMyJKImages(imageGrid, loadMoreBtn); // আলাদা ফাইলের ফাংশন কল
    return;
  }

  // ✅ অন্য query হলে API থেকে ছবি আনো
  let url = "";
  if (selectedAPI === "google") {
    url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${GOOGLE_CX}&searchType=image&start=${(page-1)*10+1}&key=${GOOGLE_KEY}`;
  } else if (selectedAPI === "unsplash") {
    url = `https://api.unsplash.com/search/photos?page=${page}&per_page=10&query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    let images = [];

    if (selectedAPI === "unsplash") {
      images = (data.results || []).map(img => img.urls?.small).filter(Boolean);
    } else if (selectedAPI === "google") {
      if (!data.items) {
        if (page === 1) imageGrid.innerHTML = "<p>Image limit reached. Please wait, or select 'U'.</p>";
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
      img.onerror = function () { this.remove(); };
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

// ===== ড্রয়ার =====
const menuBtn = document.querySelector('.menu-btn');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
  loadDrawerAds();
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}
function loadDrawerAds() {
  if (!document.querySelector('.drawer-ad .adsbygoogle')) {
    setTimeout(() => {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }, 300);
  }
}

menuBtn.addEventListener('click', openDrawer);
closeDrawerBtn.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) {
    closeDrawer();
  }
});

