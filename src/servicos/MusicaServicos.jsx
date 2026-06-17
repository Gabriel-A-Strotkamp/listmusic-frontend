import { getToken } from '../seguranca/Autenticacao';

export const getMusicasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/musica`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": getToken()}
    });
    return await response.json();
}

export const getMusicaPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/musica/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": getToken()}
    });
    return await response.json();
}

export const deleteMusicaPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/musica/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": getToken()}
    });
    return await response.json();
}

export const cadastraMusicaAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/musica`, {
        method: metodo,
        headers: { "Content-Type": "application/json", "Authorization": getToken()},
        body: JSON.stringify(objeto),
    });
    return await response.json();
}