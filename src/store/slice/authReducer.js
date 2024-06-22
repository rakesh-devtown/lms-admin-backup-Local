import { createSlice } from '@reduxjs/toolkit'
import { serviceGet, servicePost } from '../../utils/api';
import { deleteHeader, setHeader } from '../../utils/header';
import { notification } from 'antd';

const initialState = {
   loading:false,
   token:localStorage.getItem("token") || null,
   chatToken:localStorage.getItem("chatToken") || null,
   user:null,
   isAuthenticated:false,
}

export const authSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    logout: async(state,action) => {
          localStorage.removeItem("token");
          deleteHeader("auth");
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
          return true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const {logout,setLoading,loginFailure,loginSuccess} = authSlice.actions;

export default authSlice.reducer;



export const sendOTPAuth = (email) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    if(email === "") {
      notification.error({ message: 'Login Error', description: 'Email is required' });
      return false;
    }
    const res = await servicePost('auth/auth/v1/login-otp', { email });
    const { message, success } = res;

    if (success) {
      notification.success({ message: 'OTP Sent Successfully' });
      return true;
    } else {
      notification.error({ message: 'Login Error', description: message });
      return false;
    }

  } catch (error) {
    deleteHeader('Authorization');
    notification.error({ message: 'Login Error', description: error.message });
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyOTPAuth = (email,otp) => async (dispatch) => {
  try {
      if(otp === "") {
        notification.error({ message: 'Login Error', description: 'OTP is required' });
        return false;
      }
      dispatch(setLoading(true));
      const res = await servicePost("auth/auth/v1/verify-otp", {
          email,
          otp:parseInt(otp),
          login:true
      },);
      console.log(res);
      const {
          data: { user, userToken },
          message,
          success,
        } = res;
        const token = userToken;
        if (success) {
          notification.success({
            message: "Login Success",
            description: `Hey ${user.name}`,
          });

          localStorage.setItem("token", token);
          setHeader('Authorization', `Bearer ${token}`);
          dispatch(loginSuccess({ token, user }));
          return true;
        } else {
            notification.error({ message: "Login Error", description: message });
            dispatch(loginFailure());
        }
      } catch (error) {
        console.log(error);
        deleteHeader("Authorization");
        notification.error({
          message: "Login Error",
          description: "An error occurred during login",
        });
        dispatch(loginFailure());
        return false;
    }
    finally{
      dispatch(setLoading(false));
    }
  }

export const verifyToken = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const res = await serviceGet(`auth/auth/v1/verify-auth-admin?token=${token}`);
    const { message, success, data } = res;

    if (success) {
      const { user, token } = data;
      setHeader('Authorization', `Bearer ${token}`);
      dispatch(loginSuccess({ user, token: token}));
      return true;
    } else {
      dispatch(logout()); 
    }
    return false;
  } catch (error) {
    deleteHeader('Authorization');
    dispatch(logout());
    return false;
  } finally {
    dispatch(setLoading(false));
  }
}