import { useState, useEffect } from 'react';
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

    const recuperaGravadoras = async () => {
        try {
            setCarregando(true);

            setListaObjetos(await getGravadorasAPI());

        } catch (err) {
            console.error("Erro ao recuperar gravadoras:", err);
            navigate("/login", { replace: true });
        } finally {
            setCarregando(false);
        }
    };

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

    const novoObjeto = () => {
        setEditar(false);

        setObjeto({
            id_gravadora: 0,
            nome: "",
            pais: ""
        });

        setExibirForm(true);
    };

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setObjeto({
            ...objeto,
            [name]: value
        });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
    recuperaGravadoras();
}, []);

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