import React, {Component} from "react";
import GotService from "../../services/gotService";
import {Field} from "../charDetails/charDetails";
import CharDetails from "../charDetails";

export default class BookItem extends Component {
    gotService = new GotService();



    render() {
        return (
            <CharDetails
                charId = {this.props.bookId}
                getData = {this.gotService.getBook}
            >
                <Field field="numberOfPages" label='Number of Pages'/>
                <Field field="publisher" label='Publisher'/>
                <Field field="released" label='Released'/>
            </CharDetails>
        )
    }

}
