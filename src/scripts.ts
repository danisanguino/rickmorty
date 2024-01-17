import { Main, Info, Episode } from "./interfaces";


async function getEpisodes () {
  try{
    const tittleEpisode = await fetch("https://rickandmortyapi.com/api/episode");
    const data: Main = await tittleEpisode.json();
    const episodes: Episode[] = data.results;

    episodes.forEach(episode => {
      console.log(episode)
      const container = document.querySelector("#episodes") as HTMLUListElement;
      const liEpisode = document.createElement("li");
      liEpisode.textContent = episode.name;
      container?.appendChild(liEpisode);
})
    
  }
  catch (error) {
    console.log(error);
  }

}
getEpisodes();
