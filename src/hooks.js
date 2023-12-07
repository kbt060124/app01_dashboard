import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// export const baseUrl =
//     "http://localhost/00_GS/01_assignment/11_php_championship";
export const baseUrl = "https://kkgsacademy.sakura.ne.jp/gs10_php4";

export const API = ``;

export const useLogin = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("loggedIn");
        if (!loggedIn) {
            navigate("/login");
        }
    }, [navigate]);
    return userData;
};

export const useLabel = () => {
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        const getLabels = async () => {
            await axios(baseUrl + "/api/labels.php")
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    setLabels(() => data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getLabels();
    }, []);

    return labels;
};

export const useGetSqlById = (php) => {
    const [data, setData] = useState([]);
    const params = new FormData();
    params.append("userid", useLogin().id);

    useEffect(() => {
        const getSql = async () => {
            await axios
                .post(baseUrl + "/api/" + php, params, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    return res.data;
                })
                .then((params) => {
                    setData(() => params);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getSql();
    }, []);

    return data;
};
