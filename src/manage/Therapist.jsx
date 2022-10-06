import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { deleteTherapist, getAllTherapist } from '../Services/Therapist';
import { useEffect, useState } from 'react';
import Loader from '../component/Loader';
import Swal from 'sweetalert2'

const Therapist = () => {

    const showMenu = (e) => {
        document.querySelectorAll(".actionContent").forEach((item) => {
            if (e.target.closest(".actionContent") === item) {
                item.classList.toggle("block")
            } else {
                item.classList.remove("block")
            }
        })
    }
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        }
    })
    const deleteTherpaistHandle = async (id) => {
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
                const resp = await deleteTherapist(id);
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
                , paddingBottom: '20px'
            },
        },
        headRow: {
            style: {
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '400',
                border: 'none !important',
                // paddingBottom : '15px'
            },
        },
    };
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            width: '250px'
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <div className='actionContent'>
                    <img onClick={showMenu} className='img1' src="/assets/images/icons/more.png" alt="" />
                    <div className="dropdown">
                        <div className="dropdown-content">
                            <Link to={`/manage-therapist/edit-therapist/${row.therapistId}`}>
                                <img className='dropMainIcon' src="/assets/images/icons/action_edit_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/edit_icon.png" alt="" />Edit</Link>
                            <Link onClick={() => { deleteTherpaistHandle(row.therapistId) }} to=''><img className='dropMainIcon' src="/assets/images/icons/action_delete_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/delete_icon.png" alt="" />Delete</Link>
                            <Link to={`/manage-therapist/case-therapist-details/${row.therapistId}`}><img className='dropMainIcon' src="/assets/images/icons/action_icon_view.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/view icon.png" alt="" />View</Link>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const [loder, setLoder] = useState(false)
    const [userData, setUserData] = useState()
    const get = async () => {
        const resp = await getAllTherapist("");
        setUserData(resp.data.data)
        setLoder(true)
    }

    useEffect(() => {
        get()
    }, [loder])

       // searchFunc

       const searchFunc = async (e) => {
        const resp = await getAllTherapist(e);
        setUserData(resp.data.data);
    }

    return (
        <div className="dashboard-user side_dashboard_container">
            <div className="row">
                <div className="col-md-12">
                    <div className="dashboardHeading setting">
                        <h2>Manage Therapists</h2>
                        <Link className='btn' to="/manage-therapist/add-therapist">Add</Link>
                    </div>

                </div>
            </div>
            <div className="users-table">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Therapist List</h2>
                        </div>
                        <div className="user-table-filter">
                            <img src="/assets/images/Filter Icon.png" alt="" />
                            <span className="filter">Filter</span>
                            <input type="text" placeholder='Search' className='inputField' onChange={(e) => searchFunc(e.target.value)} />
                        </div>
                    </div>
                    <div className='user-table-body'>
                        {(loder ? <DataTable
                            columns={columns}
                            data={userData}
                            customStyles={customStyles}
                            pagination
                        /> : <Loader />
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Therapist;