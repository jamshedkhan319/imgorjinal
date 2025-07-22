// ইমেজ লোড করানো
const fullImage = document.getElementById('fullImage');
const imageURL = localStorage.getItem('selectedImageURL');
fullImage.src = imageURL;

// ব্যাক বাটন
function goBack() {
  window.history.back();
}

// ইমেজ থেকে Blob ডাউনলোড ফাংশন
async function downloadImageAsPng(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  // অ্যাঙ্কর তৈরি করে ডাউনলোড করানো
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = 'image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // blobUrl revoke করে মেমরি ফ্রি করা
  URL.revokeObjectURL(blobUrl);
}

// ডাউনলোড বাটন ক্লিক
document.getElementById('downloadBtn').addEventListener('click', async () => {
  await downloadImageAsPng(imageURL);
});

// শেয়ার বাটন ক্লিক
document.getElementById('shareBtn').addEventListener('click', async () => {
  try {
    const response = await fetch(imageURL);
    const blob = await response.blob();
    const file = new File([blob], 'image.png', { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'Shared Image',
        text: 'Check out this image!',
      });
    } else {
      alert('Sharing files not supported on this device.');
    }
  } catch (err) {
    console.error('Share failed:', err);
    alert('Sharing failed.');
  }
});
