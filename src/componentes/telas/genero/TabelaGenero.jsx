import { useContext } from 'react'
import GeneroContext from './GeneroContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function TabelaGenero() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(GeneroContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Gêneros</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 && <h1>Nenhum gênero encontrado</h1>}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id_genero}>
                                <td align="center">
                                    <Button onClick={() => editarObjeto(objeto.id_genero)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(objeto.id_genero)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.id_genero}</td>
                                <td>{objeto.descricao}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default TabelaGenero;