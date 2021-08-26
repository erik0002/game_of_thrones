import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage/errorMessage";
import CharacterPage from "../characterPage/characterPage";
//import ItemList from "../itemList";
//import CharDetails from "../charDetails";
import GotService from "../../services/gotService";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BooksPage from "../booksPage/booksPage";
import HousePage from "../housesPage/housePage";
import BookItem from "../BooksItem/BookItem";


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
            <Router>
                <div className="app">
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
                        <Route path="/" exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path="/characters" component={CharacterPage}/>
                        <Route path="/houses" component={HousePage}/>
                        <Route path="/books" exact component={BooksPage}/>
                        <Route path="/books/:id" render={
                            ({match}) => {
                                const {id} = match.params;

                                return <BookItem bookId={Number(id)}/>
                            }
                        }/>

                    </Container>
                </div>
            </Router>
        );
    }
};
