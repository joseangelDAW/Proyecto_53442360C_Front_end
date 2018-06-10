import React, { Component } from 'react';
import { Fade, Breadcrumb, Button, ButtonGroup, Modal, Image, ListGroup, ListGroupItem, Row, Col, PageHeader, Well } from "react-bootstrap";
import Cookies from "js-cookie";
import ListAddress from '../address/listAddress';
import ListPetByUserId from '../petIndex/listPetByUserId';

const url = "/user/listUser";

const parametersListPetByKey=
    {
        "titles": ["Nombre", "Tipo", "Sexo", "Raza", "Fecha de nacimiento"],
        "slice": [2, 7]
    }
;

class ListUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleListUsers: true,
            visibleListAddress: false,
            visibleListPetByUserId: false,
            userId: "",
            completeName: ""
        }
        this.name = "";
    }

    componentWillMount = () => {
        this.listUserData(url);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    listUserData = async (url) => {
        const res = await fetch(url);
        const stuff = await res.json();
        const gridStuff = this.getUserGrid(stuff);
        this.name = stuff[0].name;
        await this.setStateAsync({ typeStuff: gridStuff })
    }

    showListUsers = (data) => {
        this.setState({
            visibleListAddress: false,
            visibleListPetByUserId: false,
            visibleListUsers: true
        });
    }

    getUserGrid = (typeStuff) => {
        return (
            <Row>
                {typeStuff.map((typeStuffItem, i) =>
                    <Col key={i} md={4} sm={6} xs={12}>

                        <ListGroup key={i}>
                            <ListGroupItem>
                                <strong>Id usuario:&nbsp;</strong>{typeStuffItem.id}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Rol:&nbsp;</strong>{typeStuffItem.role}
                            </ListGroupItem>
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
                            <ListGroupItem>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        visibleListAddress: true,
                                        visibleListUsers: false,
                                        userId: typeStuffItem.id,
                                        completeName: typeStuffItem.name + " " + typeStuffItem.surname
                                    })
                                }
                                }
                                block
                                bsStyle="primary"
                                className="btn-listUserData">
                                Ver direcciones
                            </Button>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        visibleListPetByUserId: true,
                                        visibleListUsers: false,
                                        userId: typeStuffItem.id,
                                        completeName: typeStuffItem.name + " " + typeStuffItem.surname
                                    })
                                }
                                }
                                block
                                bsStyle="primary"
                                className="btn-listUserData">
                                Ver mascotas
                            </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                )}
            </Row>
        )
    }


    render() {
        return (
            <div>
                {this.state.visibleListUsers &&
                    <div>
                        <Breadcrumb className="breadCrumPage">
                            <Breadcrumb.Item onClick={this.props.indexLinksCallbackHome}>Inicio</Breadcrumb.Item>
                            <Breadcrumb.Item active>Lista de usuarios</Breadcrumb.Item>
                        </Breadcrumb>
                        <PageHeader className="pageHeaderPage hidden-xs">
                            Lista de usuarios
                </PageHeader>
                        {this.state.typeStuff}
                    </div>
                }

                {this.state.visibleListAddress &&
                    <div>
                        <h3>Direcciones de {this.state.completeName}</h3>
                        <ListAddress
                            listUserDataCallbackClose={() => this.showListUsers("")}
                            fromInsert={true}
                            url={"/address/listAddressByUserId/" + this.state.userId}
                            listUserDataCallback={this.showListUsers} />
                    </div>
                }

                {this.state.visibleListPetByUserId &&
                    <div>
                        <h3>Mascotas de {this.state.completeName}&nbsp;&nbsp;<Button bsStyle="primary" onClick={() => this.showListUsers("")}>Cerrar</Button></h3>
                        
                        {this.state.visibleListPetByUserId &&
                            <ListPetByUserId
                                userId={this.state.userId}
                                fromListUsers={true}
                                indexLinksCallbackHome={() => this.showListUsers("")}
                                url={"/pet/listPetByUserId"} 
                                parametersListPetByKey={parametersListPetByKey}
                                hideListMatchedPet={false}
                            />}
                    </div>
                }
            </div>
        )
    }

}

export default ListUsers;