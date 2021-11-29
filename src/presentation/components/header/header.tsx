import React, { FC, memo, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ApiContext } from '../../contexts';
import { Logo } from '../index';
import Styles from './header-styles.scss';

const Header: FC = () => {
  const history = useHistory();
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);

  const logout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  };

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" data-testid="logout" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
