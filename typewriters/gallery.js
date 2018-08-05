var imageFolder = "img/";
var imageType = ".jpg";

function changeImage(imgId) {
  var view = document.getElementById("viewer");
  view.src = imageFolder + imgId + imageType;
}

function changeGallery(galleryId) {
  galleryId += "_slides";
  var slide = document.getElementById(galleryId);
  var slides = document.getElementsByTagName("slides");
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slide.style.display = "block";
}