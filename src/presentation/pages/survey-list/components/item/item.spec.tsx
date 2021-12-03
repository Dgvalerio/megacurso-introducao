/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import React from 'react';

import { mockSurveyModel } from '../../../../../domain/test';
import { IconName } from '../../../../components';
import Item from './item';

const makeSut = (survey = mockSurveyModel()): void => {
  render(<Item survey={survey} />);
};

describe('Item Component', () => {
  test('Should render with correct values (when didAnswer is true)', () => {
    const survey = Object.assign(mockSurveyModel(), { didAnswer: true });

    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });

  test('Should render with correct values (when didAnswer is false)', () => {
    const survey = Object.assign(mockSurveyModel(), { didAnswer: false });

    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });
});
