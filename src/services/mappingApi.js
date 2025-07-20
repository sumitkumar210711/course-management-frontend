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
   console.log("Teachers by Student Id", res);
  return res.data.data;
};


export const assignCourseToStudent = async (studentId, courseIds, token) => {
  const data = {
    studentId: studentId,
    courseIds: courseIds, // array of course IDs
  };
  try {
    const res = await axios.post(
      `${reactBackendUrl}/student/assign-courses`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
