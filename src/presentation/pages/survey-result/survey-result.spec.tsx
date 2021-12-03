// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, render } from '@testing-library/react';
import React from 'react';

import { mockAccountModel } from '../../../domain/test';
import { ApiContext } from '../../contexts';
import SurveyResult from './survey-result';

describe('SurveyResult Component', () => {
  test('Should present correct initial state', () => {
    render(
      <ApiContext.Provider
        value={{
          setCurrentAccount: jest.fn(),
          getCurrentAccount: () => mockAccountModel(),
        }}
      >
        <SurveyResult />
      </ApiContext.Provider>
    );

    const surveyResult = screen.getByTestId('survey-result');

    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
