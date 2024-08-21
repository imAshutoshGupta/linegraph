import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const LineChart = () => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Read',
                data: [],
            },
            {
                name: 'Sent',
                data: [],
            },
            {
                name: 'Delivered',
                data: [],
            },
            {
                name: 'Failed',
                data: [],
            }
        ],
        options: {
            chart: {
                type: 'line',
            },
            xaxis: {
                categories: [],
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            title: {
                text: 'Line Chart',
                align: 'left',
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
            },
        },
    });

    const [filter, setFilter] = useState('day');

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.example.com/data?filter=${filter}`); 
            const result = await response.json();

            const labels = result.labels;
            const readData = result.read;
            const sentData = result.sent;
            const deliveredData = result.delivered;
            const failedData = result.failed;

            setChartData({
                series: [
                    {
                        name: 'Read',
                        data: readData,
                    },
                    {
                        name: 'Sent',
                        data: sentData,
                    },
                    {
                        name: 'Delivered',
                        data: deliveredData,
                    },
                    {
                        name: 'Failed',
                        data: failedData,
                    }
                ],
                options: {
                    ...chartData.options,
                    xaxis: {
                        categories: labels,
                    },
                },
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div>
            <h2>Line Graph</h2>
            <ApexCharts
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={450}
            />
            <Filter selectedFilter={filter} onFilterChange={handleFilterChange} />
        </div>
    );
};

const Filter = ({ selectedFilter, onFilterChange }) => {
    return (
        <div>
            <button onClick={() => onFilterChange('day')} className={selectedFilter === 'day' ? 'active' : ''}>Day</button>
            <button onClick={() => onFilterChange('month')} className={selectedFilter === 'month' ? 'active' : ''}>Month</button>
            <button onClick={() => onFilterChange('year')} className={selectedFilter === 'year' ? 'active' : ''}>Year</button>
            <button onClick={() => onFilterChange('lifetime')} className={selectedFilter === 'lifetime' ? 'active' : ''}>Lifetime</button>
        </div>
    );
};

export default LineChart;
