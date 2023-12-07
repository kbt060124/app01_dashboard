import axios from "axios";
import { baseUrl } from "../../hooks";


export const Logout = () => {
    axios
        .post(baseUrl + "/api/logout.php")
        .then(() => {
            sessionStorage.clear();
            window.location.href = "/login";
        })
        .catch((error) => {
            console.error(error);
        });
}
