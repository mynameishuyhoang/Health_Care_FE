import React, { useState } from "react";
import Button from '@mui/material/Button';
import './register.scss'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [adult, setAdult] = useState('')
    const [child, setChild] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')


    const handleChange = (val: string, field: string) => {
        console.log('val: ', val, field);
        switch (field) {
            case 'username':
                setUsername(val)
                break;
            case 'password':
                setPassword(val)
                break;
            case 'name':
                setName(val)
                break;
            case 'adult':
                setAdult(val)
                break;
            case 'child':
                setChild(val)
                break;
            case 'phone':
                setPhone(val)
                break;
            case 'email':
                setEmail(val)
                break;
            default:
                break;
        }
    }

    const handleSubmitRegister = () => {
        axios.post('https://e9b0-2402-800-6205-5b70-3d24-3253-d0f7-d1f1.ngrok-free.app/api/register', {
            username: username,
            password: password,
            name: name,
            adult: adult,
            child: child,
            phone: phone,
            email: email,
        })
            .then(function (response) {
                console.log(response);
                navigate('/')
            })
            .catch(function (error) {
                console.log(error);
                alert("Đăng ký tài khoản không thành công. Vui lòng thử lại.")

            });
    }

    return (
        <div className="registerContainer">
            <div className="navRegister">
                <p className="labelRegister">Đăng ký</p>
                <div className="itemRegister">
                    <p className="labelItem">Tên đăng nhập</p>
                    <input className="inputRegister" type="text"
                        value={username}
                        onChange={(e) => handleChange(e.target.value, 'username')} />
                </div>
                <div className="itemRegister">
                    <p className="labelItem">Mật khẩu</p>
                    <input className="inputRegister" type="text"
                        value={password}
                        onChange={(e) => handleChange(e.target.value, 'password')} />
                </div>
                <div className="itemRegister">
                    <p className="labelItem">Nhập lại mật khẩu</p>
                    <input className="inputRegister" type="text" />
                </div>
                <div className="itemRegister">
                    <p className="labelItem">Họ và tên</p>
                    <input className="inputRegister" type="text"
                        value={name}
                        onChange={(e) => handleChange(e.target.value, 'name')} />
                </div>
                <div className="itemRegister">
                    <p className="labelItem">Người lớn</p>
                    <input className="inputRegister" type="text"
                        value={adult}
                        onChange={(e) => handleChange(e.target.value, 'adult')} />
                </div>
                <div className="itemRegister">
                    <p className="labelItem">Trẻ em</p>
                    <input className="inputRegister" type="text"
                        value={child}
                        onChange={(e) => handleChange(e.target.value, 'child')} />
                </div>
                <div className="itemRegister">
                    <p className="labelItem">Số điện thoại</p>
                    <input className="inputRegister" type="text"
                        value={phone}
                        onChange={(e) => handleChange(e.target.value, 'phone')} />
                </div>
                <div className="itemRegister">
                    <p className="labelItem">Email</p>
                    <input className="inputRegister" type="text"
                        value={email}
                        onChange={(e) => handleChange(e.target.value, 'email')} />
                </div>
                <div className="buttonRegister"
                    onClick={handleSubmitRegister}>
                    <Button>Đăng ký</Button>
                </div>
                <div className="goLogin">
                    <p>Bạn đã có tài khoản?
                        <NavLink to='/'>Đăng nhập ngay.</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}



export default Register