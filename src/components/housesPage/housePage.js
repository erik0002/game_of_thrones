import React, {Component} from 'react';
import './housePage.module.css';
import {Col, Row} from "reactstrap";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import gotService from "../../services/gotService";
import ErrorMessage from "../errorMessage/errorMessage";
import {Field} from "../charDetails/charDetails";

export default class HousePage extends Component {

    GotService = new gotService();

    state = {
        selectedItem: 130,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error){
            return <ErrorMessage/>
        }

        return (
            <div className="char-details rounded">
                <Row>
                    <Col md='6'>
                        <ItemList
                            onItemSelected = {this.onItemSelected}
                            getData = {this.GotService.getAllHouses}
                            renderItem = {(item) => `${item.name}`}
                        />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId = {this.state.selectedItem} getData = {this.GotService.getHouse}>
                            <Field field="region" label='Region'/>
                            <Field field="words" label='Words'/>
                            <Field field="titles" label='Titles'/>
                            <Field field="ancestraWeapons" label='AncestraWeapons'/>
                        </CharDetails>
                    </Col>
                </Row>
            </div>
        );
    }
}
