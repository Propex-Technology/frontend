import { useState, useEffect } from 'react';
import {
  Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  ToggleButtonGroup, ToggleButton, Fade, Modal,
  Backdrop, Card, CardContent, TextField, InputAdornment
} from '@mui/material';
import CheckmarkIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import LeftRightText from '../../components/LeftRightText';

export function SecondaryMarketTable(props) {
  const isBuyPage = props.isBuyPage;
  const setIsBuyPage = props.setIsBuyPage;

  // It's confusing, I know
  // Sell orders => buy page
  // Buy orders => sell page
  const fakeSellData = [
    {
      id: 0, unitPrice: 23, unitTokenTicker: "USDC",
      amount: 23, creator: "0x30E75681a5B9377A4324CBDE2A13f5B5954dD24D",
      allowPartialFills: false
    },
    {
      id: 3, unitPrice: 27, unitTokenTicker: "USDC",
      amount: 40, creator: "0x30E75681a5B9377A4324CBDE2A13f5B5954dD24D",
      allowPartialFills: true
    },
    {
      id: 12, unitPrice: 27.3, unitTokenTicker: "DAI",
      amount: 22, creator: "0xF8dac7973f0F444E19bf671915187A0A92f18313",
      allowPartialFills: true
    }
  ];
  const fakeBuyData = [
    {
      id: 5, unitPrice: 25.3, unitTokenTicker: "DAI",
      amount: 23, creator: "0x30E75681a5B9377A4324CBDE2A13f5B5954dD24D",
      allowPartialFills: true
    },
    {
      id: 24, unitPrice: 12, unitTokenTicker: "USDT",
      amount: 40, creator: "0x30E75681a5B9377A4324CBDE2A13f5B5954dD24D",
      allowPartialFills: true
    },
    {
      id: 7, unitPrice: 11.8, unitTokenTicker: "USDC",
      amount: 22, creator: "0xF8dac7973f0F444E19bf671915187A0A92f18313",
      allowPartialFills: false
    }
  ];

  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null);
  function handleModalOpen(order) {
    setOpen(true);
    setOrder(order);
  }

  return (
    <>
      <ToggleButtonGroup
        onChange={(e, x) => setIsBuyPage(x)}
        value={isBuyPage} exclusive
      >
        <ToggleButton value={1}>Buy Tokens</ToggleButton>
        <ToggleButton value={0}>Sell Tokens</ToggleButton>
        <ToggleButton value={2}>Your Orders</ToggleButton>
      </ToggleButtonGroup>
      <PurchaseModal open={open} setOpen={setOpen} order={order} {...props} />
      {isBuyPage == 0 ?
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Maker</TableCell>
                <TableCell align="right">Partial Fills</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeBuyData.map((row, i) => <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={i}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.unitPrice} {row.unitTokenTicker}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.creator}</TableCell>
                <TableCell align="right">
                  {row.allowPartialFills ? <CheckmarkIcon /> : <CancelIcon />}
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => { handleModalOpen({ ...row, isBuy: false }); }}>
                    Fill
                  </Button>
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer> : isBuyPage == 1 ?
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Maker</TableCell>
                  <TableCell align="right">Partial Fills</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fakeSellData.map((row, i) => <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={i}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.unitPrice} {row.unitTokenTicker}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.creator}</TableCell>
                  <TableCell align="right">
                    {row.allowPartialFills ? <CheckmarkIcon /> : <CancelIcon />}
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => { handleModalOpen({ ...row, isBuy: false }); }}>
                      Fill
                    </Button>
                  </TableCell>
                </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer> :
          <div>
            Your orders
          </div>}
    </>
  );
}

export function PurchaseModal(props) {
  const order = props.order;
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  const [fillAmount, setFillAmount] = useState(0);
  useEffect(() => {
    setFillAmount(order?.amount);
  }, [order]);
  const totalPrice = () => fillAmount * order?.unitPrice;

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4
  };

  const imgStyle = {
    width: '100%',
    borderRadius: '8px',
    marginTop: '12px',
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Card style={modalBoxStyle}>
          <CardContent>
            <h3>
              Fill {order?.isBuy ? "Buy" : "Sell"} Order for {props?.location?.addressLine1}
            </h3>
            <div style={{ color: "grey" }}>
              You're {order?.isBuy ? "selling" : "buying"} tokens.
            </div>
            <img src={props?.images?.[0]} alt={props?.location?.addressLine1} style={imgStyle} />
            {order?.allowPartialFills ?
              <>
                <div style={{ height: "12px" }} />
                <LeftRightText left="Purchase Amount:" right={
                  <TextField
                    type="number"
                    style={{ minWidth: "150px" }}
                    value={fillAmount}
                    InputProps={{
                      inputProps: { max: order?.amount, min: 1 },
                      endAdornment: <InputAdornment position="end">{"PPX-" + props.assetId}</InputAdornment>
                    }}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setFillAmount(e.target.value);
                        return;
                      }
                      const value = +e.target.value;
                      if (value < 1) setFillAmount(1);
                      else setFillAmount(value);
                    }}
                  />
                }
                />
              </>
              :
              <>
                <div>
                  Note: this order disabled partial fills. You must purchase all {order?.amount} tokens.
                </div>
              </>
            }
            <div style={{ height: "12px" }} />
            {order?.isBuy ?
              <>
                <LeftRightText left="You pay:" right={totalPrice() + " " + order?.unitTokenTicker} />
                <LeftRightText left="You recieve:" right={fillAmount + " PPX-" + props.assetId} />
              </> :
              <>
                <LeftRightText left="You pay:" right={fillAmount + " PPX-" + props.assetId} />
                <LeftRightText left="You recieve:" right={totalPrice() + " " + order?.unitTokenTicker} />
              </>
            }
            <div style={{ height: "12px" }} />
            <Button variant="contained">Fill Order</Button>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
}