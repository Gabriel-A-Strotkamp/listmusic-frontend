export const getGravadorasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/gravadora`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const getGravadoraPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/gravadora/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const deleteGravadoraPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/gravadora/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const cadastraGravadoraAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/gravadora`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}