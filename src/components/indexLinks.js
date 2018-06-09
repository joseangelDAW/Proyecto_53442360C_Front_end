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
/* En esta clase hay varios enlaces que llaman al listado, al formulario dinámico, y al formulario tradicional */

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

        this.user = "";
        this.userId = "";
        this.role = "";
        this.navItemsWhenLogged = '';
        this.title = "";

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

    disbleBackwardsButton = () => {
        window.location.hash = "no-back-button";
        window.location.hash = "Again-No-back-button" //chrome
        window.onhashchange = () => { window.location.hash = "no-back-button"; }
    }

    componentWillMount = () => {
        this.disbleBackwardsButton();
        if (Cookies.get("currentUserId") !== "" && Cookies.get("currentUserId") !== undefined) {
            this.showLogged(
                Cookies.get("currentUserName"),
                Cookies.get("currentUserId"),
                Cookies.get("currentUserRole")
            );
        }
    }

    setCookie = (cname, cvalue, seconds) => {
        Cookies.set(cname, cvalue);
    }

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

    loginCallback = (data, user, userId, role) => {
        if (200 === data) {
            this.setCookie("currentUserName", user);
            this.setCookie("currentUserId", userId);
            this.setCookie("currentUserRole", role);
            this.showLogged(user, userId, role);
        }
    }

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
        this.setState({ logged: true });
        this.showIndexAndHideElses();
    }

    insertEntityCallback = (data) => {
        if (200 === data) {
            this.showIndexAndHideElses();
        }
    }

    uploadPhotoCallback = (data) => {
        this.showIndexAndHideElses();
    }


    /* --------------------------- Funciones de Navbar --------------------------------- */
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

    showLogin = () => {
        this.showIndexAndHideElses();
        this.setState({
            visibleBackground: false,
            visibleLogin: true,
            visibleInsertUser: false,
        });
    }

    showRegister = () => {
        this.showIndexAndHideElses();
        this.setState({
            visibleBackground: false,
            visibleInsertUser: true,
            visibleLogin: false,
        });
    }

    showPrivacy = () => {
        this.showIndexAndHideElses();
        this.setState({
            visibleBackground: false,
            visiblePrivacy: true
        });
    }

    logOut = () => {
        this.setState({ logged: false });
        Cookies.remove("currentUserId");
        Cookies.remove("currentUserRole");
        Cookies.remove("currentUserName");
        this.showIndexAndHideElses();
    }
    /*----------------------------Fin funciones Navbar ------------------------------ */

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
                                <MenuItem  eventKey={3.1} onClick={this.showPrivacy}>
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

                    {this.state.visiblePrivacy && <Privacy indexLinksCallbackHome={this.showIndexAndHideElses}/>}

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

export default IndexLinks;