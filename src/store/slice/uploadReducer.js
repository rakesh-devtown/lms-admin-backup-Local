import { createSlice } from "@reduxjs/toolkit";
import { serviceGet } from "../../utils/api";
import { notification } from "antd";

const uploadSlice = createSlice({
    initialState: {
        uploadLoading: false,
        uploadData: {
            url: ''
        },
    },
    name: 'upload',
    reducers: {
        setLoading: (state, action) => {
            state.uploadLoading = action.payload;
        },
        setUploadData: (state, action) => {
            state.uploadData = action.payload;
        },
    }
});

export const { setLoading, setUploadData } = uploadSlice.actions;
export default uploadSlice.reducer;

export const uploadFile = (file, type, path) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const extension = file.type.split('/')[1];
        const { data } = await serviceGet(`admin/admin/upload/url?type=.${extension}&path=${path}`);
        const url = data.url;
        const key = url.split('?')[0];
        const res = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type
            }
        }); // PUT request to upload file
        if (res.ok) {
            dispatch(setUploadData({ url: key }));
            return key
        }
        else {
            notification.error({ message: 'Upload Failed', description: 'Failed to upload file' });
            return false;
        }
    } catch (error) {
        console.log(error);
        notification.error({ message: 'Upload Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
};