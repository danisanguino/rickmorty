var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getTitleEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://rickandmortyapi.com/api/episode");
            const data = yield response.json();
            const episodes = data.results;
            episodes.forEach(episode => {
                const container = document.querySelector("#episodes");
                const liEpisode = document.createElement("li");
                liEpisode.textContent = episode.name;
                container.appendChild(liEpisode);
            });
            return data;
        }
        catch (error) {
            throw new Error("Fail su puta madre");
        }
    });
}
getTitleEpisodes()
    .then((dataResults) => {
    getMoreTitles(dataResults);
});
function getMoreTitles(dataResults) {
    const loadMoreButton = document.querySelector("#loadMore");
    let checkEvent = true;
    loadMoreButton.addEventListener("click", () => {
        if (checkEvent) {
            checkEvent = false;
            printMoreTitles(dataResults);
        }
    });
}
function printMoreTitles(dataResults) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (dataResults.info.next) {
                const response = yield fetch(dataResults.info.next);
                const data = yield response.json();
                const episodes = data.results;
                episodes.forEach(episode => {
                    const container = document.querySelector("#episodes");
                    const liEpisode = document.createElement("li");
                    liEpisode.textContent = episode.name;
                    container.appendChild(liEpisode);
                });
            }
        }
        catch (error) {
            throw new Error("Alitas de pollo");
        }
    });
}
export {};
