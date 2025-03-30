import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";

export const singup = async (body) => {
  try {
    const res = await axios.post(`${BACKEND_BASE_URL}/register`, body);
    toast.success(res.data.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response.data.message);
    return error;
  }
};
