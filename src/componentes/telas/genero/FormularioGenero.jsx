import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import GeneroContext from './GeneroContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

function FormGenero() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm
    } = useContext(GeneroContext);

    return (
        <Dialogo
            id="modalEdicao"
            titulo="Gênero"
            idform="formulario"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >

            <Alerta alerta={alerta} />

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.id_genero}
                    id="txtIdGenero"
                    name="id_genero"
                    label="ID"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={10}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.descricao}
                    id="txtDescricao"
                    name="descricao"
                    label="Descrição"
                    tipo="text"
                    onchange={handleChange}
                    msgvalido="Descrição informada"
                    msginvalido="Informe a descrição do gênero"
                    requerido={true}
                    readonly={false}
                    maxCaracteres={100}
                />
            </Col>

        </Dialogo>
    );
}

export default FormGenero;