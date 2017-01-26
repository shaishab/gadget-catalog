import React from 'react';
import { hashHistory } from 'react-router';
let moment = require('moment');

import ItemInputFields from '../components/Item/ItemInputFields';
import ItemStore from '../stores/ItemStore';
import * as ItemActions from '../actions/ItemActions';

export default class AddItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            category: '',
            brand: '',
            purchaseDate: '',
            price: '',
            file: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentWillMount() {
        ItemStore.on('receiveCreatedItem', () => {
            let item = ItemStore.getReceivedItem();
            hashHistory.push({ pathname: `items/${item._id}` });
        });
    }

    componentWillUnmount() {
        ItemStore.removeListener('receiveCreatedItem', () => {
            let item = ItemStore.getReceivedItem();
            hashHistory.push({ pathname: `items/${item._id}` });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'file' ? target.files[0] : target.value;

        this.setState({
            [name]: value
        });
    }

    addItem(event) {
        event.preventDefault();

        var formData  = new FormData();

        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('category', this.state.category);
        formData.append('brand', this.state.brand);
        formData.append('purchaseDate', moment(this.state.purchaseDate).toISOString());
        formData.append('price', this.state.price);
        formData.append('file', this.state.file);

        ItemActions.createItem(formData);
    }

    render() {
        return (
            <div>
                <h3>Add a new item</h3>
                <hr/>

                <form onSubmit={this.addItem}>
                    <ItemInputFields handleInputChange={this.handleInputChange} fields={this.state}/>
                    <button type="submit" class="btn btn-primary">Add item</button>
                </form>
            </div>
        );
    }
}
