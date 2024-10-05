import { Assunto } from "../assunto/assunto";
import { Autor } from "../autor/autor";
import { Localizacao } from "../localizacao/localizacao";

export interface Obra {
    id?: string;
    title?: string;
    publicationYear?: number;
    publisherName?: string;
    volume?: number;
    pageQuantity?: number;
    publicationLocation?: string;
    quantityOfCopies?: number;
    author?: Autor;
    location?: Localizacao;
    subject?: Assunto;
    edition?: string;
}
