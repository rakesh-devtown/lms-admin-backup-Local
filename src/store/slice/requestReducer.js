import { createSlice, current } from "@reduxjs/toolkit";
import { serviceGet, servicePost } from "../../utils/api";
import { notification } from "antd";

const requestSlice = createSlice({
    initialState: {
        requests: [],
        loading: false,
        currentRequest: null
    },
    name: 'request',
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setRequests: (state, action) => {
            state.requests = action.payload;
        },
        requestAction: (state, action) => {
            const { id, status } = action.payload
            state.requests.response.map((req) => {
                if (req.id === id) {
                    req.status = status
                }
            })
        }

    }
});

export const { setLoading, setRequests, requestAction } = requestSlice.actions;
export default requestSlice.reducer;

export const getRequests = (page, limit) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await serviceGet(`admin/admin/v1/certificate/pending-requests?page=${page}&limit=${limit}`);
        const { message, success, data } = res;
        if (success) {
            dispatch(setRequests(data));
        } else {
            notification.error({ message: 'Requests Fetch Failed', description: message });
        }
        dispatch(setLoading(false));

    } catch (error) {
        console.log(error);
        notification.error({ message: 'Action Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
};

export const requestStatus = (id, request) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if (!id) return false;
        const res = await servicePost(`admin/admin/v1/certificate/approve?id=${id}`, request);
        const { message, success, data } = res;
        if (success) {
            notification.success({ message: 'Request Action successful', description: message });
            await dispatch(requestAction({ id: id, status: request.status }));
        } else {
            notification.error({ message: 'Request Action Failed', description: message });
        }
        dispatch(setLoading(false));

    } catch (error) {
        console.log(error);
        notification.error({ message: 'Action Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}