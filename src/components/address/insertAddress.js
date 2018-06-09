import React, { Component } from 'react';
import { Row, Col, Well, Breadcrumb, Panel } from 'react-bootstrap';
import FormBuilder from './../form/formBuilder';

const parameters = 
[
    {
        "url": "/address/insertAddress", "value": "Insertar Direccion",
        "inputs":
            [
                { tx: "text", key: "street", phrase: "Calle" },
                { tx: "text", key: "number", phrase: "Numero" },
                { tx: "text", key: "floor", phrase: "Piso" },
                { tx: "text", key: "floorInformation", phrase: "Informacion del piso" },
                { tx: "text", key: "province", phrase: "Provincia" },
                { tx: "text", key: "city", phrase: "Ciudad" },
                { tx: "text", key: "cp", phrase: "Codigo postal" }
            ]
    }
]

class InsertAddress extends Component {
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
        this.props.listUserDataCallback(data);
    }

    

    render() {
        return (
            <div>
                <Row>
                    <Col md={5}>

                        <Well className="formTips">
                            <h2>Rellena los campos para añadir una nueva dirección</h2>
                            <hr className="divider" />
                            <h4>Si lo deseas, opcionalmente puedes añadir una dirección a tu cuenta. Utilizamos estos datos para realizar estadísticas.</h4>
                            <br />
                        </Well>

                    </Col>
                    <Col md={7}>
                        <Panel className="formComponent">
                            <Panel.Heading>
                                <Panel.Title className="text-center" componentClass="h3">Introduzca información</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <FormBuilder parentCallback={this.formBuilderCallbackForm} url={parameters[this.state.index]["url"]} parameters={parameters[this.state.index]["inputs"]} />
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InsertAddress;