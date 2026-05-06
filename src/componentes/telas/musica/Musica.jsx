import { useState, useEffect } from 'react';
import MusicaContext from './MusicaContext';
import FormMusica from './FormularioMusica';
import Tabela from './TabelaMusica';

// Serviços da própria entidade
import {
    getMusicasAPI,
    getMusicaPorIdAPI,
    deleteMusicaPorIdAPI,
    cadastraMusicaAPI
} from '../../../servicos/MusicaServicos';

// Serviços das entidades relacionadas
import { getCantoresAPI } from '../../../servicos/CantorServicos';
import { getGenerosAPI } from '../../../servicos/GeneroServicos';
import { getGravadorasAPI } from '../../../servicos/GravadoraServicos';

function Musica() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    // 🔹 Listas para os SELECTs
    const [listaCantores, setListaCantores] = useState([]);
    const [listaGeneros, setListaGeneros] = useState([]);
    const [listaGravadoras, setListaGravadoras] = useState([]);

    // 🔹 Objeto principal
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

    // =========================
    // 🔹 CRUD PRINCIPAL
    // =========================

    const recuperaMusicas = async () => {
        const dados = await getMusicasAPI();
        setListaObjetos(dados);
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
        setAlerta({ status: "", message: "" });

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
        try {
            const resposta = await getMusicaPorIdAPI(id);

            const dados = resposta?.objeto || resposta?.[0] || resposta;

            if (!dados) return;

            setObjeto({
                id_musica: dados.id_musica || 0,
                nome: dados.nome || "",
                ano: dados.ano || "",
                album: dados.album || "",
                duracao: dados.duracao || "",
                id_cantor: dados.id_cantor || "",
                id_genero: dados.id_genero || "",
                id_gravadora: dados.id_gravadora || ""
            });

            setEditar(true);
            setExibirForm(true);

        } catch (erro) {
            console.error("Erro ao editar música:", erro);
        }
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        try {
            let retornoAPI = await cadastraMusicaAPI(objeto, metodo);

            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });

            setExibirForm(false);
            recuperaMusicas();

        } catch (erro) {
            console.error("Erro ao salvar:", erro);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    }

    // =========================
    // 🔹 CARREGAR RELACIONAMENTOS
    // =========================

    const carregarDadosRelacionados = async () => {
        try {
            const cantores = await getCantoresAPI();
            const generos = await getGenerosAPI();
            const gravadoras = await getGravadorasAPI();

            setListaCantores(cantores);
            setListaGeneros(generos);
            setListaGravadoras(gravadoras);

        } catch (erro) {
            console.error("Erro ao carregar dados relacionados:", erro);
        }
    }

    // =========================
    // 🔹 LOAD INICIAL
    // =========================

    useEffect(() => {
        recuperaMusicas();
        carregarDadosRelacionados();
    }, []);

    // =========================
    // 🔹 RENDER
    // =========================

    return (
        <MusicaContext.Provider value={{
            listaObjetos,
            alerta,
            remover,

            objeto,
            editarObjeto,
            acaoCadastrar,
            handleChange,
            novoObjeto,

            exibirForm,
            editar,
            setExibirForm,

            // 🔥 LISTAS PARA SELECT
            listaCantores,
            listaGeneros,
            listaGravadoras
        }}>
            {exibirForm ? <FormMusica /> : <Tabela />}
        </MusicaContext.Provider>
    );
}

export default Musica;