import toast from "react-hot-toast";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";

export const addEmployee = async (body) => {
  try {
    const res = await axiosInstanceAuthFormData.post(`/employee`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const editEmployee = async (id, body) => {
  try {
    const res = await axiosInstanceAuthFormData.patch(
      `/editEmployee/${id}`,
      body
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const res = await axiosInstanceAuth.delete(`/deleteemployee/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const deleteImg = async (imgUrl) => {
  try {
    const res = await axiosInstanceAuth.delete(`/image`, {
      data: { img_url: imgUrl },
    });
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getEmployees = async (body) => {
  try {
    const res = await axiosInstanceAuth.get(`/getemployees`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const getSingleEmployees = async (id) => {
  try {
    const res = await axiosInstanceAuth.get(`/getemployee/${id}`);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const getCategory = async (body) => {
  try {
    const res = await axiosInstanceAuth.get(`/category`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const addCategory = async (body) => {
  try {
    const res = await axiosInstanceAuth.post(`/category`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const updateCategory = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(`/category/${id}`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const deleteCategory = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.delete(`/employee_category/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

// table data
export const addEmployeeTable = async (body) => {
  try {
    const res = await axiosInstanceAuth.post(`/employee_table`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const addColumn = async (body) => {
  try {
    const res = await axiosInstanceAuth.post(`/employee_table/column`, body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const deleteColumn = async (body) => {
  try {
    const res = await axiosInstanceAuth.delete(`/employee_table/column`, {
      data: body,
    });
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const getEmployeeTable = async (id) => {
  try {
    const res = await axiosInstanceAuth.get(`/employee_table/${id}`);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const employeeTableDelete = async (id) => {
  try {
    const res = await axiosInstanceAuth.delete(`/delete_employee_table/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const editEmployeeTable = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/update_employee_table/${id}`,
      body
    );
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};

export const editEmployeeMonthTable = async (id, body, boolean) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/update_employee_month_table/${id}`,
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

export const editEmployeeTablePrice = async (id, body) => {
  try {
    const res = await axiosInstanceAuth.patch(
      `/update_employeet_table_price/${id}`,
      body
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error?.response;
  }
};
