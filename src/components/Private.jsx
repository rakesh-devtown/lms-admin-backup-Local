import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Spinner from "../components/Spinner"
import Layout from '../components/Layout';
const PrivateRoute = () => {
    const [isAuthorized, setIsAuthorized] = useState(true);

    //   useEffect(() => {
    //     const checkAuthorization = async () => {
    //       const token = Cookies.get('auth');

    //       if (token) {
    //         try {
    //           const response = await verifyToken(token);
    //           if(response?.data?.success)
    //           {
    //             setIsAuthorized(true);
    //           }
    //         } catch (error) {
    //           console.error('Error decoding token:', error);
    //           setIsAuthorized(false);
    //         }
    //       } else {
    //         setIsAuthorized(false);
    //       }
    //     };

    //     checkAuthorization();
    //   }, []);

    //   return isAuthorized === true ? <Layout /> : <Spinner />;
    return <Layout />
};

export default PrivateRoute;
