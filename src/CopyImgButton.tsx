import { useEffect, useState } from "react";
import { CheckIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

type CopyImgButtonProps = {
    url: string | undefined;
    disabled: boolean;
};

async function copyImageAtUrlToClipboard(imageUrl: string) {
    try {
        const imageFetchResponse = await fetch(imageUrl);
        const imageBlob = await imageFetchResponse.blob();
        const clipboardItem = new ClipboardItem({ [imageBlob.type]: imageBlob });
        await navigator.clipboard.write([clipboardItem]);
        console.log("Image copied to clipboard");
    } catch (error) {
        console.error("Failed to copy image to clipboard:", error);
    }
}

// noinspection JSUnusedGlobalSymbols
export default function CopyImgButton(props: CopyImgButtonProps) {
    const [clickedLast, setClickedLast] = useState<boolean>(false);

    useEffect(() => {
        if (clickedLast) {
            setTimeout(() => {
                setClickedLast(false);
            }, 1000);
        }
    }, [clickedLast]);

    return (
        <button
            className="h-6 w-6"
            title={clickedLast ? "Copied!" : "Copy Image"}
            disabled={!props.url}
            onClick={async () => {
                if (props.url && !clickedLast) {
                    await copyImageAtUrlToClipboard(props.url);
                    // await navigator.clipboard.writeText(props.url);
                    setClickedLast(true);
                }
            }}
        >
            {clickedLast ? <CheckIcon className={"h-6"} /> : <ClipboardDocumentCheckIcon className={"h-6"} />}
        </button>
    );
}
