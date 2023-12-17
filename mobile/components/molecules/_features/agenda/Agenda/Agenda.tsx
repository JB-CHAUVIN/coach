import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { AgendaDay } from "../AgendaDay/AgendaDay";
import { setCurrentDate } from "../../../../../store/slices/agendaSlice";
import moment from "moment/moment";
import { Agenda as AgendaRNCal, LocaleConfig } from "react-native-calendars";
import { useAppDispatch } from "../../../../../store/store";
import { API_ENDPOINTS, useQuery } from "../../../../../hooks/useQuery";
import { s } from "./Agenda.styles";
import { useAgendaEvents } from "./Agenda.hooks";
import { FONTS } from "../../../../../constants/fonts";
import constants from "react-native-calendars/src/commons/constants";
import { COLORS } from "../../../../../constants/colors";
import { AgendaList } from "../AgendaList/AgendaList";
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

  const { isLoading, events } = useAgendaEvents();

  return (
    <View style={s.container}>
      {!isLoading ? (
        <AgendaRNCal
          theme={{
            textMonthFontFamily: FONTS.Bold,
            textDayFontFamily: FONTS.Regular,
            textDayHeaderFontFamily: FONTS.SemiBold,
          }}
          renderList={(agenda: any) => {
            return <AgendaList agendaItems={agenda} />;
          }}
          markingType={"multi-dot"}
          refreshing={false}
          items={events.events}
          markedDates={events.dots}
          onDayPress={(day) => {
            dispatch(setCurrentDate(moment(day?.dateString).toISOString()));
          }}
          renderEmptyData={() => {
            return <View />;
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
