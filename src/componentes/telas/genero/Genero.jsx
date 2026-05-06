import { useState, useEffect } from 'react';
import GeneroContext from './GeneroContext';
import Formulario from './FormularioGenero';
import {
    getGenerosAPI,
    getGeneroPorIdAPI,
    deleteGeneroPorIdAPI,
    cadastraGeneroAPI
} from '../../../servicos/GeneroServicos';
import Tabela from './TabelaGenero';

function Genero() {

      const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
    id_genero: "",
    descricao: ""
    });

    const recuperaGeneros = async () => {
        setListaObjetos(await getGenerosAPI());
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteGeneroPorIdAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaGeneros();
        }
    }

    const novoObjeto = () => {
        setEditar(false);
        setObjeto({
            id_genero: 0,
            descricao: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async id => {
        setObjeto(await getGeneroPorIdAPI(id));
        setEditar(true);
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        let retornoAPI = await cadastraGeneroAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });

        setExibirForm(false);
        recuperaGeneros();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaGeneros();
    }, []);

    return (
        <GeneroContext.Provider value={{
            listaObjetos, alerta, remover,
            objeto, editarObjeto,
            acaoCadastrar, handleChange,
            novoObjeto, exibirForm, editar,
            setExibirForm
        }}>
        <Formulario/>
        <Tabela/>
        </GeneroContext.Provider>
    );
}

export default Genero;