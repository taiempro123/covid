import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useState, useEffect} from "react"
import moment from "moment";
import { Button, ButtonGroup } from "@material-ui/core";



const generateOptions = (data) => {
    const categories = data.map(item => moment(item.Date).format('DD/MM/YYYY'));
    return {
       chart: {
           height: 500,
         },
         title: {
           text: 'Tổng ca nhiễm',
         },
         xAxis: {
           categories: categories,
           crosshair: true,
         },
         colors: ['#F3585B'],
         yAxis: {
           min: 0,
           title: {
             text: null,
           },
           labels: {
             align: 'right',
           },
         },
         tooltip: {
           headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
           pointFormat:
             '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
             '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
           footerFormat: '</table>',
           shared: true,
           useHTML: true,
         },
         plotOptions: {
           column: {
             pointPadding: 0.2,
             borderWidth: 0,
           },
         },
         series: [
           {
             name: 'Tổng Ca nhiễm',
             data: data.map((item) => item.Confirmed),
           },
         ],
    }
}


export default function Summary({data}) {

    const [options,setOptions] = useState({});
    const [reportStyle, setReportStyle] = useState("all");
    

    useEffect (() => {
      let customData = [];
        switch (reportStyle) {
            case "all":
                customData = data;
                break;
            case "30":
                customData = data.slice(data.length -30);
                break;
            case "7":
                customData = data.slice(data.length -7);
                break;
            default:
                customData = data;
                break;
        }

        setOptions(generateOptions(customData));
    }, [data,reportStyle])



  return(
    
      <div>
          <ButtonGroup size = "small" style = {{display: "flex", justifyContent: "flex-end"}}>
          <Button color = {reportStyle === 'all' ? 'secondary' :''} onClick= {()  => setReportStyle("all")}>Tất cả</Button>
          <Button color = {reportStyle === '30' ? 'secondary' : ''} onClick= {()  => setReportStyle("30")}>30 ngày</Button>
          <Button color = {reportStyle === '7' ? 'secondary' : ''} onClick= {()  => setReportStyle("7")}>7 ngày</Button>
              
            </ButtonGroup> 

          <HighchartsReact 
          highcharts = {Highcharts}
          options = {options}
          />
      </div>
  )
}
