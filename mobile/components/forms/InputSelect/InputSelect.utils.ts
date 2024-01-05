import { TYPE_STRAPI_RESULT } from "../../../../types/_Strapi";
import { get } from 'lodash';

export const formatStrapiResultsForSelect = <T>(
  results: Array<TYPE_STRAPI_RESULT<T>>,
  fieldName: string,
  fieldValue: string,
) => {
  return results.map((r) => ({
    // @ts-ignore
    label: get(r, fieldName),
    // @ts-ignore
    value: get(r, fieldValue)
  }));
};
