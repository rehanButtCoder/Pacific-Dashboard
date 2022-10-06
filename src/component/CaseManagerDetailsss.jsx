import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getManagerById } from "../Services/Manager";
import Loader from "./Loader";


const CaseManagerDetailsss = () => {

    const [val, setVal] = useState({})
    const [loder, setLoder] = useState(true)
    let { id } = useParams();

    const getManager = async () => {
        const resp = await getManagerById(id);
        console.log(resp.data.data)
        setVal(resp.data.data)
        setLoder(false)
    }

    useEffect(() => {
        getManager()
    }, [])


    return (
        <div>
            <div className="mainDashboard side_dashboard_container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/manage-case-manager" className="dashboardHeading arrowbefore">
                            <img src="/assets/images/Icon ionic-ios-arrow-back.svg" alt="" />
                            <h2>Case Manager Details</h2>
                        </Link>
                    </div>
                </div>
                <div className="users-table set3">
                    {
                        (loder ? <Loader /> :
                            <div className="users-table-container set-4">
                                <div className="user-table-head">
                                    <div className="userHeading">
                                        <h2>Case Manager Details</h2>
                                    </div>
                                </div>
                                <div className="therapist_detail">
                                    <div className="therapist_list">
                                        <h3>Name</h3>
                                        <p>{val.name}</p>
                                    </div>
                                    <div className="therapist_list">
                                        <h3>Email</h3>
                                        <p>{val.email}</p>
                                    </div>
                                
                                    <div className="therapist_mtySec">
                                    </div>
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    );
}

export default CaseManagerDetailsss;