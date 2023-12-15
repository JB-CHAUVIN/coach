import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AgendaDay } from "../AgendaDay/AgendaDay";
import { setCurrentDate } from "../../../../../store/slices/agendaSlice";
import moment from "moment/moment";
import { Agenda as AgendaRNCal, LocaleConfig } from "react-native-calendars";
import { useAppDispatch } from "../../../../../store/store";
import { API_ENDPOINTS, useQuery } from "../../../../../hooks/useQuery";
import { s } from "./Agenda.styles";
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

type AgendaProps = {};

const Agenda: React.FC<AgendaProps> = (p) => {
  const {} = p || {};
  const dispatch = useAppDispatch();

  const { isLoading, data, handleQuery } = useQuery(API_ENDPOINTS.EVENT);

  useEffect(() => {
    handleQuery("GET");
  }, []);

  const items = [{}];

  return (
    <View style={s.container}>
      {!isLoading ? (
        <AgendaRNCal
          renderDay={(day, item) => {
            return <AgendaDay day={day} item={item} />;
          }}
          refreshing={false}
          items={items}
          onDayPress={(day) => {
            dispatch(setCurrentDate(moment(day?.dateString).toISOString()));
          }}
          renderEmptyData={() => {
            return (
              <View>
                <Text>Salut</Text>
              </View>
            );
          }}
        />
      ) : (
        <View style={s.containerLoading}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export { Agenda };
