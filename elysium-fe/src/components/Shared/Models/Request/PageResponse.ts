export class PageResponse<T> {
    public totalPages: number;
    public totalElements: number;
    public content: T[];

    constructor(totalPages: number, totalElements: number, content: T[]) {
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.content = content;
    }
}