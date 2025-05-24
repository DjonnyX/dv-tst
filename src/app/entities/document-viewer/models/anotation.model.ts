import { AnotationContentType } from "../enums/anotation-content-type";

export interface IAnotation {
    contentType: AnotationContentType;
    data: string | null | undefined;
    x: number;
    y: number;
}