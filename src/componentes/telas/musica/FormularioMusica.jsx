import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import MusicaContext from './MusicaContext';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

function FormMusica() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm,
        listaCantores,
        listaGeneros,
        listaGravadoras

    } = useContext(MusicaContext);

    return (
        <Dialogo
            id="modalEdicao"
            titulo="Música"
            idform="formulario"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >

            <Alerta alerta={alerta} />

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.id_musica}
                    id="txtIdMusica"
                    name="id_musica"
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
                    msginvalido="Informe o nome da música"
                    requerido={true}
                    readonly={false}
                    maxCaracteres={100}
                />
            </Col>

            <Col xs={12} md={6}>
                <CampoEntrada
                    value={objeto.ano}
                    id="txtAno"
                    name="ano"
                    label="Ano"
                    tipo="number"
                    onchange={handleChange}
                    readonly={false}
                    maxCaracteres={4}
                />
            </Col>

            <Col xs={12} md={6}>
                <CampoEntrada
                    value={objeto.duracao}
                    id="txtDuracao"
                    name="duracao"
                    label="Duração"
                    tipo="text"
                    onchange={handleChange}
                    readonly={false}
                    maxCaracteres={20}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.album}
                    id="txtAlbum"
                    name="album"
                    label="Álbum"
                    tipo="text"
                    onchange={handleChange}
                    readonly={false}
                    maxCaracteres={100}
                />
            </Col>

            {/* Cantor */}
            <Col xs={12} md={4}>
                <Form.Label>Cantor</Form.Label>
                <Form.Select
                    name="id_cantor"
                    value={objeto.id_cantor || ""}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>

                    {listaCantores.map(c => (
                        <option key={c.id_cantor} value={c.id_cantor}>
                            {c.nome}
                        </option>
                    ))}
                </Form.Select>
            </Col>

            {/* Gênero */}
            <Col xs={12} md={4}>
                <Form.Label>Gênero</Form.Label>
                <Form.Select
                    name="id_genero"
                    value={objeto.id_genero || ""}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>

                    {listaGeneros.map(g => (
                        <option key={g.id_genero} value={g.id_genero}>
                            {g.descricao}
                        </option>
                    ))}
                </Form.Select>
            </Col>

            {/* Gravadora */}
            <Col xs={12} md={4}>
                <Form.Label>Gravadora</Form.Label>
                <Form.Select
                    name="id_gravadora"
                    value={objeto.id_gravadora || ""}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>

                    {listaGravadoras.map(g => (
                        <option key={g.id_gravadora} value={g.id_gravadora}>
                            {g.nome}
                        </option>
                    ))}
                </Form.Select>
            </Col>

        </Dialogo>
    );
}

export default FormMusica;