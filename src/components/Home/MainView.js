import ArticleList from '../ArticleList/ArticleList';
import React from 'react';
import agent from '../../agent';
import {connect} from 'react-redux';
import {CHANGE_TAB} from '../../constants/actionTypes';
import MainViewStyles from './MainView.module.scss'

const YourFeedTab = ({token, tab, onTabClick}) => {
    if (token) {
        const clickHandler = (event) => {
            event.preventDefault();
            onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
        };

        return (
            <li className={tab === 'feed' ? MainViewStyles.itemActive  : MainViewStyles.item}>
                <button
                    className={MainViewStyles.button}
                    onClick={clickHandler}
                >
                    Ваша лента
                </button>
            </li>
        );
    }
    return null;
};

const GlobalFeedTab = ({onTabClick, tab}) => {
    const clickHandler = (event) => {
        event.preventDefault();
        onTabClick('all', agent.Articles.all, agent.Articles.all());
    };

    return (
        <li className={tab === 'all' ? MainViewStyles.itemActive  : MainViewStyles.item}>
            <button
                className={MainViewStyles.button}
                onClick={clickHandler}
            >
                Лента
            </button>
        </li>
    );
};

const TagFilterTab = ({tag}) => {
    return !tag ? null : (
        <li className='nav-item'>
            <a href='' className='nav-link active'>
                <i className='ion-pound'></i> {tag}
            </a>
        </li>
    );

};

const mapStateToProps = (state) => ({
    ...state.articleList,
    tags: state.home.tags,
    token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
    onTabClick: (tab, pager, payload) =>
        dispatch({type: CHANGE_TAB, tab, pager, payload}),
});

const MainView = (props) => {
    return (
        <div className='col-md-9'>
            <div className='feed-toggle'>
                <ul className={MainViewStyles.list}>
                    <YourFeedTab
                        token={props.token}
                        tab={props.tab}
                        onTabClick={props.onTabClick}
                    />

                    <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick}/>

                    <TagFilterTab tag={props.tag}/>
                </ul>
            </div>

            <ArticleList
                pager={props.pager}
                articles={props.articles}
                loading={props.loading}
                articlesCount={props.articlesCount}
                currentPage={props.currentPage}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
