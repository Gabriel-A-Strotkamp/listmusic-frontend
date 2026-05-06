import { useState, useEffect } from 'react';
import GravadoraContext from './GravadoraContext';
import {
    getGravadorasAPI,
    deleteGravadoraPorIdAPI
} from '../../../servicos/GravadoraServico';
import Tabela from './Tabela';

function Gravadora() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaGravadoras = async () => {
        setListaObjetos(await getGravadorasAPI());
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteGravadoraPorIdAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaGravadoras();
        }
    }

    useEffect(() => {
        recuperaGravadoras();
    }, []);

    return (
        <GravadoraContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                remover
            }
        }>
        <Tabela/>
        </GravadoraContext.Provider>
    );
}

export default Gravadora;