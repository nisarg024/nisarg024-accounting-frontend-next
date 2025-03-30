import toast from "react-hot-toast";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";

export const addJobwork = async (body) => {
  try {
    const res = await axiosInstanceAuthFormData.post(`/jobwork`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getJobworks = async (body) => {
  try {
    const res = await axiosInstanceAuth.get(`/get_jobworks`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const deleteJobwork = async (id) => {
  try {
    const res = await axiosInstanceAuth.delete(`/delete_jobwork/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getSingleJobwork = async (id) => {
  try {
    const res = await axiosInstanceAuth.get(`/get_jobwork/${id}`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const editJobwork = async (id, body) => {
  try {
    const res = await axiosInstanceAuthFormData.patch(
      `/edite_jobwork/${id}`,
      body
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

// table data
export const addJobworkTable = async (body) => {
  try {
    const res = await axiosInstanceAuth.post(`/jobwork_table`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getJobworkTable = async (id) => {
  try {
    const res = await axiosInstanceAuth.get(`/jobwork_table/${id}`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const jobworkTableDelete = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.delete(
      `/delete_jobwork_table/${id}`,
      body
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const updateJobworkMonthPrice = async (id, body, boolean) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/update_jobwork_table_price/${id}`,
      body
    );
    if (boolean) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const editJobworkTable = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/update_jobwork_table/${id}`,
      body
    );
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};
