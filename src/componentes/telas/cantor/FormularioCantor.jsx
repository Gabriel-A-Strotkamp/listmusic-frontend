import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import CantorContext from './CantorContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

function FormCantor() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm
    } = useContext(CantorContext);

    return (
        <Dialogo
            id="modalEdicao"
            titulo="Cantor"
            idform="formulario"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >

            <Alerta alerta={alerta} />

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.id_cantor}
                    id="txtIdCantor"
                    name="id_cantor"
                    label="ID"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={10}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.nome}
                    id="txtNome"
                    name="nome"
                    label="Nome"
                    tipo="text"
                    onchange={handleChange}
                    msgvalido="Nome informado"
                    msginvalido="Informe o nome do cantor"
                    requerido={true}
                    readonly={false}
                    maxCaracteres={100}
                />
            </Col>

            <Col xs={12} md={6}>
                <CampoEntrada
                    value={objeto.data_nascimento}
                    id="txtDataNascimento"
                    name="data_nascimento"
                    label="Data de Nascimento"
                    tipo="date"
                    onchange={handleChange}
                    requerido={false}
                    readonly={false}
                />
            </Col>

            <Col xs={12} md={6}>
                <CampoEntrada
                    value={objeto.nacionalidade}
                    id="txtNacionalidade"
                    name="nacionalidade"
                    label="Nacionalidade"
                    tipo="text"
                    onchange={handleChange}
                    msgvalido="Nacionalidade informada"
                    msginvalido="Informe a nacionalidade"
                    requerido={false}
                    readonly={false}
                    maxCaracteres={50}
                />
            </Col>

        </Dialogo>
    );
}

export default FormCantor;