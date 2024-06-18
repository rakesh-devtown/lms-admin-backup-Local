import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import Spinner from './Loader/Spinner';
const PrivateRoute = () => {

    const {isAuthenticated} = useSelector(state => state.auth);
    const {loading} = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuthenticated && !loading){
            navigate('/admin/login')
        }
    },[isAuthenticated])

    return (
        <>
            {loading && <Spinner large/>}
            {isAuthenticated ? <Layout><Outlet /></Layout> : 
                loading ? <></> : <div>
                    
                </div>
            }
        </>
    )
};

export default PrivateRoute;
