import React, { Component } from 'react';
import { ButtonToolbar, Panel, Image, Button } from 'react-bootstrap';

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

    componentWillMount = () => {
        this.userId = this.props.userId;
        this.receiverEmail = this.props.receiverEmail;
        this.petName = this.props.petName;
        this.urlSendEmail = this.props.urlSendEmail;
    }

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

    finish = () => {
        this.props.insertUserCallback();
    }

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
