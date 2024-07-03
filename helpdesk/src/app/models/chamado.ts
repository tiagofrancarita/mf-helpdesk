export interface Chamado {
    id?: string;
    tituloChamado: string;
    descricaoChamado: string;
    prioridadeEnum: string;
    statusEnum: string;
    observacao: string;
    cliente: any;
    tecnico: any;
    dataAbertura?: string;
    dataFechamento?: string;
    nomeCliente: string;
    nomeTecnico: string;



}
