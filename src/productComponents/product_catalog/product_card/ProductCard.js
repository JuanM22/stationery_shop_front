import React from 'react';

import './ProductCard.css';
import ItemEditCompo from '../item_edit_compo/ItemEditCompo';

class ProductCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showActions: false
        }
    }

    showActionModal = () => {
        this.setState({ showActions: true });
    }
    
    closeActionModal = () => {
        this.setState({ showActions: false });
    }

    render() {

        const item = this.props.data.item;
        const route = this.props.data.route;
        const src = this.props.data.src;

        return (
            <div className="col-3 item_card p-0 product_card" onMouseLeave={this.closeActionModal}>
                <div className="card border px-2 mx-1">
                    <img onMouseEnter={this.showActionModal} className="img-thumbnail rounded m-2" src={src} alt="Product pic" />
                    <div className="card-body">
                        <h4 className="card-title">{item.name}</h4>
                        <div className="card-text price">Precio: ${item.unitPrice}</div>
                    </div>
                </div >
                {(this.state.showActions) ? <ItemEditCompo item={item} route={route} showProductPreview={this.props.showProductPreview} userType={this.props.userType}/> : null}
            </div>
        )
    }

}

export default ProductCard;