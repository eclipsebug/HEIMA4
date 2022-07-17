import axios from "axios";

export const getDiscount = () => {
  return axios({
    url: "https://systemjs.1688.com/krump/schema/1352.json",
  });
};
