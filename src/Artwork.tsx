import { ArrowDownTrayIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";
import CopyButton from "./CopyButton.tsx";

type ArtworkProps = {
    title: string;
    gameId: number | undefined;
    dataUrl: string | undefined;
    realUrl: string | undefined;
    fileName: string;
    loading: boolean;
};

export default function Artwork(props: ArtworkProps) {
    return (
        <div className="rounded-md bg-gray-300 p-4">
            <div className={"mb-2 flex flex-row items-center"}>
                <h2 className={"w-full font-bold"}>{props.title}</h2>

                <div className={"end-0 flex flex-row gap-2"}>
                    <a
                        className="h-6 w-6"
                        title="Download"
                        target={"_blank"}
                        href={!props.loading ? props.dataUrl : undefined}
                        download={props.fileName}
                    >
                        <ArrowDownTrayIcon className={"h-6"} />
                    </a>
                    <a
                        className="h-6 w-6"
                        title="Open"
                        target={"_blank"}
                        href={!props.loading ? props.dataUrl : undefined}
                    >
                        <ArrowUpRightIcon className={"h-6"} />
                    </a>
                    <CopyButton url={!props.loading ? props.realUrl : undefined} disabled={props.loading} />
                </div>
            </div>
            {!props.loading ? (
                props.dataUrl ? (
                    <img alt="Header" src={props.dataUrl} />
                ) : (
                    <span>Not Found</span>
                )
            ) : (
                <span>LOADING</span>
            )}
        </div>
    );
}
