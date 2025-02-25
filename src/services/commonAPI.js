import axios from "axios";

export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {  
  console.log("common api",reqHeader);
  
  const reqConfig = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
  };

  return await axios(reqConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
