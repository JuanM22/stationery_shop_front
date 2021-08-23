import './ItemEditCompo.css';
import {
    Link,
} from "react-router-dom";


const ItemEditCompo = (props) => {

    const route = props.route + "/view/" + props.item.productId;

    const editButton = <Link to={route}><i className="far fa-edit" title="Editar"></i></Link>
    const addToCartButton = <button className="addToCartBtn" onClick={() => props.showProductPreview(props.item)}><i className="fas fa-cart-plus" title="Añadir al carrito"></i></button>;

    {/* <button className="btn btn-success text-white w-25 mx-3" onClick={() => this.showProductPreview(item)}>Añadir al carrito</button> */ }

    return (
        <div className="action_container">
            <div className="container icons">
                <div className="row">
                    <div className="col">
                        {editButton}
                    </div>
                    <div className="col">
                        {addToCartButton}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ItemEditCompo;