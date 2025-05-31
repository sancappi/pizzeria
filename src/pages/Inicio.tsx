import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { listarDados } from "../services/produto";
import Carrossel from "../components/Carrossel";
import { Item } from "../types";

const Inicio: React.FC = () => {
    const [destaques, setDestaques] = useState<Item[]>([]);
    const [promocoes, setPromocoes] = useState<Item[]>([]);
    const [slideAtual, setSlideAtual] = useState<number>(0);

    useEffect(() => {
        const slides = async () => {
            const destaqueDisponiveis = await listarDados("destaque");
            const promocaoDisponiveis = await listarDados("promocao");
            if (destaqueDisponiveis) setDestaques(destaqueDisponiveis);
            if (promocaoDisponiveis) setPromocoes(promocaoDisponiveis);
        };
        slides();
    }, []);
    
    useEffect(() => {
        if (destaques.length === 0) return;
        const tempo = setTimeout(() => {
            setSlideAtual((a: any) => a === 3 ? 0: a + 1);
        }, 3000);
        return () => clearTimeout(tempo);
    }, [slideAtual, destaques]);
    
    const slideEspecifico = (n: number) => {
        setSlideAtual(n);
    };
    
    return (
        <div className="h-screen">
            <Header />
            <main className="bg-red-800 flex flex-col gap-2">
                <section className="w-full h-[200px] sm:h-[300px]
                    md:h-[480px] flex items-center justify-center">
                    <div className="bg-gray-200 flex relative w-full h-full overflow-hidden">
                        {destaques.length > 0? destaques.map((d, index) => (
                            <img
                                key={index}
                                src={d.imagem}
                                alt={d.descricao}
                                className={`absolute inset-0 w-full h-full object-cover
                                    transition-opacity duration-[4000ms]
                                    ease-in-out ${index === slideAtual? "opacity-100" : "opacity-0"}`}/>
                        )): <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                                <p className="text-2xl sm:text-3xl ">Ainda não há destaques disponíveis.</p>
                            </div>}
                        <div className="relative w-full h-10 top-[68%] sm:top-[88%] z-10
                            flex justify-center items-center gap-1">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className={`p-2 rounded-full cursor-pointer
                                    ${slideAtual === index? "bg-red-800":"bg-white"}`}
                                    onClick={() => slideEspecifico(index)}>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-[url(./assets/bg.png)] w-full py-6 flex items-center justify-center">
                    <div className="w-full max-w-6xl flex flex-col items-center justify-center px-4">
                        <h1 className="text-4xl text-white md:text-red-800 mb-4">
                            Promoções da semana
                        </h1>
                        {promocoes.length > 0 ? (
                            <div className="min-w-[60%] grid grid-cols-2 sm:grid-cols-4 gap-3 justify-items-center">
                                {promocoes.slice(0, 4).map((p) => (
                                    <div key={p.id} className="min-w-34 sm:w-38 md:w-50 h-[220px] 
                                        sm:h-[240px] md:h-[260px] 
                                        p-2 rounded-md shadow-md bg-white">
                                        <div className="bg-gray-100 h-[50%] flex items-center justify-center">
                                            <img src={p.imagem} alt={p.descricao}
                                                className="w-full h-full object-cover rounded"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center mt-4">
                                <p className="text-2xl sm:text-3xl">Ainda não há promoções disponíveis.</p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-[url(./assets/bg.png)] w-full md:h-[800px] h-auto">
                    <Carrossel/>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

export default Inicio;