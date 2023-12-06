import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function TemperatureHumidityChart({ timestamps, temperatures, humidities }) {
    const chartOptions = {
        // ... Các tùy chọn biểu đồ ...
    };

    const series = [
        {
            name: 'Nhiệt độ',
            data: temperatures,
        },
        {
            name: 'Độ ẩm',
            data: humidities,
        },
    ];

    return (
        <ReactApexChart
            options={chartOptions}
            series={series}
            type="line"
            height={350}
        />
    );
}
