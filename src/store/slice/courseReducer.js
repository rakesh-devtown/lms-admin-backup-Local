import { createSlice, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import { serviceDelete, serviceGet, servicePost } from "../../utils/api";

const courseSlice = createSlice({
    initialState: {
        courses: [],
        currentCourse: null,
        currentSectionItem: null,
        loading: false,
        currentBatchStudents: [],
        currentCourseCertificates: [],
        allStudents: {},
        currentStudent:null
    },
    name: 'course',
    reducers: {
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
            const index = state.courses.findIndex(course => course.id === action.payload.id);
            state.courses[index] = action.payload;
        },
        setViewCourse: (state, action) => {
            let course = action.payload || {};
            const { sections } = course;
            if (sections) {
                sections?.sort((a, b) => a.orderNumber - b.orderNumber);
                sections.forEach(section => {
                    section?.sectionItems?.sort((a, b) => a.orderNumber - b.orderNumber);
                    section?.subsections?.sort((a, b) => a.orderNumber - b.orderNumber);
                    section?.subsections?.forEach(subSection => {
                        subSection?.sectionItems?.sort((a, b) => a.orderNumber - b.orderNumber);
                    })
                })
            }
            console.log(sections)
            state.currentCourse = { ...course, sections: sections || [] };
        },
        setViewCourseNull: (state) => {
            state.currentCourse = null;
        },
        setCurrentSectionItem: (state, action) => {
            state.currentSectionItem = action.payload;
        },
        setCurrentBatchStudents: (state, action) => {
            state.currentBatchStudents = action.payload;
        },
        setAllStudents: (state, action) => {
            state.allStudents = action.payload;
        },
        setCurrentStudent: (state, action) => {
            state.currentStudent = action.payload;
        },
        setCurrentCourseCertificates: (state, action) => {
            state.currentCourseCertificates = action.payload;
        },
        setSectionItemData: (state, action) => {
            const { sectionItemId, sectionItem, sectionId } = action.payload;
            console.log(sectionItem);
            console.log(sectionId);
            console.log(sectionItemId);
            const findIndexOfSection = state.currentCourse?.sections.findIndex(section => section.id === sectionId);
            if (findIndexOfSection !== -1) {
                const findIndexOfSectionItem = state.currentCourse?.sections[findIndexOfSection].sectionItems.findIndex(item => item.id === sectionItemId);
                if (findIndexOfSectionItem !== -1) {
                    state.currentCourse.sections[findIndexOfSection].sectionItems[findIndexOfSectionItem] = sectionItem;
                }
            }
            else {
                let idOfParentSection = null;
                state.currentCourse.sections.forEach(section => {
                    const findIndexOfSubSection = section.subsections.findIndex(subSection => subSection.id === sectionId);
                    if (findIndexOfSubSection !== -1) {
                        const findIndexOfSectionItem = section.subsections[findIndexOfSubSection].sectionItems.findIndex(item => item.id === sectionItemId);
                        if (findIndexOfSectionItem !== -1) {
                            section.subsections[findIndexOfSubSection].sectionItems[findIndexOfSectionItem] = sectionItem;
                            idOfParentSection = section.id;
                        }
                    }
                });
            }
        },
        deleteSectionItemFromSection: (state, action) => {
            const sectionItemId = action.payload;
            const sections = state.currentCourse?.sections;
            sections.forEach(section => {
                const findIndexOfSectionItem = section?.sectionItems.findIndex(item => item.id === sectionItemId);
                if (findIndexOfSectionItem !== -1) {
                    section.sectionItems.filter(item => item.id !== sectionItemId);
                    return;
                }
                section?.subsections.forEach(subSection => {
                    const findIndexOfSectionItem = subSection?.sectionItems.findIndex(item => item.id === sectionItemId);
                    if (findIndexOfSectionItem !== -1) {
                        subSection.sectionItems.splice(findIndexOfSectionItem, 1);
                        return;
                    }
                });
            });

            state.currentCourse = { ...state.currentCourse, sections: sections };
        },
        pushSectionItemInSection: (state, action) => {
            const { sectionId, sectionItem } = action.payload;
            if (!state.currentCourse) return;
            const findIndexOfSection = state.currentCourse?.sections.findIndex(section => section.id === sectionId);
            //console.log(findIndexOfSection);
            if (findIndexOfSection !== -1) {
                state.currentCourse?.sections[findIndexOfSection].sectionItems.push(sectionItem);
                const totalSections = state.currentCourse?.sections.length;
                for (let i = findIndexOfSection + 1; i < totalSections; i += 1) {
                    // state.currentCourse?.sections[i].orderNumber = state.currentCourse?.sections[i].orderNumber + 1;
                    state.currentCourse?.sections[i].sectionItems.forEach(item => {
                        item.orderNumber = item.orderNumber + 1;
                    })
                }

            } else {
                let idOfParentSection = null
                state.currentCourse?.sections.forEach(section => {
                    const findIndexOfSubSection = section?.subsections.findIndex(subSection => subSection.id === sectionId);
                    if (findIndexOfSubSection !== -1) {
                        section?.subsections[findIndexOfSubSection].sectionItems.push(sectionItem);
                        idOfParentSection = section.id
                        const totalSubSections = section?.subsections.length;
                        for (let i = findIndexOfSubSection + 1; i < totalSubSections; i += 1) {
                            //state.currentCourse?.sections[i].orderNumber = state.currentCourse?.sections[i].orderNumber + 1;
                            section?.subsections[i].sectionItems.forEach(item => {
                                item.orderNumber = item.orderNumber + 1;
                            })
                        }
                        return;
                    }
                }); // loop through all sections

                if (idOfParentSection) {
                    const findIndexOfSection = state.currentCourse?.sections.findIndex(section => section.id === idOfParentSection);
                    if (findIndexOfSection !== -1) {
                        const totalSections = state.currentCourse?.sections.length;
                        for (let i = findIndexOfSection + 1; i < totalSections; i += 1) {
                            //state.currentCourse?.sections[i].orderNumber = state.currentCourse?.sections[i].orderNumber + 1;
                            state.currentCourse?.sections[i].subsections.forEach(subSection => {
                                //subSection.orderNumber = subSection.orderNumber + 1;
                                subSection.sectionItems.forEach(item => {
                                    item.orderNumber = item.orderNumber + 1;
                                })
                            })
                        }
                    }

                }
            }

        },

    }
});

export const { setViewCourseNull, setSectionItemData, deleteSectionItemFromSection, setLoading, setCourses, pushSectionItemInSection, addCourse, setViewCourse, updateCourseState, setCurrentSectionItem, setCurrentStudent,setCurrentBatchStudents, setAllStudents, setCurrentCourseCertificates } = courseSlice.actions;
export default courseSlice.reducer;

export const createCourse = (course) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await servicePost('admin/admin/v1/course', course);
        console.log(res);
        const { message, success, data } = res;
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
    } finally {
        dispatch(setLoading(false));
    }
}

export const getCourses = (page, limit, search) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await serviceGet(`admin/admin/v1/course?all=true&offset=${page}&limit=${limit}&search=${search || ''}`);
        const { message, success, data } = res;
        if (success) {
            dispatch(setCourses(data));
        } else {
            //notification.error({ message: 'Course Fetch Failed', description: message });
        }
        dispatch(setLoading(false));
    } catch (error) {
        //notification.error({ message: 'Course Fetch Failed', description: error.message });
        dispatch(setLoading(false));
    } finally {
        dispatch(setLoading(false));

    }
}

export const getCurriculumOfCourse = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setViewCourseNull());
        const res = await serviceGet(`admin/admin/v1/curriculum/course?id=${id}`);
        const { message, success, data } = res;
        if (success) {
            dispatch(setViewCourse(data));
        } else {
            //notification.error({ message: 'Course Fetch Failed', description: message });
        }
    } catch (error) {
        console.log(error);
        dispatch(setViewCourseNull());
        //notification.error({ message: 'Course Fetch Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const updateCourse = (course, courseId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if (!courseId) return false;
        const res = await servicePost(`admin/admin/v1/course/edit?id=${courseId}`, course);
        const { message, success, data } = res;
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
    } finally {
        dispatch(setLoading(false));
    }
}

export const createNewModuleOfCourse = (module) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if (!module?.courseId) return false;
        const res = await servicePost(`admin/admin/v1/curriculum/section`, module);
        const { message, success, data } = res;
        if (success) {
            notification.success({ message: 'Module Created', description: message });
            await dispatch(getCurriculumOfCourse(module.courseId));
            return true;
        } else {
            notification.error({ message: 'Module Creation Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Module Creation Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const deleteSection = (sectionId, courseId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if (!sectionId) return false;
        const res = await serviceDelete(`admin/admin/v1/curriculum/section?id=${sectionId}`);
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Section Deleted', description: message });
            await dispatch(getCurriculumOfCourse(courseId));
            return true;
        } else {
            notification.error({ message: 'Section Deletion Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Section Deletion Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const createSubSectionOfSection = (subSection) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        if (!subSection?.sectionId) return notification.error({ message: 'SubSection Creation Failed', description: 'Section Id is required' });
        const res = await servicePost(`admin/admin/v1/curriculum/subsection`, subSection);
        const { message, success, data } = res;
        if (success) {
            notification.success({ message: 'SubSection Created', description: message });
            await dispatch(getCurriculumOfCourse(subSection.courseId));
            return true;
        } else {
            notification.error({ message: 'SubSection Creation Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'SubSection Creation Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const addSectionItem = (sectionItem) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        if (!sectionItem?.sectionId) return notification.error({ message: 'Section Item Creation Failed', description: 'Section Id is required' });
        const res = await servicePost(`admin/admin/v1/curriculum/section-item`, sectionItem);
        const { message, success, data } = res;
        if (success) {
            notification.success({ message: 'New Lecture Created', description: message });
            await dispatch(pushSectionItemInSection({ sectionId: sectionItem.sectionId, sectionItem: data }));
            //await dispatch(getCurriculumOfCourse(sectionItem?.courseId));]
            return true;
        } else {
            notification.error({ message: 'Section Item Creation Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Section Item Creation Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}


export const deleteSectionItems = (sectionItemId) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const state = getState();
        const { currentCourse } = state.course;
        if (!sectionItemId) return notification.error({ message: 'Section Item Deletion Failed', description: 'Section Item Id is required' });
        const res = await serviceDelete(`admin/admin/v1/curriculum/section-item?id=${sectionItemId}`);
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Section Item Deleted', description: message });
            await dispatch(deleteSectionItemFromSection(sectionItemId));
            // await dispatch(getCurriculumOfCourse(currentCourse?.id));
            return true;
        } else {
            notification.error({ message: 'Section Item Deletion Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Section Item Deletion Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const getSectionItemById = (sectionItemId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setCurrentSectionItem(null));
        const res = await serviceGet(`admin/admin/v1/curriculum/section-item?id=${sectionItemId}`);
        const { message, success, data } = res;
        if (success) {
            dispatch(setCurrentSectionItem(data));
            return true;
        } else {
            notification.error({ message: 'Section Item Fetch Failed', description: message });
        }
    } catch (error) {
        dispatch(setCurrentSectionItem(null));
        notification.error({ message: 'Section Item Fetch Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const addSectionItemData = (sectionItem, sectionItemId) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const state = getState();
        const { currentCourse } = state.course;
        if (!sectionItemId) return notification.error({ message: 'Section Item Update Failed', description: 'Section Item Id is required' });
        const res = await servicePost(`admin/admin/v1/curriculum/section-item/edit?id=${sectionItemId}`, sectionItem);
        const { message, success, data } = res;
        if (success) {
            notification.success({ message: 'Lecture Updated', description: message });
            await dispatch(setSectionItemData({ sectionItemId: data.id, sectionItem: data, sectionId: data.sectionId }));
            //await dispatch(getCurriculumOfCourse(currentCourse?.id));
            return true;
        } else {
            notification.error({ message: 'Lecture Update Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Lecture Update Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const editSection = (section) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        if (!section?.id) return notification.error({ message: 'Section Update Failed', description: 'Section Id is required' });
        const state = getState();
        const { currentCourse } = state.course;
        const res = await servicePost(`admin/admin/v1/curriculum/section/edit?id=${section.id}`, section);
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Section Updated', description: message });
            await dispatch(getCurriculumOfCourse(currentCourse?.id));
            return true;
        } else {
            notification.error({ message: 'Section Update Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Section Update Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const addStudentToBatch = (students) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await servicePost(`admin/admin/v1/student/batch/student`, {
            students: students
        });
        const { message, success } = res;
        if (success) {
            notification.success({ message: 'Students Added', description: message });
            return true;
        } else {
            notification.error({ message: 'Student Addition Failed', description: message });
        }
    } catch (error) {
        console.log(error);
        const { response } = error;
        const { data } = response;
        // console.log(data);
        // console.log(response);
        notification.error({ message: 'Student Addition Failed', description: data?.data?.message || error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const getBatchEnrolledStudents = (batchId, page, limit, search) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await serviceGet(`admin/admin/v1/student/batch/enrollments?id=${batchId}&page=${page}&limit=${limit}&search=${search || ''}`);
        const { message, success, data } = res;
        if (success) {
            dispatch(setCurrentBatchStudents(data));
        } else {
            notification.error({ message: 'Student Fetch Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Student Fetch Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}
export const getAllEnrolledStudents = (page, limit, search) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await serviceGet(`admin/admin/v1/student/student?all=true&limit=${limit}&page=${page}&search=${search || ''}`);
        const { message, success, data } = res;
        if (success) {
            dispatch(setAllStudents(data));
        } else {
            notification.error({ message: 'Student Fetch Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Student Fetch Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const getStudentById = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await serviceGet(`admin/admin/v1/student/student/${id}`);
        const { message, success, data } = res;
        console.log(res);
        if (success) {
            dispatch(setCurrentStudent(data));
        } else {
            notification.error({ message: 'Student Fetch Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Student Fetch Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const getAllCertificatesOfCourse = (courseId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await serviceGet(`admin/admin/v1/certificate?courseId=${courseId}`);
        const { message, success, data } = res;
        if (success) {
            dispatch(setCurrentCourseCertificates(data));
            
        } else {
            notification.error({ message: 'Certificate Fetch Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Certificate Fetch Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const createCertificateTemplate = (certificate) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await servicePost(`admin/admin/v1/certificate/create`, certificate);
        const { message, success, data } = res;
        if (success) {
            notification.success({ message: 'Certificate Template Created', description: message });
            await dispatch(getAllCertificatesOfCourse(certificate?.courseId));
            return true;
        } else {
            notification.error({ message: 'Certificate Creation Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Certificate Creation Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}

export const deleteCertificateTemplate = (certificateId, courseId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await servicePost(`admin/admin/v1/certificate/delete?certificateId=${certificateId}`);
        const { message, success, data } = res;
        if (success) {
            notification.success({ message: 'Certificate Template Deleted', description: message });
            await dispatch(getAllCertificatesOfCourse(courseId));
            return true;
        } else {
            notification.error({ message: 'Certificate Deletion Failed', description: message });
        }
    } catch (error) {
        notification.error({ message: 'Certificate Deletion Failed', description: error.message });
    } finally {
        dispatch(setLoading(false));
    }
}