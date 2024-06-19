import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { serviceGet, servicePost } from "../../utils/api";

const courseSlice = createSlice({
    initialState:{
        courses: [],
        loading: false,
    },
    name:'course',
    reducers:{
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        addCourse: (state, action) => {
            console.log(action.payload);
            state.courses.push(action.payload);
        }
    }
});

export const { setLoading, setCourses, addCourse } = courseSlice.actions;
export default courseSlice.reducer;

export const createCourse = (course) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await servicePost('admin/admin/v1/course', course);
        console.log(res);
        const { message, success,data } = res;
        if (success) {
            notification.success({ message: 'Course Created', description: message });
            dispatch(addCourse(data));
            return true;
        } else {
            notification.error({ message: 'Course Creation Failed', description: message });
        }
        dispatch(setLoading(false));
    } catch (error) {
        notification.error({ message: 'Course Creation Failed', description: error.message });
        dispatch(setLoading(false));
    }finally{
        dispatch(setLoading(false));
    }
}

export const getCourses = (page,limit,search) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await serviceGet(`admin/admin/v1/course?all=true&offset=${page}&limit=${limit}&search=${search || ''}`);
        const { message, success,data } = res;
        if (success) {
            dispatch(setCourses(data));
        } else {
            //notification.error({ message: 'Course Fetch Failed', description: message });
        }
        dispatch(setLoading(false));
    } catch (error) {
        //notification.error({ message: 'Course Fetch Failed', description: error.message });
        dispatch(setLoading(false));
    }
}