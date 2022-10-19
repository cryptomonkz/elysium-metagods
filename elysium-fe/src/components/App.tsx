import {Web3ReactProvider} from "@web3-react/core";
import {Provider} from "react-redux";
import HighlightableAreaDetails from "./Interfaces/HighlightableAreaDetails";
import Loader from "./Loader";
import Map from "./Map/Map";
import {ApplicationStore} from "./Shared/State/ApplicationState";
import {getWeb3Provider} from "./Shared/Utils/Web3Utils";
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import ElysiumToast from "./Shared/Components/Toast";
import AuthenticationScreen from "./AuthenticationScreen";
import ActionSound from "./ActionSound";
import BackgroundSound from "./BackgroundSound";

const App = () => <Provider store={ApplicationStore}>
    <Web3ReactProvider getLibrary={getWeb3Provider}>
        <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}}>
            <Map/>
            <Loader/>
            <HighlightableAreaDetails/>
            <ElysiumToast/>
            <AuthenticationScreen/>
            <ActionSound/>
            <BackgroundSound/>
        </DndProvider>
    </Web3ReactProvider>
</Provider>

export default App;
