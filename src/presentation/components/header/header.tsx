import React, { FC, memo, useContext } from 'react';

import { ApiContext } from '../../contexts';
import { useLogout } from '../../hooks';
import { Logo } from '../index';
import Styles from './header-styles.scss';

const Header: FC = () => {
  const logout = useLogout();
  const { getCurrentAccount } = useContext(ApiContext);

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    logout();
  };

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" data-testid="logout" onClick={handleLogout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
