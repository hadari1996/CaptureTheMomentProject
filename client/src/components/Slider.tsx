import React, { FC } from "react";
import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import hagada from "../imges/Hagada.jpg";
import masoret from "../imges/masoret.jpg";
import teva from "../imges/teva.jpg";
import { useBeforeRender } from "../hooks/useBeforeRender";
import "../App.css";

const fadeImages = [
  {
    url: hagada,
  },
  {
    url: masoret,
  },
  {
    url: teva,
  },
];



const Slideshow= () => {
  useBeforeRender(() => {
    window.addEventListener("error", (e) => {
      if (e) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr)
          resizeObserverErr.className = "hide-resize-observer";
        if (resizeObserverErrDiv)
          resizeObserverErrDiv.className = "hide-resize-observer";
      }
    });
  }, []);
  return (
    <div>
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: `100%` }} src={fadeImage.url} />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
