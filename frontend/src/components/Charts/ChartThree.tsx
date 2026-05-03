import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
  series: number[];
  active: number[];
  disActive: number[];
}

interface DataProps {
  data: any
}

const ChartThree: React.FC<DataProps> = ({ data }) => {
  const [state, setState] = useState<ChartThreeState>({ series: [],active:[],disActive:[] });
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    labels: [],
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      setState({ series: [] ,active:[],disActive:[]});
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        labels: [],
      }));
      return;
    }
  
    const newLabels: string[] = [];
    const total: number[] = [];
    const totalActive: number[] = [];
    const totalDisActive: number[] = [];
    data.secondClassificationData?.forEach((item:any) => {
      newLabels.push(item.name);
      total.push(item.activeData.length+item.disactiveData.length);
      totalActive.push(item.activeData.length);
      totalDisActive.push(item.disactiveData.length);
    });
  
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      labels: newLabels,
    }));
    setState({ series: total,active:totalActive,disActive:totalDisActive });
  }, [data]);
  


  return (
   <>
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div >
        <div>
        <h5 style={{direction:"rtl"}} className="text-xl flex justify-between w-full font-semibold text-black dark:text-white">
           {data.name}
           <span className="text-primary">Total</span>
          </h5>
        </div>
      
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div >
        <div>
          <h5 style={{direction:"rtl"}} className="text-xl flex justify-between w-full font-semibold text-black dark:text-white">
           {data.name}
           <span className="text-green-500">Active</span>
          </h5>
        </div>
      
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartOptions}
            series={state.active}
            type="donut"
          />
        </div>
      </div>
    </div>
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div >
        <div>
        <h5 style={{direction:"rtl"}} className="text-xl flex justify-between w-full font-semibold text-black dark:text-white">
           {data.name}
           <span className="text-red-500">Dis Active</span>
          </h5>
        </div>
      
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartOptions}
            series={state.disActive}
            type="donut"
          />
        </div>
      </div>
    </div>
   </>
  );
};

export default ChartThree;
