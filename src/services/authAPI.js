import axios from 'axios';
const reactBackendUrl = process.env.REACT_APP_URL;
console.log("url", reactBackendUrl);

export const registration = async(emailId, password) =>{
    const data = {
        email:emailId,
        password:password
    }
    console.log("Data to be logged in ", data);
    try{
        const res = await axios.post(`${reactBackendUrl}/auth/login`,data,{
            headers: {
                "content-Type":"application/json"
            },
        });
        return res;
    }catch(error){
        throw error;

    }

}