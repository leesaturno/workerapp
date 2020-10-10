import React, { useState } from "react";
import MUIDataTable from "mui-datatables";

import './MuiDT.scss';


const MuiDT = ({ data, columns, options }) => (

    <React.Fragment>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
    </React.Fragment>
    
);

export default MuiDT;

