import React, { Component } from 'react';
import { Breadcrumb, Button, Modal, Panel, Image, ListGroup, ListGroupItem, Grid, Row, Col, PageHeader, Well } from "react-bootstrap";
import Cookies from "js-cookie";

class ListNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploader: "",
            condition: false,
            emptyResponse: false,
            fromInsert: false
        }
        this.url = this.props.url;
        this.petId;
        this.error;
        this.uploader;
    }

    componentWillMount() {
        this.listNews(this.url);
        this.setState ({fromInsert : this.props.fromInsert});
        //this.setState({fromInsert:false});
    }

    componentWillReceiveProps (nextProps) {
        this.listNews(nextProps.url);
        this.setState ({fromInsert : nextProps.fromInsert});
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    listNews = async (url) => {
        const res = await fetch(url);
        const stuff = await res.json();
        if (stuff.length === 0) {
            this.setState({ emptyResponse: true });
        }
        const gridStuff = this.getNewsGrid(stuff);
        await this.setStateAsync({ typeStuff: gridStuff })
    }

    breadcrumbHomeCallback = () => {
        this.props.indexLinksCallbackHome();
    }

    testIsNotNull = (image) => {
        let result;
        (null === image || "" === image) ? result = false : result = true;
        return result;
    }

    getNewsGrid = (typeStuff) => {
        return (
            <Row className="show-grid">{
                typeStuff.map((typeStuffItem, i) =>
                    <div key={i}>
                    <Col key={i} xs={12} sm={12} md={4}>
                        <Well>
                            <h3>{typeStuffItem.title}</h3>
                            <Image className="images" responsive src={"http://localhost:8000" + typeStuffItem.image} alt="imagen de la noticia"/>
                            <p className="text-justify content-news">{typeStuffItem.content}</p>
                            <hr align="right" className="divider-news" />
                            <p className="date-news">Publicada el&nbsp;{typeStuffItem.dateNews}</p>
                        </Well>
                        
                    </Col>
                    {(i > 0 && 0 === (i+1)%3) && <Button className=".btn-primary-outline divider-main" block></Button>}
            </div>
                )}
            </Row>

        )
    }

    render() {
        return (
            <div>
                {
                    this.state.fromInsert ? (
                        <div>
                            <Breadcrumb className="breadCrumPage">
                                <Breadcrumb.Item onClick={this.props.listNewsIdHomeCallback}>Inicio</Breadcrumb.Item>
                                <Breadcrumb.Item active>Noticias</Breadcrumb.Item>
                            </Breadcrumb>

                            <PageHeader className="pageHeaderPage">
                                {this.state.emptyResponse ? (<p>No se han encontrado noticias</p>)
                                    :
                                    (<p>Noticias</p>)}
                            </PageHeader>
                        </div>) :
                        <h2><strong>Noticias</strong></h2>
                }

                {this.state.typeStuff}
                <p>{this.state.error}</p>
            </div>
        )
    }

}

export default ListNews;