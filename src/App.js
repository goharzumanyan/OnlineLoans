import "./App.css";
import AppConfigProvider from "./AppConfig";
import Header from "./components/header";
import AppRoutes from "./routes";

import { AppProvider } from "./stores/app-provider";
import { SessionProvider } from "./stores/session";

function App() {
  return (
    <SessionProvider>
      <AppConfigProvider>
        <AppProvider>
          <div className="App">
            <Header />
            <div className="content">
              <div
                className="content_inner custom_container"
                style={{ backgroundImage: `url(/resources/images/decor.svg)` }}
              >
                <AppRoutes />
              </div>
            </div>
          </div>
        </AppProvider>
      </AppConfigProvider>
    </SessionProvider>
  );
}

export default App;
