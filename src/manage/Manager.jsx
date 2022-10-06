import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { deleteManager, getAllManager } from '../Services/Manager';
import Swal from 'sweetalert2'
import Loader from '../component/Loader';

const Manager = () => {

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

    const [loader, setLoader] = useState(false)

    const deleteManagerHandle = async (id) => {
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
                setLoader(false)
                const resp = await deleteManager(id);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
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

    const [userData, setUserData] = useState([])

    const UserApiFunc = async () => {
        const userResp = await getAllManager("");
        setUserData(userResp.data.data)
        setLoader(true)
    }
    useEffect(() => {
        UserApiFunc()
    }, [loader])


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
            },
        },
    };
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            width: '200px'
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
                            <Link to={`/manage-case-manager/edit-case-manager/${row.caseManagerId}`}>
                                <img className='dropMainIcon' src="/assets/images/icons/action_edit_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/edit_icon.png" alt="" />Edit</Link>
                            <Link onClick={() => deleteManagerHandle(row.caseManagerId)} to=''><img className='dropMainIcon' src="/assets/images/icons/action_delete_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/delete_icon.png" alt="" />Delete</Link>
                            <Link to={`/manage-case-manager/case-manager-details/${row.caseManagerId}`}><img className='dropMainIcon' src="/assets/images/icons/action_icon_view.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/view icon.png" alt="" />View</Link>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    // searchFunc

    const searchFunc = async (e) => {
        const resp = await getAllManager(e);
        setUserData(resp.data.data);
    }

    return (
        <div className="dashboard-user side_dashboard_container">
            <div className="row">
                <div className="col-md-12">
                    <div className="dashboardHeading setting">
                        <h2>Manage Case Manager</h2>
                        <Link className='btn' to="/manage-case-manager/add-case-manager">Add</Link>
                    </div>

                </div>
            </div>
            <div className="users-table">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Manager List</h2>
                        </div>
                        <div className="user-table-filter">
                            <img src="/assets/images/Filter Icon.png" alt="" />
                            <span className="filter">Filter</span>
                            <input type="text" placeholder='Search' className='inputField' onChange={(e) => searchFunc(e.target.value)} />
                        </div>
                    </div>
                    <div className='user-table-body'>
                        {(
                            loader ? <DataTable
                                columns={columns}
                                data={userData}
                                customStyles={customStyles}
                                pagination /> : <Loader />

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manager;