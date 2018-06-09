import React, { Component } from 'react';
import { Row, Col, Fade, FormGroup, FormControl, Button } from 'react-bootstrap';
import Cookies from "js-cookie";


/* ------ Formulario parametrizado ----------- */

class FormBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            output: '',
            outputbool: false,
            send: true,
            done: false
        }

        this.url = '';
        this.formControls = '';
        this.fieldInputRef = [];
        this.parametersInput = [];
        this.status = '';
        this.role = '';
        this.returnValue = '';
        this.arr = {};
        this.textArea = "";
        this.thereIsTextArea = false;
    }

    componentWillMount = () => {
        this.role = this.props.role;
        this.setRole(this.role);
        this.parametersInput = this.props.parameters;
        this.textArea = this.props.textArea;
        this.url = this.props.url;
        this.setIndex(this.url);
        this.formControls = this.createFormControls(this.parametersInput, this.textArea);
    }

    componentWillReceiveProps = (nextProps) => {
        this.role = nextProps.role;
        this.setRole(this.role);
        this.parametersInput = nextProps.parameters;
        this.url = nextProps.url;
        this.formControls = this.createFormControls(this.parametersInput);
    }

    createFormControls = (parametersInput, textArea) => {
        let arrayFormControl = parametersInput.map((param, i) => {
            if (param.tx === "select") {
                return <div key={i}><strong>{param.phrase}:&nbsp;</strong><FormControl
                    className="formFile"
                    componentClass={param.tx}
                    name={param.key}
                    key={i}
                    placeholder={param.phrase}
                    required>
                    {param.options.map((opt, j) =>
                        <option key={j} value={opt}>{opt}</option>
                    )
                    }
                </FormControl></div>

            } else {
                return <div key={i}>
                <strong>{param.phrase}:&nbsp;</strong>
                <FormControl
                    className="formFile"
                    key={i} type={param.tx}
                    name={param.key}
                    placeholder={param.phrase}
                    required />
                    </div>
            }
        }
        );
        if (textArea !== undefined) {
            this.thereIsTextArea = true;
            arrayFormControl[arrayFormControl.length] = <FormControl className="formFile" componentClass={textArea[0].tx} key={arrayFormControl.length} name={textArea[0].key} placeholder={textArea[0].phrase} required />;
        }
        return arrayFormControl;
    }

    setIndex = (url) => {
        switch (url) {
            case "/pet/insertPet":
                this.arr["userId"] = Cookies.get("currentUserId");
                break;
            case "/address/insertAddress":
                this.arr["userId"] = Cookies.get("currentUserId");
                break;
            default:
        }
    }

    setRole = (role) => {
        switch (role) {
            case 0:
                this.arr["role"] = "user";
                break;
            case 1:
                this.arr["role"] = "admin";
                break;
            default:
        }
    }

    handleSubmit = (e) => {

        this.setState({ outputbool: false });
        e.preventDefault();

        (this.parametersInput).map((types, i) => this.arr[types.key] = e.target[types.key]["value"]);

        if (this.thereIsTextArea) {
            this.arr[this.textArea[0].key] = e.target[this.textArea[0].key]["value"];
        }

        let user = e.target[0].value;

        fetch(this.url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.arr),
        })
            .then((response) => {
                console.log(response);
                if (200 === response.status) {
                    this.status = response.status;
                    this.role = user;
                    this.setState({ done: true });
                    this.setState({ send: false });
                }
               
                if (500 === response.status) {
                    return "Datos introducidos incorrectos";
                    console.log(response.json());
                }
                return response.json();
            })
            .then((output) => {
                console.log(output);
                if (typeof output['message'] !== 'undefined') {
                    this.setState({ output: output['message'] });
                    this.returnValue = output['returnValue'];
                } else {
                    this.setState({ output: output });
                }
                this.setState({ outputbool: true });
            })
    }

    finish = () => {
        this.props.parentCallback(this.status, this.role, this.returnValue);
    }

    /* Se renderiza todo, dentro de FormGroup se pasa el array formControls */
    render() {
        return (
            <div className="container-fluid">
                <form className="baseForm" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        {this.formControls}
                    </FormGroup>
                    {this.state.send && <Button block bsSize="large" bsStyle="success" type="submit">Enviar</Button>}
                    {this.state.done && <Button block bsSize="large" bsStyle="success" onClick={this.finish}>Hecho</Button>}
                </form>
                <Fade in={this.state.outputbool}>
                    <h3>{this.state.output}{this.state.done && <span>&nbsp;<span className="glyphicon glyphicon-ok" aria-hidden="true"></span></span>}</h3>
                </Fade>
            </div>
        )
    }
}

export default FormBuilder;