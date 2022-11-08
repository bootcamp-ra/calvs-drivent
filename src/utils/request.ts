import axios from "axios";
import { requestError } from "@/errors";

async function get(url: string) {
  try {
    const result = await axios.get(url);
    return result;
  } catch (error) {
    const {
      status,
      statusText
    } = error.response;

    return requestError(status, statusText);
  }
}

export const request = {
  get,
};

