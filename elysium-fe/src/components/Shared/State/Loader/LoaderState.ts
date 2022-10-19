export default class LoaderState {
    public dataLoading: boolean = true
    public mapLoading: boolean = true
    public miniMapLoading: boolean = true

    public constructor(dataLoading: boolean, mapLoading: boolean, miniMapLoading: boolean) {
        this.dataLoading = dataLoading
        this.mapLoading = mapLoading
        this.miniMapLoading = miniMapLoading
    }
}