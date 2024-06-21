import { createSlice, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import { serviceDelete, serviceGet, servicePost } from "../../utils/api";

const courseSlice = createSlice({
    initialState:{
        courses: [],
        currentCourse: null,
        currentSectionItem: null,
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
                    section?.subsections?.sort((a,b)=>a.orderNumber-b.orderNumber);
                    section?.subsections?.forEach(subSection=>{
                        subSection?.sectionItems?.sort((a,b)=>a.orderNumber-b.orderNumber);
                    })
                })
            }
            console.log(sections)
            state.currentCourse = {...course, sections:sections || []};
        },
        setViewCourseNull: (state) => {
            state.currentCourse = null;
        },
        setCurrentSectionItem: (state, action) => {
            state.currentSectionItem = action.payload;
        }
    }
});

export const {setViewCourseNull, setLoading, setCourses, addCourse, setViewCourse, updateCourseState,setCurrentSectionItem } = courseSlice.actions;
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
        dispatch(setViewCourseNull());
        const res = await serviceGet(`admin/admin/v1/curriculum/course?id=${id}`);
        const { message, success,data } = res;
        if (success) {
            dispatch(setViewCourse(data));
        } else {
            //notification.error({ message: 'Course Fetch Failed', description: message });
        }
    } catch (error) {
        console.log(error);
        dispatch(setViewCourseNull());
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

export const createNewModuleOfCourse= (module) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if(!module?.courseId) return false;
        const res = await servicePost(`admin/admin/v1/curriculum/section`, module);
        const { message, success,data } = res;
        if (success) {
            notification.success({ message: 'Module Created', description: message });
            await dispatch(getCurriculumOfCourse(module.courseId));
            return true;
        } else {
            notification.error({ message: 'Module Creation Failed', description: message });
        }
    }catch (error) {
        notification.error({ message: 'Module Creation Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}

export const deleteSection = (sectionId,courseId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if(!sectionId) return false;
        const res = await serviceDelete(`admin/admin/v1/curriculum/section?id=${sectionId}`);
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Section Deleted', description: message });
            await dispatch(getCurriculumOfCourse(courseId));
            return true;
        } else {
            notification.error({ message: 'Section Deletion Failed', description: message });
        }
    }catch (error) {
        notification.error({ message: 'Section Deletion Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}

export const createSubSectionOfSection = (subSection) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if(!subSection?.sectionId) return notification.error({ message: 'SubSection Creation Failed', description: 'Section Id is required' });
        const res = await servicePost(`admin/admin/v1/curriculum/subsection`, subSection);
        const { message, success,data } = res;
        if (success) {
            notification.success({ message: 'SubSection Created', description: message });
            await dispatch(getCurriculumOfCourse(subSection.courseId));
            return true;
        } else {
            notification.error({ message: 'SubSection Creation Failed', description: message });
        }
    }catch (error) {
        notification.error({ message: 'SubSection Creation Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}

export const addSectionItem = (sectionItem) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if(!sectionItem?.sectionId) return notification.error({ message: 'Section Item Creation Failed', description: 'Section Id is required' });
        const res = await servicePost(`admin/admin/v1/curriculum/section-item`, sectionItem);
        const { message, success,data } = res;
        if (success) {
            notification.success({ message: 'New Lecture Created', description: message });
            await dispatch(getCurriculumOfCourse(sectionItem?.courseId));
            return true;
        } else {
            notification.error({ message: 'Section Item Creation Failed', description: message });
        }
    }catch (error) {
        notification.error({ message: 'Section Item Creation Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}


export const deleteSectionItems = (sectionItemId) => async (dispatch,getState) => {
    try {
        dispatch(setLoading(true));
        const state = getState();
        const {currentCourse} = state.course;
        if(!sectionItemId) return notification.error({ message: 'Section Item Deletion Failed', description: 'Section Item Id is required' });
        const res = await serviceDelete(`admin/admin/v1/curriculum/section-item?id=${sectionItemId}`);
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Section Item Deleted', description: message });
            await dispatch(getCurriculumOfCourse(currentCourse?.id));
            return true;
        } else {
            notification.error({ message: 'Section Item Deletion Failed', description: message });
        }
    }catch (error) {
        notification.error({ message: 'Section Item Deletion Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}

export const getSectionItemById = (sectionItemId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setCurrentSectionItem(null));
        const res = await serviceGet(`admin/admin/v1/curriculum/section-item?id=${sectionItemId}`);
        const { message, success,data } = res;
        if (success) {
            dispatch(setCurrentSectionItem(data));
            return true;
        } else {
            notification.error({ message: 'Section Item Fetch Failed', description: message });
        }
    } catch (error) {
        dispatch(setCurrentSectionItem(null));
        notification.error({ message: 'Section Item Fetch Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}

export const addSectionItemData = (sectionItem,sectionItemId) => async (dispatch,getState) => {
    try {
        dispatch(setLoading(true));
        const state = getState();
        const {currentCourse} = state.course;
        if(!sectionItemId) return notification.error({ message: 'Section Item Update Failed', description: 'Section Item Id is required' });
        const res = await servicePost(`admin/admin/v1/curriculum/section-item/edit?id=${sectionItemId}`, sectionItem);
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Lecture Updated', description: message });
            await dispatch(getCurriculumOfCourse(currentCourse?.id));
            return true;
        } else {
            notification.error({ message: 'Lecture Update Failed', description: message });
        }
    }catch (error) {
        notification.error({ message: 'Lecture Update Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}

export const editSection = (section) => async (dispatch,getState) => {
    try {
        dispatch(setLoading(true));
        if(!section?.id) return notification.error({ message: 'Section Update Failed', description: 'Section Id is required' });
        const state = getState();
        const {currentCourse} = state.course;
        const res = await servicePost(`admin/admin/v1/curriculum/section/edit?id=${section.id}`, section);
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Section Updated', description: message });
            await dispatch(getCurriculumOfCourse(currentCourse?.id));
            return true;
        } else {
            notification.error({ message: 'Section Update Failed', description: message });
        }
    }catch (error) {
        notification.error({ message: 'Section Update Failed', description: error.message });
    }finally{
        dispatch(setLoading(false));
    }
}