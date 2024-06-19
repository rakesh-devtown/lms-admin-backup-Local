import { createSlice, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import { serviceGet, servicePost } from "../../utils/api";

const courseSlice = createSlice({
    initialState:{
        courses: [],
        currentCourse: null,
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
        },
        updateCourseState: (state, action) => {
            const index = state.courses.findIndex(course=>course.id === action.payload.id);
            state.courses[index] = action.payload;
        },
        setViewCourse: (state, action) => {
            let course = action.payload || {};
            const {sections} = course;
            if(sections){
                sections?.sort((a,b)=>a.orderNumber-b.orderNumber);
                sections.forEach(section=>{
                    section?.sectionItems?.sort((a,b)=>a.orderNumber-b.orderNumber);
                })
            }
            state.currentCourse = {...course, sections:sections || []};
        }
    }
});

export const { setLoading, setCourses, addCourse, setViewCourse, updateCourseState } = courseSlice.actions;
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
    }finally{
        dispatch(setLoading(false));
    
    }
}

export const getCurriculumOfCourse = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await serviceGet(`admin/admin/v1/curriculum/course?id=${id}`);
        const { message, success,data } = res;
        if (success) {
            dispatch(setViewCourse(data));
        } else {
            //notification.error({ message: 'Course Fetch Failed', description: message });
        }
    } catch (error) {
        console.log(error);
        //notification.error({ message: 'Course Fetch Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}

export const updateCourse = (course,courseId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if(!courseId) return false;
        const res = await servicePost(`admin/admin/v1/course/edit?id=${courseId}`, course);
        const { message, success,data } = res;
        if (success) {
            notification.success({ message: 'Course Updated', description: message });
            dispatch(updateCourseState(data));
            return true;
        } else {
            notification.error({ message: 'Course Update Failed', description: message });
        }
       // dispatch(setLoading(false));
    } catch (error) {
        notification.error({ message: 'Course Update Failed', description: error.message });
        //dispatch(setLoading(false));
    }finally{
        dispatch(setLoading(false));
    }
}