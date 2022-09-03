import React, { useEffect } from "react";

// TODO: Modify this interface in accordance with the application configuration model

/* eslint vars-on-top: 0 */
// declare global {
//   // eslint-disable-next-line
//   var appConfig: AppConfig
// }
// export interface AppConfig {
//   externalApiUrl1?: string
//   environmentName?: string
// }

const emptyConfig = {};

const AppConfigProvider = ({ children }) => {
  const [configLoaded, setConfigLoaded] = React.useState(false);

  const loadAppConfigs = async function () {
    return fetch("/api/config").then((response) => {
      if (!response.ok) {
        console.log("Error reading the configuration", response);
        return emptyConfig;
      }
      return response.json();
    });
  };

  useEffect(() => {
    loadAppConfigs().then((config) => {
      global.appConfig = config;
      setConfigLoaded(true);
    });
  }, []);

  return <div>{configLoaded ? children : null}</div>;
};

export default AppConfigProvider;
