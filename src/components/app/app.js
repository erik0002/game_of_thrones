import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage/errorMessage";
import CharacterPage from "../characterPage/characterPage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import GotService from "../../services/gotService";


export default class App extends Component {

    GotService = new GotService();

    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar,
            }
        });
    };

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error){
            return <ErrorMessage/>
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row className="mb-2">
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button
                                className="btn btn-info"
                                onClick={this.toggleRandomChar}
                            > Toggle random character
                            </button>

                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onCharSelected = {this.onCharSelected}
                                getData = {this.GotService.getAllBooks}
                                renderItem = {(item) => (item.name)}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onCharSelected = {this.onCharSelected}
                                getData = {this.GotService.getAllHouses}
                                renderItem = {(item) => `${item.name}`}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};
