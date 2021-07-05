import React from 'react';
import './SuccessMessage.css';

const SuccessMessage = (props) => {
    return (
        <div id="myModal" className="modal fade">
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="icon-box">
                            <i className="material-icons">&#xE876;</i>
                        </div>
                        <h4 className="modal-title w-100">{props.message}</h4>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-success btn-block" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessMessage;

