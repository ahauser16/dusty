import React from "react";
import '../../src/App.css'

const Dogrunlist = (props) => {
  const { dogruns } = props;
  if (!dogruns || dogruns.length === 0) return <p>No dogruns, sorry</p>;
  return (
    <div className="sidebar">
      <ul>
        <h2 className="list-head">New York City Dog Runs</h2>
        {dogruns.map((dogrun) => {
          return (
            <li key={dogrun.id} className="list">
              <span className="dogrun-text">{dogrun.name} is located at </span>
              <span className="dogrun-propertyname">
                {dogrun.propertyname} in the borough:{" "}
              </span>
              <span className="dogrun-borough">{dogrun.borough}</span>
              {/* <span className='dogrun-polygon'>{dogrun.polygon}</span> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Dogrunlist;
