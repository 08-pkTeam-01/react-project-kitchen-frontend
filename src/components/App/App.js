import agent from '../../agent';
import Header from '../Header/Header';
import React from 'react';
import {connect} from 'react-redux';
import {APP_LOAD, REDIRECT} from '../../constants/actionTypes';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Article from '../Article';
import Editor from '../Editor/Editor';
import Home from '../Home';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ProfileFavorites from '../ProfileFavorites/ProfileFavorites';
import Register from '../Register/Register';
import Settings from '../Settings/Settings';
import {store} from '../../store';
import {push} from 'react-router-redux';
import appStyles from './App.module.scss';
import {
    ROUTE_ARTICLE,
    ROUTE_EDITOR,
    ROUTE_FAVORITES,
    ROUTE_HOME,
    ROUTE_LOGIN,
    ROUTE_REGISTER,
    ROUTE_SETTINGS
} from "../../utils/consts";

const mapStateToProps = (state) => {
    return {
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        currentUser: state.common.currentUser,
        redirectTo: state.common.redirectTo,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLoad: (payload, token) =>
        dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
    onRedirect: () => dispatch({type: REDIRECT}),
});

class App extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            // this.context.router.replace(nextProps.redirectTo);
            store.dispatch(push(nextProps.redirectTo));
            this.props.onRedirect();
        }
    }

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }

        this.props.onLoad(token ? agent.Auth.current() : null, token);
    }

    render() {
        if (this.props.appLoaded) {
            return (
                <>
                    <Header
                        appName={this.props.appName}
                        currentUser={this.props.currentUser}
                    />
                    <Routes>
                        <Route path={ROUTE_HOME} element={<Home/>}/>
                        <Route path={ROUTE_LOGIN} element={<Login/>}/>
                        <Route path={ROUTE_REGISTER} element={<Register/>}/>
                        <Route path={ROUTE_EDITOR+'/:slug'} element={<Editor/>}/>
                        <Route path={ROUTE_EDITOR} element={<Editor/>}/>
                        <Route path={ROUTE_ARTICLE+'/:id'} element={<Article/>}/>
                        <Route path={ROUTE_SETTINGS} element={<Settings/>}/>
                        <Route path={'/@:username'+ROUTE_FAVORITES} element={<ProfileFavorites/>}/>
                        <Route path='/@:username' element={<Profile/>}/>
                    </Routes>
                </>
            );
        }
        return (
            <div>
                <Header
                    appName={this.props.appName}
                    currentUser={this.props.currentUser}
                />
            </div>
        );
    }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
