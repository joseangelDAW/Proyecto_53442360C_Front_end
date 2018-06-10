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

        /* Inicialización de variables globales */
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

    /* Se reciben los parámetros y se llama al método que crea el formulario 
       No todos los formularios requerirán de todas las props, los componentes padre
       pueden pasar las props que quieran, no es necesario pasarlas todas*/
    componentWillMount = () => {
        this.role = this.props.role;
        this.setRole(this.role);
        this.parametersInput = this.props.parameters;
        this.textArea = this.props.textArea;

        /* url de llamada a la API */
        this.url = this.props.url;

        /* Setea la id del usuario para enviarla a la API en la llamada
           Este parámetro se pasa por POST y no se muestra al usuario de la página */
        this.setId(this.url);
        /* Llamada al método que crea el formulario, si el formulario no tiene textArea,
           this.textArea estará vacío
           El objeto JSX que contiene todo el formulario se guarda en la variable de clase
           formControls, luego simplemente se coloca en el método render() del componente
           y se muestra */
        this.formControls = this.createFormControls(this.parametersInput, this.textArea);
    }

    /* ComponentWillReceiveProps se usa si el componente va a cambiar mientras se está mostrando, 
       en este caso cambia cada vez que en las pestañas se selecciona usuario o administrador */
    componentWillReceiveProps = (nextProps) => {
        this.role = nextProps.role;
        this.setRole(this.role);
        this.parametersInput = nextProps.parameters;
        this.url = nextProps.url;
        this.formControls = this.createFormControls(this.parametersInput);
    }

    /* Método que crea el formulario */
    createFormControls = (parametersInput, textArea) => {
        let arrayFormControl = parametersInput.map((param, i) => {

            /* Si el campo es un select */
            if (param.tx === "select") {
                return <div key={i}><strong>{param.phrase}:&nbsp;</strong>
                <FormControl
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

            /* Si no es un select, se crea un input normal
               FormControl es una etiqueta de ReactBootstrap,
               pero por debajo es un input de HTML */
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

        /* Si es un textArea, se trata aparte */
        if (textArea !== undefined) {
            this.thereIsTextArea = true;
            arrayFormControl[arrayFormControl.length] = <FormControl className="formFile" componentClass={textArea[0].tx} key={arrayFormControl.length} name={textArea[0].key} placeholder={textArea[0].phrase} required />;
        }
        return arrayFormControl;
    }

    /* Setea la id del usuario para enviarla a la API en la llamada */
    setId = (url) => {
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

    /* Se setea el role del usuario para devolverlo al componente padre,
       y este, en función de si es user o admin, cambiará el menú */
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

    /* Método que se activa cuando se pulsa enviar en el formulario 
       Aquí se realiza la llamada a la api, se le pasan los parámetros introducidos por POST,
       Todos los formularios del proyecto son construidos por este componente, la llamada a la
       api se realiza desde este componente.
       Se llama a la ruta especificada en la variable de clase url */
    handleSubmit = (e) => {

        this.setState({ outputbool: false });
        e.preventDefault();

        /* Se construye el array arr, que será el body del fetch */
        (this.parametersInput).map((types, i) => this.arr[types.key] = e.target[types.key]["value"]);

        /* Se añade el textArea si lo hubiera */        
        if (this.thereIsTextArea) {
            this.arr[this.textArea[0].key] = e.target[this.textArea[0].key]["value"];
        }

        /* Solo para el login, en el callback se devuelve el nombre del usuario para pintarlo en el menú*/
        let user = e.target[0].value;

        /* Se hace la llamada a la API */
        fetch(this.url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.arr),
        })
            /* Se procesa la respuesta, y se cambia el estado de los botones para que se oculte el de enviar
               y se muestre el botón Hecho */
            .then((response) => {
                console.log(response);
                if (200 === response.status) {
                    this.status = response.status;
                    this.role = user;
                    this.setState({ done: true });
                    this.setState({ send: false });
                }
               
                /* Caso de que la respuesta tire una excepción */
                if (500 === response.status) {
                    return "Datos introducidos incorrectos";
                    console.log(response.json());
                }
                return response.json();
            })
            /* Este .them recibe ya la respuesta cómo un Json y la procesa */
            .then((output) => {
                console.log(output);
                if (typeof output['message'] !== 'undefined') {
                    this.setState({ output: output['message'] });
                    this.returnValue = output['returnValue'];
                } else {
                    /* Se escribe la respuesta en la salida */
                    this.setState({ output: output });
                }
                /* Se setea a visible la etiqueta donde se muestra el mensaje de salida */
                this.setState({ outputbool: true });
            })
    }

    /* Cuando se pulsa hecho, se envía la respuesta al componente padre */
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