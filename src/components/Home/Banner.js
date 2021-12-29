import React from 'react';
import bannerStyles from './Banner.module.scss'

const Banner = ({appName, token}) => {
    if (token) {
        return null;
    }

    return (
        <div className={bannerStyles.wrapperContainer}>
            <div className={`container ${bannerStyles.innerContainer}`}>
                <h1 className={bannerStyles.logo}>
                    {appName}
                </h1>
                <p className={bannerStyles.description}>Место, где готовится новый опыт</p>
            </div>
        </div>
    );
};

export default Banner;
