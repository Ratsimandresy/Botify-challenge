import React, { Component } from "react";
import { GoogleCharts } from "google-charts";
import api from "../api/apiHnadler";

export default class Chart1 extends Component {
  state = {
    neo: [],
  };

  async componentDidMount() {
    // console.log("COMPONENTDIDMOUT");
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

    //drawing the charts
    const data = GoogleCharts.api.visualization.arrayToDataTable([
      [
        "Name fo NEO",
        "Min Estimated Diameter (km)",
        "Max Estimated Diameter (km)",
      ],
      // ["name1", 50, 150],
      // ["name2", 20, 120],
      // ["name3", 30, 900],
      [namesOfNEOs[0], minDiameters[0], maxDiameters[0]],
      [namesOfNEOs[1], minDiameters[1], maxDiameters[1]],
      [namesOfNEOs[2], minDiameters[2], maxDiameters[2]],
      [namesOfNEOs[3], minDiameters[3], maxDiameters[3]],
      [namesOfNEOs[4], minDiameters[4], maxDiameters[4]],
    ]);

    const options = { title: "Near Earth object" };

    const chart1 = new GoogleCharts.api.visualization.BarChart(
      document.getElementById("chart1")
    );
    chart1.draw(data, options);
  };

  render() {
    return <div id="chart1"></div>;
  }
}
