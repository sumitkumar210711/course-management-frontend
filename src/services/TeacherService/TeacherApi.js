import axios from 'axios';

const reactBackendUrl = process.env.REACT_APP_URL;

export const registerTeacher = async(teacherData, token) =>{
    const data = teacherData;
    console.log("token and data",token, data);
    try{
        const res = await axios.post(`${reactBackendUrl}/teachers`,data,{
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

export const fetchTeachers = async(token) =>{
    try{
        const res = await axios.get(`${reactBackendUrl}/get-teachers`,{
            headers: {
                "content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
        });
        console.log("teachers",res.data.data)
        return res.data.data;
    }catch(error){
        throw error;

    }

}