import React, { Component } from 'react';
import { Row, Col, Well, Breadcrumb, Panel, Button } from 'react-bootstrap';
import FormBuilder from './../form/formBuilder';
import UploadPhoto from '../uploadPhoto/uploadPhoto';

/* Componente que realiza la inserción de noticias, este componente es usado
   únicamente por el administrador.
   Se usa el componente FormBuilder para inserta la noticia, en el callback
   recibido de de formbuilder, se llama al método  uploadImage que, a su vez
   llama al componente UploadPhoto, que se encarga de subir fotos al servidor
   En este caso se sube la foto de la imagen de la noticia */
class InsertNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            visibleUploader: false,
            visibleFormBuilder: true,
            visibleClose: false,
            uploader: ""
        }
        this.uploadImageCancel = this.uploadImageCancel.bind(this);

        this.role = "";
        this.index = "";
        this.url = "";
    }

    componentWillMount = () => {
        this.parameters = this.props.arrayParametersInsertNews;
    }

    formBuilderCallbackForm = (data, user, returnValue) => {
        this.setState({
            visibleFormBuilder: false,
            visibleUploader: true,
        });
        this.uploadImage(returnValue);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    componentWillMount() {
        this.listPets();
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

    breadcrumbNewsCallback = () => {
        this.props.goListNewsCallback();
    }

    /* Al renderizar el componente insertNews, uploader = "", una vez que se llama al método
       uploadImage, se rellena con un objeto JSX que se pinta en el método render */
    uploadImage = (entryId) => {
        this.setState({
            uploader:
                <Panel>
                    <Panel.Body>
                        <h3>Añade una foto para la cabecera de la noticia</h3>
                        <UploadPhoto index={entryId} url={"/news/uploadImage/"} />
                        <Button className="pull-right" onClick={this.uploadImageCancel}>Cerrar</Button>
                    </Panel.Body>
                </Panel>
        });
    }

    uploadImageCancel = () => {
        this.setState({
            uploader: "",
            visibleFormBuilder: true,
            condition: true
        });
    }

    render() {
        return (
            <div>
                <Breadcrumb className="breadCrumPage">
                    <Breadcrumb.Item onClick={() => this.breadcrumbHomeCallback()}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => this.breadcrumbNewsCallback()}>Noticias</Breadcrumb.Item>
                    <Breadcrumb.Item active>Añadir Noticia</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col md={5}>

                        <Well className="formTips">
                            <h2>Rellena los campos para añadir una noticia</h2>
                            <hr className="divider" />
                            <h4>Después de añadir el texto se le solicitará una foto para la cabecera de la noticia</h4>
                            <br />
                        </Well>

                    </Col>
                    <Col md={7}>
                        {
                            this.state.visibleFormBuilder &&
                            <Panel className="formComponent">
                                <Panel.Heading>
                                    <Panel.Title className="text-center" componentClass="h3">Introduzca información</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <FormBuilder textArea={this.parameters[this.state.index]["textArea"]} parentCallback={this.formBuilderCallbackForm} url={this.parameters[this.state.index]["url"]} parameters={this.parameters[this.state.index]["inputs"]} />
                                </Panel.Body>
                            </Panel>
                        }
                        {this.state.visibleUploader && this.state.uploader}
                        {this.state.visibleClose && <Button block onClick={() => this.breadcrumbHomeCallback()}>Cerrar</Button>}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InsertNews;