/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { mockAccountModel } from '../../../domain/test';
import { ApiContext } from '../../contexts';
import PrivateRoute from './private-route';

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  render(
    <Router history={history}>
      <ApiContext.Provider
        value={{
          getCurrentAccount: () => account,
        }}
      >
        <PrivateRoute />
      </ApiContext.Provider>
    </Router>
  );

  return { history };
};

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null);

    expect(history.location.pathname).toBe('/login');
  });

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut();

    expect(history.location.pathname).toBe('/');
  });
});
