export interface Cadastro {
  nome: string,
  email: string,
  senha: string,
  senhaConfirmar?: string,
  perfil: string
}

export interface Entrar {
    email: string,
    senha: string
}

export interface Item {
  id?: number;
  codigo: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
}

export interface BuscarForm {
  codigo: string,
  categoria: string
};

export interface AdicionarForm {
  codigo: string,
  nome: string,
  descricao: string,
  preco: number,
  categoria: string,
  imagem: FileList
}

export interface DadosCliente {
    nome: string;
    email: string;
    senha: string;
    senhaConfirmar: string;
}

export interface DadosCartao {
    numero: string;
    validade: string;
    cvv: string;
    nomeTitular: string;
    cpfCnpj: string;
}

export interface Autenticar {
    autenticado: boolean;
    perfil: string | null;
}

export interface CarState {
    car: Item[];
    contador: number;
}
