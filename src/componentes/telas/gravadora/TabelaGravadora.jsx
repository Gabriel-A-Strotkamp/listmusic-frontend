import { useContext } from 'react'
import GravadoraContext from './GravadoraContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function TabelaGravadora() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(GravadoraContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Gravadoras</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 && <h1>Nenhuma gravadora encontrada</h1>}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>País</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id_gravadora}>
                                <td align="center">
                                    <Button onClick={() => editarObjeto(objeto.id_gravadora)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(objeto.id_gravadora)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.id_gravadora}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.pais}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default TabelaGravadora;