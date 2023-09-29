import { API } from "./scripts/appi.js";
import { elements, renderPlayingInfo, updateTitle } from "./scripts/ui.js";
//Api class'dan bir örnek oluşturma
const api = new API();
//Sayfa yüklendiği anda api'ye istek atıp
//Popüler müzikleri listler
document.addEventListener(
  "DOMContentLoaded",
  async () => await api.getPopular()
);

//Parametre olarak aldığı müziği çalar
const palMusic = (url) => {
  //oynatılacak müziğin url'ini html'ye yükleme
  elements.audioSource.src = url;
  //Audio elementinin müziği yüklemesini sağladı
  elements.audio.load();
  //Müziği çalar
  elements.audio.play();
};

//Listede tıklamlarda çalışır
const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card");

    //Çalınacak müziğin bilgilerini ekrana basar
    renderPlayingInfo(parent.dataset);
    //Müziği çalar
    palMusic(parent.dataset.url);
  }
};

//liste alanındaki tıklanma alanlarını listele
document.addEventListener("click", handleClick);

// fotoğrafı dödürür
const animatePhoto = (e) => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

const stopAnimation = (e) => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
  console.log(img);
};

// müziğin çalma olayını izleme
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);

// form olaylarını izleme
elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) return;
  //Başlığı güncelle
  updateTitle(`${query} İçin Sonuçlar`);
  //Aranan kelime ile eşleşen müzikleri çeker
  api.searchMusic(query);
});
