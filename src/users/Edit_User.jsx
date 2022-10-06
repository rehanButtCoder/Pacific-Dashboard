import { useParams } from "react-router";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { getSingleUser, updateTheUser, userImgUplod } from '../Services/Users';


const Edit_User = () => {
    // This is for online and onhouse users
    // This is for online and onhouse users
    const { id } = useParams()

    const Swal = require('sweetalert2')
    const navigate = useNavigate();
    const [loder, setLoder] = useState(false)
    // for image
    const [picture, setPicture] = useState(null)
    const [imgData, setImgData] = useState()
    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener("load", () => {
                setImgData(reader.result)
            })
        }
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {
        setLoder(true)
        const data = {
            email: fData.email,
            password: fData.pass,
            fullName: fData.fullName,
            phoneNumber: fData.phoneNumber,
            id: id,
            profilePicture: ""
        }
        // upload img
        if (picture !== null) {
            const formData1 = new FormData();
            formData1.append("", picture);
            const imageResponse = await userImgUplod(formData1);
            data.profilePicture = imageResponse.data.data.url;
        }
        const resp = await updateTheUser(data);
        if (resp.data.code === 1) {
            Swal.fire({
                title: resp.data.message,
                timer: 1400,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate("/manage-user");
            }, 2000);
        } else {
            Swal.fire({
                title: resp.data.data.message,
                timer: 4000,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoder(false)
        }
    }

    // get data api
    useEffect(() => {
        getSingleApiFunc()
    }, [])

    const getSingleApiFunc = async () => {
        const userResp = await getSingleUser(id);
        reset(userResp?.data?.data)
    }

    return (
        <div className="mainDashboard side_dashboard_container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/manage-user" className="dashboardHeading arrowbefore">
                        <img src="/assets/images/Icon ionic-ios-arrow-back.svg" alt="" />
                        <h2>Edit User</h2>
                    </Link>
                </div>
            </div>
            <div className="users-table set3">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>User Details</h2>
                        </div>
                    </div>
                    <div>
                        {imgData ? <img className='userImgSiZe' src={imgData} alt='' /> :
                            <>
                                <div className='uploadBtnUser1'>
                                    <img src="/assets/images/user Detail Image1.png" alt="" />
                                    <input onChange={imagesPreview} type="file" accept='image/*' />
                                </div>
                            </>
                        }
                    </div>
                    <form style={{ flexWrap: "wrap" }} className="form-login set2">
                        <div className="therapist_category userImg1 useralignmnt">
                            <input type="text" name="uname" placeholder="Mathew Johnson" {...register("fullName", { required: true })} />
                            <span className="error">{errors.name?.type === 'required' && "This field is required"}</span>
                        </div>
                        <div className="therapist_name userImg2 useralignmnt">
                            <input type="text" name="uname" placeholder="mathewjohnson@gmail.com" {...register("email", { required: true })} />
                            <span className="error">{errors.email?.type === 'required' && "This field is required"}</span>
                        </div>
                        <div className="therapist_category userImg3 useralignmnt">
                            <input type="text" name="uname" placeholder="(859)129-2962" {...register("phoneNumber", { required: true })} />
                            <span className="error">{errors.nmber?.type === 'required' && "This field is required"}</span>
                        </div>
                        <div className="therapist_category userImg4 useralignmnt">
                            <input type="password" name="uname" placeholder="********" {...register("pass", { required: true })} />
                            <span className="error">{errors.pass?.type === 'required' && "This field is required"}</span>
                        </div>
                        <span className="error">{errors.typeOfUser?.passw === 'required' && "Therapist Email is required"}</span>
                    </form>
                </div>
            </div>
            <div className="buttonSet">
                <Link to="/manage-user" className="bttn setb">Cancel</Link>
                {
                    (loder === true) ?
                        <div className="relative">
                            <div className="loader alignAdd userLodrgg"></div>
                            <Link style={{ display: "block" }} to="" className="bttn bttn-bg" >Update</Link>
                        </div>
                        :
                        <Link to="" className="bttn bttn-bg" onClick={handleSubmit(onSubmit)}>Update</Link>
                }
            </div>
        </div>
    );
}

export default Edit_User;