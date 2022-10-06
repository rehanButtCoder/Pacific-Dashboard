import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { GetTherapistById } from "../Services/Therapist";
import Loader from "./Loader";

const Case_ManagerDetails = () => {

    let { id } = useParams();
    const [loder, setLoder] = useState(true)
    const [userData, setUserData] = useState({})
    const get = async () => {
        const resp = await GetTherapistById(id);
        setUserData(resp.data.data)
        console.log(resp.data.data)
        setLoder(false)
    }

    useEffect(() => {
        get()
    }, [])

    
    return (
        <div>
            <div className="mainDashboard side_dashboard_container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/manage-therapist/" className="dashboardHeading arrowbefore">
                            <img src="/assets/images/Icon ionic-ios-arrow-back.svg" alt="" />
                            <h2>Therapist Details</h2>
                        </Link>
                    </div>
                </div>
                <div className="users-table set3">
                    <div className="users-table-container set-4">
                        <div className="user-table-head">
                            <div className="userHeading">
                                <h2>Therapist Information</h2>
                            </div>
                        </div>

                        {(loder ? <Loader /> :
                            <div className="therapist_detail">
                                <div className="therapist_list">
                                    <h3>Name</h3>
                                    <p>{userData.name}</p>
                                </div>
                                <div className="therapist_list">
                                    <h3>Email</h3>
                                    <p>{userData.email}</p>
                                </div>                           
                                <div className="therapist_mtySec">
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Case_ManagerDetails;