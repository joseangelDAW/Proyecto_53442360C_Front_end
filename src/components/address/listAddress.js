import React, { Component } from 'react';
import { Breadcrumb, Button, Modal, Panel, Image, ListGroup, ListGroupItem, Grid, Row, Col, PageHeader, Well } from "react-bootstrap";
import Cookies from "js-cookie";

class ListAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            condition: false,
            emptyResponse: false,
            fromInsert: false
        }
        this.url = this.props.url;
        this.petId;
        this.error;
        this.uploader;
    }

    componentWillMount() {
        this.listAddress(this.url);
        this.setState({ fromMenu: this.props.fromMenu });
        //this.setState({fromInsert:false});
    }

    componentWillReceiveProps() {
        this.listAddress(this.url);
        this.setState({ fromInsert: this.props.fromInsert });
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    listAddress = async (url) => {
        const res = await fetch(url);
        const stuff = await res.json();
        if (stuff.length === 0) {
            this.setState({ emptyResponse: true });
        }
        const gridStuff = this.getUserGrid(stuff);
        await this.setStateAsync({ typeStuff: gridStuff })
    }

    listUserDataCallbackClose = () => {
        this.props.listUserDataCallbackClose();
    }

    getUserGrid = (typeStuff) => {
        return (
            <Row>
                {typeStuff.map((typeStuffItem, i) =>

                    <Col md={4} sm={6} xs={12}>
                        <ListGroup key={i}>
                            {(Cookies.get("currentUserRole") === "Administrador") &&
                                <ListGroupItem>
                                    <strong>Id:&nbsp;</strong>{typeStuffItem.id}
                                </ListGroupItem>
                            }
                            <ListGroupItem>
                                <strong>Calle:&nbsp;</strong>{typeStuffItem.street}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Numero:&nbsp;</strong>{typeStuffItem.number}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Piso:&nbsp;</strong>{typeStuffItem.floor}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Informacion de piso:&nbsp;</strong>{typeStuffItem.floorInformation}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Provincia:&nbsp;</strong>{typeStuffItem.province}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Ciudad:&nbsp;</strong>{typeStuffItem.city}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Codigo postal:&nbsp;</strong>{typeStuffItem.cp}
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
                <Well>
                {
                    this.state.fromMenu ? (
                        <div>
                            <PageHeader className="pageHeaderPage">
                                {this.state.emptyResponse ? (<p>No tiene ninguna direccion añadida</p>)
                                    :
                                    (
                                        <div>
                                            <span>Direcciones</span>
                                            <Button
                                                block
                                                bsStyle="primary"
                                                className="btn-listUserData"
                                                onClick={() => this.listUserDataCallbackClose()}>
                                                Cerrar
                                            </Button>
                                        </div>
                                    )}
                            </PageHeader>
                        </div>) :
                        <div>
                            <Row>
                                <Col md={2} sm={3} xs={12}>
                                    <h3><strong>Direcciones</strong></h3>
                                </Col>
                                <Col md={2} sm={2} xs={8}>
                                    <h3>
                                    <Button
                                        block
                                        bsStyle="primary"
                                        className="btn-listUserData"
                                        onClick={() => this.listUserDataCallbackClose()}>
                                        Cerrar
                                    </Button>
                                    </h3>
                                </Col>
                            </Row>
                        </div>
                }
                {this.state.typeStuff}
                <p>{this.state.error}</p>
                </Well>
            </div>
        )
    }

}

export default ListAddress;