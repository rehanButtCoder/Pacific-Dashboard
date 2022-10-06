import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Loader from '../component/Loader';
import { getPayments } from '../Services/Payment';

const Payment = () => {

    // const [val, setVal] = useState(false)
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
            name: 'Payment ID',
            selector: row => row.transactionNumber,
            // width : '335px',

        },
        {
            name: 'Amount',
            selector: row => row.payment,
            // width : '20%',

        },
        {
            name: 'Date',
            selector: row => row.createdOn,
            // width : '20%',

        },
        {
            name: 'Status',
            button: true,
            cell: (row) => (<div> {
                row.response === "Success" ? (<div className='user-item circle'>
                    <p>{row.response}</p>
                </div>
                ) : (<div className='user-item circleGreen'>
                    <p>{row.response}</p>
                </div>)
            }
            </div>
            )


        }
    ];

    const [loder, setLoder] = useState(false)

    const [paymentdata, setPaymentData] = useState([])
    const getPayment = async () => {
        const resp = await getPayments("");
        setPaymentData(resp.data.data)
        setLoder(true)
    }

    useEffect(() => {
        getPayment()
    }, [loder])

    // search
    const searchFunc = async (e) => {
        const resp = await getPayments(e);
        setPaymentData(resp.data.data);
    }

    return (
        <div className="dashboard-user side_dashboard_container">
            <div className="row">
                <div className="col-md-12">
                    <div className="dashboardHeading setting">
                        <h2>Manage Payment</h2>
                    </div>
                </div>
            </div>
            <div className="users-table">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Payment Lists</h2>
                        </div>
                        <div className="user-table-filter">
                            <img src="/assets/images/Filter Icon.png" alt="" />
                            <span className="filter">Filter</span>
                            <input type="text" placeholder='Search' className='inputField' onChange={(e) => searchFunc(e.target.value)} />
                        </div>
                    </div>
                    <div className='user-table-body'>
                        {loder ? <DataTable
                            columns={columns}
                            data={paymentdata}
                            customStyles={customStyles}
                            pagination
                        /> : <Loader />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;