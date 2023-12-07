import { useEffect, useState, createRef } from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import TranslateSharpIcon from "@mui/icons-material/TranslateSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import Header from "../../components/Header";
import Timer from "../../components/Timer";
import StatBox from "../../components/StatBox";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import GitCalendar from "../../components/GitCalendar";
import { tokens } from "../../theme";
import { baseUrl, useLogin } from "../../hooks";


const Dashboard = () => {
    /*------------------------ログイン確認------------------------*/
    const userData = useLogin();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setFlag(!flag);
    }, [theme.palette.mode]);

    const [rowsCount, setRowsCount] = useState();
    const [charCount, setCharCount] = useState();
    const [time, setTime] = useState("");

    const data = new FormData();
    data.append("userid", userData.id);
    useEffect(() => {
        const memosCount = async () => {
            await axios
                .post(baseUrl + "/api/rowcount.php", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    setRowsCount(() => data[0]["COUNT(*)"]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        memosCount();

        const memosCharCount = async () => {
            await axios
                .post(baseUrl + "/api/charcount.php", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    setCharCount(() => data[0]["sum(CHAR_LENGTH(memo))"]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        memosCharCount();
    }, []);

    useEffect(() => {
        const min2hour = (time) => {
            const hour = Math.floor(time / 60);
            const min = time % 60;
            setTime(() => hour + "h " + min + "m");
        };
        min2hour(rowsCount);
    });

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header
                    title="DASHBOARD"
                    subtitle="Welcome to your dashboard"
                />

            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={rowsCount}
                        subtitle="Memos"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <ArticleIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={charCount}
                        subtitle="Characters"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <TranslateSharpIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={time}
                        subtitle="Time"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <AccessTimeSharpIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Timer isDashboard={true} />
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Monthly
                            </Typography>
                        </Box>
                        <Box></Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex "
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {flag ? (
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            src="userlocal_wordcloud_negate.png"
                            alt=""
                        />
                    ) : (
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            src="userlocal_wordcloud.png"
                            alt=""
                        />
                    )}
                </Box>

                {/* ROW 3 */}
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Percentage of Memo
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <PieChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Calender
                    </Typography>
                    <Box
                        height="250px"
                        mt="-20px"
                        display="flex "
                        justifyContent="center"
                        alignItems="center"
                    >
                        <GitCalendar isDashboard={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
