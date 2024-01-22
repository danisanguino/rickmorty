var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlRM = 'https://rickandmortyapi.com/api/episode';
function printTitle(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(url);
        const JSONdata = yield data.json();
        const episodes = JSONdata.results;
        const episodesList = document.getElementById('episodes');
        const nextBtn = document.getElementById('loadMore');
        episodes.forEach((e) => {
            episodesList.insertAdjacentHTML('beforeend', `<li id="episode-${e.id}" episodeURL="${e.url}">${e.name}</li>`);
            const chargeCharacter = document.getElementById(`episode-${e.id}`);
            chargeCharacter.addEventListener("click", getCharacteres);
        });
        if (JSONdata.info.next) {
            nextBtn.addEventListener('click', () => {
                printTitle(JSONdata.info.next);
            }, { once: true });
        }
        else {
            nextBtn.remove();
        }
    });
}
printTitle(urlRM);
function getCharacteres(clickBtn) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = clickBtn.target;
        const urlEpisode = target.getAttribute("episodeURL");
        const data = yield fetch(urlEpisode);
        const JSONdata = yield data.json();
        const showInfo = `<div class="inf-episode">
                    <h1>${JSONdata.name}</h1>
                    <p>${JSONdata.air_date}</p>
                    <p>${JSONdata.episode}</p>
                    <div>`;
        const wherePrint = document.getElementById("characteres");
        wherePrint.innerHTML = showInfo;
        const charactersData = JSONdata.characters;
        charactersData.forEach((urlCharacter) => __awaiter(this, void 0, void 0, function* () {
            const data = yield fetch(urlCharacter);
            const JSONdata = yield data.json();
            const infoCharacterPrint = `<div class="episode">
                    <img src=${JSONdata.image}>
                    <h3>${JSONdata.name}</h3>
                    <span>${JSONdata.species}</span> | 
                    <span>${JSONdata.status}</span>
                    <p>${JSONdata.gender}</p> 
                    </div>`;
            const wherePrint = document.getElementById("characteres");
            wherePrint.insertAdjacentHTML("beforeend", infoCharacterPrint);
            const welcomePage = document.getElementById("intro");
            const characterPage = document.getElementById("characteres");
            const firstStep = function () {
                welcomePage === null || welcomePage === void 0 ? void 0 : welcomePage.classList.add("hide");
                characterPage === null || characterPage === void 0 ? void 0 : characterPage.classList.remove("hide");
            };
            firstStep();
        }));
    });
}
export {};
