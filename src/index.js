import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store, history} from './store';
import {BrowserRouter} from 'react-router-dom';
import App from "./components/App/App";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);
