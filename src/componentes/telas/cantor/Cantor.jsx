import { useState, useEffect } from 'react';
import CantorContext from './CantorContext';
import TabelaCantor from './TabelaCantor';
import FormCantor from './FormularioCantor';


import {
    getCantoresAPI,
    getCantorPorIdAPI,
    deleteCantorPorIdAPI,
    cadastraCantorAPI
} from '../../../servicos/CantorServicos';

function Cantor() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        id_cantor: "",
        nome: "",
        data_nascimento: "",
        nacionalidade: ""
    });

    const recuperaCantores = async () => {
        setListaObjetos(await getCantoresAPI());
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteCantorPorIdAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaCantores();
        }
    }

    const novoObjeto = () => {
        setEditar(false);
        setObjeto({
            id_cantor: 0,
            nome: "",
            data_nascimento: "",
            nacionalidade: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async id => {
        setObjeto(await getCantorPorIdAPI(id));
        setEditar(true);
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        let retornoAPI = await cadastraCantorAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });

        setExibirForm(false);
        recuperaCantores();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaCantores();
    }, []);

    return (
        <CantorContext.Provider value={{
            listaObjetos, alerta, remover,
            objeto, editarObjeto,
            acaoCadastrar, handleChange,
            novoObjeto, exibirForm, editar,
            setExibirForm
        }}>
            {exibirForm ? <FormCantor /> : <TabelaCantor />}
        </CantorContext.Provider>
    );
}

export default Cantor;