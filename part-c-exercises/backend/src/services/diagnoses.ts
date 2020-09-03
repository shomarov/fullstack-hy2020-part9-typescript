import { diagnoses } from '../../data/diagnoses';
import { Diagnose } from '../../src/types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
