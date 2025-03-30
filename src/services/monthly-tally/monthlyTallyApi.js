import toast from "react-hot-toast";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";

export const addMonthlyTallyTable = async (body) => {
  try {
    const res = await axiosInstanceAuthFormData.post(`/monthly/tally`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getMonthlyTallyTable = async (body) => {
  try {
    const res = await axiosInstanceAuth.get(`/monthly/tally`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const monthlyTallyTableDelete = async (id) => {
  try {
    const res = await axiosInstanceAuth.delete(`/monthly/tally/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const singleMonthlyTallyTable = async (body) => {
  try {
    const res = await axiosInstanceAuth.post(`/monthly/single/tally`, body);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const monthlyTallyTableDataAdd = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/monthly/single/tally/${id}`,
      body
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};
