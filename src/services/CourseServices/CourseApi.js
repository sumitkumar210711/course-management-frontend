import axios from 'axios';

const reactBackendUrl = process.env.REACT_APP_URL;

export const addEditCourse = async(courseData, token) =>{
    const data = courseData;
    console.log("token and data",token, data);
    try{
        const res = await axios.post(`${reactBackendUrl}/courses`,data,{
            headers: {
                "content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
        });
        return res;
    }catch(error){
        throw error;

    }

}

export const fetchCourses = async(token) =>{
    try{
        const res = await axios.get(`${reactBackendUrl}/view-courses`,{
            headers: {
                "content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
        });
        console.log("response",res);
        console.log("courses fetched from the backend",res.data.data)
        return res.data.data;
    }catch(error){
        throw error;

    }

}