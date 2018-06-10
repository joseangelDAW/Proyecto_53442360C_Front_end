import React, { Component } from 'react';
import { ButtonToolbar, Panel, Image, Button } from 'react-bootstrap';

/* Componente encargado de enviar emails al usuario
   Este componente lo utilizan los componentes insertUser
   y listMatchedPets */
class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            visibleDone: false,
            visibleOutput: false,
            visibleSend: true,
            visibleTextSend: true,
            isLoading: false,
            picture: "",
            file: ""
        }
        this.index = "";
        this.urlSendEmail = "";
    }

    /* Se almacenan en las variables de clase los parámetros recibidos de
       los componentes Padre */
    componentWillMount = () => {
        this.userId = this.props.userId;
        this.receiverEmail = this.props.receiverEmail;
        this.petName = this.props.petName;
        this.urlSendEmail = this.props.urlSendEmail;
    }

    /* Llamada a la ruta de la API que envia los emails, el contenido de los emails
       está en las plantillas twig de Symfony en el backEnd */
    sendEmail = (userId, receiverEmail, petName) => {
        this.setState({ isLoading: false });
        fetch(this.urlSendEmail, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(
                
                {
                    'userId': userId,
                    'receiverEmail': receiverEmail,
                    'petName': petName
                }
            
            )
        })
            .then((response) => {
                return response.json();
            })
            .then((output) => {
                this.setState({
                    visibleOutput: true,
                    visibleSend: false,
                    visibleDone: true,
                    visibleTextSend: false,
                    output: output
                });
            })
        this.setState({ isLoading: true });
    }

    /* Callback a indexLinks una vez finalizado el envio del mensaje */
    finish = () => {
        this.props.insertUserCallback();
    }

    /* En el método render, tenemos un botón que cambia en el momento que se produce la llamda asíncrona
       si el state isLoading es true, se desactiva el botón y se muestra el texto Enviando mensaje */
    render() {
        return (
            <div>
                <Panel className="formComponent">
                    <Panel.Body>
                        {this.state.visibleTextSend && <p>Pulse el botón para enviar</p>}
                        {this.state.visibleSend && 
                        <Button
                            disabled={this.state.isLoading}
                            className="btn-sendEmail"
                            block bsStyle="primary"
                            onClick={() => this.sendEmail(this.userId, this.receiverEmail, this.petName)}>
                            <span className="glyphicon glyphicon-send">&nbsp;</span>
                            {this.state.isLoading ? 'Enviando mensaje' : 'Enviar mensaje'}
                        </Button>
                        }
                        <ButtonToolbar>
                            {this.state.visibleDone && <Button block bsStyle="success" onClick={this.finish}>Hecho</Button>}
                        </ButtonToolbar>
                        {this.state.visibleOutput && <h1>{this.state.output}</h1>}
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default SendEmail;
