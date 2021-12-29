import React from 'react';
import agent from '../../agent';

const Tags = ({tags, onClickTag}) => {
    return tags ? (
        <div className="tag-list">
            {
                tags.map(tag => {
                    const handleClick = (event) => {
                        event.preventDefault();
                        onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
                    };
                    return (
                        <a
                            href=""
                            className="tag-default tag-pill"
                            key={tag}
                            onClick={handleClick}>
                            {tag}
                        </a>
                    );
                })
            }
        </div>
    ) : (
        <div>Loading Tags...</div>
    );
};

export default Tags;
