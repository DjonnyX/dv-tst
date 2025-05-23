import { IDocumentPageModel } from "./document-page.model";

export interface IDocumentModel {
    name: string;
    pages: Array<IDocumentPageModel>;
}
