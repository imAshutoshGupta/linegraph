import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const dummyData = {
    day: {
        labels: ['2024-08-01', '2024-08-02', '2024-08-03', '2024-08-04', '2021-08-05'],
        read: [10, 20, 30, 40, 50],
        sent: [15, 25, 35, 45, 55],
        delivered: [20, 30, 40, 50, 60],
    },
    month: {
        labels: ['2024-07', '2024-08', '2024-09', '2024-10'],
        read: [300, 400, 500, 600],
        sent: [350, 450, 550, 650],
        delivered: [400, 500, 600, 700],
    },
    year: {
        labels: ['2023', '2024'],
        read: [3000, 6000],
        sent: [3500, 6500],
        delivered: [4000, 7000],
    },
    lifetime: {
        labels: ['Total'],
        read: [10000],
        sent: [12000],
        delivered: [14000],
    },
    custom: {
        labels: ['Custom 1', 'Custom 2', 'Custom 3'],
        read: [150, 250, 350],
        sent: [200, 300, 400],
        delivered: [250, 350, 450],
    },
};


const LineChart = () => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Read',
                data: dummyData.day.read,
            },
            {
                name: 'Sent',
                data: dummyData.day.sent,
            },
            {
                name: 'Delivered',
                data: dummyData.day.delivered,
            }
        ],
        options: {
            chart: {
                type: 'line',
            },
            xaxis: {
                categories: dummyData.day.labels, 
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

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setChartData({
            series: [
                {
                    name: 'Read',
                    data: dummyData[newFilter].read,
                },
                {
                    name: 'Sent',
                    data: dummyData[newFilter].sent,
                },
                {
                    name: 'Delivered',
                    data: dummyData[newFilter].delivered,
                }
            ],
            options: {
                ...chartData.options,
                xaxis: {
                    categories: dummyData[newFilter].labels,
                },
            },
        });
    };

        // useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             const response = await fetch(`https://api.example.com/data?filter=${filter}`); // Replace with your API URL
        //             const result = await response.json();

        //             // Assuming result is an object with arrays for each type
        //             const labels = result.labels;
        //             const readData = result.read;
        //             const sentData = result.sent;
        //             const deliveredData = result.delivered;

        //             setChartData({
        //                 series: [
        //                     {
        //                         name: 'Read',
        //                         data: readData,
        //                     },
        //                     {
        //                         name: 'Sent',
        //                         data: sentData,
        //                     },
        //                     {
        //                         name: 'Delivered',
        //                         data: deliveredData,
        //                     }
        //                 ],
        //                 options: {
        //                     ...chartData.options,
        //                     xaxis: {
        //                         categories: labels,
        //                     },
        //                 },
        //             });
        //         } catch (error) {
        //             console.error('Error fetching data:', error);
        //         }
        //     };

        //     fetchData();
        // }, [filter]);

        return (
            <div>
                <h2>Line Chart</h2>
                <ApexCharts
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={550}
                />
                <Filter selectedFilter={filter} onFilterChange={handleFilterChange} />
                {/* <Filter selectedFilter={filter} onFilterChange={setFilter} /> */}
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
                <button onClick={() => onFilterChange('custom')} className={selectedFilter === 'custom' ? 'active' : ''}>Custom</button>
            </div>
        );
    };

    export default LineChart;
