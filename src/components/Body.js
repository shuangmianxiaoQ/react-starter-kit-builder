import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from '../styles/index.scss';
import buttonStyles from '../styles/button.scss';
import bodyStyles from '../styles/body.scss';

const FIRST_IMAGE_ID = 1;
const SECOND_IMAGE_ID = 2;

class Body extends PureComponent {
  static defaultProps = {
    imageToShow: 3,
    switchImage: () => {}
  };

  static propTypes = {
    imageToShow: PropTypes.number,
    switchImage: PropTypes.func
  };

  _handleClick = () => {
    const { imageToShow, switchImage } = this.props;

    // 切换图片
    imageToShow === FIRST_IMAGE_ID ? switchImage(SECOND_IMAGE_ID) : switchImage(FIRST_IMAGE_ID);
  };

  render() {
    const { imageToShow } = this.props;

    console.log(process.env.SERVERIP);

    return (
      <div className={styles.body}>
        <button type="button" onClick={this._handleClick} className={buttonStyles.button}>
          <TransitionGroup className={bodyStyles.animWrap}>
            <CSSTransition classNames="mainImage" timeout={500} key={imageToShow}>
              <img className={styles.bodyImg} src={`../assets/${imageToShow}.png`} alt="main_img" />
            </CSSTransition>
          </TransitionGroup>
        </button>
      </div>
    );
  }
}

export default Body;
