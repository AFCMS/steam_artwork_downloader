import { useEffect, useState } from "react";
import { CheckIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

type CopyButtonProps = {
    url: string | undefined;
};

export default function CopyButton(props: CopyButtonProps) {
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
            disabled={!props.url}
            onClick={async () => {
                if (props.url && !clickedLast) {
                    await navigator.clipboard.writeText(props.url);
                    setClickedLast(true);
                }
            }}
        >
            {clickedLast ? <CheckIcon className={"h-6"} /> : <ClipboardDocumentCheckIcon className={"h-6"} />}
        </button>
    );
}
