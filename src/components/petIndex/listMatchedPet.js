import React, { Component } from 'react';
import { Modal, Glyphicon, Button, Breadcrumb, Panel, Image, Row, Col, PageHeader } from "react-bootstrap";
import Cookies from "js-cookie";
import SendEmail from '../service/sendEmail';

class ListMatchedPet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleSender: true,
            sender: "",
            condition: false,
            emptyResponse: false,
            output: "",

        }
        this.url = this.props.url;
        this.searchValues = this.props.searchValues;
        this.userId = Cookies.get("currentUserId");
        this.urlSendEmail = "/pet/sendEmailMatchedPet"
        this.petId = "";
        this.error = "";
        this.uploader = "";
        this.url = "";
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    componentWillMount() {
        this.url = this.props.url;
        this.listPets(this.url);
    }

    listPets = async (url) => {
        const res = await fetch(url);
        const stuff = await res.json();
        if (stuff.length === 0) {
            this.setState({ emptyResponse: true });
        }
        else {
            const gridStuff = this.getPetsGrid(stuff);
            await this.setStateAsync({ typeStuff: gridStuff });
        }
    }

    senderEmail = (userId, receiverEmail, petName, urlSendEmail) => {
        this.setState({
            sender:
                <div>
                    <Modal show={this.state.visibleSender} onHide={this.sendEmailCancel}>
                        <Modal.Body>
                            <p className="text-justify">Se le enviará un email al propietario de la mascota notificándole que esta interesado en que las
                                mascotas se conozcan. Para facilitar el contacto se adjunta su correo electrónico.
                            </p>
                            <SendEmail userId={userId} receiverEmail={receiverEmail} petName={petName} urlSendEmail={urlSendEmail} insertUserCallback={this.callBack} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.sendEmailCancel}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        })
            ;
    }

    callBack = () => {
        this.setState({
            sender:
                <div>
                    <Modal show={this.state.visibleSender} onHide={this.sendEmailCancel}>
                        <Modal.Body>
                            <h3>El propietario de la mascota ha recibido su mensaje, en el que hemos adjuntado su dirección de correo electrónico.
                                Tendrá que revisar su correo electrónico para saber si el propietario está interesado</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.sendEmailCancel}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        });
    }

    sendEmailCancel = () => {
        this.setState({ sender: "" });
        this.listPets(this.url);
    }

    breadcrumbHomeCallback = () => {
        this.props.indexLinksCallbackHome();
    }



    testIsNotNull = (image) => {
        let result;
        (null === image || "" === image) ? result = false : result = true;
        return result;
    }

    getPetsGrid = (typeStuff) => {
        return (
            <Row className="show-grid">{
                typeStuff.map((typeStuffItem, i) =>
                    <Col key={i} xs={12} sm={6} md={4}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title className="text-center panel-title-listMatchedPet"><span>{typeStuffItem.name}</span></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className="listMatchedPet-Panel-body">

                                {
                                    this.testIsNotNull(typeStuffItem.image) ?
                                        (
                                            <div>
                                                <Image responsive src={"http://localhost:8000" + typeStuffItem.image} alt="imagen de la mascota compatible" />
                                            </div>
                                        ) :
                                        (
                                            <Image responsive src={"http://localhost:8000/imageMatchedPetNotFound.png"} alt="imagen de la mascota compatible" />)
                                }
                            </Panel.Body>
                            <Panel.Footer>
                                <Button
                                    bsStyle="primary"
                                    onClick={() => this.senderEmail(this.userId, typeStuffItem.email, typeStuffItem.name, this.urlSendEmail)}
                                    block
                                    className="btn-send-email"
                                    bsSize="large">
                                    <span
                                        className="glyphicon glyphicon-envelope text-btn-send-email" />
                                    <span>
                                        &nbsp;Enviar correo
                                    </span>
                                </Button>
                            </Panel.Footer>
                        </Panel>
                    </Col>
                )}
            </Row>
        )
    }

    render() {
        return (
            <div>
                <Breadcrumb className="breadCrumPage">
                    <Breadcrumb.Item onClick={this.props.listPetByUserIdHomeCallback}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={this.props.listPetByUserIdCallback}>Mis mascotas</Breadcrumb.Item>
                    <Breadcrumb.Item active>Mascotas compatibles</Breadcrumb.Item>
                </Breadcrumb>

                <PageHeader className="pageHeaderPage">
                    {this.state.emptyResponse ? (<p>No se han encontrado coincidencias</p>)
                        :
                        (<div>
                            <p className="pageHeaderPage-title">Mascotas compatibles con {this.props.petName}</p>
                            <h4>Puedes ponerte el contacto con el dueño de la mascota pulsando en el botón enviar correo</h4>
                            <p>{this.state.output}</p>
                        </div>

                        )

                    }
                </PageHeader>
                {this.state.visibleSender && this.state.sender}
                {this.state.typeStuff}
                <p>{this.state.error}</p>
            </div>
        )
    }

}

export default ListMatchedPet;