import { useState, useEffect } from 'react';
import GeneroContext from './GeneroContext';
import {
    getGenerosAPI,
    deleteGeneroPorIdAPI
} from '../../../servicos/GeneroServico';
import Tabela from './Tabela';

function Genero() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaGeneros = async () => {
        setListaObjetos(await getGenerosAPI());
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteGeneroPorIdAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaGeneros();
        }
    }

    useEffect(() => {
        recuperaGeneros();
    }, []);

    return (
        <GeneroContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                remover
            }
        }>
        <Tabela/>
        </GeneroContext.Provider>
    );
}

export default Genero;