import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import ReactMarkdown from 'react-markdown';

export default function DetailsSection(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item md={9} sm={11} xs={12}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="scrollable prevent tabs example"
        style={{ marginBottom: "1rem" }}
      >
        <Tab label="Description" />
        <Tab label="Financials" />
        <Tab label="Documents" />
        <Tab label="Managment" />
        <Tab label="Purchase Process" />
      </Tabs>
      <DetailSwitch value={value} {...props} />
    </Grid>
  );
}

function DetailSwitch(props) {

  // Probably best to request relevant data here
  let [data, setData] = useState(null);
  if (data == null) {
    setData("");
    fetch(props.description)
      .then(res => res.text())
      .then(body => {
        console.log(body);
        setData(body);
      });
  }

  switch (props.value) {
    default: case 0: return (
      <ReactMarkdown>
        {data}
      </ReactMarkdown>
    );
    case 1: return (
      <div>
        Financials [IN DEVELOPMENT]
      </div>
    );
    case 2: return (
      <div>
        Documents [IN DEVELOPMENT]
      </div>
    );
    case 3: return (
      <div>
        Developer [IN DEVELOPMENT]
      </div>
    );
    case 4: return (
      <div>
        Purchase Process [IN DEVELOPMENT]
      </div>
    );
  }
}