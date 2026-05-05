export const getGenerosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genero`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const getGeneroPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genero/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const deleteGeneroPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genero/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const cadastraGeneroAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genero`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}