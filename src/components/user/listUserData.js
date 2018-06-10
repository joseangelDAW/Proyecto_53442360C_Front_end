import React, { Component } from 'react';
import { Fade, Breadcrumb, Button, ButtonGroup, Modal, Image, ListGroup, ListGroupItem, Row, Col, PageHeader, Well } from "react-bootstrap";
import Cookies from "js-cookie";
import InsertAddress from './../address/insertAddress';
import ListAddress from './../address/listAddress';

const url = "/user/listUserByKey/";

/* Componente que lista los datos del usuario, este componente se renderiza
   al pulsar sobre el item del menú que indica el tipo de usuario y el rol
   
   En el render de este componente tenemos un botón que usa el componente insertAddress para
   insertar una dirección física del usuario y otro para listar las direcciones insertadas hasta
   el momento */
class ListUserData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleInsertAddress: false,
            visibleListAddress: false
        }
        this.name = "";
    }

    componentWillMount = () => {
        this.listUserData(url, Cookies.get("currentUserId"));
    }

    /* Llamada a la api que devuelve los datos de usuario */
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    listUserData = async (url, userId) => {
        const res = await fetch(url + "id/" + userId);
        const stuff = await res.json();
        const gridStuff = this.getUserGrid(stuff);
        this.name = stuff[0].name;
        await this.setStateAsync({ typeStuff: gridStuff })
    }


    /* Creación de la rejilla de datos de usuario */
    getUserGrid = (typeStuff) => {
        return (
            typeStuff.map((typeStuffItem, i) =>
                <ListGroup key={i}>
                    <ListGroupItem>
                        <strong>Nombre:&nbsp;</strong>{typeStuffItem.name}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Apellidos:&nbsp;</strong>{typeStuffItem.surname}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Fecha de nacimiento:&nbsp;</strong>{typeStuffItem.birthDate}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Nickname:&nbsp;</strong>{typeStuffItem.nickName}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Email:&nbsp;</strong>{typeStuffItem.email}
                    </ListGroupItem>
                </ListGroup>
            )
        )
    }

    /* cierra los componentes hijos abiertos y muestra solo la los datos el usuario */
    outputInsertAddress = (data) => {
        this.setState({ 
            visibleInsertAddress: false,
            visibleListAddress: false 
        });
    }

    render() {
        return (
            <div>
                <Breadcrumb className="breadCrumPage">
                    <Breadcrumb.Item onClick={this.props.indexLinksCallbackHome}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>Datos de mi cuenta</Breadcrumb.Item>
                </Breadcrumb>

                <PageHeader className="pageHeaderPage hidden-xs">
                    Datos de usuario
                    </PageHeader>

                {(this.state.visibleInsertAddress === false) &&
                    <Row>
                        <Col md={6} xs={12}>
                            <Well className="formTips">
                            <Row>
                                <Col sm={6} md={6}>
                                <h2>Datos de {this.name}</h2>
                                </Col>
                                <Col sm={6} md={6}>
                                <div className="btn-listUserData-grid">
                                    <Button
                                        onClick={() => this.setState({ 
                                            visibleInsertAddress: true,
                                            visibleListAddress: false 
                                        })}
                                        block
                                        bsStyle="primary"
                                        className="btn-listUserData">
                                        Insertar dirección
                                    </Button>
                                    <Button
                                        onClick={() => this.setState({ visibleListAddress: true })}
                                        block
                                        bsStyle="primary"
                                        className="btn-listUserData">
                                        Mis direcciones
                                    </Button>
                                </div>
                                </Col>
                            </Row>
                                

                                <hr className="divider" />
                                <h4>Estos son tus datos de registro de tu cuenta en Web de mascotas, pulsa en los botones
                                    si quieres añadir una nueva dirección, o listar tus direcciones ya existentes.
                                </h4>
                                <br />
                            </Well>
                        </Col>
                        <Col md={6} xs={12}>
                            {this.state.typeStuff}
                        </Col>
                    </Row>

                }

                {this.state.visibleInsertAddress && <InsertAddress listUserDataCallback={this.outputInsertAddress} />}
                {this.state.visibleListAddress && 
                <ListAddress
                    listUserDataCallbackClose={() => this.outputInsertAddress("")}
                    fromInsert={true} 
                    url={"/address/listAddressByUserId/"+Cookies.get("currentUserId")} 
                    listUserDataCallback={this.outputInsertAddress} />
                }
            </div>
        )
    }

}

export default ListUserData;