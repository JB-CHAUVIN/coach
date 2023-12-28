export const FORM_VALIDATIONS_FN = {
  email: (email: string) => {
    const testEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return testEmail;
  },
  password: (password: string) => {
    return password.length > 5;
  },
  username: (username: string) => {
    return username.length > 4;
  },
  nullable: () => {
    return true;
  },
  select: (item: any) => {
    return item && item !== null;
  },
  number: (number: string) => {
    return !isNaN(Number(number));
  }
};
