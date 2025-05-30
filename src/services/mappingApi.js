import axios from "axios";
const reactBackendUrl = process.env.REACT_APP_URL;

export const getCoursesByTeacherId = async (teacherId, token) => {
  const res = await axios.get(`${reactBackendUrl}/teachers/${teacherId}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("res", res);
  return res.data.data;
};

export const getStudentsByTeacherId = async (teacherId, token) => {
  const res = await axios.get(`${reactBackendUrl}/teachers/${teacherId}/students`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("students by teacher id", res);
  return res.data.data;
};

export const getCoursesByStudentId = async (studentId, token) => {
  const res = await axios.get(`${reactBackendUrl}/students/${studentId}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getTeacherByStudentId = async (studentId, token) => {
  const res = await axios.get(`${reactBackendUrl}/students/${studentId}/teacher`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
