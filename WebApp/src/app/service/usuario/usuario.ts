export interface Usuario {
    id?: string;
    name?: string;
    email?: string;
    birthDate?: Date;
    cpf?: number;
    creationDate?: Date;
    creationUser?: Usuario;
    delayedUsers?: Date;
    situationUser: boolean;
    accessLevel?: string;
}
