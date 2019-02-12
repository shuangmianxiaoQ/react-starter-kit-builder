import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Route, withRouter } from 'react-router-dom';

import { Header, Footer } from '../components';

// import { Body } from '../containers/Wrappers';
import styles from '../styles/index.scss';

const CoreLayout = () => (
  <div className={styles.appWrapper}>
    <Header />
    {/* <Route exact path="/" component={Body} /> */}
    <Footer />
  </div>
);

export default withRouter(CoreLayout);
