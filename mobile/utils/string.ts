export const stringUcFirst = (str: string): string => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

/**
 * Un fonction qui prends un nombre infini de paramètre, pour concat des strings.
 * Exemple : append('Salut', 'JB') retournera : Salut JB (avec un espace entre Salut et JB).
 *
 * @param args
 * @returns {string}
 */
export const stringConcat = (...args: any[]) => {
  let res = "";
  let separator = " ";
  const lastItem = args[args.length - 1];

  // some options.
  let removeLastOptionArg = false;
  if (typeof lastItem === "object") {
    if (typeof lastItem.separator !== "undefined") {
      // eslint-disable-next-line prefer-destructuring
      separator = lastItem.separator;
      removeLastOptionArg = true;
    }
  }

  if (removeLastOptionArg) {
    args.pop();
  }

  // eslint-disable-next-line guard-for-in
  for (const i in args) {
    const item = args[i]?.toString?.();
    if (res && typeof res !== 'undefined' && res.length > 0 && item && item.length > 0) {
      res += separator;
    }

    if (item) {
      res += item;
    }
  }

  return res;
};
