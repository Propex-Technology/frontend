import { useState } from 'react';
import {
  Tab, Tabs, Grid, Button, Avatar, Link, Box, Skeleton
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import DownloadIcon from '@mui/icons-material/Download';
import { useFetchMarkdown } from '../../utils';
import { makeStyles } from '@mui/styles';
import { SecondaryMarketTable } from './SecondaryMarketTable';


const useStyles = makeStyles(({ palette, ...theme }) => ({
  blueLine: {
    padding: "0px 2rem",
    background: palette.primary,
    height: "4px"
  },
  centered: {
    marginRight: "auto",
    marginLeft: "auto"
  },
  skeletonCard: {
    borderRadius: '8px',
    marginBottom: "12px"
  }
}));


export default function DetailsSection(props) {
  const tokensSold = 0; // TODO: tokens sold in total from blockchain
  const tokensLeft = props.totalTokens - tokensSold;
  const initialTokenSaleFinished = true;//tokensSold >= props.totalTokens;
  const [value, setValue] = useState(1);

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
        <Tab label="Market" disabled={!initialTokenSaleFinished} />
        <Tab label="Description" />
        <Tab label="Financials" />
        <Tab label="Documents" />
        <Tab label="Managment" />
        <Tab label="Purchase Process" />
      </Tabs>
      <div style={{ minHeight: "300px" }}>
        <DetailSwitch value={value}
          {...props} initialTokenSaleFinished={initialTokenSaleFinished}
        />
      </div>
    </Grid>
  );
}


function DetailSwitch(props) {

  const classes = useStyles();
  let description = useFetchMarkdown(props.description);
  let managerDesc = useFetchMarkdown(props.manager.description);

  const [isBuyPage, setIsBuyPage] = useState(1);

  switch (props.value) {
    case 0: return (
      <SecondaryMarketTable {...props} isBuyPage={isBuyPage} setIsBuyPage={setIsBuyPage} />
    );
    default: case 1: return (
      description === null || description === "" ?
      <>
        <Skeleton variant='rectangle' className={classes.skeletonCard} height='48px' width='40%' />
        <Skeleton variant='rectangle' className={classes.skeletonCard} height='12px' width='65%' />
        <Skeleton variant='rectangle' className={classes.skeletonCard} height='12px' width='80%' />
        <Skeleton variant='rectangle' className={classes.skeletonCard} height='12px' width='70%' />
      </>
      :
      <ReactMarkdown>
        {description}
      </ReactMarkdown>
    );
    case 2: return (
      <div>
        Financials [IN DEVELOPMENT]
      </div>
    );
    case 3: return (
      <>
        {props.documents.map((x, i) => (
          <div key={i} className="flex" style={{ width: "100%" }}>
            <p style={{ width: "100%" }} >Document {i}:</p>
            <Link href={x} target="_blank">
              <Button variant="contained" endIcon={<DownloadIcon />} >
                Download
              </Button>
            </Link>
          </div>
        ))}
      </>
    );
    case 4: return (
      <Grid container spacing={3}>
        <Grid item md={4} sm={5} xs={12}>
          <Avatar alt={props.manager.name}
            sx={{ width: "200px", height: "200px" }}
            src={props.manager.image}
            className={classes.centered}
          />
          <Box textAlign='center' marginTop='1rem'>
            <Link href={"mailto:" + props.manager.email}>
              <Button>Contact</Button>
            </Link>
          </Box>
        </Grid>
        <Grid item md={8} sm={7} xs={12}>
          <ReactMarkdown>{managerDesc}</ReactMarkdown>
        </Grid>
      </Grid>
    );
    case 5: return (
      <div>
        Purchase Process [IN DEVELOPMENT]
      </div>
    );
  }
}
