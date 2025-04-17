import { fetcherInstanceAuth } from "@/apiInstances/fetcherInstanceAuth";
import toast from "react-hot-toast";

export const addClient = async (body) => {
  try {
    const res = await fetcherInstanceAuth("/client", { method: "POST", body });
    toast.success(res.message);
    return res;
  } catch (error) {
    toast.error(error?.message);
    return error;
  }
};

export const deleteClient = async (id) => {
  try {
    const res = await fetcherInstanceAuth(`/deleteclient/${id}`, {
      method: "DELETE",
    });
    toast.success(res.message);
    return res;
  } catch (error) {
    toast.error(error?.message);
    return error;
  }
};

export const getClients = async (body) => {
  try {
    const data = await fetcherInstanceAuth("/getclients", { method: "GET" });
    return data;
  } catch (error) {
    return error;
  }
};

export const getSingleClient = async (id) => {
  try {
    const data = await fetcherInstanceAuth(`/getclients/${id}`, {
      method: "GET",
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const editClient = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(`/editclient/${id}`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const addClientTable = async (body) => {
  try {
    const res = await axiosInstanceAuth.post(`/client_table`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getClientTable = async (id, body) => {
  try {
    const res = await fetcherInstanceAuth(`/client_table/${id}`, {
      method: "POST",
      body,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getSingleClientTable = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.post(`/single_month/${id}`, body);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const clientTableDelete = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.delete(
      `/delete_client_table/${id}`,
      body
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const editClientTable = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/update_client_table/${id}`,
      body
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const editClientMonthTable = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/update_client_month_table/${id}`,
      body
    );
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const editClientTablePrice = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/update_client_table_price/${id}`,
      body
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const addJangadsAPi = async (id) => {
  const body = { data: 5 };
  try {
    const res = await axiosInstanceAuth.post(`/create-jangads/${id}`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getJangad = async (id) => {
  try {
    const res = await axiosInstanceAuth.get(`/jangad/${id}`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const jangadTableUpdate = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(`/jangad/${id}`, body);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};
