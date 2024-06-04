import { createSlice } from '@reduxjs/toolkit'
import { servicePost } from '../../utils/api';
import { deleteHeader, setHeader } from '../../utils/header';

const initialState = {
   token:localStorage.getItem("token") || null,
   chatToken:localStorage.getItem("chatToken") || null,
   user:null,
   isAuthenticated:false,
}

export const authSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    loginViaCredential: async(state, action) => {
      try {
        const email = action.payload.email;
        const password = action.payload.password;
        
        const res = await servicePost("auth/auth/v1/adminLogin", {
            email,
            password,
        },);
        const {
          data: { user, token },
          message,
          success,
        } = res;

        if (success) {
          state.token = token;
          state.user = user;
          notification.success({
            message: "Login Success",
            description: `Hey ${user.name}`,
          });

          localStorage.setItem("token", token);
          localStorage.setItem("chatToken", chatToken);
          setHeader("auth", `bearer ${token}`);
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
          //state.chatToken = chatToken;
        } else {
            notification.error({ message: "Login Error", description: message });
            state.token = null;
            state.isAuthenticated = false;
        }
      } catch (error) {
        deleteHeader("auth");
        notification.error({
          message: "Login Error",
          description: "An error occurred during login",
        });
        state.token = null;
        state.isAuthenticated = false;
      }
    },
    sendOTPAuth: async(state, action) => {
        try {
            const email = action.payload.email;         
            const res = await servicePost("auth/auth/v1/admin-otp-login", {
                email,
            },);
            const {
              message,
              success,
            } = res;
    
            if (success) {
              notification.success({
                message: "OTP, Sent Successfully",
              });
            } else {
                notification.error({ message: "Login Error", description: message });
                state.token = null;
                state.isAuthenticated = false;
            }
          } catch (error) {
            deleteHeader("auth");
            notification.error({ message: "Login Error", description: message });
            state.token = null;
            state.isAuthenticated = false;
          }
    },  
    verifyOTPAuth: async(state, action) => {
        try {
            const otp = action.payload.otp;
            const email = action.payload.email; 
            const res = await servicePost("auth/auth/v1/admin-otp-verify", {
                email,
                otp,
            },);
            const {
                data: { user, token },
                message,
                success,
              } = res;
      
              if (success) {
                state.token = token;
                state.user = user;
                notification.success({
                  message: "Login Success",
                  description: `Hey ${user.name}`,
                });
      
                localStorage.setItem("token", token);
                localStorage.setItem("chatToken", chatToken);
                setHeader("auth", `bearer ${token}`);
                state.token = token;
                state.user = user;
                state.isAuthenticated = true;
                //state.chatToken = chatToken;
              } else {
                  notification.error({ message: "Login Error", description: message });
                  state.token = null;
                  state.isAuthenticated = false;
              }
            } catch (error) {
              deleteHeader("auth");
              notification.error({
                message: "Login Error",
                description: "An error occurred during login",
              });
              state.token = null;
              state.isAuthenticated = false;
        }
    },
    loadUser: async (state, action) => {
        try {
          const tokenn = localStorage.getItem("token");
          if(tokenn === null) {
            return false;
          }
          const {
            data: { user, token, chatToken },
            message,
            success,
          } = await serviceGet(
            `auth/auth/v1/verify-auth?token=${tokenn}`
          );
          if (success) {
            setHeader("auth", `bearer ${token}`);
            localStorage.setItem("token", token);
            localStorage.setItem("chatToken", chatToken)
            setHeader("auth", `bearer ${token}`);
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
            return success; 
            } else {
                state.token = null;
                state.isAuthenticated = false;
                return false;
            }
        } catch (error) {
            deleteHeader("auth");
            state.token = null;
            state.isAuthenticated = false;
            return false;
     }
    },
    logout: async(state,action) => {
          localStorage.removeItem("token");
          deleteHeader("auth");
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
          return true;
      },
  },
})

// Action creators are generated for each case reducer function
export const { initializeDetails } = authSlice.actions;

export default authSlice.reducer;