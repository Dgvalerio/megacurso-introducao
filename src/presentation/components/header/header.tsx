import React, { FC, memo } from 'react';

import { Logo } from '../index';
import Styles from './header-styles.scss';

const Header: FC = () => (
  <header className={Styles.headerWrap}>
    <div className={Styles.headerContent}>
      <Logo />
      <div className={Styles.logoutWrap}>
        <span>Davi</span>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">Sair</a>
      </div>
    </div>
  </header>
);

export default memo(Header);
