import { Assunto } from "../assunto/assunto";
import { Autor } from "../autor/autor";
import { Localizacao } from "../localizacao/localizacao";

export interface Livro {
    id?: string;
    title?: string;
    author?: Autor;
    secondaryAuthor?: Autor;
    location?: Localizacao;
    subject?: Assunto;
}
