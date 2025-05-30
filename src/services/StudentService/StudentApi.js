import axios from 'axios';

const reactBackendUrl = process.env.REACT_APP_URL;

export const registerStudent = async(studentData, token) =>{
    const data = studentData;
    console.log("token and data",token, data);
    try{
        const res = await axios.post(`${reactBackendUrl}/students`,data,{
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

export const fetchStudent = async(token) =>{
    try{
        const res = await axios.get(`${reactBackendUrl}/get-students`,{
            headers: {
                "content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
        });
        console.log(res);
        return res.data.data;
    }catch(error){
        throw error;

    }

}


export const assignTeacherToStudents = async (id,data, token) => {
    console.log("data",id,data);
  const res = await axios.post(`${reactBackendUrl}/teachers/${id}/assign-students`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
