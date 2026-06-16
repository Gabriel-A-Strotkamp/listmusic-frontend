import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Autenticacao';

function MenuPrivado() {
    const usuario = getUsuario();

    return (
        <div>
            <Navbar expand="lg" bg="light">
                <Container>

                    <NavLink className="navbar-brand" to="/">
                        🎵 Lista de Músicas
                    </NavLink>

                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav className="me-auto">

                            <NavLink className="nav-link" to="/">
                                <i className="bi bi-house"></i> Home
                            </NavLink>

                            <NavDropdown title="Manutenções">

                                <NavDropdown.Item as={NavLink} to="/cantores">
                                    <i className="bi bi-person"></i> Cantores
                                </NavDropdown.Item>

                                <NavDropdown.Item as={NavLink} to="/generos">
                                    <i className="bi bi-music-note"></i> Gêneros
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item as={NavLink} to="/gravadoras">
                                    <i className="bi bi-building"></i> Gravadoras
                                </NavDropdown.Item>

                                <NavDropdown.Item as={NavLink} to="/musicas">
                                    <i className="bi bi-disc"></i> Músicas
                                </NavDropdown.Item>

                            </NavDropdown>

                            <NavLink className="nav-link" to="/sobre">
                                <i className="bi bi-info-circle"></i> Sobre
                            </NavLink>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default MenuPrivado;