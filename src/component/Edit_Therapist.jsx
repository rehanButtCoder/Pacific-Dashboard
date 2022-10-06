import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams,useNavigate } from "react-router-dom";
import { GetTherapistById, saveTherapist, updateTherapist } from "../Services/Therapist";
import { useEffect, useState } from "react";

const Edit_Therapist = () => {
 
    const Swal = require('sweetalert2')
    const navigate = useNavigate();
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const onSubmit = async (formData) => {
        // debugger

        const data = {
            therapistId: id,
            name: formData.name,
            email: formData.email    
        }

        const resp = await updateTherapist(data)
        if(resp.data.code  === 1){
            Swal.fire({
                title: 'Therapist Updated!',
                timer: 1400,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate("/manage-therapist");  
            }, 2000);
        }
    }

    let { id } = useParams();
    // const [userData, setUserData] = useState()
    const get = async () => {
        const resp = await GetTherapistById(id);
        // setUserData(resp.data.data)
        reset(resp.data.data)
        console.log(resp.data.data)
        // setLoder(true)
    }

    useEffect(() => {
        get()
    }, [])
    return (
        <div className="mainDashboard side_dashboard_container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/manage-therapist" className="dashboardHeading arrowbefore">
                        <img src="/assets/images/Icon ionic-ios-arrow-back.svg" alt="" />
                        <h2>Edit Therapist</h2>
                    </Link>
                </div>
            </div>
            <div className="users-table set3">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Therapist Details</h2>
                        </div>
                    </div>

                    <form className="form-login setManagerField">
                        <div className="therapist_category"> 
                            <input type="text" name="uname" placeholder="Therapist Name"    {...register("name", { required: true })}  />
                            <span className="error">{errors.name?.type === 'required' && "Therapist Name is required"}</span>
                        </div>
                        <div className="therapist_name" style={{marginLeft : '40px'}}>
                            <input type="email" name="uname" placeholder="Therapist Email" 
                             {...register("email", { required: true })} />
                            <span className="error">{errors.email?.type === 'required' && "Therapist Email is required"}</span>
                        </div>
                    </form>
                </div>
            </div>
            <div className="buttonSet">
                <Link className="bttn setb" to="/manage-therapist">Cancel</Link>
                <Link className="bttn bttn-bg" onClick={handleSubmit(onSubmit)} to="">Update</Link>
            </div>
        </div>
    );
}

export default Edit_Therapist;