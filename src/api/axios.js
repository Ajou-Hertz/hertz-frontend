import axios from "axios";

const BASE_URL = "http://43.203.54.249:8080/api";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// 요청 인터셉터 설정
axios.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰을 가져오기
        const token = localStorage.getItem("token");

        // 토큰이 존재할 경우 요청 헤더에 추가
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // 요청 오류 처리
        return Promise.reject(error);
    }
);

// // export default axios;
// import axios from "axios";

// const BASE_URL = "http://43.203.54.249:8080/api";

// // axiosPrivate는 요청에 헤더를 추가하여 보내는 axios 인스턴스
// const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// // 요청 인터셉터 설정
// axiosPrivate.interceptors.request.use(
//   (config) => {
//     // 로컬 스토리지에서 토큰을 가져오기
//     const token = localStorage.getItem('token');

//     // 토큰이 존재하는지 확인
//     if (token) {
//       // 토큰이 존재하면 요청 헤더에 추가
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.error('토큰이 존재하지 않습니다.');
//     }

//     return config;
//   },
//   (error) => {
//     // 요청 오류 처리
//     return Promise.reject(error);
//   }
// );

// export default axiosPrivate;
