import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Autenticacao';


function MenuPrivado() {

    const usuario = getUsuario();
    const navigate = useNavigate();

    const sair = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>

            <Navbar expand="lg" bg="light">
                <Container>

                    <NavLink className="navbar-brand" to="/Privado">
                        🎵 Lista de Músicas
                    </NavLink>

                    <Navbar.Toggle />

                    <Navbar.Collapse>

                        <Nav className="me-auto">

                            <NavLink className="nav-link" to="/Privado">
                                <i className="bi bi-house"></i> Home
                            </NavLink>

                            <NavDropdown title="Manutenções">

                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/Privado/cantores"
                                >
                                    <i className="bi bi-person"></i> Cantores
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/Privado/generos"
                                >
                                    <i className="bi bi-music-note"></i> Gêneros
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/Privado/gravadoras"
                                >
                                    <i className="bi bi-building"></i> Gravadoras
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/Privado/musicas"
                                >
                                    <i className="bi bi-disc"></i> Músicas
                                </NavDropdown.Item>

                            </NavDropdown>

                            <NavLink className="nav-link" to="/sobre">
                                <i className="bi bi-info-circle"></i> Sobre
                            </NavLink>

                        </Nav>

                        <Nav>

                            <Navbar.Text className="me-3">
                                {usuario ? `Olá, ${usuario.nome}` : ''}
                            </Navbar.Text>

                            <Nav.Link onClick={sair}>
                                <i className="bi bi-box-arrow-right"></i> Sair
                            </Nav.Link>

                        </Nav>

                    </Navbar.Collapse>

                </Container>
            </Navbar>

            <Container className="mt-3">
                <Outlet />
            </Container>

        </div>
    );
}

export default MenuPrivado;