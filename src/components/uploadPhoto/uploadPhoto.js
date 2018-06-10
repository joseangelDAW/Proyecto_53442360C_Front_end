import React, { Component } from 'react';
import { ButtonToolbar, Panel, Image, Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

/* Componente que sube fotos al servidor, antes de realizar la llamada a la API
   muestra una preview de la foto a subir, se utiliza el componente de react ImageUploader */
class UploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            visibleImage: false,
            visibleImageUploader: true,
            visibleDone: false,
            visibleOutput: false,
            visibleSend: false,
            picture: "",
            file: ""
        }
        this.index = "";
        this.onDrop = this.onDrop.bind(this);
    }


    /* Método que se dispara cuando se selecciona una imagen del disco duro 
       onDrop recibe el evento, que contiene la imagen en su primera posición del array que lo forma
       Utilizamos un reader y el método readAsDataUrl para construir la preview de la imagen */
    onDrop = event => {
        var file = event[0];
        var reader = new FileReader();
        reader.readAsDataURL(file)

        /* Se asigna al estado picture la preview de la imagen y al estado file la imagen en si
           para enviarla, y se cambian los estados de visibilidad, también se hace visible el botón enviar */
        reader.onloadend = () => {
            this.setState({
                picture: reader.result,
                file: file,
                visibleImage: true,
                visibleOutput: false,
                visibleSend: true,
                output: ""
            });
        }
    }

    componentWillMount = () => {
        this.index = this.props.index;
        this.url = this.props.url;
    }

    /* Llamada a la API que envia por POST la imagen */
    sendImageToServer = () => {
        this.setState({
            visibleImage: false,
            visibleImageUploader: false,
        });

        fetch(this.url + this.index, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Accept': 'image/jpeg'
            },
            method: 'POST',
            body: this.state.file
        })
            .then((response) => {
                return response.json();
            })
            .then((output) => {
                this.setState({
                    output: output,
                    visibleOutput: true,
                    visibleSend: false,
                });
            })
    }

    finish = () => {
    }

    render() {
        return (
            <div>
                <Panel className="formComponent">
                    <Panel.Body>
                        {this.state.visibleImageUploader && <ImageUploader
                            withIcon={true}
                            buttonText='Elige imagen'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.jpeg','.png', '.gif']}
                            maxFileSize={5242880}
                        />}

                        {this.state.visibleSend && <Button className="btn-sendImage" block bsStyle="primary" onClick={this.sendImageToServer}>Enviar</Button>}
                        {this.state.visibleImage && <Image className="images" responsive src={this.state.picture}></Image>}
                        <ButtonToolbar>
                            {this.state.visibleDone && <Button bsStyle="success" onClick={this.finish}>Volver</Button>}
                        </ButtonToolbar>
                        {this.state.visibleOutput && <h1>{this.state.output}</h1>}
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default UploadPhoto;
