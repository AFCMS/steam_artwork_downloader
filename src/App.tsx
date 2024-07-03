import { useState } from "react";

import Artwork from "./Artwork.tsx";
import "./App.css";

const nbRegex = /(\d+)|steamcommunity\.com\/app\/(\d+)|store\.steampowered\.com\/app\/(\d+)/;

type SteamArtworkURLS = {
    gameId: number;
    header: string;
    logo: string;
    libraryHero: string;
    library300x450: string;
    library600x900: string;
    pageBgGenerated: string;
    pageBgGeneratedV6B: string;
};

function matchNumberFromInput(input: string): number | undefined {
    const match = input.match(nbRegex);
    return match ? parseInt(match[1] || match[2] || match[3]) : undefined;
}

/**
 * Get all the URLs from the input text
 */
function getAllURLSFromInput(inputTxt: string): SteamArtworkURLS | undefined {
    const nbMatch = matchNumberFromInput(inputTxt);
    let baseURL = "";

    if (nbMatch) {
        baseURL = `https://steamcdn-a.akamaihd.net/steam/apps/${nbMatch}`;
    } else {
        return undefined;
    }

    return {
        gameId: 12345678,
        header: baseURL + "/header.jpg",
        logo: baseURL + "/logo.png",
        libraryHero: baseURL + "/library_hero.jpg",
        library300x450: baseURL + "/library_600x900.jpg",
        library600x900: baseURL + "/library_600x900_2x.jpg",
        pageBgGenerated: baseURL + "/page_bg_generated.jpg",
        pageBgGeneratedV6B: baseURL + "/page_bg_generated_v6b.jpg",
    };
}

// style={{ backgroundImage: `url(${inputTest})` }}

function App() {
    const [currentUrls, setCurrentUrls] = useState<SteamArtworkURLS | undefined>(undefined);

    return (
        <div className="flex items-center justify-center">
            <div className="main-box glass-effect">
                <h1 className="p-2 font-bold">Steam Artwork Downloader</h1>
                <form
                    className="flex flex-row gap-4 rounded p-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input_text = (document.getElementById("input_text") as HTMLInputElement).value;

                        const urls = getAllURLSFromInput(input_text);
                        if (urls) {
                            setCurrentUrls(urls);
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
                        gameId={currentUrls?.gameId}
                        url={currentUrls?.header}
                        fileName={`${currentUrls?.gameId}_header.jpg`}
                    />
                    <Artwork
                        title={"Logo"}
                        gameId={currentUrls?.gameId}
                        url={currentUrls?.logo}
                        fileName={`${currentUrls?.gameId}_logo.jpg`}
                    />
                    <Artwork
                        title={"Library Hero"}
                        gameId={currentUrls?.gameId}
                        url={currentUrls?.libraryHero}
                        fileName={`${currentUrls?.gameId}_library_hero.jpg`}
                    />
                    <Artwork
                        title={"Library 300x450"}
                        gameId={currentUrls?.gameId}
                        url={currentUrls?.library300x450}
                        fileName={`${currentUrls?.gameId}_library_300x450.jpg`}
                    />
                    <Artwork
                        title={"Library 600x900"}
                        gameId={currentUrls?.gameId}
                        url={currentUrls?.library600x900}
                        fileName={`${currentUrls?.gameId}_library_600x900.jpg`}
                    />
                    <Artwork
                        title={"Page Background Generated"}
                        gameId={currentUrls?.gameId}
                        url={currentUrls?.pageBgGenerated}
                        fileName={`${currentUrls?.gameId}_page_background.jpg`}
                    />
                    <Artwork
                        title={"Page Background Generated V6B"}
                        gameId={currentUrls?.gameId}
                        url={currentUrls?.pageBgGeneratedV6B}
                        fileName={`${currentUrls?.gameId}_page_background_v6b.jpg`}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
