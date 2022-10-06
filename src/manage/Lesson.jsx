import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { deleteLesson, get } from '../Services/Lessons';
import Loader from '../component/Loader';
import Swal from 'sweetalert2'

const Lesson = () => {

    const dropDown = (e) => {
        document.querySelectorAll(".actionContent").forEach(item => {
            if (e.target.closest(".actionContent") === item) {
                item.classList.toggle("block")
            } else {
                item.classList.remove("block")
            }
        })
    }

    const [lessonVal, setlessonVal] = useState([])

    const [loafer, setLoafer] = useState(false)

    const getLessons = async () => {
        const response = await get("");
        setlessonVal(response.data.data)
        setLoafer(true);
    }

    useEffect(() => {
        getLessons()
    }, [loafer])

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
            name: 'Lesson ID',
            selector: row => row.lessonId,
            width: '150px'
        },
        {
            name: 'Days',
            selector: row => row.dayNumber,
            width: '150px'
        },
        {
            name: 'Description',
            selector: row => row.lessonDescription,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <div>
                    <div className='actionContent'>
                        <img className='img1' onClick={(e) => dropDown(e)} src="/assets/images/More.svg" alt="" />
                        <div className="dropdown">
                            <div className="dropdown-content">
                                <Link to={`/manage-lesson/edit-lesson/${row.lessonId}`}>
                                    <img className='dropMainIcon' src="/assets/images/icons/action_edit_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/edit_icon.png" alt="" />Edit</Link>
                                <Link onClick={() => deleteCall(row.lessonId)} to='' ><img className='dropMainIcon' src="/assets/images/icons/action_delete_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/delete_icon.png" alt="" />Delete</Link>
                                <Link to={`/manage-lesson/viewlesson/${row.lessonId}`}><img className='dropMainIcon' src="/assets/images/icons/action_icon_view.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/view icon.png" alt="" />View</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    // searchFunc
    const searchFunc = async (e) => {
        const resp = await get(e);
        setlessonVal(resp.data.data);
    }

    // delete lesson


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        }
    })
    const deleteCall = async (id) => {
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
                const resp = await deleteLesson(id);
                // console.log(resp)
                setLoafer(false);
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
    return (
        <div className="dashboard-user side_dashboard_container">
            <div className="row">
                <div className="col-md-12">
                    <div className="dashboardHeading setting">
                        <h2>Manage Lessons</h2>
                        <Link className='btn' to="/manage-lesson/add-lessons">Add</Link>
                    </div>
                </div>
            </div>
            <div className="users-table">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Lesson Lists</h2>
                        </div>
                        <div className="user-table-filter">
                            <img src="/assets/images/Filter Icon.png" alt="" />
                            <span className="filter">Filter</span>
                            <input type="text" placeholder='Search' className='inputField' onChange={(e) => searchFunc(e.target.value)} />
                        </div>
                    </div>
                    <div className='user-table-body'>
                        {(loafer ? <DataTable
                            columns={columns}
                            data={lessonVal}
                            customStyles={customStyles}
                            pagination
                        /> : <Loader />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lesson;