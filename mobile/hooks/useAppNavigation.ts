import { useNavigation } from "expo-router";

export const SCREENS = {
  MODAL: {
    agendaAdd: "modal-agenda-add",
    clubAdd: "modal-club-add",
    clubFind: "modal-club-find",
    clubInfo: "modal-club-info",
  },
};

export const useAppNavigation = () => {
  const navigation = useNavigation();

  const navigate = (route: string, params?: any) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const pop = () => {
    navigation.goBack();
  };

  return {
    navigate,
  };
};
