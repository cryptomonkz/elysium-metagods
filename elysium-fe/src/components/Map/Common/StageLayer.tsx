import {forwardRef, ReactNode} from 'react';
import {Layer} from 'react-konva';

const StageLayer = forwardRef(({ children, handlers = {}, listeningToEvents = false }: { children: ReactNode, handlers?: any, listeningToEvents?: boolean }, layer) => {
    return <Layer ref={layer} listening={listeningToEvents} transformsEnabled="position" {...handlers}>
        {children}
    </Layer>
})

export default StageLayer
