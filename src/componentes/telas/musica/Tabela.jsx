import { useContext } from 'react'
import MusicaContext from './MusicaContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function TabelaMusica() {

    const { alerta, listaObjetos, remover } = useContext(MusicaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Músicas</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary">
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 && <h1>Nenhuma música encontrada</h1>}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Álbum</th>
                            <th>Ano</th>
                            <th>Duração</th>
                            <th>Cantor</th>
                            <th>Gênero</th>
                            <th>Gravadora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id_musica}>
                                <td align="center">
                                    <Button variant="info">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(objeto.id_musica)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.id_musica}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.album}</td>
                                <td>{objeto.ano}</td>
                                <td>{objeto.duracao}</td>
                                <td>{objeto.cantor}</td>
                                <td>{objeto.genero}</td>
                                <td>{objeto.gravadora}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default TabelaMusica;