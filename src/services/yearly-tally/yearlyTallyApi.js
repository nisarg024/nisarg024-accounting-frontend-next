import toast from "react-hot-toast";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";

export const addYearlyTallyTable = async (body) => {
  try {
    const res = await axiosInstanceAuth.post(`/yearlytally`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getYearlyTallyTable = async () => {
  try {
    const res = await axiosInstanceAuth.get("/yearlytally");
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const deleteYearlyTallyTable = async (id) => {
  try {
    const res = await axiosInstanceAuth.delete(`/yearlytally/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getYearlyTallyClientInfo = async (id, client_id) => {
  try {
    const res = await axiosInstanceAuth.get(`/yearlytally/${id}/${client_id}`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};
