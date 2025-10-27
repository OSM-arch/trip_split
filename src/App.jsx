import {BrowserRouter} from "react-router-dom";
import AppRouter from "@/router/appRouter.jsx";
import {Provider} from "react-redux";
import {store} from "@/store/store.js";
import AuthProvider from "@/services/authProvider.jsx";

const App = () => {
    return (
        <Provider store={store}>
            <AuthProvider />
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}

export default App;