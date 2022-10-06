import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getManagerById, saveManager, updateManager } from "../Services/Manager";
import { useNavigate, useParams } from "react-router-dom";

const Edit_CaseManager = () => {
    const Swal = require('sweetalert2')
    const navigate = useNavigate();
    let { id } = useParams();

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = async (formData) => {
        debugger

        const data = {
            caseManagerId: id,
            name: formData.name,
            email: formData.email
        }

        const resp = await updateManager(data)
        if (resp.data.code === 1) {
            Swal.fire({
                title: 'Case Manager Updated!',
                timer: 1400,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate("/manage-case-manager");
            }, 2000);
        }
    }

    const getManager = async () => {
        const resp = await getManagerById(id);
        reset(resp.data.data)
    }

    useEffect(() => {
        getManager()
    }, [])



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
                            <input type="text" {...register("name", { required: true })} placeholder="Therapist Name" />
                            <span className="error">{errors.name?.type === 'required' && "Therapist Name is required"}</span>
                        </div>
                        <div className="therapist_name" style={{marginLeft : '40px'}}>
                            <input type="email" {...register("email", { required: true })} placeholder="Therapist email" />
                            <span className="error">{errors.email?.type === 'required' && "Therapist email is required"}</span>
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

export default Edit_CaseManager;