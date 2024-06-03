import { Assunto } from "../assunto/assunto";
import { Autor } from "../autor/autor";
import { Localizacao } from "../localizacao/localizacao";

export interface Obra {
    id?: string;
    title?: string;
    author?: Autor;
    secondaryAuthor?: Autor;
    location?: Localizacao;
    subject?: Assunto;
    edition?: string;
    publisherName?: string;
    volume?: number;
    pageQuantity?: number;
    publicationYear?: number;
    publicationLocation?: string;
    quantityOfCopies?: number;
}
