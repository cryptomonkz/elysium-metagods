import {MutableRefObject} from "react";
import {TileSource} from "../Models/Map/TileSource";

export const getGridSources = (landSources: MutableRefObject<any>): HTMLImageElement | undefined => landSources?.current?.getSourceByType(TileSource.GRID)

export const getBuildingsSources = (landSources: MutableRefObject<any>): HTMLImageElement | undefined => landSources?.current?.getSourceByType(TileSource.BUILDINGS)

export const getTerraformSources = (landSources: MutableRefObject<any>): HTMLImageElement | undefined => landSources?.current?.getSourceByType(TileSource.TERRAFORM)