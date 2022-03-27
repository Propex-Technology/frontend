import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import ReactMarkdown from 'react-markdown';

export default function DetailsSection(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item sm={10} xs={12}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
        style={{marginBottom: "1rem"}}
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      <DetailSwitch value={value} {...props} />
    </Grid>
  );
}

function DetailSwitch(props) {

  // Probably best to request relevant data here

  switch (props.value) {
    case 0: return (
      <ReactMarkdown>
        ## Testing 123\n
        This is a test. 123.
        123.
        123.
      </ReactMarkdown>
    );
    case 1: return (
      <div>
        Second One
      </div>
    );
    case 2: return(
      <div>
        Third one
      </div>
    )
  }
}