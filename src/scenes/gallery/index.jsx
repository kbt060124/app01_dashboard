import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box } from "@mui/material";
import { baseUrl, useLabel, useLogin } from "../../hooks";
import Header from "../../components/Header";

const Gallery = () => {
    const userData = useLogin(); //ログイン確認
    const labels = useLabel(); //label取得
    const [images, setImages] = useState([]);

    const handleChangeLabel = async (e) => {
        const data = new FormData();
        data.append("userid", userData.id);
        data.append("labelid", e.id);
        await axios
            .post(baseUrl + "/api/gallery.php", data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                setImages(() => data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header title="GALLERY" subtitle="Your gallery" />
            </Box>
            <Box width="250px" padding="10px 20px">
                <Select
                    options={labels}
                    onChange={(e) => handleChangeLabel(e)}
                    required
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            boxShadow: "none",
                            border: "none",
                            color: "#000000",
                            width: "100%",
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            color: "#000000",
                            backgroundColor: state.isSelected
                                ? "#00AEEC"
                                : "inherit",
                        }),
                    }}
                />
            </Box>

            <ImageGallery
                items={images}
                showNav={false}
                autoPlay={false}
                showFullscreenButton={false}
                useBrowserFullscreen={false}
                showPlayButton={false}
            />
        </Box>
    );
};

export default Gallery;
