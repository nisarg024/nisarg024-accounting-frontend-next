import { fetcherInstance } from "@/apiInstances/fetcherInstance";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const login = async (body) => {
  try {
    const res = await fetcherInstance("/login", { method: "POST", body });
    toast.success(res.message);
    Cookies.set("auth_token", res?.data?.accessToken, {
      expires: 10000,
      secure: true,
      sameSite: "none",
    });

    return res;
  } catch (error) {
    return error;
  }
};
