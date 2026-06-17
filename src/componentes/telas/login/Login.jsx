import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../../seguranca/Autenticacao';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const acaoLogin = async e => {
        e.preventDefault();

        try {
            const body = { email, senha };
            setCarregando(true);
            setAlerta({ status: "", message: "" }); // Limpa alertas anteriores

            // Tente usar import.meta.env.VITE_ENDERECO_API se o projeto for Vite
            // ou mantenha process.env.REACT_APP_ENDERECO_API se for Create React App antigo
            const urlApi = import.meta.env?.VITE_ENDERECO_API || process.env.REACT_APP_ENDERECO_API;

            const response = await fetch(`${urlApi}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const json = await response.json();

            // Valida se a resposta HTTP deu erro (como 401 ou 500)
            if (!response.ok) {
                throw new Error(json.message || "Usuário ou senha inválidos");
            }

            // Se chegou aqui, o status é de sucesso (200/201)
            setAutenticado(true);
            gravaAutenticacao(json);

        } catch (err) {
            console.error(err.message);
            setAlerta({ status: "error", message: err.message });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            // Correção para ler o erro stringificado ou objeto de erro nativo
            setAlerta({ status: "error", message: err?.message || String(err) });
        }
    }, []);

    if (autenticado === true) {
        return <Navigate to="/privado" />
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoLogin}>
                            <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>
                            <CampoEntrada value={email}
                                id="txtEmail" name="email" label="E-mail"
                                tipo="email" onchange={e => setEmail(e.target.value)}
                                msgvalido="Email OK" msginvalido="Informe o email"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoEntrada value={senha}
                                id="txtSenha" name="senha" label="Senha"
                                tipo="password" onchange={e => setSenha(e.target.value)}
                                msgvalido="Senha OK" msginvalido="Informe a senha"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default Login;
