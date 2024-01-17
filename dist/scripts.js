var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tittleEpisode = yield fetch("https://rickandmortyapi.com/api/episode");
            const data = yield tittleEpisode.json();
            const episodes = data.results;
            episodes.forEach(episode => {
                console.log(episode);
                const container = document.querySelector("#episodes");
                const liEpisode = document.createElement("li");
                liEpisode.textContent = episode.name;
                container === null || container === void 0 ? void 0 : container.appendChild(liEpisode);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
getEpisodes();
export {};
