import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { get, deleteTheUser } from '../Services/Users';
import Loader from '../component/Loader';
import Swal from 'sweetalert2'

const User = () => {
    // online user component is <OnilneUsers /> || Users component is for simple users
    // online users and simple users view page are different but edit and create components are same
    // both online and simple users crud is made in users folder
    const showMenu = (e) => {
        document.querySelectorAll(".actionContent").forEach((item) => {
            if (e.target.closest(".actionContent") === item) {
                item.classList.toggle("block")
            } else {
                item.classList.remove("block")
            }
        })
    }
    const [userData, setUserData] = useState()
    const [loder, setLoder] = useState(false)

    useEffect(() => {
        UserApiFunc()
    }, [loder])


    const UserApiFunc = async () => {
        const userResp = await get("");
        setUserData(userResp?.data?.data)
        setLoder(true)
    }

    // styles
    const customStyles = {
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: '400',
                color: '#B1B1B1',
                backgroundColor: '#07396C'
            },
        },
        cells: {
            style: {
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '400',
                backgroundColor: '#04305D'
            },
        },
        headRow: {
            style: {
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '400',
                border: 'none !important'
            },
        },
    };


    // delete api
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        }
    })
    const deleteUserHandle = async (id) => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoder(false)
                const resp = await deleteTheUser(id);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    // columns
    const columns = [
        {
            name: 'User ID',
            button: true,
            cell: (row) => (
                <div>
                    <div className='user-item flexing'>
                        <div>
                            <img className='userImg' src={row.profilePicture} alt="" />
                        </div>
                        <div style={{ marginLeft: "15px" }}>
                            <span style={{ marginLeft: "0" }}>{row.fullName}</span>
                        </div>
                    </div>
                </div>
            ),
            width: "200px",
        },
        {
            name: 'Full Name',
            selector: row => row.fullName,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Phone',
            selector: row => row.phoneNumber,
        },
        // {
        //     name: 'Case Manager',
        //     selector: row => row.fullName,
        // },
        // {
        //     name: 'Therapist',
        //     selector: row => row.therapist,
        // }
        // ,
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <div className='actionContent'>
                    <img onClick={showMenu} className='img1' src="/assets/images/icons/more.png" alt="" />
                    <div className="dropdown">
                        <div className="dropdown-content">
                            <Link to={`/manage-user/edit-user/${row.id}`}>
                                <img className='dropMainIcon' src="/assets/images/icons/action_edit_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/edit_icon.png" alt="" />Edit
                            </Link>
                            <Link onClick={() => { deleteUserHandle(row.id) }} to=''><img className='dropMainIcon' src="/assets/images/icons/action_delete_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/delete_icon.png" alt="" />Delete</Link>
                            <Link to={`/manage-user/user-detail/${row.id}`}><img className='dropMainIcon' src="/assets/images/icons/action_icon_view.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/view icon.png" alt="" />View
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const searchFunc = async (e) => {
        const resp = await get(e);
        setUserData(resp.data.data);
    }

    return (
        <div className="dashboard-user side_dashboard_container">
            <div className="row">
                <div className="col-md-12">
                    <div className="dashboardHeading setting">
                        <h2>Manage Users</h2>
                        <Link className='btn' to="/manage-user/create-user">Add</Link>
                    </div>
                </div>
            </div>
            <div className="users-table">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Users Lists</h2>
                        </div>
                        <div className="user-table-filter">
                            <img src="/assets/images/Filter Icon.png" alt="" />
                            <span className="filter">Filter</span>
                            <input type="text" placeholder='Search' className='inputField' onChange={(e) => searchFunc(e.target.value)} />
                        </div>
                    </div>
                    <div className='user-table-body'>
                        {
                            (loder ?
                                <DataTable
                                    columns={columns}
                                    data={userData}
                                    customStyles={customStyles}
                                    pagination />
                                : <Loader />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;