import React, { useRef, useEffect } from "react";

const FlutterApp = () => {
  useEffect(() => {
    import("castielflutter/App")
      .then((module) => {
        const script = document.createElement("script");
        script.src = "http://localhost:3013/remoteEntry.js";
        document.body.appendChild(script);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div id="flutter-container"></div>;
};

export default FlutterApp;
