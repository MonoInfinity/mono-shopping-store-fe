import * as React from "react";
import { Line } from "@ant-design/charts";

const DemoLine: React.FC = () => {
        const [data, setData] = React.useState([]);
        React.useEffect(() => {
                asyncFetch();
                console.log(data);
        }, []);
        const asyncFetch = () => {
                fetch("https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json")
                        .then((response) => response.json())
                        .then((json) => setData(json))
                        .catch((error) => {
                                console.log("fetch data failed", error);
                        });
        };
        var config = {
                data: [
                        { month: "01/2020", value: 6000000, category: "sale" },
                        { month: "02/2020", value: 7003000, category: "sale" },
                        { month: "03/2020", value: 2450000, category: "sale" },
                        { month: "04/2020", value: 13000000, category: "sale" },
                        { month: "05/2020", value: 5400000, category: "sale" },
                ],
                xField: "month",
                yField: "value",
                seriesField: "category",
                yAxis: {
                        label: {
                                formatter: function formatter(v: string) {
                                        return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                                                return "".concat(s, ",");
                                        });
                                },
                        },
                },
                color: ["#1979C9", "#D62A0D", "#FAA219"],
        };
        return <Line {...config} />;
};

export default DemoLine;
