import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { saveManager } from "../Services/Manager";
import { useNavigate } from "react-router-dom";


const Add_CaseManager = () => {
    const Swal = require('sweetalert2')
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (formData) => {
        debugger

        const data = {
            name: formData.therapistName,
            email: formData.therapistCategory
        }

        const resp = await saveManager(data)
        if (resp.data.code === 1) {
            Swal.fire({
                title: 'Case Manager Added!',
                timer: 1400,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate("/manage-case-manager");
            }, 2000);
        }

    }


    return (
        <div className="mainDashboard side_dashboard_container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/manage-case-manager" className="dashboardHeading arrowbefore">
                        <img src="/assets/images/Icon ionic-ios-arrow-back.svg" alt="" />
                        <h2>Add Case Manager</h2>
                    </Link>
                </div>
            </div>
            <div className="users-table set3">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Case Manager Details</h2>
                        </div>
                    </div>
                    <form className="form-login setManagerField">
                        <div className="therapist_category">
                            <input type="text" {...register("therapistName", { required: true })} placeholder="Therapist Name" />
                            <span className="error">{errors.therapistName?.type === 'required' && "Manager Name is required"}</span>
                        </div>
                        <div className="therapist_name" style={{marginLeft : '40px'}}>
                            <input type="email" {...register("therapistCategory", { required: true })} placeholder="Therapist email" />
                            <span className="error">{errors.therapistCategory?.type === 'required' && "Manager email is required"}</span>
                        </div>
                    </form>
                </div>
            </div>
            <div className="buttonSet">
                <Link className="bttn setb" to="/manage-case-manager">Cancel</Link>
                <Link className="bttn bttn-bg" onClick={handleSubmit(onSubmit)} to="">Save</Link>
            </div>
        </div>
    );
}

export default Add_CaseManager;