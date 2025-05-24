import { IAnotation } from "./anotation.model";

export interface IDocumentPageModel {
    number: number;
    imageUrl: string;
    anotations?: Array<IAnotation>;
}
