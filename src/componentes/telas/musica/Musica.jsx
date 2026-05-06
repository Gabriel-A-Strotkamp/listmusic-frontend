import { useState, useEffect } from 'react';
import MusicaContext from './MusicaContext';
import FormMusica from './FormularioMusica';
import {
    getMusicasAPI,
    getMusicaPorIdAPI,
    deleteMusicaPorIdAPI,
    cadastraMusicaAPI
} from '../../../servicos/MusicaServicos';
import Tabela from './TabelaMusica';

function Musica() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
    id_musica: "",
    nome: "",
    ano: "",
    album: "",
    duracao: "",
    id_cantor: "",
    id_genero: "",
    id_gravadora: ""
});

    const recuperaMusicas = async () => {
        setListaObjetos(await getMusicasAPI());
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteMusicaPorIdAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaMusicas();
        }
    }

    const novoObjeto = () => {
        setEditar(false);
        setObjeto({
            id_musica: 0,
            nome: "",
            ano: "",
            album: "",
            duracao: "",
            id_cantor: "",
            id_genero: "",
            id_gravadora: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async id => {
        setObjeto(await getMusicaPorIdAPI(id));
        setEditar(true);
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        let retornoAPI = await cadastraMusicaAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });

        setExibirForm(false);
        recuperaMusicas();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaMusicas();
    }, []);

    return (
        <MusicaContext.Provider value={{
            listaObjetos, alerta, remover,
            objeto, editarObjeto,
            acaoCadastrar, handleChange,
            novoObjeto, exibirForm, editar,
            setExibirForm
        }}>
        <FormMusica/>
        <Tabela/>
        </MusicaContext.Provider>
    );
}

export default Musica;