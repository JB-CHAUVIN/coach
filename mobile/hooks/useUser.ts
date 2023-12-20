import { useAppSelector } from "../store/store";

export const useUser = () => {
  const user = useAppSelector((s) => s?.user);

  return {
    user,
    isLoggedIn: user?.item?.id,
  };
};
