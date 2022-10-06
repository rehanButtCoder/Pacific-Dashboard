import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getSingleUser } from '../Services/Users';

const UserDetail = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState()

    // get data api

    const getSingleApiFunc = async () => {
        const userResp = await getSingleUser(id);
        setUserData(userResp?.data?.data);
    }
    useEffect(() => {
        getSingleApiFunc()
    }, [])

    return (
        <div>
            <div className="mainDashboard side_dashboard_container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/manage-user" className="dashboardHeading arrowbefore">
                            <img src="/assets/images/Icon ionic-ios-arrow-back.svg" alt="" />
                            <h2>User Details</h2>
                        </Link>
                    </div>
                </div>
                <div className="users-table set3">
                    <div className="users-table-container set-5">
                        <div className="user-table-head setUD">
                            <div className="userHeading setUserDeatils">
                                <img style={{ borderRadius: "50%" }} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "/assets/images/user Detail Image1.png";
                                }}
                                    src={userData?.profilePicture} alt="" />
                                <div className='detailCtn'>
                                    <h4>Full Name</h4>
                                    <h3>{userData?.fullName}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="therapist_detail setUserDetails">
                            <div className="therapist_list">
                                <h3>Email</h3>
                                <p>{userData?.email}</p>
                            </div>
                            <div className="therapist_list">
                                <h3>Phone Number</h3>
                                <p>{userData?.phoneNumber}</p>
                            </div>
                            <div className="userDetailSec">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;