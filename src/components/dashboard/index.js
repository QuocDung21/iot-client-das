"use client";

import Card from "../card";
import {FaUsers} from "react-icons/fa";
import {MdOutlineProductionQuantityLimits} from "react-icons/md";
import ReactApexChart from 'react-apexcharts';
import Image from 'next/image'
import useSWR from 'swr'
import {useState} from "react";

async function getEsp() {
    const res = await fetch(`http://localhost:3000/api/esp?lmit=12`, {
        method: "GET",
        cache: "no-store",
    });
    const data = await res.json();
    console.log("Fetching.....")
    return data.data;
}

async function getHome() {
    const res = await fetch("http://localhost:3000/api/home", {
        method: "GET",
        cache: "no-store",
    });
    const data = await res.json();
    return data.data;
}

export default function DashboardLayout({allVisitors, allProducts}) {
    const {data, error, isLoading, mutate} = useSWR('/api/esp', getEsp, {
        revalidateOnReconnect: true,
        refreshInterval: 4000
    });
    const last24Hours = data?.time
    const temperatureData = {
        series: [
            {
                name: 'Nhiệt độ',
                data: data?.temp,
            },
        ],
        options: {
            chart: {
                id: 'temperature-chart',
                zoom: {
                    enabled: false,
                },
            },
            xaxis: {
                categories: last24Hours,
            },
        },
    };


    // Chart
    const humidityColumnData = {
        series: [
            {
                name: 'Độ ẩm',
                data: data?.humi,
            },
        ],
        options: {
            chart: {
                id: 'humidity-column-chart',
                type: 'bar',
                height: 350,
            },
            xaxis: {
                categories: last24Hours,
            },
        },
    };
    const temperatureColumnData = {
        series: [
            {
                name: 'Nhiệt độ',
                data: data?.temp,
            },
        ],
        options: {
            chart: {
                id: 'temperature-column-chart',
                type: 'bar',
                height: 350,
            },
            xaxis: {
                categories: last24Hours,
            },
        },
    };
    //



    const humidityData = {
        series: [
            {
                name: 'Độ ẩm',
                data: data?.humi,
            },
        ],
        options: {
            chart: {
                id: 'humidity-chart',
                zoom: {
                    enabled: false,
                },
            },
            xaxis: {
                categories: last24Hours,
            },
        },
    };

    const temperatureCircularData = {
        series: [data && data.esp ? data.esp.temp.toFixed(2) : 0],
        options: {
            chart: {
                type: 'radialBar',
                offsetY: -10,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.24
                        }
                    },
                    dataLabels: {
                        name: {
                            offsetY: -10,
                            show: false,
                            color: '#888',
                            fontSize: '17px'
                        },
                        value: {
                            color: '#111',
                            fontSize: '36px',
                            show: true,
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            labels: ['Nhiệt độ'],
        },
    };

    const humidityCircularData = {
        series: [data && data.esp ? data.esp.humid.toFixed(2) : 0],
        options: {
            chart: {
                type: 'radialBar',
                offsetY: -10,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.24
                        }
                    },
                    dataLabels: {
                        name: {
                            offsetY: -10,
                            show: false,
                            color: '#888',
                            fontSize: '17px'
                        },
                        value: {
                            color: '#111',
                            fontSize: '36px',
                            show: true
                            // formatter: function (val) {
                            //     return val.toFixed(2) + "°C";
                            // }
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            labels: ['Độ ẩm'],
        },
    };


    const temperatureCircularDataTb = {
        series: [data && data.averageTemp ? data.averageTemp.toFixed(2) : 0],
        options: {
            chart: {
                type: 'radialBar',
                offsetY: -10,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.24
                        }
                    },
                    dataLabels: {
                        name: {
                            offsetY: -10,
                            show: false,
                            color: '#888',
                            fontSize: '17px'
                        },
                        value: {
                            color: '#111',
                            fontSize: '36px',
                            show: true,
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            labels: ['Nhiệt độ'],
        },
    };

    const humidityCircularDataTb = {
        series: [data && data.averageHumi ? data.averageHumi.toFixed(2) : 0],
        options: {
            chart: {
                type: 'radialBar',
                offsetY: -10,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.24
                        }
                    },
                    dataLabels: {
                        name: {
                            offsetY: -10,
                            show: false,
                            color: '#888',
                            fontSize: '17px'
                        },
                        value: {
                            color: '#111',
                            fontSize: '36px',
                            show: true

                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            labels: ['Độ ẩm'],
        },
    };


    return (
        <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:gap-7">
                <Card
                    icon={<FaUsers size={25} />}
                    data={data && data?.esp?.temp.toFixed(2)}
                    label={"Nhiệt độ"}
                />

                <Card
                    data={data && data?.esp?.humid.toFixed(2)}
                    icon={<MdOutlineProductionQuantityLimits size={25} />}
                    label={"Độ ẩm"}
                />

                <div className="sm:col-span-2">
                    <Card
                        data={data && data?.home?.led_1 ? "Đèn bật" : "Đèn tắt"}
                        label={"Đèn phòng khách"}
                        icon={data && data?.home?.led_1 === 1 ?
                            <Image src="/img/led-light-on.png" width="64" height="64" /> :
                            <Image src="/img/led-light.png" width="64" height="64" />}
                    />
                </div>

                <div className="sm:col-span-2">
                    <Card
                        data={data && data?.home?.led_2 ? "Đèn bật" : "Đèn tắt"}
                        label={"Đèn phòng ngủ"}
                        icon={data && data?.home?.led_2 === 1 ?
                            <Image src="/img/led-light-on.png" width="64" height="64" /> :
                            <Image src="/img/led-light.png" width="64" height="64" />}
                    />
                </div>

                <Card
                    icon={<FaUsers size={25} />}
                    data={data && data?.averageTemp.toFixed(2)}
                    label={"Nhiệt độ trung bình"}
                />

                <Card
                    data={data && data?.averageHumi.toFixed(2)}
                    icon={<MdOutlineProductionQuantityLimits size={25} />}
                    label={"Độ ẩm trung bình"}
                />
            </div>




            <div className="cols-span-6 flex justify-center m-10">
                <div className="cursor-pointer">
                    {
                        data && data?.home?.led_1 === 1 ? <Image src="/img/led-light-on.png" width="250" height="60"/> :
                            <Image src="/img/led-light.png" width="250" height="60"/>
                    }
                    <h1 className="text-center font-bold mt-2">Đèn phòng khách</h1>
                </div>
                <div className="cursor-pointer">
                    {
                        data && data?.home?.led_2 === 1 ? <Image src="/img/led-light-on.png" width="250" height="60"/> :
                            <Image src="/img/led-light.png" width="250" height="60"/>
                    }
                    <h1 className="text-center font-bold mt-2">Đèn phòng ngủ</h1>
                </div>

                <div className="cursor-pointer">
                    {
                        data && data?.home?.door === 90 ? <Image src="/img/door-off.png" width="250" height="60"/> :
                            <Image src="/img/door.png" width="250" height="60"/>
                    }
                    <h1 className="text-center font-bold mt-2">Cửa</h1>
                </div>


                <div className="cursor-pointer">
                    {
                        data && data?.esp?.chuyendong === 1 ? <Image src="/img/running.png" width="250" height="60"/> :
                            <Image src="/img/none-run.png" width="250" height="60"/>
                    }
                    <h1 className="text-center font-bold mt-2">Chuyển động</h1>
                </div>
            </div>

            <hr className="m-10 font-bold"/>

            <div className="md:col-span-6 flex flex-col md:flex-row md:justify-center m-10 space-y-5 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <ReactApexChart
                        options={humidityCircularData.options}
                        series={humidityCircularData.series}
                        type="radialBar"
                        height={350}
                    />
                    <h1 className="text-center font-bold">Độ ẩm</h1>
                </div>

                <div className="w-full md:w-1/2">
                    <ReactApexChart
                        options={temperatureCircularData.options}
                        series={temperatureCircularData.series}
                        type="radialBar"
                        height={350}
                    />
                    <h1 className="text-center font-bold">Nhiệt độ</h1>
                </div>

                <div className="w-full md:w-1/2">
                    <ReactApexChart
                        options={humidityCircularDataTb.options}
                        series={humidityCircularDataTb.series}
                        type="radialBar"
                        height={350}
                    />
                    <h1 className="text-center font-bold">Độ ẩm trung bình</h1>
                </div>

                <div className="w-full md:w-1/2">
                    <ReactApexChart
                        options={temperatureCircularDataTb.options}
                        series={temperatureCircularDataTb.series}
                        type="radialBar"
                        height={350}
                    />
                    <h1 className="text-center font-bold">Nhiệt độ trung bình</h1>
                </div>
            </div>


            <hr className="m-10 font-bold"/>


            <div className="cols-span-6">
                <h1 className="font-bold text-center uppercase">Nhiệt độ</h1>
                <ReactApexChart
                    options={temperatureData.options}
                    series={temperatureData.series}
                    type="line"
                    height={350}
                />
            </div>

            <hr className="m-10 font-bold"/>

            {/* Humidity Chart */}
            <div className="cols-span-6">
                <h1 className="font-bold text-center uppercase">Độ ẩm</h1>
                <ReactApexChart
                    options={humidityData.options}
                    series={humidityData.series}
                    type="line"
                    height={350}
                />
            </div>
            <div className="cols-span-6">
                <h1 className="font-bold text-center uppercase">Nhiệt độ (Biểu đồ Cột)</h1>
                <ReactApexChart
                    options={temperatureColumnData.options}
                    series={temperatureColumnData.series}
                    type="bar"
                    height={350}
                />
            </div>

            <hr className="m-10 font-bold"/>

            <div className="cols-span-6">
                <h1 className="font-bold text-center uppercase">Độ ẩm (Biểu đồ Cột)</h1>
                <ReactApexChart
                    options={humidityColumnData.options}
                    series={humidityColumnData.series}
                    type="bar"
                    height={350}
                />
            </div>
        </div>

    );
}
