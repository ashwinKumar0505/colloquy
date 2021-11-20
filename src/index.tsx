import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/es/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import customTheme from "./theme";
import { store, persistor } from "./store/store";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ChakraProvider theme={customTheme}>
            <Router>
              <App />
            </Router>
          </ChakraProvider>
        </Provider>
      </PersistGate>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
