import React, { Component } from "react";
import { GoogleCharts } from "google-charts";
import api from "../api/apiHnadler";
import { transposeData } from "../Utils/transposeData";
import FilterBar from "./FilterBar";

export default class Chart1 extends Component {
  state = {
    neo: [],
    orbitingBodies: [],
    orbitingBody: "",
  };

  async componentDidMount() {
    try {
      const response1 = await api.getNEOsOnPage0();
      const response2 = await api.getNEOsOnPage1();

      const neoPage0 = response1.data.near_earth_objects;
      const neoPage1 = response2.data.near_earth_objects;

      console.log(neoPage0);

      // console.log(
      //   neoPage0.filter((n) => {
      //     return n.close_approach_data[0].orbiting_body === "Mars";
      //   })
      // );

      GoogleCharts.load(this.drawChart); // make sure to call drawChatrs afters fetching the data otherwise the chart will not be drawn

      this.setState({ neo: [...neoPage0, ...neoPage1] });

      // console.log(this.state); //=> shows the state updating after fetching the data
    } catch (err) {
      console.log(err);
    }
  }

  drawChart = () => {
    //after getting the data response, we have acces to the updted state
    // console.log("this is neo", this.state.neo);

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

    data.getFilteredRow([{}]);

    const options = {
      title: "Near Earth object",
      height: 2000,
    };

    const chart1 = new GoogleCharts.api.visualization.BarChart(
      document.getElementById("chart1")
    );
    chart1.draw(data, options);
  };

  handleChange = (e) => {
    // console.log(e.target);
    this.setState({ orbitingBoby: e.target.value });
  };

  render() {
    const orbitingBobyList = this.state.neo.map(
      (n) => n.close_approach_data[0].orbiting_body
    );

    console.log(orbitingBobyList);

    let orbitingBody = [...new Set(orbitingBobyList)];
    console.log(orbitingBody);

    return (
      <div>
        <FilterBar
          orbitingBodies={orbitingBody}
          handleChange={this.handleChange}
          orbitingBoby={this.state.orbitingBody}
        />
        <div id="chart1"></div>
      </div>
    );
  }
}
