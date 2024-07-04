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
            <div className="main-box">
                <div className="flex flex-row items-center">
                    <h1 className="w-full p-2 font-bold">Steam Artwork Downloader</h1>
                    <a className="end-0 pr-2" href="https://github.com/AFCMS/steam_artwork_downloader">
                        {/* Icon by SimpleIcons */}
                        <svg
                            className="h-6 text-[#181717]"
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>GitHub</title>
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                    </a>
                </div>
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
                        <input
                            type="text"
                            name="input_text"
                            id="input_text"
                            placeholder="ex: 12345678, https://store.steampowered.com/app/12345678/App_Name"
                        />
                    </div>

                    <button type="submit" className="btn-link w-36">
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
