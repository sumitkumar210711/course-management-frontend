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