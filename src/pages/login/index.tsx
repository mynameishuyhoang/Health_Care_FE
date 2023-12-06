import React, { useState } from "react";
import './login.scss'
import { NavLink, useNavigate } from "react-router-dom";
import CancelIcon from '../../assets/icons/cancel.png'
import axios from "axios";
import { toastMessage } from "../../components/message";


interface Props {
    handleCloseDlg?: () => void,
}

const Login = ({ handleCloseDlg = () => null }: Props) => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (val: string, field: string) => {
        switch (field) {
            case 'username': setUsername(val); break;
            case 'password': setPassword(val); break;
        }
    }

    const handleSubmitLogin = () => {
        axios.post('https://e9b0-2402-800-6205-5b70-3d24-3253-d0f7-d1f1.ngrok-free.app/api/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                console.log(response);
                navigate('/')
                localStorage.setItem('name', response.data.name)
                localStorage.setItem('id', response.data._id)
                console.log('toastMessage: ', toastMessage);

                toastMessage('success', 'Đăng nhập thành công')
                handleCloseDlg()
            })
            .catch(function (error) {
                console.log(error);
                alert("Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại")
            });
    }

    const _handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            handleSubmitLogin()
        }
    }

    return (
        <div className="loginContainer">
            <div className="navLogin">
                <div className="times">
                    <img className="imgCancel" src={CancelIcon} alt="Đóng" onClick={handleCloseDlg} />
                </div>
                <div style={{ margin: 'auto' }}>
                    <p className="labelLogin">Đăng nhập</p>
                    <div className="loginItem">
                        <p className="label">Username </p>
                        <input className="inputLogin"
                            type="text"
                            value={username}
                            onChange={(e) => handleChange(e.target.value, 'username')} />
                    </div>
                    <div className="loginItem">
                        <p className="label">Password </p>
                        <input className="inputLogin"
                            type="password"
                            value={password}
                            onChange={(e) => handleChange(e.target.value, 'password')}
                            onKeyDown={_handleKeyDown} />
                    </div>
                    <div className="textForgotPw">
                        <NavLink className="goForgotPassword" to='/'>Quên mật khẩu?</NavLink>
                    </div>
                    <div className="btnLogin"
                        onClick={handleSubmitLogin}>
                        <p>Đăng nhập</p>
                    </div>
                    <div className="goRegister">
                        <p>Bạn chưa có tài khoản?
                            <NavLink to='/register'>Đăng ký ngay.</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login