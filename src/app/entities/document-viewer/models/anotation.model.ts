import { AnotationContentType } from "../enums/anotation-content-type";

export interface IAnotation {
    contentType: AnotationContentType;
    data: string | undefined;
    x: number;
    y: number;
}