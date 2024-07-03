import { ArrowDownTrayIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";
import CopyButton from "./CopyButton.tsx";

type ArtworkProps = {
    title: string;
    gameId: number | undefined;
    url: string | undefined;
    fileName: string;
};

export default function Artwork(props: ArtworkProps) {
    return (
        <div className="rounded bg-gray-500 p-4">
            <div className={"mb-2 flex flex-row items-center"}>
                <h2 className={"w-full font-bold"}>{props.title}</h2>

                <div className={"end-0 flex flex-row gap-2"}>
                    <a className="h-6 w-6" target={"_blank"} href={props.url} download={props.fileName}>
                        <ArrowDownTrayIcon className={"h-6"} />
                    </a>
                    <a className="h-6 w-6" target={"_blank"} href={props.url}>
                        <ArrowUpRightIcon className={"h-6"} />
                    </a>
                    <CopyButton url={props.url} />
                </div>
            </div>

            <img alt="Header" src={props.url} />
        </div>
    );
}
