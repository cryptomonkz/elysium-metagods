import {Action, combineReducers, createStore} from 'redux'
import dragReducer from './Drag/DragService'
import DragState from './Drag/DragState'
import highlightedReducer from './Highlighted/HighlightedService'
import HighlightedState from './Highlighted/HighlightedState'
import loaderReducer from './Loader/LoaderService'
import LoaderState from './Loader/LoaderState'
import mapReducer from './Map/MapService'
import MapState from './Map/MapState'
import miniMapPositionReducer from './MiniMapPosition/MiniMapPositionService'
import MiniMapPositionState from './MiniMapPosition/MiniMapPositionState'
import openedInterfaceReducer from './OpenedInterface/OpenedInterfaceService'
import OpenedInterfaceState from './OpenedInterface/OpenedInterfaceState'
import Web3State from "./Web3/Web3State";
import web3Reducer from "./Web3/Web3Service";
import GreatHallState from "./GreatHall/GreatHallState";
import greatHallReducer from "./GreatHall/GreatHallService";
import ToastState from "./Toast/ToastState";
import toastReducer from "./Toast/ToastService";
import VaultState from "./Vault/VaultState";
import vaultReducer from "./Vault/VaultService";
import CelestialsState from "./Celestials/CelestialsState";
import celestialsReducer from "./Celestials/CelestialsService";
import AuthenticationState from "./Authentication/AuthenticationState";
import authenticationReducer from "./Authentication/AuthenticationService";
import SoundState from "./Sound/SoundState";
import soundReducer from "./Sound/SoundService";

export class ApplicationState {
    public loaderState?: LoaderState
    public dragState?: DragState
    public mapState?: MapState
    public highlightedState?: HighlightedState
    public web3State?: Web3State
    public miniMapPositionState?: MiniMapPositionState
    public openedInterfaceState?: OpenedInterfaceState
    public greatHallState?: GreatHallState
    public toastState?: ToastState
    public vaultState?: VaultState
    public celestialsState?: CelestialsState
    public authenticationState?: AuthenticationState
    public soundState?: SoundState

    public constructor(
        loaderState?: LoaderState,
        dragState?: DragState,
        mapState?: MapState,
        highlightedState?: HighlightedState,
        web3State?: Web3State,
        miniMapPositionState?: MiniMapPositionState,
        openedInterfaceState?: OpenedInterfaceState,
        greatHallState?: GreatHallState,
        toastState?: ToastState,
        vaultState?: VaultState,
        celestialsState?: CelestialsState,
        authenticationState?: AuthenticationState,
        soundState?: SoundState,
    ) {
        this.loaderState = loaderState
        this.dragState = dragState
        this.mapState = mapState
        this.highlightedState = highlightedState
        this.web3State = web3State
        this.miniMapPositionState = miniMapPositionState
        this.openedInterfaceState = openedInterfaceState
        this.greatHallState = greatHallState
        this.toastState = toastState
        this.vaultState = vaultState
        this.celestialsState = celestialsState
        this.authenticationState = authenticationState
        this.soundState = soundState
    }
}

export class ActionEvent<T> implements Action<string> {
    public type: string
    public payload?: T

    public constructor(type: string, payload?: T) {
        this.type = type
        this.payload = payload
    }
}

export const ApplicationStore = createStore(combineReducers<ApplicationState>({
    loaderState: loaderReducer,
    dragState: dragReducer,
    mapState: mapReducer,
    highlightedState: highlightedReducer,
    web3State: web3Reducer,
    miniMapPositionState: miniMapPositionReducer,
    openedInterfaceState: openedInterfaceReducer,
    greatHallState: greatHallReducer,
    toastState: toastReducer,
    vaultState: vaultReducer,
    celestialsState: celestialsReducer,
    authenticationState: authenticationReducer,
    soundState: soundReducer,
}))

export function signalAction<T>(type: string, payload?: T) {
    ApplicationStore?.dispatch<ActionEvent<T>>({type, payload})
}