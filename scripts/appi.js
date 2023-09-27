import { renderSongs } from "./ui.js";
//Yapılan istekler için yapılan ayarlar
const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=tr_TR&listId=ip-country-chart-TR";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ac7232c2e8mshec64be59e242a1cp110888jsnf05ccbef4e2d",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
// Popüler müzikleri getir
export class API {
  constructor() {
    this.songs = [];
  }

  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();

    this.songs = data.tracks;
    //ekrana popülermüzikleri listeler
    renderSongs(this.songs);
  }
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR
      `,
      options
    );
    const data = await res.json();
    //Veriyi istediğimiz diziye çevirme
    //Song.track terine song'a erişince
    const newData = data.tracks.hits.map((song) => ({ ...song.track }));

    this.songs = newData;
    //Aratılana şarkıları aşağıya ekleme

    renderSongs(this.songs);
  }
}
