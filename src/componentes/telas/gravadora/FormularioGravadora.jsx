import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import GravadoraContext from './GravadoraContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

function FormGravadora() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm
    } = useContext(GravadoraContext);

    return (
        <Dialogo
            id="modalEdicao"
            titulo="Gravadora"
            idform="formulario"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >

            <Alerta alerta={alerta} />

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.id_gravadora}
                    id="txtIdGravadora"
                    name="id_gravadora"
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
                    msginvalido="Informe o nome da gravadora"
                    requerido={true}
                    readonly={false}
                    maxCaracteres={100}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.pais}
                    id="txtPais"
                    name="pais"
                    label="País"
                    tipo="text"
                    onchange={handleChange}
                    msgvalido="País informado"
                    msginvalido="Informe o país da gravadora"
                    requerido={false}
                    readonly={false}
                    maxCaracteres={50}
                />
            </Col>

        </Dialogo>
    );
}

export default FormGravadora;