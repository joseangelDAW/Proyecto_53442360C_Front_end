import React, { Component } from 'react';
import { Breadcrumb,Well, Row, Col, Panel } from 'react-bootstrap';
import FormBuilder from './../form/formBuilder';
import Tabs from './../form/tabs';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
        this.role = "";
    }

    componentWillMount = () => {
        this.parameters = this.props.arrayParametersLogin;
        this.role = this.parameters[this.state.index].value;
    }

    /* El componente tabs devuelve 0 o 1 dependiendo de si se ha seleccionado
       Usuario o Administrador */
    tabsCallback = (data) => {
        this.setState({ index: data });
        this.role = this.parameters[data].value;
    }

    /* Datos recibidos del fetch del formulario */
    formBuilderCallbackForm = (data, user, returnValue) => {
        this.props.indexLinksCallback(data, user, returnValue, this.role);
    }

    /* Callback a indexLinks si se pulsa inicio en el breadcrumbs */
    breadcrumbHomeCallback = () => {
        this.props.indexLinksCallbackHome();
    }

    render() {
        return (
            <div>
                <Breadcrumb className="breadCrumPage">
                    <Breadcrumb.Item onClick={this.breadcrumbHomeCallback}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>Login</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={5}>
                        
                            <Well className="formTips">
                                <h2>Introduce tu nombre de usuario y contraseña</h2>
                                <hr className="divider" />
                                <h4>Si no tienes cuenta de usuario puedes crearte una acciendo click en el botón Registrarse en el menú superior</h4>
                                <br />
                            </Well>
                        
                    </Col>
                    <Col md={7}>
                            <Panel className="formComponent">
                                <Panel.Heading>
                                    <Panel.Title className="text-center" componentClass="h3">Introduzca información</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                        <Tabs loginCallback={this.tabsCallback} />
                                    <FormBuilder role={this.state.index} parentCallback={this.formBuilderCallbackForm} url={this.parameters[this.state.index]["url"]} parameters={this.parameters[this.state.index]["inputs"]} />
                                </Panel.Body>
                            </Panel>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login;