import React, { Component } from 'react';
import { Breadcrumb, Button, Modal, Image, ListGroup, ListGroupItem, Row, Col, PageHeader, Well } from "react-bootstrap";
import Cookies from "js-cookie";
import UploadPhoto from '../uploadPhoto/uploadPhoto';
import ListMatchedPet from './listMatchedPet';


class ListPetByUserId extends Component {

    constructor(props) {
        super(props);
        this.uploadImageCancel = this.uploadImageCancel.bind(this);
        this.state = {
            visibleUploader: true,
            visibleListMatchedPet: false,
            visibleListPetByUserId: true,
            uploader: "",
            condition: false,
        }
        this.url = this.props.url;
        this.userId = Cookies.get("currentUserId");
        this.urlListMatchedPet = "";
        this.petName = "";
        this.titles = this.props.parametersListPetByKey.titles;
        this.sliceIndex0 = this.props.parametersListPetByKey.slice[0];
        this.sliceIndex1 = this.props.parametersListPetByKey.slice[1];
        this.error = "";
        this.uploader = "";
        this.fromListUsers = false;
    }

    componentWillMount() {
        this.fromListUsers = this.props.fromListUsers;
        if (this.props.fromListUsers) {
            this.userId = this.props.userId;
        }
        this.listPets();
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            visibleListMatchedPet: nextProps.hideListMatchedPet,
            visibleListPetByUserId: true
        });
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    listPets = async () => {
        const res = await fetch(this.url + "/" + this.userId);
        const stuff = await res.json();
        const gridStuff = this.getPetsGrid(stuff);
        await this.setStateAsync({ typeStuff: gridStuff })
    }

    breadcrumbHomeCallback = () => {
        this.props.indexLinksCallbackHome();
    }

    breadcrumbListMatchedPetCallback = () => {
        this.setState({
            visibleListMatchedPet: false,
            visibleListPetByUserId: true
        })
    }

    uploadImage = (petId) => {
        this.setState({
            uploader:
                <div>
                    <Modal show={this.state.visibleUploader} onHide={this.uploadImageCancel}>
                        <Modal.Body>
                            <p>Sube una foto de tu mascota pulsando en el botón elige imagen</p>
                            <UploadPhoto index={petId} url={"/pet/uploadPetImage/"} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.uploadImageCancel}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        })
            ;
    }

    uploadImageCancel = () => {
        this.setState({ uploader: "" });
        this.setState({ condition: true });
        this.listPets();
    }

    listMatchedPet = (name, typePet, sex, race) => {
        switch (sex) {
            case "Macho":
                this.urlListMatchedPet = "/pet/listMatchedPet/" + typePet + "/Hembra/" + race + "/" +this.userId;
                this.petName = name;
                this.setState({ visibleListMatchedPet: true });
                break;
            case "Hembra":
                this.urlListMatchedPet = "/pet/listMatchedPet/" + typePet + "/Macho/" + race + "/" +this.userId;
                this.petName = name;
                this.setState({ visibleListMatchedPet: true });
                break;
            default:

        }
        this.setState({ visibleListPetByUserId: false });
    }


    testIsNotNull = (image) => {
        let result;
        (null === image || "" === image) ? result = false : result = true;
        return result;
    }

    getPetsGrid = (typeStuff) => {
        return (
            <div className="imageAndDataRow">
                <Row className="show-grid">{
                    typeStuff.map((typeStuffItem, i) =>
                        <Col key={i} sm={6} md={6}>
                            <Well className="image_and_pet">
                                <Row className="imageAndData show-grid">
                                    <Col xs={12} sm={12} md={5} className="imageAndDataElement">
                                        {
                                            this.testIsNotNull(typeStuffItem.image) ?
                                                (
                                                    <div>
                                                        <Image className="petImage" src={"http://localhost:8000" + typeStuffItem.image} responsive alt="imagen de la mascota" />
                                                        <Button className="btn-listPet" bsStyle="primary" onClick={e => this.uploadImage(typeStuffItem.id)} block>Actualizar imagen</Button>
                                                    </div>
                                                ) :
                                                (
                                                    <Button className="btn-add-pet" block onClick={e => this.uploadImage(typeStuffItem.id)}>Añadir imagen</Button>
                                                )
                                        }
                                    </Col>
                                    <Col xs={12} sm={12} md={7} className="imageAndDataElement">
                                        <ListGroup key={i}>{
                                            (Object.values(typeStuffItem)).slice(this.sliceIndex0, this.sliceIndex1).map((item, j) =>
                                                <ListGroupItem bsStyle="info" key={j}><strong>{this.titles[j]}: </strong>{item}</ListGroupItem>)}
                                        </ListGroup>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} className="imageAndDataElement btn-listMatchedPets">
                                        <Button onClick={() => this.listMatchedPet(
                                            typeStuffItem.name,
                                            typeStuffItem.typePet,
                                            typeStuffItem.sex,
                                            typeStuffItem.race
                                        )
                                        }
                                            className="btn-listPet"
                                            bsStyle="primary"
                                            block
                                        >
                                            Buscar mascotas compatibles
                                    </Button>
                                    </Col>
                                </Row>
                            </Well>
                        </Col>
                    )}
                </Row>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.visibleListPetByUserId &&
                    <div>
                        {!this.fromListUsers &&
                        <div>
                        <Breadcrumb className="breadCrumPage">
                            <Breadcrumb.Item onClick={this.breadcrumbHomeCallback}>Inicio</Breadcrumb.Item>
                            <Breadcrumb.Item active>Mis mascotas</Breadcrumb.Item>
                        </Breadcrumb>
                        


                        <PageHeader className="pageHeaderPage hidden-xs">
                            Mis mascotas
                        </PageHeader>
                        </div>
                        }
                        {this.state.typeStuff}
                        <p>{this.state.error}</p>
                    </div>}
                {this.state.visibleUploader && this.state.uploader}

                {this.state.visibleListMatchedPet &&
                    <ListMatchedPet
                        listPetByUserIdHomeCallback={this.breadcrumbHomeCallback}
                        listPetByUserIdCallback={this.breadcrumbListMatchedPetCallback}

                        url={this.urlListMatchedPet}
                        petName={this.petName} />
                }
            </div>
        )
    }

}

export default ListPetByUserId;