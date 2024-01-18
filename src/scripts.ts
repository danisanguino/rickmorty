import { Main, Info, Episode } from "./interfaces";


async function getTitleEpisodes():Promise<Main> {
  try{
    const response = await fetch("https://rickandmortyapi.com/api/episode");
    const data: Main = await response.json();
    const episodes: Episode[] = data.results;

    
    episodes.forEach(episode => {
    const container = document.querySelector("#episodes") as HTMLUListElement;
    const liEpisode = document.createElement("li");
    liEpisode.textContent = episode.name;
    container.appendChild(liEpisode);
    })
    return data;

  }
  catch (error) {
    throw new Error("Fail su puta madre")
  }
}

getTitleEpisodes()
  .then((dataResults) => {
    getMoreTitles(dataResults)
  })

function getMoreTitles(dataResults: Main):void {
    const loadMoreButton = document.querySelector("#loadMore") as HTMLButtonElement
    let checkEvent:boolean = true;
    loadMoreButton.addEventListener("click", () => {
      
      if (checkEvent) {
        checkEvent = false;
        printMoreTitles(dataResults);
      }
    } )
  }

 async function printMoreTitles (dataResults:Main) {
    try {
      if (dataResults.info.next) {
        const response = await fetch(dataResults.info.next);
        const data:Main = await response.json();
        const episodes:Episode[] = data.results;

        episodes.forEach(episode => {
          const container = document.querySelector("#episodes") as HTMLUListElement;
          const liEpisode = document.createElement("li");
          liEpisode.textContent = episode.name;
          container.appendChild(liEpisode);
      })
    }
    } catch (error) {
        throw new Error("Alitas de pollo");   
    }
    
 }









// async function getCharacteres () {
//   try {
//     const datesCharactere = await fetch("https://rickandmortyapi.com/api/episode");
//     const JSONcharactere: Main = await datesCharactere.json();
//     const characteres: Episode[] = JSONcharactere.results;

//     characteres.forEach(characteres)



//   }

//   catch (error) {
//     console.log(error);
//   }
// }


