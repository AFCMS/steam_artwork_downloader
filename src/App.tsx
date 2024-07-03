import { useEffect, useState } from "react";

import Artwork from "./Artwork.tsx";
import "./App.css";

const nbRegex = /(\d+)|steamcommunity\.com\/app\/(\d+)|store\.steampowered\.com\/app\/(\d+)/;

type SteamArtworkURLS = {
    header: string | undefined;
    logo: string | undefined;
    libraryHero: string | undefined;
    library300x450: string | undefined;
    library600x900: string | undefined;
    pageBgGenerated: string | undefined;
    pageBgGeneratedV6B: string | undefined;
};

/**
 * Get a game ID from a Steam link or just a number
 */
function matchNumberFromInput(input: string): number | undefined {
    const match = input.match(nbRegex);
    return match ? parseInt(match[1] || match[2] || match[3]) : undefined;
}

function getAllURLSFromGameId(gameId: number): SteamArtworkURLS {
    const baseURL = `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}`;

    return {
        header: `${baseURL}/header.jpg`,
        logo: `${baseURL}/logo.png`,
        libraryHero: `${baseURL}/library_hero.jpg`,
        library300x450: `${baseURL}/library_300x450.jpg`,
        library600x900: `${baseURL}/library_600x900.jpg`,
        pageBgGenerated: `${baseURL}/page_bg_generated.jpg`,
        pageBgGeneratedV6B: `${baseURL}/page_bg_generated_v6b.jpg`,
    };
}

async function getAllDataURLSFromGameId(gameId: number): Promise<SteamArtworkURLS> {
    const baseURL = `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}`;

    const urls = [
        "/header.jpg",
        "/logo.png",
        "/library_hero.jpg",
        "/library_600x900.jpg",
        "/library_600x900_2x.jpg",
        "/page_bg_generated.jpg",
        "/page_bg_generated_v6b.jpg",
    ].map((path) => baseURL + path);

    const promises = urls.map((url) =>
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            .catch((error) => {
                console.error(`Failed to load image at ${url}`, error);
                return undefined; // Return null or any error indication as per your logic
            }),
    );

    return Promise.all(promises).then((images) => {
        return {
            header: images[0],
            logo: images[1],
            libraryHero: images[2],
            library300x450: images[3],
            library600x900: images[4],
            pageBgGenerated: images[5],
            pageBgGeneratedV6B: images[6],
        };
    });
}

function revokeImages(urls: SteamArtworkURLS) {
    urls?.header && URL.revokeObjectURL(urls.header);
    urls?.logo && URL.revokeObjectURL(urls.logo);
    urls?.libraryHero && URL.revokeObjectURL(urls.libraryHero);
    urls?.library300x450 && URL.revokeObjectURL(urls.library300x450);
    urls?.library600x900 && URL.revokeObjectURL(urls.library600x900);
    urls?.pageBgGenerated && URL.revokeObjectURL(urls.pageBgGenerated);
    urls?.pageBgGeneratedV6B && URL.revokeObjectURL(urls.pageBgGeneratedV6B);
}

// style={{ backgroundImage: `url(${inputTest})` }}

function App() {
    const [currentGameId, setCurrentGameId] = useState<number | undefined>(undefined);
    const [currentUrls, setCurrentUrls] = useState<SteamArtworkURLS | undefined>(undefined);
    const [currentDataUrls, setCurrentDataUrls] = useState<SteamArtworkURLS | undefined>(undefined);

    const [loadingImages, setLoadingImages] = useState<boolean>(false);

    useEffect(() => {
        if (currentGameId) {
            setLoadingImages(true);
            setCurrentUrls(getAllURLSFromGameId(currentGameId));
            getAllDataURLSFromGameId(currentGameId).then((urls) => {
                setCurrentDataUrls(urls);
                setLoadingImages(false);
            });
        } else {
            revokeImages(currentDataUrls as SteamArtworkURLS);
            setCurrentUrls(undefined);
            setCurrentDataUrls(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGameId]);

    return (
        <div className="flex items-center justify-center">
            <div className="main-box glass-effect">
                <h1 className="p-2 font-bold">Steam Artwork Downloader</h1>
                <form
                    className="flex flex-row gap-4 rounded p-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input_text = (document.getElementById("input_text") as HTMLInputElement).value;

                        const nb = matchNumberFromInput(input_text);
                        if (nb) {
                            setCurrentGameId(nb);
                        } else {
                            setCurrentGameId(undefined);
                        }
                    }}
                >
                    <div className="w-full">
                        <label htmlFor="input_text"></label>
                        <input type="text" name="input_text" id="input_text" placeholder="ex: 12345678" />
                    </div>

                    <button type="submit" className="w-36">
                        Get Artworks
                    </button>
                </form>

                <div className="flex flex-col gap-4 p-2">
                    <Artwork
                        title={"Header"}
                        gameId={currentGameId}
                        dataUrl={currentDataUrls?.header}
                        realUrl={currentUrls?.header}
                        fileName={`${currentGameId}_header.jpg`}
                        loading={loadingImages}
                    />
                    <Artwork
                        title={"Logo"}
                        gameId={currentGameId}
                        dataUrl={currentDataUrls?.logo}
                        realUrl={currentUrls?.logo}
                        fileName={`${currentGameId}_logo.png`}
                        loading={loadingImages}
                    />
                    <Artwork
                        title={"Library Hero"}
                        gameId={currentGameId}
                        dataUrl={currentDataUrls?.libraryHero}
                        realUrl={currentUrls?.libraryHero}
                        fileName={`${currentGameId}_library_hero.jpg`}
                        loading={loadingImages}
                    />
                    <Artwork
                        title={"Library 300x450"}
                        gameId={currentGameId}
                        dataUrl={currentDataUrls?.library300x450}
                        realUrl={currentUrls?.library300x450}
                        fileName={`${currentGameId}_library_300x450.jpg`}
                        loading={loadingImages}
                    />
                    <Artwork
                        title={"Library 600x900"}
                        gameId={currentGameId}
                        dataUrl={currentDataUrls?.library600x900}
                        realUrl={currentUrls?.library600x900}
                        fileName={`${currentGameId}_library_600x900.jpg`}
                        loading={loadingImages}
                    />
                    <Artwork
                        title={"Page Background Generated"}
                        gameId={currentGameId}
                        dataUrl={currentDataUrls?.pageBgGenerated}
                        realUrl={currentUrls?.pageBgGenerated}
                        fileName={`${currentGameId}_page_background.jpg`}
                        loading={loadingImages}
                    />
                    <Artwork
                        title={"Page Background Generated V6B"}
                        gameId={currentGameId}
                        dataUrl={currentDataUrls?.pageBgGeneratedV6B}
                        realUrl={currentUrls?.pageBgGeneratedV6B}
                        fileName={`${currentGameId}_page_background_v6b.jpg`}
                        loading={loadingImages}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
