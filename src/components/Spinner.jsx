import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Spinner = ({ path = "admin/login" }) => {

    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })

        return () => clearInterval(interval)

    }, [count, navigate, location])

    return (
        <>
            <div className="flex flex-col items-center justify-center" style={{ height: "100vh" }}>
                <div className="spinner"></div>
            </div>
        </>
    );
};

export default Spinner;
