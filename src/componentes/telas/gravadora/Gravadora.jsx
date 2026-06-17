import { useState, useEffect, useCallback } from 'react';
import GravadoraContext from './GravadoraContext';
import Formulario from './FormularioGravadora';
import Tabela from './TabelaGravadora';
import Carregando from '../../comuns/Carregando';
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

import {
    getGravadorasAPI,
    getGravadoraPorIdAPI,
    deleteGravadoraPorIdAPI,
    cadastraGravadoraAPI
} from '../../../servicos/GravadoraServicos';

function Gravadora() {

    const navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        id_gravadora: "",
        nome: "",
        pais: ""
    });

    // =========================
    // LISTAR
    // =========================

    const recuperaGravadoras = useCallback(async () => {
        try {
            setCarregando(true);

            const dados = await getGravadorasAPI();
            setListaObjetos(dados);

        } catch (err) {
            console.error("Erro ao recuperar gravadoras:", err);
            navigate("/login", { replace: true });
        } finally {
            setCarregando(false);
        }
    }, [navigate]);

    // =========================
    // REMOVER
    // =========================

    const remover = async (id) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteGravadoraPorIdAPI(id);

                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });

                recuperaGravadoras();

            } catch (err) {
                console.error("Erro ao remover gravadora:", err);
                navigate("/login", { replace: true });
            }
        }
    };

    // =========================
    // NOVO
    // =========================

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });

        setObjeto({
            id_gravadora: 0,
            nome: "",
            pais: ""
        });

        setExibirForm(true);
    };

    // =========================
    // EDITAR
    // =========================

    const editarObjeto = async (id) => {
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

        } catch (err) {
            console.error("Erro ao editar gravadora:", err);
            navigate("/login", { replace: true });
        }
    };

    // =========================
    // CADASTRAR / ALTERAR
    // =========================

    const acaoCadastrar = async (e) => {
        e.preventDefault();

        const metodo = editar ? "PUT" : "POST";

        try {
            let retornoAPI = await cadastraGravadoraAPI(objeto, metodo);

            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });

            setExibirForm(false);

            recuperaGravadoras();

        } catch (err) {
            console.error("Erro ao cadastrar/alterar gravadora:", err);
            navigate("/login", { replace: true });
        }
    };

    // =========================
    // CHANGE FORM
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setObjeto({
            ...objeto,
            [name]: value
        });
    };

    // =========================
    // LOAD INICIAL
    // =========================

    useEffect(() => {
        recuperaGravadoras();
    }, [recuperaGravadoras]);

    // =========================
    // RENDER
    // =========================

    return (
        <GravadoraContext.Provider
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
                setExibirForm
            }}
        >
            <Formulario />

            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
        </GravadoraContext.Provider>
    );
}

export default WithAuth(Gravadora);