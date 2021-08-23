import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import './Login.css';
import LoginServices from '../../services/LoginServices';
import SessionExpiredModal from '../../custom_messages/session_expired_modal/SessionExpiredModal';

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            showModal: false
        }
        this.loginService = new LoginServices();
    }

    componentDidUpdate(prevProps) {
        var expired = this.props.history.location.state?.expired;
        if (expired) {
            this.props.history.location.state.expired = false;
            this.setState({ showModal: true, logged: false });
        }
    }

    closeExpiredSessionModal = () => {
        this.setState({ showModal: false });
    }

    validateLogin = (e) => {
        e.preventDefault();
        const login = {
            username: document.getElementById("userName").value,
            password: document.getElementById("password").value
        }
        this.loginService.checkLogin(login).then(res => {
            if (res === "Login successfully") {
                this.setState({ logged: true });
            } else {
                alert("Credenciales incorrectas!!!");
            }
        });
    }

    redirectToApp() {
        if (this.state.logged) return (<Redirect to="/home" />)
    }

    renderExpiredSessionModal() {
        if (this.state.showModal) return (
            <SessionExpiredModal closeModal={this.closeExpiredSessionModal} />
        )
    }

    render() {
        return (
            <div className="container-fluid h-100" id="loginContainer">
                <div className="d-flex justify-content-center">
                    <div className="card" id="loginCard">
                        <div className="card-header" id="loginCardHeader">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body" id="loginCardBody">
                            <form onSubmit={(e) => this.validateLogin(e)}>
                                <div className="input-group form-group my-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="username" id="userName"></input>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="password" id="password"></input>
                                </div>
                                <div className="row align-items-center remember my-4">
                                    <div className="col-2">
                                        <input type="checkbox" id="rem_checBox"></input>
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="rem_checBox">Remeber Me</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn float-right login_btn">Enviar</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer" id="loginCardFooter">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<Link to="/user/register">Sign Up</Link>
                            </div>
                            <div className="d-flex justify-content-center links">
                                <a href=" ">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
                {this.redirectToApp()}
                {this.renderExpiredSessionModal()}
            </div>
        )
    }


}

export default withRouter(Login);