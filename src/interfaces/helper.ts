import { SelectQueryInterface } from './query';

interface HelperInterface extends SelectQueryInterface {
    baseQuery?: string;
}

export {
  HelperInterface,
};
