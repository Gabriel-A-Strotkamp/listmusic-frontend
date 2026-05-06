import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import CantorContext from './CantorContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function FormCantor() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(CantorContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cantor</Modal.Title>
            </Modal.Header>

            <form onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />

                            <Col md={12}>
                                <FloatingLabel label="ID" className="mb-3">
                                    <Form.Control readOnly name="id_cantor" value={objeto.id_cantor}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={12}>
                                <FloatingLabel label="Nome" className="mb-3">
                                    <Form.Control required name="nome" value={objeto.nome} onChange={handleChange}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={6}>
                                <FloatingLabel label="Data de Nascimento" className="mb-3">
                                    <Form.Control type="date" name="data_nascimento" value={objeto.data_nascimento} onChange={handleChange}/>
                                </FloatingLabel>
                            </Col>

                            <Col md={6}>
                                <FloatingLabel label="Nacionalidade" className="mb-3">
                                    <Form.Control name="nacionalidade" value={objeto.nacionalidade} onChange={handleChange}/>
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

export default FormCantor;