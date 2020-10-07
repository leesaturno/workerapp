import React from "react";
import Icons from "../../images/icons.svg"; // Path to your icons.svg

const Icon = ({ name, color, size }) => (
    <svg className={`icon`}>
      <use href={`${Icons}#${name}`} />
    </svg>
  );
  
  export default Icon;