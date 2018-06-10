import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

/* Componente pestañas del Login */
class Tabs extends Component {

    state = {
        logged: false,
        key: "1"
    }

    /* Según la pestaña seleccionada (Usuario o administrador), se le pasa al componente padre(Login) para que renderice
       un formulario u otro */
    handleSelect(selectedKey) {
        this.setState({ key: selectedKey })
        this.props.loginCallback(parseInt(selectedKey) - 1);
    }

    render() {
        return (
            <div className="container-fluid">
                <Nav className="navTabs" bsStyle="tabs" activeKey={this.state.key} onSelect={k => this.handleSelect(k)}>
                    <NavItem eventKey="1" title="Item">
                        Usuario
            </NavItem>
                    <NavItem eventKey="2" title="Item">
                        Administrador
            </NavItem>
                </Nav>
            </div>
        )
    }
}

export default Tabs