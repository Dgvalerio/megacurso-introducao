export interface LoadSurveyList {
  loadAll(): Promise<LoadSurveyList.Model[]>;
}

export namespace LoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    answers: {
      image?: string;
      answer: string;
    }[];
    date: Date;
    didAnswer: boolean;
  };
}
