export interface ClienteDTO{
    id: string;
    nome: string;
    email: string;
    // qdo tem o '?' significa que o parametro é opcional
    imageUrl?: string;

}