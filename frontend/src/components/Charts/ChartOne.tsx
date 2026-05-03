import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    hover: {
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
    color: string; 
  }[]; 
}

const ChartOne: React.FC<any> = ({ data }) => {
  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    if (!data || data.secondClassificationData?.length === 0) {
      setState({ series: [] });
      return;
    }
  
    const monthOrder = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
  
    const newSeries = data.secondClassificationData.map((item: any, index: number) => {
      const totalSeries: number[] = [];
  
      monthOrder.forEach((month) => {
        let monthlyTotal = 0;
        item.activeData.forEach((activeItem: any) => {
          const createdAt = new Date(activeItem.createdAt);
          const itemMonth = createdAt.toLocaleString("en-US", { month: "short" });
  
          if (createdAt.getFullYear() === 2025 && itemMonth === month) {
            monthlyTotal++;
          }
        });
        totalSeries.push(monthlyTotal);
      });

      return {
        name: `${item.name}`,
        data: totalSeries,
        color: `hsl(${(index * 60) % 360}, 70%, 60%)`, 
      };
    });
  
    setState({
      series: newSeries,
    });
  }, [data]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Active Data</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              2025
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1"> 
        {state.series.map((chartData, index) => (
          <div key={index} className="m-8 p-2 border-b-4">
            <p style={{color:chartData.color}} className={`text-center text-xl font-semibold mb-3`}>{chartData.name}</p>
            <ReactApexChart
              options={{ 
                ...options, 
                title: { text: chartData.name, align: 'center' },
                markers: {
                  ...options.markers,
                  strokeColors: [chartData.color], 
                },
                colors: [chartData.color]
              }}
              series={[chartData]}
              type="area"
              height={350}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartOne;
