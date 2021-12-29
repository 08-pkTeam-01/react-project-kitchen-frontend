import Banner from './Banner';
import MainView from './MainView';
import React, {useEffect} from 'react';
import Tags from './Tags';
import agent from '../../agent';
import {connect} from 'react-redux';
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER,
} from '../../constants/actionTypes';
import indexStyles from './index.module.scss'


const mapStateToProps = (state) => ({
    ...state.home,
    appName: state.common.appName,
    token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
    onClickTag: (tag, pager, payload) =>
        dispatch({type: APPLY_TAG_FILTER, tag, pager, payload}),
    onLoad: (tab, pager, payload) =>
        dispatch({type: HOME_PAGE_LOADED, tab, pager, payload}),
    onUnload: () => dispatch({type: HOME_PAGE_UNLOADED}),
    testProps: () => console.log('test')
});


const Home = ({appName, onClickTag, onLoad, onUnload, token, tags,}) => {
    const tab = token ? 'feed' : 'all';
    const articlesPromise = token ? agent.Articles.feed : agent.Articles.all;

    useEffect(() => {
        onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]))

        return () => {
            onUnload()
        }
    }, [])

    return (
        <section className={indexStyles.wrappedContainer}>
            <Banner token={token} appName={appName}/>
            <div className={indexStyles.innerContainer}>
                <div className='container page'>
                    <div className='row'>
                        <MainView/>
                        <div className='col-md-3'>
                            <div className={`sidebar ${indexStyles.tagsInnerContainer}`}>
                                <p className={indexStyles.description}>Популярные теги</p>
                                <Tags
                                    tags={tags}
                                    onClickTag={onClickTag}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
