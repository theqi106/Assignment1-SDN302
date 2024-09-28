import { AxiosError } from "axios";
import AxiosApi from "../config/axios";
import { errorData, FormDataOrOther } from "../constant/constant";

export const API_GET = <T>(url: string): Promise<T> => {
    return AxiosApi.get<T>(url)
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          const error = response.error as AxiosError;
          const x = error.response?.data as errorData;
          throw new Error(x.error || "Input not correct!");
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  export const API_POST = <T>( url: string, data: FormDataOrOther<T>): Promise<T> => {
    return AxiosApi.post<T>(url, data)
      .then((response) => {
        console.log(response);
        if (response.data) {
          return response.data;
        } else {
          const error = response.error as AxiosError;
          const x = error.response?.data as errorData;
          throw new Error(x.error || "Input not correct!");
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  export const API_DELETE = <T>( url: string): Promise<T> => {
    return AxiosApi.delete<T>(url)
      .then((response) => {
        console.log(response);
        if (response.data) {
          return response.data;
        } else {
          const error = response.error as AxiosError;
          const x = error.response?.data as errorData;
          throw new Error(x.error || "Input not correct!");
        }
      })
      .catch((error) => {
        throw error;
      });
  };