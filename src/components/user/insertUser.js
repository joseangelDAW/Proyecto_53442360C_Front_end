import React, { Component } from 'react';
import { Button, Modal, Row, Col, Well, Breadcrumb, Panel } from 'react-bootstrap';
import FormBuilder from './../form/formBuilder';
import SendEmail from '../service/sendEmail';

/* Componente que registra usuario en la web */
class InsertUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            visibleSender: true,
            sender: "",
            closeDisabled : true
        }
        this.role = "";
        this.userId = "";
        /* ruta de la api que envia mail de confirmación de registro */
        this.urlSendEmail = "/user/sendEmailWhenRegistered"
    }

    /* asigna los parametros que le vienen de indexLinks a la varibale de clase parameters */
    componentWillMount = () => {
        this.parameters = this.props.arrayParametersInsertUser;
    }

    senderEmail = (userId, urlSendEmail) => {
        this.setState({
            sender:
                <div>
                    <Modal show={this.state.visibleSender} onHide={this.sendEmailCancel}>
                        <Modal.Body>
                            <p>El sistema le enviará un correo electrónico confirmando que el registro ha sido satisfactorio</p>
                            <SendEmail userId={userId} receiverEmail="" petName="" urlSendEmail={urlSendEmail} insertUserCallback={this.callBack}/>
                        </Modal.Body>
                    </Modal>
                </div>
        })
            ;
    }

    formBuilderCallbackForm = (data, user, returnValue) => {
        this.senderEmail(returnValue, this.urlSendEmail);
    }

    back = () => {
        /* callback a indexLinks */
        this.props.indexLinksCallback(200);
    }

    /* Cuadro con información que se muestra justo después de haber enviado el correo de registro */
    callBack = () => {
        this.setState({sender:
                <div>
                    <Modal show={this.state.visibleSender} onHide={this.sendEmailCancel}>
                        <Modal.Body>
                            <h3>Registrado en el sistema, puede acceder a su cuenta pulsando en Iniciar Sesion en el menú superior</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.back}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        });
    }


    render() {
        return (
            <div>
                <Breadcrumb className="breadCrumPage">
                    <Breadcrumb.Item onClick={this.back}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>Registrar nuevo usuario</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col md={5}>

                        <Well className="formTips">
                            <h2>Formulario de registro de nuevo usuario</h2>
                            <hr className="divider" />
                            <h4>Rellena el formulario con tus datos para registrarte en la web</h4>
                            <br />
                        </Well>

                    </Col>
                    <Col md={7}>
                        <Panel className="formComponent">
                            <Panel.Body>
                                <FormBuilder parentCallback={this.formBuilderCallbackForm} url={this.parameters[this.state.index]["url"]} parameters={this.parameters[this.state.index]["inputs"]} />
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
                {this.state.visibleSender && this.state.sender}
            </div>
        )
    }
}

export default InsertUser;