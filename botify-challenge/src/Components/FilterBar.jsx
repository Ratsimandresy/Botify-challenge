import React from "react";

// dropdown the options which are gonna be the orbiting bodies
export default function FilterBar(props) {
  console.log(props); // checking if the propos has been passed succesfully

  return (
    <div>
      <select value={props.orbitingBody} onChange={props.handleChange}>
        {props.orbitingBodies.map((b, i) => {
          return (
            <option key={i} value={b}>
              {b}
            </option>
          );
        })}
      </select>
    </div>
  );
}
