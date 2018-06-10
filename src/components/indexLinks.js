import React, { Component } from "react";
import Cookies from "js-cookie";
import { Fade, Nav, Navbar, NavItem, NavDropdown, MenuItem, Image } from "react-bootstrap";
import Login from "./login/login";
import InsertPet from "./petIndex/insertPet";
import ListPetByUserId from "./petIndex/listPetByUserId";
import InsertUser from "./user/insertUser";
import InsertNews from "./news/insertNews";
import ListNews from "./news/listNews";
import ListUserData from "./user/listUserData";
import ListUsers from "./user/listUsers";
import ListAddress from "./address/listAddress";
import Privacy from "./privacy/privacy";

/* LANDING PAGE */
/* Controlador de la página */

/* La visibilidad de los estados regulan que se muestren los componentes, o no */
class IndexLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleFormBuilder: false,
            visibleLogin: false,
            visiblePet: false,
            visibleInsertPet: false,
            visibleInsertUser: false,
            visibleListPetByUserId: false,
            visibleInsertNews: false,
            visibleListEntries: false,
            visibleListUserData: false,
            visibleListUsers: false,
            visiblePrivacy: false,
            visibleBackground: true,
            visibleBackgroundLinks: false,

            logged: false,
            login: true
        };

        /* Variables de clase */
        this.user = "";
        this.userId = "";
        this.role = "";
        this.navItemsWhenLogged = '';
        this.title = "";


        /* Aqui se asignan los parámetros de los componentes a las variables de clase
           la forma de pasar datos de padres a hijos es con la palabra reservada props,
           en parametersIndexLinks los props se pasan cómo atributos en la etiqueta del 
           componente */
        this.arrayParametersInsertPet = this.props.arrayParametersInsertPet;
        this.arrayParametersInsertUser = this.props.arrayParametersInsertUser;
        this.arrayParametersLoginUser = this.props.arrayParametersLoginUser;
        this.arrayParametersInsertNews = this.props.arrayParametersInsertNews;
        this.arrayParametersNavBarWhenUserLogged = this.props.arrayParametersNavBarWhenUserLogged;
        this.arrayParametersNavBarWhenAdminLogged = this.props.arrayParametersNavBarWhenAdminLogged;
        this.parametersListPetByKey = this.props.parametersListPetByKey;

        this.url = "";
        this.inputArray = [];
    }

    /* Método que desactiva el botón atras en el navegador */
    disbleBackwardsButton = () => {
        window.location.hash = "no-back-button";
        window.location.hash = "Again-No-back-button" //chrome
        window.onhashchange = () => { window.location.hash = "no-back-button"; }
    }

    /* componentWillMount es un método de React que se ejecuta siempre antes de 
        que se renderice el componente, es decir, antes de que se ejecute el método render */
    componentWillMount = () => {
        this.disbleBackwardsButton();

        /* Si se recarga la página, se comprueba si hay algún usuario con sesión iniciada, esto
        se comprueba mirando si las cookies están definida. En caso afirmativo, se llama al método
        showLogged con los valores de las cookies */
        if (Cookies.get("currentUserId") !== "" && Cookies.get("currentUserId") !== undefined) {
            this.showLogged(
                Cookies.get("currentUserName"),
                Cookies.get("currentUserId"),
                Cookies.get("currentUserRole")
            );
        }
    }

    /* Método que setea las cookies, con la librería JsCookies es muy sencillo,
       Utilizo este método por si se quisiera añadir un tiempo de vida para las
       cookies, en el estado actual del proyecto, se borran al cerrar el navegador */
    setCookie = (cname, cvalue, seconds) => {
        Cookies.set(cname, cvalue);
    }

    /* Oculta todos los componentes y muestra la landing page */
    showIndexAndHideElses = () => {
        this.setState({
            visibleFormBuilder: false,
            visibleInsertPet: false,
            visibleInsertUser: false,
            visibleLogin: false,
            visiblePet: false,
            visibleListPetByUserId: false,
            visibleInsertNews: false,
            visibleListEntries: false,
            visibleListUserData: false,
            visibleListUsers: false,
            visiblePrivacy: false,
            visibleBackground: true
        })
    }

    /* Método que se ejecuta con los valores devueltos del componente Login,
       Cuando un usuario inicia sesión, se setean las cookies, y luego se
       llama al método showLogged que actualiza el menú de navegación */
    loginCallback = (data, user, userId, role) => {
        if (200 === data) {
            this.setCookie("currentUserName", user);
            this.setCookie("currentUserId", userId);
            this.setCookie("currentUserRole", role);
            this.showLogged(user, userId, role);
        }
    }

    /* Actualización de menú de navegación, dependiendo de si el usuario es
        administrador o no */
    showLogged = (user, userId, role) => {
        this.user = user;
        this.userId = userId;
        this.role = role;

        switch (role) {
            case "Usuario":
                this.updateNavItems(this.arrayParametersNavBarWhenUserLogged);
                break;
            case "Administrador":
                this.updateNavItems(this.arrayParametersNavBarWhenAdminLogged);
                break;
            default:
                this.showIndexAndHideElses();
        }
        /* Se cambia el estado a logeado */
        this.setState({ logged: true });
        this.showIndexAndHideElses();
    }

    /* Si una noticia se ha añadido correctamente, se muestra la pantalla principal */
    insertEntityCallback = (data) => {
        if (200 === data) {
            this.showIndexAndHideElses();
        }
    }


    /* --------------------------- Funciones de Navbar --------------------------------- */

    /* Creación de los elementos dinámicos del menú de navegación con los parámetros recibidos
       según sea el menú para sesión iniciada por un administrador, o por un usuario normal */
    updateNavItems = (parameters) => {
        this.navItemsWhenLogged =
            /* Maps anidados para menus y submenus */
            <Nav>
                {parameters.map((item, i) =>
                    <NavDropdown key={i} eventKey={i} title={item.value} id="basic-nav-dropdown">
                        {item.submenus.map((subitem, j) =>
                            <MenuItem key={j} eventKey={j} onClick={e => this.actionPushMenu(subitem.value, subitem.url)}>
                                {subitem.phrase}
                            </MenuItem>
                        )}
                    </NavDropdown>
                )}
            </Nav>;

    }

    /* Dependiendo de la opción pulsada en el menú, showCategory muestra unos componentes u otros */
    actionPushMenu = (value, url) => {
        this.showIndexAndHideElses();
        this.setState({
            visibleBackground: false,
        });
        this.showCategory(value, url);
    }

    showCategory = (value, url) => {
        switch (url) {
            case '/user/insertUser':
                this.url = url;
                this.setState({ visibleInsertUser: true });
                break;

            case '/pet/insertPet':
                this.url = url;
                this.setState({ visibleInsertPet: true });
                break;

            case '/pet/listPetByUserId':
                this.url = url;
                this.title = value;
                this.setState({ visibleListPetByUserId: true });
                break;

            case '/news/insertEntry':
                this.url = url;
                this.setState({ visibleInsertNews: true });
                break;

            case '/news/listEntries':
                this.url = url;
                this.setState({ visibleListEntries: true });
                break;

            case '/user/listUserData':
                this.url = url;
                this.setState({ visibleListUserData: true });
                break;

            case '/user/listUser':
                this.url = url;
                this.setState({ visibleListUsers: true });
                break;

            default:
                this.showIndexAndHideElses();
        }
    }

    /* Muestra el formulario de inicio de sesión */
    showLogin = () => {
        this.showIndexAndHideElses();
        this.setState({
            visibleBackground: false,
            visibleLogin: true,
            visibleInsertUser: false,
        });
    }

    /* Muestra el formulario de registro en la web */
    showRegister = () => {
        this.showIndexAndHideElses();
        this.setState({
            visibleBackground: false,
            visibleInsertUser: true,
            visibleLogin: false,
        });
    }

    /* Muestra el componente de la política de privacidad */
    showPrivacy = () => {
        this.showIndexAndHideElses();
        this.setState({
            visibleBackground: false,
            visiblePrivacy: true
        });
    }

    /* Cuando de cierra la sesión, se llama a este método, se borran las cookies,
       se cambia el estado logged  a false, y showIndexAndHideElses oculta todos
       los componentes, menos el background de la landing page */
    logOut = () => {
        this.setState({ logged: false });
        Cookies.remove("currentUserId");
        Cookies.remove("currentUserRole");
        Cookies.remove("currentUserName");
        this.showIndexAndHideElses();
    }
    /*----------------------------Fin funciones Navbar ------------------------------ */


    /* El método render del componente es el que muestra los componentes, todos los componentes están controlados
       por los estados de visibilidad, se usa la notación {this.state.visible && <Nombre componente />} que es lo mismo
       que utilizar un if (this.state.visible) {} pero con notación ECMAScript 6.
       El menú siempre está visible, hay condicionales dentro que muestran elementos o los ocultan según se este logeado
       o no, o según el usuario sea administrador o no */
    render() {
        return (
            <div className="container-fluid">
                <Navbar className="main-navbar" collapseOnSelect fluid fixedTop>

                    <Navbar.Header>
                        <Navbar.Brand className="mainIndexNav">

                            <a href="#" onClick={e => this.showIndexAndHideElses()} className="glyphicon glyphicon-home">

                                &nbsp;</a><a href="#" onClick={e => this.showIndexAndHideElses()} href="#">Web de mascotas</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Fade in={this.state.logged}>
                            <div>
                                {
                                    this.state.logged && this.navItemsWhenLogged
                                }
                            </div>
                        </Fade>
                        <Nav>
                            <NavItem onClick={() => this.actionPushMenu("", "/news/listEntries")}>
                                Noticias
                            </NavItem>
                            <NavDropdown eventKey={3} title="Información" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1} onClick={this.showPrivacy}>
                                    Política de privacidad
                                </MenuItem>
                                <MenuItem eventKey={3.2} onClick={this.showIndexAndHideElses}>
                                    Sobre la web
                                </MenuItem>
                            </NavDropdown>
                        </Nav>

                        <Nav pullRight className="navLogin">
                            {
                                this.state.logged ?
                                    (
                                        <NavItem onClick={this.logOut}>
                                            <span>&nbsp;</span>
                                            <span className="glyphicon glyphicon-log-out"></span>
                                            &nbsp;Cerrar sesión
                                    </NavItem>
                                    ) :
                                    (
                                        <Nav>
                                            <NavItem onClick={this.showRegister}>
                                                <span>&nbsp;&nbsp;</span>
                                                <span className="glyphicon glyphicon-hand-right"></span>
                                                &nbsp;Registrarse
                                        </NavItem>
                                            <NavItem onClick={this.showLogin}>
                                                <span>&nbsp;&nbsp;</span>
                                                <span className="glyphicon glyphicon-log-in"></span>
                                                &nbsp;Iniciar sesión
                                        </NavItem>
                                        </Nav>
                                    )
                            }
                        </Nav>
                        <Nav pullRight className="navLogin">
                            {this.state.logged &&
                                <NavItem onClick={() => this.actionPushMenu("", "/user/listUserData")}>
                                    <span className="glyphicon glyphicon-user"></span>
                                    &nbsp;{this.role}:&nbsp;{this.user}
                                </NavItem>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                <div className="container components">

                    {this.state.visibleInsertPet &&
                        <InsertPet
                            indexLinksCallback={this.insertEntityCallback}
                            showListPetByUserIdCallback={() => this.actionPushMenu("", "/pet/listPetByUserId")}
                            url={this.url}
                            arrayParametersInsertPet={this.arrayParametersInsertPet}
                        />}

                    {this.state.visibleInsertUser &&
                        <InsertUser
                            indexLinksCallback={this.insertEntityCallback}
                            url={this.url}
                            arrayParametersInsertUser={this.arrayParametersInsertUser}
                        />
                    }

                    {this.state.visibleLogin &&
                        <Login
                            indexLinksCallback={this.loginCallback}
                            indexLinksCallbackHome={this.showIndexAndHideElses}
                            arrayParametersLogin={this.arrayParametersLoginUser}
                        />
                    }

                    {this.state.visibleListPetByUserId && this.state.logged && <ListPetByUserId indexLinksCallbackHome={this.showIndexAndHideElses} url={this.url} parametersListPetByKey={this.parametersListPetByKey} hideListMatchedPet={false} />}

                    {this.state.visibleListMatchedPets && this.state.logged && <ListPetByUserId indexLinksCallbackHome={this.showIndexAndHideElses} url={this.url} titleType={this.title} parametersListPetByKey={this.parametersListPetByKey} />}

                    {this.state.visibleInsertNews && <InsertNews url={"/news/uploadImage/"} indexLinksCallbackHome={this.showIndexAndHideElses} arrayParametersInsertNews={this.arrayParametersInsertNews}
                        goListNewsCallback={() => {
                            this.setState({
                                visibleInsertNews: false
                            });
                            this.showCategory("", "/news/listEntries");
                        }
                        } />}

                    {this.state.visibleListEntries && <ListNews url={"/news/listEntries"} fromInsert={true} listNewsIdHomeCallback={this.showIndexAndHideElses} />}

                    {this.state.visibleListUserData && <ListUserData indexLinksCallbackHome={this.showIndexAndHideElses} />}

                    {this.state.visibleListUsers && <ListUsers indexLinksCallbackHome={this.showIndexAndHideElses} />}

                    {this.state.visiblePrivacy && <Privacy indexLinksCallbackHome={this.showIndexAndHideElses} />}

                </div>

                <div className="header">
                    <div className="title-permanent">
                        <h1 className="landing-title"></h1>
                    </div>
                </div>
                {this.state.visibleBackground &&
                    <div className="header">
                        {this.state.logged ? (

                            <div className="title">
                                <h1 className="landing-title"> REGISTRA TUS MASCOTAS Y BÚSCALES PAREJA</h1>
                                <a className="button landing-button" onClick={e => this.actionPushMenu("", "/pet/insertPet")}>AÑADE UNA MASCOTA</a>
                            </div>
                        ) :
                            (
                                <div className="title">
                                    <h1>ENCUENTRA PAREJA A TU MASCOTA</h1>
                                    <a className="button landing-button" onClick={this.showLogin}>COMIENZA !</a>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        )
    }
}

/* El export siempre hay que ponerlo, para que otros componentes puedan usar este componente */
export default IndexLinks;