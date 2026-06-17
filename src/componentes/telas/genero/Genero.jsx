import { useState, useEffect } from 'react';
import GeneroContext from './GeneroContext';
import Formulario from './FormularioGenero';
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

import {
    getGenerosAPI,
    getGeneroPorIdAPI,
    deleteGeneroPorIdAPI,
    cadastraGeneroAPI
} from '../../../servicos/GeneroServicos';

import Tabela from './TabelaGenero';

function Genero() {

    const navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        id_genero: "",
        descricao: ""
    });

    const recuperaGeneros = async () => {
        try {
            setListaObjetos(await getGenerosAPI());
        } catch (err) {
            console.error("Erro ao recuperar gêneros:", err);
            navigate("/login", { replace: true });
        }
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteGeneroPorIdAPI(id);

                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });

                recuperaGeneros();

            } catch (err) {
                console.error("Erro ao remover gênero:", err);
                navigate("/login", { replace: true });
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setObjeto({
            id_genero: 0,
            descricao: ""
        });
        setExibirForm(true);
    };

    const editarObjeto = async (id) => {
        try {
            const resposta = await getGeneroPorIdAPI(id);

            const dados = resposta?.objeto || resposta?.[0] || resposta;

            if (!dados) return;

            setObjeto({
                id_genero: dados.id_genero || 0,
                descricao: dados.descricao || ""
            });

            setEditar(true);
            setExibirForm(true);

        } catch (err) {
            console.error("Erro ao editar gênero:", err);
            navigate("/login", { replace: true });
        }
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();

        const metodo = editar ? "PUT" : "POST";

        try {
            let retornoAPI = await cadastraGeneroAPI(objeto, metodo);

            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });

            setExibirForm(false);

            recuperaGeneros();

        } catch (err) {
            console.error("Erro ao cadastrar/alterar gênero:", err);
            navigate("/login", { replace: true });
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({
            ...objeto,
            [name]: value
        });
    };

    useEffect(() => {
        recuperaGeneros();
    }, []);

    return (
        <GeneroContext.Provider
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
            <Tabela />
        </GeneroContext.Provider>
    );
}

export default WithAuth(Genero);