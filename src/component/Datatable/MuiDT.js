import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './MuiDT.scss';

// const [responsive, setResponsive] = useState("vertical");
// const [tableBodyHeight, setTableBodyHeight] = useState("400px");
// const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

const MuiDT = ({ data, columns, options,getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableFilter: {
        root:{
          
            background: "#242224 !important"
        
          
        },
        title:{
          color: "#8F8F8F !important"
        },
        resetLink:{
          color: "#8F8F8F !important"
        }
      },
      MuiFormLabel: {
        root:{
          
          color: "#8F8F8F !important"
        
          
        },
      }
    }
  }) }) => (
  
    <React.Fragment>

     
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
      </MuiThemeProvider>
    </React.Fragment>
    
);

export default MuiDT;

