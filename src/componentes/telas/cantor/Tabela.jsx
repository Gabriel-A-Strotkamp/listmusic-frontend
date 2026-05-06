import { useContext } from 'react'
import CantorContext from './CantorContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function TabelaCantor() {

    const { alerta, listaObjetos, remover } = useContext(CantorContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cantores</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary">
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 && <h1>Nenhum cantor encontrado</h1>}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data Nascimento</th>
                            <th>Nacionalidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id_cantor}>
                                <td align="center">
                                    <Button variant="info">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(objeto.id_cantor)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.id_cantor}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.data_nascimento}</td>
                                <td>{objeto.nacionalidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default TabelaCantor;