import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import MusicaContext from './MusicaContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function FormMusica() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(MusicaContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Música</Modal.Title>
            </Modal.Header>

            <form onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />

                            <Col md={12}>
                                <FloatingLabel label="ID" className="mb-3">
                                    <Form.Control readOnly name="id_musica" value={objeto.id_musica}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={12}>
                                <FloatingLabel label="Nome" className="mb-3">
                                    <Form.Control required name="nome" value={objeto.nome} onChange={handleChange}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={6}>
                                <FloatingLabel label="Ano" className="mb-3">
                                    <Form.Control name="ano" value={objeto.ano} onChange={handleChange}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={6}>
                                <FloatingLabel label="Duração" className="mb-3">
                                    <Form.Control name="duracao" value={objeto.duracao} onChange={handleChange}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={12}>
                                <FloatingLabel label="Álbum" className="mb-3">
                                    <Form.Control name="album" value={objeto.album} onChange={handleChange}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <FloatingLabel label="Cantor" className="mb-3">
                                    <Form.Select name="id_cantor" value={objeto.id_cantor} onChange={handleChange}>
                                        <option value="">Selecione</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <FloatingLabel label="Gênero" className="mb-3">
                                    <Form.Select name="id_genero" value={objeto.id_genero} onChange={handleChange}>
                                        <option value="">Selecione</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <FloatingLabel label="Gravadora" className="mb-3">
                                    <Form.Select name="id_gravadora" value={objeto.id_gravadora} onChange={handleChange}>
                                        <option value="">Selecione</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>

                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExibirForm(false)}>Fechar</Button>
                    <Button variant="success" type="submit">Salvar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default FormMusica;