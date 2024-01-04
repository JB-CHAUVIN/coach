import { useAppSelector } from "../store/store";

export const useUser = () => {
  const user = useAppSelector((s) => s?.user);

  const isCoach = () => user?.item?.role2 === 'coach';

  return {
    user,
    isLoggedIn: user?.item?.id,
  };
};
