import React from "react";
import { SvgIcon } from "@mui/material";

const Logo = (props) => {
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          style={{
            strokeLinecap: "round",
            fill: "none",
            strokeWidth: 7,
            stroke: "rgb(255, 255, 255)",
            transformOrigin: "102 100",
          }}
          d="M 83.503 42.03 C 128.317 42.03 156.325 90.542 133.918 129.352 C 111.512 168.162 55.495 168.162 33.088 129.352 C 27.168 119.099 24.515 107.285 25.483 95.485 C 30.31 36.643 97.025 5.092 145.57 38.694 C 194.116 72.295 188.082 145.847 134.71 171.088 C 103.513 185.841 66.305 177.943 43.793 151.788 C 10.087 112.627 31.413 51.663 82.181 42.053 C 123.931 34.15 162.426 66.54 161.777 109.027 C 161.095 153.661 112.352 180.819 74.039 157.911 C 50.92 144.089 40.364 116.167 48.555 90.507"
        ></path>
        <path
          style={{
            strokeLinecap: "round",
            fill: "none",
            strokeWidth: 7,
            stroke: "rgb(255, 255, 255)",
          }}
          d="M 97.02 98.98 C 101.315 133.117 84.919 157.05 74.275 158.547"
        ></path>
        <path
          style={{
            strokeLinecap: "round",
            fill: "none",
            strokeWidth: 7,
            stroke: "rgb(255, 255, 255)",
          }}
          d="M 66.257 88.814 C 76.197 104.868 117.036 99.793 123.1 87.461"
        ></path>
      </svg>
    </SvgIcon>
  );
};

export default Logo;
