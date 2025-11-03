import {BrowserRouter} from "react-router-dom";
import AppRouter from "@/router/appRouter.jsx";
import {Provider} from "react-redux";
import {persistor, store} from "@/store/store.js";
import AuthProvider from "@/services/authProvider.jsx";
import GetLocation from "@/services/getLocation.jsx";
import {PersistGate} from "redux-persist/integration/react";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GetLocation />
                <AuthProvider />
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App;