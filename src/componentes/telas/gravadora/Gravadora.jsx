import { useState, useEffect } from 'react';
import GravadoraContext from './GravadoraContext';
import Formulario from './FormularioGravadora';
import {
    getGravadorasAPI,
    getGravadoraPorIdAPI,
    deleteGravadoraPorIdAPI,
    cadastraGravadoraAPI
} from '../../../servicos/GravadoraServicos';
import Tabela from './TabelaGravadora';

function Gravadora() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
    id_gravadora: "",
    nome: "",
    pais: ""
    });

    const recuperaGravadoras = async () => {
        setListaObjetos(await getGravadorasAPI());
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteGravadoraPorIdAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaGravadoras();
        }
    }

    const novoObjeto = () => {
        setEditar(false);
        setObjeto({
            id_gravadora: 0,
            nome: "",
            pais: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async id => {
    try {
        const resposta = await getGravadoraPorIdAPI(id);

        const dados = resposta?.objeto || resposta?.[0] || resposta;

        if (!dados) return;

        setObjeto({
            id_gravadora: dados.id_gravadora || 0,
            nome: dados.nome || "",
            pais: dados.pais || ""
        });

        setEditar(true);
        setExibirForm(true);

    } catch (erro) {
        console.error("Erro ao editar gravadora:", erro);
    }
};

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        let retornoAPI = await cadastraGravadoraAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });

        setExibirForm(false);
        recuperaGravadoras();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaGravadoras();
    }, []);

    return (
        <GravadoraContext.Provider value={{
            listaObjetos, alerta, remover,
            objeto, editarObjeto,
            acaoCadastrar, handleChange,
            novoObjeto, exibirForm, editar,
            setExibirForm
        }}>
        <Formulario/>
        <Tabela/>
        </GravadoraContext.Provider>
    );
}

export default Gravadora;