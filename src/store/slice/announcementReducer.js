import { createSlice } from "@reduxjs/toolkit";
import { servicePost } from "../../utils/api";
import { notification } from "antd";

const announcementSlice = createSlice({
    initialState: {
        loading: false,
    },
    name: 'announcement',
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { setLoading } = announcementSlice.actions;
export default announcementSlice.reducer;


export const sendBulkEmail = (email) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        console.log(email)
        const res = await servicePost(`admin/admin/v1/email`, email);
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Email sent successfully', description: message });
            return true;
        } else {
            notification.error({ message: 'Email could not be sent', description: message });
        }
    } catch (error) {
        console.log(error);
        const { response } = error;
        const { data } = response;
        // console.log(data);
        // console.log(response);
        notification.error({ message: 'Email failed', description: data?.data?.message || error.message });
    } finally {
        dispatch(setLoading(false));
    }
}