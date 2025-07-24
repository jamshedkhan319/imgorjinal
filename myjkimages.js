//  ইমেজগুলোর লিস্ট
const myJKImages = [
  "https://i.ibb.co/gKwk5Fp/jk2.jpg",
  "https://i.ibb.co/gKwk5Fp/jk2.jpg",
  "https://i.ibb.co/WWdcHZkR/file-000000005b0862309a830daa13fda636.png",
  "https://i.ibb.co/8nsmkwnr/20220829-232913.jpg",
  "https://i.ibb.co/23M0c7Qq/file-0000000021f061f8abf1df27288f02b2.png",
  "https://i.ibb.co/JjJKmy3S/file-000000002a406230872137b9efa9a038.png",
  "https://i.ibb.co/gKwk5Fp/jk2.jpg",
  "https://i.ibb.co/gKwk5Fp/jk2.jpg",
  "https://i.ibb.co/zVdtksXN/file-00000000c6e46230a7aed816b781b8c1.png",
  "https://i.ibb.co/Kx5pvX6z/Pics-Art-12-25-05-05-53.jpg",
  "https://i.ibb.co/cKTJ1sM3/8dcf7577-a978-4a6d-a2b0-8f1ced94d407.png",
  "https://i.ibb.co/DDmDwd71/Pics-Art-08-04-03-27-08.png"
];

// এই ফাংশন main.js থেকে কল হবে
function loadMyJKImages(imageGrid, loadMoreBtn) {
  imageGrid.innerHTML = "";
  myJKImages.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "JK Image";
    img.loading = "lazy";
    img.onerror = function () { this.remove(); };
    img.onclick = () => {
      localStorage.setItem("selectedImageURL", src);
      window.location.href = "download.html";
    };
    imageGrid.appendChild(img);
  });
  loadMoreBtn.style.display = "none";
}
