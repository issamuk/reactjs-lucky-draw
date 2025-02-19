// @flow

import * as React from 'react';
import './SiteWrapper.css';
import { APP_NAME, NAVBAR_ITEMS } from './constants.js';
import { Site } from 'tabler-react';
import Copyright from './components/Copyright';
import FooterNote from './components/FooterNote';
import NavBar from './components/NavBar';
import NavItems from './components/NavItems';

class SiteWrapper extends React.Component {
  render() {
    return (
      <Site.Wrapper
        headerProps={{
          href: '/',
          alt: APP_NAME,
          imageURL: 'https://extra2.bsgi.org.br/static/seigangeneration/img/logo_seigan_br.svg',
          navItems: <></>,
        }}
        navProps={{ itemsObjects: [] }}
        footerProps={{
          note: <></>,
          copyright: <></>,
          nav: <></>,
        }}
      >
        <div className="container main-section">{this.props.children}</div>
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
