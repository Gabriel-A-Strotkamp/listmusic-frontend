import { useState, useEffect } from 'react';
import MusicaContext from './MusicaContext';
import FormMusica from './FormularioMusica';
import Tabela from './TabelaMusica';
import Carregando from '../../comuns/Carregando';
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

// Serviços da entidade principal
import {
    getMusicasAPI,
    getMusicaPorIdAPI,
    deleteMusicaPorIdAPI,
    cadastraMusicaAPI
} from '../../../servicos/MusicaServicos';

// Serviços relacionados
import { getCantoresAPI } from '../../../servicos/CantorServicos';
import { getGenerosAPI } from '../../../servicos/GeneroServicos';
import { getGravadorasAPI } from '../../../servicos/GravadoraServicos';

function Musica() {

    const navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [listaCantores, setListaCantores] = useState([]);
    const [listaGeneros, setListaGeneros] = useState([]);
    const [listaGravadoras, setListaGravadoras] = useState([]);

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
        try {
            setCarregando(true);

            const dados = await getMusicasAPI();
            setListaObjetos(dados);

        } catch (err) {
            console.error("Erro ao recuperar músicas:", err);
            navigate("/login", { replace: true });
        } finally {
            setCarregando(false);
        }
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                const retornoAPI = await deleteMusicaPorIdAPI(id);

                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });

                recuperaMusicas();

            } catch (err) {
                console.error("Erro ao remover música:", err);
                navigate("/login", { replace: true });
            }
        }
    };

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
    };

    const editarObjeto = async (id) => {
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

        } catch (err) {
            console.error("Erro ao editar música:", err);
            navigate("/login", { replace: true });
        }
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();

        const metodo = editar ? "PUT" : "POST";

        try {
            const retornoAPI = await cadastraMusicaAPI(objeto, metodo);

            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });

            setExibirForm(false);

            recuperaMusicas();

        } catch (err) {
            console.error("Erro ao cadastrar/alterar música:", err);
            navigate("/login", { replace: true });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setObjeto({
            ...objeto,
            [name]: value
        });
    };

    const carregarDadosRelacionados = async () => {
        try {
            const cantores = await getCantoresAPI();
            const generos = await getGenerosAPI();
            const gravadoras = await getGravadorasAPI();

            setListaCantores(cantores);
            setListaGeneros(generos);
            setListaGravadoras(gravadoras);

        } catch (err) {
            console.error("Erro ao carregar dados relacionados:", err);
            navigate("/login", { replace: true });
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        carregarDadosRelacionados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        recuperaMusicas();
    }, []);

    return (
        <MusicaContext.Provider
            value={{
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
                listaCantores,
                listaGeneros,
                listaGravadoras
            }}
        >
            {exibirForm ? (
                <FormMusica />
            ) : (
                <Carregando carregando={carregando}>
                    <Tabela />
                </Carregando>
            )}
        </MusicaContext.Provider>
    );
}

export default WithAuth(Musica);