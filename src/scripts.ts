import { Main, Info, Episode } from "./interfaces";


const urlRM = 'https://rickandmortyapi.com/api/episode';

async function printTitle(url:string) {

  const data = await fetch(url);
  const JSONdata:Main = await data.json();
  const episodes:Episode[] = JSONdata.results;


  const episodesList = document.getElementById('episodes') as HTMLUListElement;
  const nextBtn = document.getElementById('loadMore') as HTMLButtonElement;


  //carga de episodios y boton cargar
  episodes.forEach((e) => {
    episodesList.insertAdjacentHTML('beforeend', `<li id="episode-${e.id}" episodeURL="${e.url}">${e.name}</li>`);
    const chargeCharacter = document.getElementById(`episode-${e.id}`) as HTMLLIElement ;
    chargeCharacter.addEventListener("click", getCharacteres);
  });

  //Enterearme de esto mejor BOTON PAGINADO
  if (JSONdata.info.next) {
    nextBtn.addEventListener('click', () => {
        printTitle(JSONdata.info.next);
      },

      { once: true }
    );
  } else {
    nextBtn.remove();
  }
}

printTitle(urlRM);


//cargar personajes del episodio
async function getCharacteres(clickBtn: MouseEvent) {

  const target = clickBtn.target as HTMLLIElement;
  const urlEpisode = target.getAttribute("episodeURL")!;

  const data = await fetch(urlEpisode);
  const JSONdata: Episode = await data.json();
  
  const showInfo = `<h1>${JSONdata.name}</h1>
                    <p>${JSONdata.air_date}</p>
                    <p>${JSONdata.episode}</p>`;

  const wherePrint = document.getElementById("info-episode") as HTMLDivElement;
  // wherePrint.innerHTML = "";
  // wherePrint.insertAdjacentHTML("beforeend", showInfo);
  wherePrint.innerHTML = showInfo;
  

} 
