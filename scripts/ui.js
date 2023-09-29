//Html'den gelenler
export const elements = {
  list: document.querySelector(".list"),
  audio: document.querySelector("audio"),
  audioSource: document.querySelector("audio source"),
  playingInfo: document.querySelector(".playing .info"),
  form: document.querySelector("form"),
  title: document.querySelector(".songs h2"),
};

//Her bir müzik için ekran bir kart basar

export const renderSongs = (songs) => {
  elements.list.innerHTML = "";
  songs.forEach((song) => {
    //Div oluşturma
    const div = document.createElement("div");
    //Klas verme
    div.className = "card";
    //Kart elemanına bazı verileri ekleme
    div.dataset.url = song.hub?.actions?.pop()?.uri;
    div.dataset.title = song.title;
    div.dataset.img = song.images.coverart;
    //Cardın içeriğini belirleme
    div.innerHTML = `
     <figure>
      <img src=${song.images.coverart} />

     <div class="play">
      <i id='play-btn' class="bi bi-play-fill"></i>
     </div>
    </figure>
    <h4>${song.subtitle} </h4>
    <p>${song.title}</p>
    `;
    //Html'ye gönderme
    elements.list.appendChild(div);
  });
};

//oynayan şarkının bilgilerini ekrana basar
export const renderPlayingInfo = (song) => {
  elements.playingInfo.innerHTML = `
          <img
           id="info img"
           src=${song.img}
    
          />
          <div>
            <p>Şuan Oynatılıyor...</p>
            <h3>${song.title}</h3>
          </div>
       `;
};

// başlık metnini günceller
export const updateTitle = (message) => {
  elements.title.innerText = message;
};
