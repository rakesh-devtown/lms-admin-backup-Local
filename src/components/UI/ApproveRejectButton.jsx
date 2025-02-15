import { useState } from 'react'
import { X, Check } from 'lucide-react';
import { requestStatus } from '../../store/slice/requestReducer';
import { useSelector, useDispatch } from 'react-redux';
const ApproveRejectButton = ({ id }) => {

    const [status, setStatus] = useState(null);
    const [hover, setHover] = useState(false);
    const { shrunk, setShrunk } = useState(false);
    const dispatch = useDispatch();

    const { loading, requests } = useSelector(state => state.request);

    if (status === 'approved') {
        return <span className="text-green-600 font-semibold">Approved</span>;
    }

    if (status === 'rejected') {
        return <span className="text-red-600 font-semibold">Rejected</span>;
    }
    return (
        <div className="flex space-x-2">
            <button
                className="text-green-600 flex items-center border border-[#328801] rounded px-2 py-1 hover:bg-[#328801] hover:text-white"
                onClick={
                    requestStatus(id, {
                        status: 'approved',
                        adminRemark: 'okay'
                    })
                }
            >
                <Check size={16} className='' /> {hover ? '' : 'Approve'}
            </button>
            {hover ? (
                <button
                    className="text-white bg-red-600 border flex items-center border-red-600 rounded px-3 py-1"
                    onClick={() => {
                        requestStatus(id, {
                            status: 'rejected',
                            adminRemark: 'okay'
                        })
                    }} onMouseLeave={() => {
                        setHover(false)
                        setShrunk(false)
                    }
                    }
                >
                    <X size={16} className='mr-1 text-white' /> Reject
                </button>
            ) : (
                <div
                    className="border items-center flex bg-red-600 border-red-600 rounded px-1 py-1 text-red-600"
                    onMouseEnter={() => {
                        setHover(true)
                        setShrunk(true)
                    }}
                >
                    <X size={17} className='text-white' />
                </div>
            )}
        </div>)
}

export default ApproveRejectButton