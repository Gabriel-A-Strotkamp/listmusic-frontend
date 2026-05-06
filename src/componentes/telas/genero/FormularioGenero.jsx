import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import GeneroContext from './GeneroContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function FormGenero() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(GeneroContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Gênero</Modal.Title>
            </Modal.Header>

            <form onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />

                            <Col md={12}>
                                <FloatingLabel label="ID" className="mb-3">
                                    <Form.Control readOnly name="id_genero" value={objeto.id_genero}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={12}>
                                <FloatingLabel label="Descrição" className="mb-3">
                                    <Form.Control required name="descricao" value={objeto.descricao} onChange={handleChange}/>
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

export default FormGenero;