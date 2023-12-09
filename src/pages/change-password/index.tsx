import React from "react";
import './change-pass.scss'
import { useForm } from "react-hook-form"



const ChangePassword = () => {



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            oldpassword: "",
            newpassword: "",
            renewpassword: ""
        }
    });

    console.log(watch("oldpassword"));

    return (

        <div className="change-pass-container">
            <p style={{
                fontWeight: '600',
                fontSize: '24px',
                padding: '0px 0 0px 20px'
            }}>Thay đổi mật khẩu</p>
            <hr />
            <form className="change-pass-data"
                onSubmit={handleSubmit((data) => {
                    alert(JSON.stringify(data));
                })}
            >
                {errors.oldpassword && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Mật khẩu mới</label>
                <input className="textfield-data-item" type="password"
                    {...register("newpassword", {
                        required: true, minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    })}
                />
                {errors.newpassword && <p className="toast-message">{errors.newpassword.message}</p>}
                <label className="label-name-item">Nhập lại mật khẩu mới</label>
                <input className="textfield-data-item" type="password"
                    {...register("renewpassword", { required: true, validate: (val) => val === watch('newpassword') || "Passwords do not match" })}
                />
                {errors.renewpassword && <p className="toast-message">{errors.renewpassword.message}</p>}
                <input className="save-data" value="Lưu thay đổi" type="submit" />
            </form>
        </div>
    )
}




export default ChangePassword