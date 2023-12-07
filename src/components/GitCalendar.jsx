import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import { useGetSqlById, useLogin } from "../hooks";

const GitCalendar = () => {
    const endDt = new Date();
    const startDt = new Date();
    startDt.setMonth(startDt.getMonth() - 3);

    useLogin();
    const data = useGetSqlById("calenderdata.php");

    return (
            <div style={{width: "90%", height: "250px"}}>
                <CalendarHeatmap
                    // 表示させる月
                    startDate={startDt}
                    endDate={endDt}
                    values={data}
                    // color
                    classForValue={(value) => {
                        if (!value) {
                            return "color-empty";
                        }
                        return `color-scale-${value.count}`;
                    }}
                    tooltipDataAttrs={(value) => {
                        if (!value || !value.date) {
                            return null;
                        }
                        // react-tooltipの構成
                        return {
                            "data-tip": `${value.date} has count: ${value.count}`,
                        };
                    }}
                />
            <ReactTooltip />
            </div>
    );
};

export default GitCalendar;
