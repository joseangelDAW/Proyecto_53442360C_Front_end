import React, { Component } from 'react';
import IndexLinks from './indexLinks';

/* LANDING PAGE */
/* En esta clase hay varios enlaces que llaman al listado, al formulario dinámico, y al formulario tradicional */

class ParemetersIndexLinks extends Component {

    render() {
        return (
            <div>
                <IndexLinks arrayParametersInsertPet={
                    [
                        {
                            "url": "/pet/insertPet", "value": "Insertar Mascota",
                            "inputs":
                                [
                                    { tx: "text", key: "name", phrase: "Nombre" },
                                    {
                                        tx: "select", key: "typePet", phrase: "Selecciona el tipo de animal",
                                        options:
                                            ["Perro", "Gato", "Hamster"]
                                    },
                                    {
                                        tx: "select", key: "sex", phrase: "Selecciona el sexo",
                                        options:
                                            ["Macho", "Hembra"]
                                    },
                                    { tx: "text", key: "race", phrase: "Raza" },
                                    { tx: "date", key: "birthDate", phrase: "Fecha de nacimiento" }
                                ]
                        }
                    ]
                } arrayParametersInsertNews={
                    [
                        {
                            "url": "/news/insertEntry", "value": "Insertar noticia",
                            "inputs":
                                [
                                    { tx: "text", key: "title", phrase: "Titulo" },
                                ],
                            "textArea":
                                [
                                    { tx: "textarea", key: "content", phrase: "Contenido de la noticia" }
                                ]
                        }
                    ]
                }
                    parametersListPetByKey={
                        {
                            "titles": ["Nombre", "Tipo", "Sexo", "Raza", "Fecha de nacimiento"],
                            "slice": [2, 7]
                        }
                    } parametersListMatchedPet={
                        {
                            "titles": ["Nombre", "Tipo", "Sexo", "Raza", "Fecha de nacimiento"],
                            "slice": [2, 7]
                        }
                    } arrayParametersInsertUser={
                        [
                            {
                                "url": "/user/insertUser", "value": "Insertar Usuario",
                                "inputs":
                                    [
                                        { tx: "text", key: "name", phrase: "Nombre" },
                                        { tx: "text", key: "surname", phrase: "Apellidos" },
                                        { tx: "date", key: "birthDate", phrase: "Fecha de nacimiento" },
                                        { tx: "text", key: "nickName", phrase: "Nombre de usuario" },
                                        { tx: "text", key: "email", phrase: "Email" },
                                        { tx: "text", key: "password", phrase: "Contraseña" }

                                    ]
                            }
                        ]
                    } arrayParametersLoginUser={
                        [
                            {
                                "url": "/user/loginUser", "value": "Usuario",
                                "inputs":
                                    [
                                        { tx: "text", key: "nickname", phrase: "Nombre de usuario" },
                                        { tx: "password", key: "password", phrase: "Contraseña" }
                                    ]
                            },
                            {
                                "url": "/user/loginUser", "value": "Administrador",
                                "inputs":
                                    [
                                        { tx: "text", key: "nickname", phrase: "Nombre de usuario" },
                                        { tx: "password", key: "password", phrase: "Contraseña" }
                                    ]
                            }
                        ]
                    } arrayParametersNavBarWhenUserLogged={
                        [
                            {
                                "url": "#", "value": "Mascotas",
                                "submenus":
                                    [
                                        { "phrase": "Añadir mascota", "url": "/pet/insertPet", "value": "Añadir" },
                                        { "phrase": "Listar mis mascotas", "url": "/pet/listPetByUserId", "value": "Mis mascotas" }
                                    ]
                            }
                        ]
                    } arrayParametersNavBarWhenAdminLogged={
                        [
                            {
                                "url": "#", "value": "Editar Noticias",
                                "submenus":
                                    [
                                        { "phrase": "Añadir noticia", "url": "/news/insertEntry", "value": "Añadir" },
                                        { "phrase": "Listar noticias", "url": "/news/listEntries", "value": "Noticias" }
                                    ]
                            },

                            {
                                "url": "#", "value": "Listar entidades",
                                "submenus":
                                    [
                                        { "phrase": "Listar usuarios", "url": "/user/listUser", "value": "Usuarios" },
                                    ]
                            }


                        ]
                    } 
                />
            </div>
        )
    }
}

export default ParemetersIndexLinks;
