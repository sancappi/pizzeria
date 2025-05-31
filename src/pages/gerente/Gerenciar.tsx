import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { adicionar, buscar, excluir, atualizar } from "../../services/produto";
import { BuscarForm, AdicionarForm, Item } from "../../types";


const Gerenciar: React.FC = () => {
  const [produtoEncontrado, setProdutoEncontrado] = useState<Item | null>(null);
  const [mensagem, setMensagem] = useState({ texto: "", estilo: "" });
  const categoria: string[] = ["pizza", "bebida", "promocao", "destaque"];

  const { register: registerBuscar, handleSubmit: handleSubmitBuscar,
    } = useForm<BuscarForm>();

  const { register: registerAdicionar, handleSubmit: handleSubmitAdicionar,
    reset: resetAdicionar, watch } = useForm<AdicionarForm>();

  const imagemArquivo = watch("imagem");

  const buscarItem = async (data: BuscarForm) => {
    const res = await buscar(data);
    if (res) {
      setProdutoEncontrado(res);
      setMensagem({ texto: "Produto encontrado.", estilo: "ok" });
    } else {
      setProdutoEncontrado(null);
      setMensagem({ texto: "Produto não encontrado.", estilo: "no" });
    }
  };

  const excluirItem = async (codigo: string) => {
    const res = await excluir(codigo);
    if (res) {
      setProdutoEncontrado(null);
      setMensagem({ texto: "Produto excluído com sucesso.", estilo: "ok" });
    } else {
      setMensagem({ texto: "Erro ao excluir produto.", estilo: "no" });
    }
  };

  const atualizarItem = async (dados: Item) => {
    const res = await atualizar(dados);
    if (res) {
      setProdutoEncontrado(null);
      setMensagem({ texto: "Produto atualizado com sucesso.", estilo: "ok" });
    } else {
      setMensagem({ texto: "Erro ao atualizar produto.", estilo: "no" });
    }
  };

  const adicionarItem = async (item: AdicionarForm) => {
    const dados = new FormData();
    dados.append("codigo", item.codigo);
    dados.append("nome", item.nome);
    dados.append("descricao", item.descricao);
    dados.append("preco", item.preco.toString());
    dados.append("categoria", item.categoria);

    if (item.imagem && item.imagem.length > 0) dados.append("imagem", item.imagem[0]);
    const res = await adicionar(dados);
    if (res) {
      resetAdicionar();
      setMensagem({ texto: "Produto salvo!", estilo: "ok" });
    } else {
      setMensagem({ texto: "Erro ao salvar produto.", estilo: "no" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full p-6 flex flex-col items-center gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-800">Gerenciar Produtos</h1>
        <form
          className="bg-white border-2 border-red-800 p-6 rounded w-[96%] sm:w-[80%] max-w-[600px] space-y-4"
          onSubmit={handleSubmitBuscar(buscarItem)}>
          <h2 className="text-2xl font-semibold ">Buscar produto</h2>
          <select
            {...registerBuscar("categoria", { required: true })}
            className="cursor-pointer w-full p-2 border-2 border-gray-300 rounded text-xl"
            defaultValue="">
            <option value="">-- Categoria --</option>
            {categoria.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Código"
            {...registerBuscar("codigo", { required: true })}
            className="w-full p-2 border-2 border-gray-300 rounded font-sans"
          />

          <button
            type="submit"
            className="w-full bg-red-800 text-white p-2 rounded text-xl cursor-pointer
              hover:bg-red-900">
            Buscar
          </button>
        </form>
        {produtoEncontrado && (
          <div className="bg-white border-2 border-red-800 p-6 rounded w-[96%] sm:w-[80%] space-y-4 font-sans">
            <h2 className="text-2xl font-semibold font-ideal">Editar produto</h2>

            <input
              type="text"
              placeholder="Título"
              value={produtoEncontrado.nome}
              onChange={(e) =>
                setProdutoEncontrado({ ...produtoEncontrado, nome: e.target.value })
              }
              className="w-full p-2 border-2 border-gray-300 rounded"
            />
            <textarea
              placeholder="Descrição"
              value={produtoEncontrado.descricao}
              onChange={(e) =>
                setProdutoEncontrado({ ...produtoEncontrado, descricao: e.target.value })
              }
              className="w-full p-2 border-2 border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Preço"
              value={produtoEncontrado.preco}
              onChange={(e) =>
                setProdutoEncontrado({ ...produtoEncontrado, preco: parseFloat(e.target.value) })
              }
              className="w-full sm:w-30 p-2 border-2 border-gray-300 rounded"
            />
            <div className="flex gap-4">
              <button
                onClick={() => atualizarItem(produtoEncontrado)}
                className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-900 cursor-pointer">
                Salvar
              </button>
              <button
                onClick={() => excluirItem(produtoEncontrado.codigo)}
                className="w-full bg-red-800 text-white p-2 rounded hover:bg-red-900 cursor-pointer">
                Excluir
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmitAdicionar(adicionarItem)}
          className="bg-white border-2 border-red-800 p-6 rounded space-y-4 w-[96%] sm:w-[80%] max-w-[600px] font-sans 
            flex flex-col">
          <h2 className="text-2xl font-semibold font-ideal">Adicionar novo item</h2>
          <input
            type="text"
            placeholder="Código"
            {...registerAdicionar("codigo", { required: true })}
            className="border-2 border-gray-300 p-2 w-full rounded"
          />
          <select
            {...registerAdicionar("categoria", { required: true })}
            className="cursor-pointer w-full p-2 border-2 border-gray-300 rounded font-ideal text-xl"
            defaultValue=""
          >
            <option value="">-- Categoria --</option>
            {categoria.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Título"
            {...registerAdicionar("nome", { required: true })}
            className="border-2 border-gray-300 p-2 w-full rounded"
          />
          <textarea
            placeholder="Descrição"
            {...registerAdicionar("descricao", { required: true })}
            className="border-2 border-gray-300 p-2 w-full rounded"
          />
          <input
            type="number"
            placeholder="Preço"
            step="0.01"
            {...registerAdicionar("preco", {
              required: true,
              valueAsNumber: true,
            })}
            className="border-2 border-gray-300 p-2 w-full sm:w-30 rounded"
          />

        <label className="cursor-pointer border-2 border-gray-300 rounded px-4 py-2 
          hover:bg-gray-300 inline-block w-full sm:w-60 text-center">
          Selecionar imagem
          <input
            type="file"
            accept="image/*"
            {...registerAdicionar("imagem", { required: true })}
            className="hidden"
          />
      </label>
          { imagemArquivo && imagemArquivo.length > 0 && (
            <p>Arquivo selecionado: {imagemArquivo[0].name}</p>
          )}
          
          <button
            type="submit"
            className="bg-red-800 text-white p-2 rounded w-full hover:bg-red-900 cursor-pointer font-ideal text-xl">
            Adicionar Item
          </button>
        </form>

        {mensagem.texto && (
          <div
            className={`p-4 rounded ${
              mensagem.estilo === "ok" ? "bg-green-200 text-green-900 text-sm" : "bg-red-200 text-red-900 text-sm"
            }`}>
            {mensagem.texto}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Gerenciar;
