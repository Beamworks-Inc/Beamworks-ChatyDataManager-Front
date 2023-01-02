import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api/v1",
  withCredentials: true, // // 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타낸다. (기본값: false)
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default api;
