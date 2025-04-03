import { fetcherInstance } from "@/apiInstances/fetcherInstance";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const login = async (body) => {
  try {
    const res = await fetcherInstance("/login", { method: "POST", body });
    toast.success(res.message);

    Cookies.set("auth_token", res?.data?.accessToken, {
      expires: 7,
      secure: true,
      sameSite: "Lax", // Avoid cross-site issues
    });

    return res;
  } catch (error) {
    return error;
  }
};
