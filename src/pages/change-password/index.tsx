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
            newpassword: 1,
            renewpassword: 1
        }
    });

    console.log(watch("oldpassword"));


    return (
        <div className="change-pass-container">
            <form className="change-pass-data"
                onSubmit={handleSubmit((data) => {
                    alert(JSON.stringify(data));
                })}
            >
                <label className="label-name-item">Mật khẩu cũ</label>
                <input className="textfield-data-item" {...register("oldpassword", { required: true, maxLength: 50 })} />
                {errors.oldpassword && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Mật khẩu mới</label>
                <input className="textfield-data-item"
                    {...register("newpassword", { required: true, maxLength: 30 })}
                />
                {errors.newpassword && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Nhập lại mật khẩu mới</label>
                <input className="textfield-data-item"
                    {...register("renewpassword", { required: true, maxLength: 30 })}
                />
                <input className="save-data" value="Lưu thay đổi" type="submit" />
            </form>
        </div>
    )
}




export default ChangePassword