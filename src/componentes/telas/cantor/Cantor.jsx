import { useState, useEffect } from 'react';
import CantorContext from './CantorContext';
import TabelaCantor from './TabelaCantor';
import FormCantor from './FormularioCantor';
import Carregando from '../../comuns/Carregando';
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

import {
    getCantoresAPI,
    getCantorPorIdAPI,
    deleteCantorPorIdAPI,
    cadastraCantorAPI
} from '../../../servicos/CantorServicos';

function Cantor() {

    const navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        id_cantor: "",
        nome: "",
        data_nascimento: "",
        nacionalidade: ""
    });

    const recuperaCantores = async () => {
        try {
            setCarregando(true);

            setListaObjetos(await getCantoresAPI());

        } catch (err) {
            console.error("Erro ao recuperar cantores:", err);
            navigate("/login", { replace: true });
        } finally {
            setCarregando(false);
        }
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteCantorPorIdAPI(id);

                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });

                recuperaCantores();

            } catch (err) {
                console.error("Erro ao remover cantor:", err);
                navigate("/login", { replace: true });
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);

        setObjeto({
            id_cantor: 0,
            nome: "",
            data_nascimento: "",
            nacionalidade: ""
        });

        setExibirForm(true);
    };

    const editarObjeto = async (id) => {
        try {
            const resposta = await getCantorPorIdAPI(id);

            const dados = resposta?.objeto || resposta?.[0] || resposta;

            if (!dados) return;

            setObjeto({
                id_cantor: dados.id_cantor || 0,
                nome: dados.nome || "",
                data_nascimento: dados.data_nascimento || "",
                nacionalidade: dados.nacionalidade || ""
            });

            setEditar(true);
            setExibirForm(true);

        } catch (err) {
            console.error("Erro ao editar cantor:", err);
            navigate("/login", { replace: true });
        }
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();

        const metodo = editar ? "PUT" : "POST";

        try {
            let retornoAPI = await cadastraCantorAPI(objeto, metodo);

            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });

            setExibirForm(false);

            recuperaCantores();

        } catch (err) {
            console.error("Erro ao cadastrar/alterar cantor:", err);
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

    useEffect(() => {
        recuperaCantores();
    }, []);

    return (
        <CantorContext.Provider
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
            {exibirForm ? (
                <FormCantor />
            ) : (
                <Carregando carregando={carregando}>
                    <TabelaCantor />
                </Carregando>
            )}
        </CantorContext.Provider>
    );
}

export default WithAuth(Cantor);