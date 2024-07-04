import { Cliente } from "./cliente";
import { Tecnico } from "./tecnico";

export interface Chamado {
    id?: number;
    dataAbertura?: Date;
    dataFechamento?: Date;
    titulo: string;
    descricaoChamado: string;
    prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
    statusEnum: 'ABERTO' | 'EM_ANDAMENTO' | 'ENCERRADO';
    observacoes: string;
    tecnico: Tecnico;
    cliente: Cliente;
}
