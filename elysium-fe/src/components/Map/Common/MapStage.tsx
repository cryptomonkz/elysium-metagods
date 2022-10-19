import {forwardRef, ReactNode, useEffect, useState} from 'react';
import {Stage} from 'react-konva';
import {Provider} from 'react-redux';
import {ApplicationStore} from '../../Shared/State/ApplicationState';

const MapStage = forwardRef(({children, handlers = {}}: { children: ReactNode, handlers?: any }, stage) => {
    const [referenceFilled, setReferenceFilled] = useState(false)
    useEffect(() => setReferenceFilled(true), [])

    return <Stage
        ref={stage}
        perfectDrawEnabled={false}
        shadowForStrokeEnabled={false}
        {...handlers}>
        <Provider store={ApplicationStore}>
            {referenceFilled && children}
        </Provider>
    </Stage>
})

export default MapStage