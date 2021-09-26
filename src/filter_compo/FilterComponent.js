import React from 'react';
import './FilterComponent.css';

const FilterComponent = () => {

    return (
        <div id="filter" className="card bg-light py-0">
            <div className="card-header top-bar-bg bg-gradient text-white fw-bold rounded-top">Filtros</div>
            <div className="form-check mt-2 mx-2 py-3">
                <div className="d-flex">
                    <input type="checkbox" className="form-check-input" name="checkBoxItem" id="checkBox1" />
                    <label className="text-dark mx-2" htmlFor="checkBox1">Precio</label>
                </div>
                <div className="d-flex">
                    <input type="checkbox" className="form-check-input" name="checkBoxItem" id="checkBox2" />
                    <label className="text-dark mx-2" htmlFor="checkBox2">Marca</label>
                </div>
            </div>
        </div>
    );

}

export default FilterComponent;