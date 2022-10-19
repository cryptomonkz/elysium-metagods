import {useEffect} from "react";

export const RenderAnnouncer = ({onRender}: { onRender: () => void }) => {
    useEffect(() => onRender(), [onRender])
    return <></>
}