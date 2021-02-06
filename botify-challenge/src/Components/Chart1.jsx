import React, { Component } from "react";
import { GoogleCharts } from "google-charts";
import api from "../api/apiHnadler";
import { transposeData } from "../Utils/transposeData";

export default class Chart1 extends Component {
  state = {
    neo: [],
  };

  async componentDidMount() {
    try {
      const response1 = await api.getNEOsOnPage0();
      const response2 = await api.getNEOsOnPage1();

      const neoPage0 = response1.data.near_earth_objects;
      const neoPage1 = response2.data.near_earth_objects;

      GoogleCharts.load(this.drawChart); // make sure to call drawChatrs afters fetching the data otherwise the chart will not be drawn

      this.setState({ neo: [...neoPage0, ...neoPage1] });

      //console.log(this.state); => shows the state updating after fetching the data
    } catch (err) {
      console.log(err);
    }
  }

  drawChart = () => {
    //after getting the data response, we have acces to the updted state
    console.log("this is neo", this.state.neo);

    //retreiving the data we need form the response
    const minDiameters = this.state.neo.map(
      (n) => n.estimated_diameter.kilometers.estimated_diameter_min
    );
    const maxDiameters = this.state.neo.map(
      (n) => n.estimated_diameter.kilometers.estimated_diameter_max
    );
    const namesOfNEOs = this.state.neo.map((n) => n.name);

    let dataToTranspose = [namesOfNEOs, minDiameters, maxDiameters];

    const infoOfData = [
      "Name fo NEO",
      "Min Estimated Diameter (km)",
      "Max Estimated Diameter (km)",
    ];

    let dataToDisplay = transposeData(dataToTranspose);

    dataToDisplay.unshift(infoOfData);

    // console.log(dataToDisplay);

    //drawing the charts taking an array as parameters
    const data = GoogleCharts.api.visualization.arrayToDataTable(dataToDisplay);

    const options = {
      title: "Near Earth object",
      height: 1000,
    };

    const chart1 = new GoogleCharts.api.visualization.BarChart(
      document.getElementById("chart1")
    );
    chart1.draw(data, options);
  };

  render() {
    return <div id="chart1"></div>;
  }
}
