import React from 'react';
import buttonStyles from './Button.module.scss';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

const Button = ({
  icon = null,
  alt = '',
  title,
  isDisable = false,
  onClick,
}) => {
  return (
    <button
      className={classNames(buttonStyles.wrapper, {
        [buttonStyles.disable]: isDisable,
        [buttonStyles.active]: !isDisable,
      })}
      onClick={onClick}
      disabled={isDisable}
    >
      {icon && <img src={icon} alt={alt} />}
      <span>{title}</span>
    </button>
  );
};
Button.propTypes = {
  icon: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string.isRequired,
  isDisable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;
