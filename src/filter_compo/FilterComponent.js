import React from 'react';
import './FilterComponent.css';

const FilterComponent = () => {

    return (
        <div id="filter" className="bg-light py-0">
            <div className="card-header bg-success text-white">Filtros</div>
            <div className="form-check mt-2 mx-2 py-3">
                <div className="d-flex">
                    <input type="radio" className="form-check-input" name="radioItem" id="btnradio1" />
                    <label className="text-dark mx-2" htmlFor="btnradio1">Precio</label>
                </div>
                <div className="d-flex">
                    <input type="radio" className="form-check-input" name="radioItem" id="btnradio2" />
                    <label className="text-dark mx-2" htmlFor="btnradio2">Marca</label>
                </div>
            </div>
        </div>
    );

}

export default FilterComponent;