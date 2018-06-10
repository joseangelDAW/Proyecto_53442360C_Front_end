import React, { Component } from 'react';
import { Row, Col, Well, Breadcrumb, Panel } from 'react-bootstrap';
import FormBuilder from './../form/formBuilder';

/* Componente que inserta mascotas, se usa el componente FormBuilder,
   El componente FormBuilder es el que realiza la llamada a la API */
class InsertPet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
        this.role = "";
    }

    componentWillMount = () => {
        this.parameters = this.props.arrayParametersInsertPet;
    }

    formBuilderCallbackForm = (data, user, returnValue) => {
        this.props.showListPetByUserIdCallback();
    }

    

    render() {
        return (
            <div>
                <Breadcrumb className="breadCrumPage">
                    <Breadcrumb.Item onClick={() => this.formBuilderCallbackForm(200, "", "")}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={this.props.showListPetByUserIdCallback} >Mis mascotas</Breadcrumb.Item>
                    <Breadcrumb.Item active>Añadir Mascota</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col md={5}>

                        <Well className="formTips">
                            <h2>Rellena los campos para añadir una nueva mascota</h2>
                            <hr className="divider" />
                            <h4>En el menú listar mascotas puedes añadir una foto de tu mascota para completar su ficha</h4>
                            <br />
                        </Well>

                    </Col>
                    <Col md={7}>
                        <Panel className="formComponent">
                            <Panel.Heading>
                                <Panel.Title className="text-center" componentClass="h3">Introduzca información</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <FormBuilder parentCallback={this.formBuilderCallbackForm} url={this.parameters[this.state.index]["url"]} parameters={this.parameters[this.state.index]["inputs"]} />
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InsertPet;