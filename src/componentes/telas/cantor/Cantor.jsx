import { useState, useEffect } from 'react';
import CantorContext from './CantorContext';
import {
    getCantoresAPI,
    deleteCantorPorIdAPI
} from '../../../servicos/CantorServico';
import Tabela from './Tabela';

function Cantor() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaCantores = async () => {
        setListaObjetos(await getCantoresAPI());
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteCantorPorIdAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaCantores();
        }
    }

    useEffect(() => {
        recuperaCantores();
    }, []);

    return (
        <CantorContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                remover
            }
        }>
        <Tabela/>
        </CantorContext.Provider>
    );
}

export default Cantor;