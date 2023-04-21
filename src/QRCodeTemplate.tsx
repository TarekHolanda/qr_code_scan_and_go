import React, { FC, PropsWithChildren } from "react"

import DEV_RAINBOW_LOGO from "assets/qr_code/dev-rainbow.png"
import DEV_RAINBOW_BG from "assets/qr_code/dev-rainbow-bg.png"
import { createUseStyles } from "react-jss"

import Typography from "components/Typography"

const ICON_SIZE = 100

const useStyles = createUseStyles(theme => ({
  root: {
    backgroundImage: `url('${DEV_RAINBOW_BG}')`,
    maxWidth: 1060,
    maxHeight: 1521,
    borderRadius: "32px",
    border: "5px solid #EFEFF7",
    padding: theme.spacing(11),
  },
  logo: {
    boxShadow: "9px 3px 20px 1px rgb(0 0 0 / 10%)",
    height: 150,
    width: 150,
    borderRadius: 8,
  },
  icon: {
    borderRadius: 8,
    width: ICON_SIZE,
    height: ICON_SIZE,
    position: "absolute",
    // Need to offset the values due to `excavate: true` in qrcode.react
    top: `calc(50% - ${ICON_SIZE / 2 + 1}px)`,
    // Need to offset the values due to `excavate: true` in qrcode.react
    left: `calc(50% - ${ICON_SIZE / 2 - 5}px)`,
  },
  qrContainer: {
    position: "relative",
    backgroundColor: "#EFEFF7",
    borderRadius: "56px",
    margin: theme.spacing(8, 0),
    padding: theme.spacing(4),
  },
  qrInner: {
    backgroundColor: "white",
    borderRadius: "32px",
    padding: 90,
  },
  referredBy: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "29px",
    letterSpacing: "0.1em",
  },
}))

const QRCodeTemplate: FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root} id="fancy-qr-code">
      <img alt="logo" className={classes.logo} src={DEV_RAINBOW_LOGO} />
      <Typography className="mt-7" variant="title1">
        To register, scan the QR Code.
      </Typography>

      <div className={classes.qrContainer}>
        <img
          alt="icon"
          className={classes.icon}
          height={ICON_SIZE}
          src={DEV_RAINBOW_LOGO}
          width={ICON_SIZE}
        />
        <div className={classes.qrInner}>{children}</div>
      </div>
      <Typography className={classes.referredBy} variant="emphasised">
        REFERRED BY
      </Typography>
      <Typography variant="largeTitle">Ansh Saini</Typography>
    </div>
  )
}

export default QRCodeTemplate;