import React from 'react';
import { withRouter } from 'react-router-dom';

import './UserProfileViewer.css';
import userIcon from '../user_icon.png';
import SuccessMessage from '../../custom_messages/success_message_compo/SuccessMessage';
import Buttons from '../../form_buttons/buttons/Buttons';
import SwitchButton from '../../form_buttons/switch/SwitchButton';

import LoginServices from '../../services/LoginServices';
import UserServices from '../../services/UserServices';
import CityServices from '../../services/CityServices';
import FileServices from '../../services/FileServices';

class UserProfileViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeForm: false,
            hide: true,
            message: '',
            user: { userId: 0 },
            submited: false,
            userPicture: null,
            cities: []
        }
        this.loginService = new LoginServices();
        this.userService = new UserServices();
        this.cityService = new CityServices();
        this.fileService = new FileServices();
    }

    componentDidMount() {
        this.listCities();
        const operation = this.props.match.params.operation;
        if (operation === 'view') {
            this.viewUser();
            this.setState({ activeForm: true });
        } else {
            // this.cleanFields();
        }
    }

    listCities() {
        this.cityService.listCities().then(res => this.setState({ cities: res }));
    }

    saveUser = (e) => {
        e.preventDefault();
        const user = {
            userId: this.state.user.userId,
            documentType: document.getElementById('documentType').value,
            document: document.getElementById('document').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            birthDate: document.getElementById('birthDate').value,
            phone: document.getElementById('phone').value,
            city: {
                cityId: parseInt(document.getElementById('city').value),
                name: ""
            },
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            type: 'customer',
            userPicture: null
        };
        this.fileService.saveFiles(this.state.userPicture).then(res => {
            if (res === "files saved successfully") {
                user.userPicture = this.state.userPicture.name;
                this.userService.saveUser(user).then(res => {
                    let message = res;
                    if (message[0] === "El usuario ha sido registrado correctamente") {
                        this.loginService.saveLogin({ loginId: 0, username: user.email, password: user.password, userId: message[1] }).then(res => {
                            if (res === "Login created successfully") this.setState({ message: message[0], hide: false, submited: true, userPicture: null });
                        });
                    }
                    if (message === "Datos actualizados correctamente") this.setState({ message: message, hide: false, submited: true, userPicture: null });
                });
            }
        })
    }

    viewUser() {
        const userId = this.props.match.params.id;
        this.userService.viewUser(userId).then(res => {
            const user = res;
            document.getElementById('documentType').value = user.documentType;
            document.getElementById('document').value = user.document;
            document.getElementById('name').value = user.name;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('birthDate').value = user.birthDate;
            document.getElementById('phone').value = user.phone;
            document.getElementById('city').value = user.city.cityId;
            document.getElementById('address').value = user.address;
            document.getElementById('email').value = user.email;
            document.getElementById('password').value = user.password;
            this.fileService.getFiles(user.userPicture).then(res => {
                var file = new File([res], user.userPicture, { type: res.type });
                document.getElementById('userProfilePic').src = URL.createObjectURL(file);
                this.setState({ userPicture: file });
            })
            this.setState({ user: user });
        });
    }

    renderSwitchButton() {
        if (this.props.match.params.operation === 'view') {
            return (<SwitchButton changeFormState={this.changeFormState} />)
        }
    }

    changeFormState = () => {
        this.setState({ activeForm: !this.state.activeForm });
    }

    async loadFile(e) {
        const file = e.target.files[0];
        var src = URL.createObjectURL(file);
        let blob = null;
        await this.createBlob(src).then(res => blob = res);
        var newFile = new File([blob], file.name, { type: blob.type });
        e.target.value = null;
        document.getElementById('userProfilePic').src = src;
        this.setState({ userPicture: newFile });
    };

    async createBlob(src) {
        let blob = null;
        blob = await fetch(src).then(r => r.blob());
        return blob;
    }

    render() {
        const options = this.state.cities.map((city, index) => {
            return (
                <option value={city.cityId} key={index}>{city.name}</option>
            )
        });

        var containerClass = (this.props.match.params.operation === "register") ? "registerUserInfoContainer" : "UserInfoContainer";

        return (
            <div className="container-fluid h-100" id={containerClass}>
                <div className="text-center" hidden={this.state.hide}>
                    <SuccessMessage message={this.state.message} />
                </div>
                <div className="card" id="userForm">
                    <form className="text-white fw-bold" onSubmit={this.saveUser}>
                        <div className="card-header top-bar-bg text-white text-center fw-bold">
                            <h3 className="card-title">USUARIO</h3>
                        </div>
                        <div className="card-body form-bg">
                            {this.renderSwitchButton()}
                            <div className="form-group mx-3">
                                <div className="row">
                                    <div className="col-4" id="userProfilePicContainer">
                                        <img id="userProfilePic" className="img-fluid bg-light border border-dark border-1 rounded" src={userIcon} alt="userPic" />
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="documentType">Tipo de documento</label>
                                                <select id="documentType" className="form-control form-control-sm" disabled={this.state.activeForm}>
                                                    <option value="cedula_ciudadania">Cédula de Ciudadanía</option>
                                                    <option value="cedula_extranjeria">Cédula de Extranjería</option>
                                                    <option value="pasaporte">Pasaporte</option>
                                                    <option value="registro_civil">Registro Cívil</option>
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="document">Documento</label>
                                                <input id="document" type="text" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                <label htmlFor="name">Nombre</label>
                                                <input id="name" type="text" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="lastName">Apellido</label>
                                                <input id="lastName" type="text" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                <label htmlFor="birthDate">Fecha de nacimiento</label>
                                                <input id="birthDate" type="date" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="phone">Teléfono</label>
                                                <input id="phone" type="number" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                <label htmlFor="city">Ciudad</label>
                                                <select id="city" className="form-control form-control-sm" disabled={this.state.activeForm}>
                                                    <option value="none">--SELECCIONE--</option>
                                                    {options}
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="address">Dirección</label>
                                                <input id="address" type="text" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                <label htmlFor="email">Correo Electrónico</label>
                                                <input id="email" type="email" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="password">Contraseña</label>
                                                <input id="password" type="password" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row mt-2 py-2">
                                <div className="col-4">
                                    <input hidden={this.state.activeForm} id="image" type="file" className="form-control-file" onChange={(e) => { this.loadFile(e) }} disabled={this.state.activeForm} />
                                </div>
                                <Buttons activeForm={this.state.activeForm} changeButtonText={this.changeButtonText} />
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        )
    }

}

export default withRouter(UserProfileViewer);

