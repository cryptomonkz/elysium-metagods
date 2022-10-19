export class LootBox {
    public id: number;
    public name: string;
    public imageUrl: string;
    public description: string;

    constructor(id: number, name: string, imageUrl: string, description: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
    }
}