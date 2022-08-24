import { Fragment } from 'react';
import MainHeader from './main-header';

import MainNavigation from './main-navigation';

function Layout(props) {
  return (
    <Fragment>
      {/* <MainNavigation /> */}
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
