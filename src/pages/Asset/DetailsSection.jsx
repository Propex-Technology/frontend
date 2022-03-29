import { useState } from 'react';
import {
  Tab, Tabs, Grid, Button
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import Link from '@mui/material/Link';
import DownloadIcon from '@mui/icons-material/Download';

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

  console.log(props);
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
      <>
        {props.documents.map((x, i) => (
          <div key={i} className="flex" style={{width: "100%"}}>
            <p style={{width: "100%"}} >Document {i}:</p>
            <Link href={x} target="_blank">
              <Button variant="contained" endIcon={<DownloadIcon />} >
                Download
              </Button>
            </Link>
          </div>
        ))}
      </>
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