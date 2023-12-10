import React from "react";
import './login.scss'
import { NavLink, useNavigate } from "react-router-dom";
import CancelIcon from '../../assets/icons/cancel.png'
import axios from "axios";
import { useForm } from "react-hook-form";
import { toastMessage } from "../../components/message";


interface Props {
    handleCloseDlg?: () => void,
}

const Login = ({ handleCloseDlg = () => null }: Props) => {

    const navigate = useNavigate()

    const handleSubmitLogin = (data?: any) => {
        axios.post('https://healthcare-bkmr.onrender.com/api/login', {
            username: data?.username,
            password: data?.password
        })
            .then(function (response) {
                console.log(response);
                navigate('/')
                localStorage.setItem('id', response.data._id)
                localStorage.setItem('name', response.data.name)

                toastMessage('success', 'Đăng nhập thành công')

                handleCloseDlg()
            })
            .catch(function (error) {
                console.log(error);
                console.log();
                toastMessage('error', 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại')
            });
    }

    const _handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            handleSubmitLogin()
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        }
    });

    console.log(watch('username'));


    return (
        <div className="loginContainer">
            <div className="navLogin">
                <div className="times">
                    <img className="imgCancel" src={CancelIcon} alt="Đóng" onClick={handleCloseDlg} />
                </div>
                <div style={{ margin: 'auto' }}>
                    <p className="labelLogin">Đăng nhập</p>
                    <form className="form-login"
                        onSubmit={handleSubmit((data) => {
                            handleSubmitLogin(data)
                        })}
                    >
                        <label className="label-name-item">Tên đăng nhập <span>*</span></label>
                        <input className="textfield-data-item"
                            {...register("username", { required: true })}
                        />
                        {errors.username && <p className="toast-message">Tên đăng nhập không được để trống</p>}
                        <label className="label-name-item">Mật khẩu <span>*</span></label>
                        <input className="textfield-data-item" type="password"
                            onKeyDown={_handleKeyDown}
                            {...register("password", { required: true })}
                        />
                        {errors.password && <p className="toast-message">Mật khẩu không được được để trống</p>}
                        <input className="save-data" value="Đăng nhập" type="submit" />
                    </form>
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