import { useState, useEffect } from 'react';
import MusicaContext from './MusicaContext';
import {
    getMusicasAPI,
    deleteMusicaPorIdAPI
} from '../../../servicos/MusicaServico';
import Tabela from './Tabela';

function Musica() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaMusicas = async () => {
        setListaObjetos(await getMusicasAPI());
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteMusicaPorIdAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaMusicas();
        }
    }

    useEffect(() => {
        recuperaMusicas();
    }, []);

    return (
        <MusicaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                remover
            }
        }>
        <Tabela/>
        </MusicaContext.Provider>
    );
}

export default Musica;