import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Container, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { tokens } from "../../theme";
import { API, baseUrl, useLabel, useLogin } from "../../hooks";
import Header from "../../components/Header";

const Upmemo = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const userData = useLogin(); //ログイン確認
    const labels = useLabel(); //label取得
    const [selectLabels, setSelectLabels] = useState([]);

    /*------------------------画像アップ------------------------*/
    const [images, setImages] = useState([]);
    const [memos, setMemos] = useState([]);
    const maxImagesUpload = 20; // 画像を最大4枚まで選択・アップロード
    const inputId = Math.random().toString(32).substring(2);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("userid", userData.id);

        images?.map((image) => {
            data.append("images[]", image);
        });

        for (let i = 0; i < memos.length; i++) {
            const replaceMemo = memos[i].replace(/\n?/g, "");
            data.append("memos[]", replaceMemo);
        }

        for (let i = 0; i < selectLabels.length; i++) {
            data.append("labelids[]", selectLabels[i].id);
        }

        await axios.post(baseUrl + "/api/upimages.php", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setImages([]);
        setMemos([]);
        setSelectLabels([]);
    };

    const handleOnAddImage = async (e) => {
        if (!e.target.files) return;
        setImages((prevImages) => [...prevImages, ...e.target.files]);
        Promise.all(
            [...e.target.files]?.map((file) => {
                const reader = new FileReader();
                // base64に変換
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const baseImage = reader.result.replace(/d.*?,/, "");
                    createMemos(baseImage);
                };
            })
        );
    };

    const handleChangeLabel = async (e, index) => {
        let newSelectLabels = [...selectLabels];
        if (newSelectLabels.length == 0) {
            newSelectLabels = new Array(images.length);
        }
        newSelectLabels.splice(index, 1, e);
        setSelectLabels(newSelectLabels);
    };

    const createMemos = async (baseImage) => {
        const url = API;

        const request = {
            requests: [
                {
                    image: {
                        content: baseImage,
                    },
                    features: [
                        {
                            type: "LABEL_DETECTION",
                            maxResults: 1,
                        },
                        {
                            type: "TEXT_DETECTION",
                            maxResults: 10,
                        },
                    ],
                },
            ],
        };

        try {
            const response = await axios.post(url, request);
            const newMemo = response.data.responses[0].fullTextAnnotation.text;
            setMemos((prevMemo) => [...prevMemo, newMemo]);
        } catch (error) {
            console.error("Error calling the Vision API", error);
            setMemos((prevMemo) => [...prevMemo, null]);
        }
    };

    const handleOnRemoveImageObject = (index) => {
        // 選択した画像は削除可能
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newSelectLabels = [...selectLabels];
        newSelectLabels.splice(index, 1);
        setSelectLabels(newSelectLabels);
    };

    return (
        <Box m="20px">
            <Header title="Up Memo" subtitle="Up Memo " />
            <Box height="75vh">
                <Container>
                    <form action="" onSubmit={(e) => handleOnSubmit(e)}>
                        {/* 1つのボタンで画像を選択する */}
                        <label htmlFor={inputId}>
                            <Button
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                }}
                                variant="contained"
                                disabled={images.length >= maxImagesUpload}
                                component="span"
                            >
                                Select Image
                            </Button>
                            <input
                                id={inputId}
                                type="file"
                                multiple
                                accept="image/*,.png,.jpg,.jpeg,.gif"
                                onChange={(e) => handleOnAddImage(e)}
                                style={{ display: "none" }}
                            />
                        </label>
                        <br />
                        <br />
                        <div className="flex">
                            {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
                            {images?.map((image, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: "relative",
                                        width: "40%",
                                    }}
                                >
                                    <IconButton
                                        aria-label="delete image"
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            left: 10,
                                            color: "#aaa",
                                        }}
                                        onClick={() =>
                                            handleOnRemoveImageObject(i)
                                        }
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                    <Select
                                        options={labels}
                                        onChange={(e) =>
                                            handleChangeLabel(e, i)
                                        }
                                        required
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                boxShadow: "none",
                                                border: "none",
                                                color: "#000000",
                                                width: "100%",
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                color: "#000000",
                                                backgroundColor:
                                                    state.isSelected
                                                        ? "#00AEEC"
                                                        : "inherit",
                                            }),
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <br />
                        <br />
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                            variant="contained"
                            type="submit"
                        >
                            Up Image
                        </Button>
                    </form>
                </Container>
            </Box>
        </Box>
    );
};

export default Upmemo;
