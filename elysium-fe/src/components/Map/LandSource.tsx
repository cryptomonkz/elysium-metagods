import {forwardRef, MutableRefObject, useCallback, useImperativeHandle, useRef, useState} from 'react';
import styled from 'styled-components';
import {TileSource} from '../Shared/Models/Map/TileSource';
import Grid from '../../assets/Images/grid.png';
import Buildings from '../../assets/Images/buildings.png';
import Terraform from '../../assets/Images/terraform.jpg';
import PlaygroundImage from "../../assets/Images/playgroundBackground.jpg";
import {signalMapSize} from "../Shared/State/Map/MapService";
import {getLandTiles} from "../Shared/Service/LandService";
import {initializeMap} from "../Shared/Utils/MapUtils";
import {signalDataLoading, signalMapLoading, signalMiniMapLoading} from "../Shared/State/Loader/LoaderService";
import {getImageSize} from "../Shared/Utils/HTMLElementUtils";
import {doWithMounted} from "../Shared/Utils/ComponentUtils";

const loadLand = () => getLandTiles().then(landResponse => initializeMap(landResponse)).catch(() => {
    signalMapLoading(false)
    signalMiniMapLoading(false)
}).finally(() => signalDataLoading(false))

const areImagesLoaded = (loadingState: Map<string, boolean>): boolean => Object.keys(TileSource).every(source => !!loadingState.get(source))

const triggerLoadLand = (loadingState: Map<string, boolean>) => areImagesLoaded(loadingState) && loadLand()

const LandSource = forwardRef((props, landSources) => {

    const grid = useRef()
    const buildings = useRef()
    const terraform = useRef()

    useImperativeHandle(landSources, () => ({
        getSourceByType: (mapSource?: TileSource) => {
            switch (mapSource) {
                case TileSource.GRID:
                    return grid?.current
                case TileSource.BUILDINGS:
                    return buildings?.current
                case TileSource.TERRAFORM:
                default:
                    return terraform?.current
            }
        }
    }))

    const [loadingState, setLoadingState] = useState<Map<string, boolean>>(Object.keys(TileSource).reduce(
        (currentState, source) => currentState.set(source, false), new Map<string, boolean>()
    ))

    const changeLoadingState = useCallback((source: TileSource) => {
        loadingState.set(source, true)
        setLoadingState(loadingState)
        triggerLoadLand(loadingState)
    }, [loadingState])

    const signalImageLoaded = useCallback((image: MutableRefObject<any>, source: TileSource) => doWithMounted(isMounted => {
        const asHTMLImage = image?.current as HTMLImageElement | undefined
        asHTMLImage?.decode()?.then(() => isMounted.isMounted && changeLoadingState(source))
    }), [changeLoadingState])

    const signalTerraformLoaded = useCallback(() => {
        signalMapSize(getImageSize(terraform?.current))
        signalImageLoaded(terraform, TileSource.TERRAFORM)
    }, [terraform, signalImageLoaded])

    return <>
        <HiddenImage alt="Grid" ref={grid as MutableRefObject<any>} src={Grid}
                     onLoad={() => signalImageLoaded(buildings, TileSource.GRID)}/>
        <HiddenImage alt="Buildings" ref={buildings as MutableRefObject<any>} src={Buildings}
                     onLoad={() => signalImageLoaded(buildings, TileSource.BUILDINGS)}/>
        <HiddenImage alt="Terraform" ref={terraform as MutableRefObject<any>} src={Terraform}
                     onLoad={signalTerraformLoaded}/>
        <HiddenImage alt="Playground" src={PlaygroundImage}/>
    </>
})

const HiddenImage = styled.img`
  display: none
`

export default LandSource