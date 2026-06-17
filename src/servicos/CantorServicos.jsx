import { getToken } from '../seguranca/Autenticacao';

export const getCantoresAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cantor`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": getToken()}
    });
    const data = await response.json();
    return data;
}

export const getCantorPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cantor/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": getToken()}
    });
    const data = await response.json();
    return data; 
}

export const deleteCantorPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cantor/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": getToken()}
    });
    const data = await response.json();
    return data;
}

export const cadastraCantorAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cantor`, {
        method: metodo,
       headers: { "Content-Type": "application/json", "Authorization": getToken()},
        body: JSON.stringify(objeto),
    });
    const data = await response.json();
    return data;
}