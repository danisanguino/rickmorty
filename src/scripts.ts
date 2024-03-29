import { Main, Info, Episode, DataCharacteres } from "./interfaces";


const urlRM = 'https://rickandmortyapi.com/api/episode';

//LOAD BUTTONS
async function printTitle(url:string) {



  //Call API
  const data = await fetch(url);
  const JSONdata:Main = await data.json();
  const episodes:Episode[] = JSONdata.results;


  //Variables to use
  const episodesList = document.getElementById('episodes') as HTMLUListElement;
  const nextBtn = document.getElementById('loadMore') as HTMLButtonElement;


  //Load Episodes
  episodes.forEach((e) => {
    episodesList.insertAdjacentHTML('beforeend', `<li id="episode-${e.id}" episodeURL="${e.url}">${e.name}</li>`);
    const chargeCharacter = document.getElementById(`episode-${e.id}`) as HTMLLIElement ;
    chargeCharacter.addEventListener("click", getCharacteres)    
 });

  // Button Load more
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


// LOAD CHARACTERS
async function getCharacteres(clickBtn: MouseEvent) {

  const target = clickBtn.target as HTMLLIElement;
  const urlEpisode = target.getAttribute("episodeURL")!;

  const data = await fetch(urlEpisode);
  const JSONdata: Episode = await data.json();
  
  const showInfo = `<div class="inf-episode">
                    <h1>${JSONdata.name}</h1>
                    <p>${JSONdata.air_date}</p>
                    <p>${JSONdata.episode}</p>
                    <div>`;

  const wherePrint = document.getElementById("characteres") as HTMLDivElement;

  wherePrint.innerHTML = showInfo;
  
  const charactersData = JSONdata.characters;
  
  charactersData.forEach(async urlCharacter => {

    const data = await fetch(urlCharacter);
    const JSONdata: DataCharacteres = await data.json();

    const infoCharacterPrint = 
                    `<div class="episode">
                    <img src=${JSONdata.image}>
                    <h3>${JSONdata.name}</h3>
                    <span>${JSONdata.species}</span> | 
                    <span>${JSONdata.status}</span>
                    <p>${JSONdata.gender}</p> 
                    </div>`;

    const wherePrint = document.getElementById("characteres") as HTMLDivElement;
    wherePrint.insertAdjacentHTML("beforeend",infoCharacterPrint);

    const welcomePage = document.getElementById("intro");
    const characterPage = document.getElementById("characteres");

    const firstStep = function () {
      welcomePage?.classList.add("hide");
      characterPage?.classList.remove("hide");
    };
    firstStep();

  });

} 
