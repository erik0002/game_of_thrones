import React, {Component} from 'react';
import './BooksPage.module.css';
//import {Col, Row} from "reactstrap";
import ItemList from "../itemList";
//import CharDetails from "../charDetails";
import gotService from "../../services/gotService";
import ErrorMessage from "../errorMessage/errorMessage";
import {withRouter} from "react-router-dom";
// import {Field} from "../charDetails/charDetails";
// import RowBlock from "../rowBlock/rowBlock";

class BooksPage extends Component {

    GotService = new gotService();

    state = {
        //selectedBook: null,
        error: false
    }

    // onItemSelected = (id) => {
    //     this.setState({
    //         selectedBook: id
    //     })
    // }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error){
            return <ErrorMessage/>
        }

        // const itemList = (
        //     <ItemList
        //         onItemSelected = {this.onItemSelected}
        //         getData = {this.GotService.getAllBooks}
        //         renderItem = {({name}) => `${name}`}
        //     />
        // )
        //
        // const charDetails = (
        //     <CharDetails
        //         itemId = {this.state.selectedItem}
        //         getData={this.GotService.getBook}
        //     >
        //         <Field field="numberOfPages" label='Number of Pages'/>
        //         <Field field="publisher" label='Publisher'/>
        //         <Field field="released" label='Released'/>
        //     </CharDetails>
        // )

        return (
            <ItemList
                onItemSelected = {(itemId) => {
                    this.props.history.push(`/books/${itemId}`);
                }}
                getData = {this.GotService.getAllBooks}
                renderItem = {({name}) => `${name}`}
            />
        );
    }
}

export default withRouter(BooksPage);
