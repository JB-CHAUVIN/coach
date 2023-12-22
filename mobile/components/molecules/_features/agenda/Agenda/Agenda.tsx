import React from "react";
import { ActivityIndicator, View } from "react-native";
import { setCurrentDate } from "../../../../../store/slices/agendaSlice";
import moment from "moment/moment";
import { Agenda as AgendaRNCal, LocaleConfig } from "react-native-calendars";
import { useAppDispatch } from "../../../../../store/store";
import { s } from "./Agenda.styles";
import { useAgendaEvents } from "./Agenda.hooks";
import { FONTS } from "../../../../../constants/fonts";
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

  const { isLoading, events, currentDate } = useAgendaEvents();

  return (
    <View style={s.container}>
      {!isLoading ? (
        <AgendaRNCal
          firstDay={1}
          selected={moment(currentDate).format("YYYY-MM-DD")}
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
            dispatch(setCurrentDate(moment(day?.dateString)));
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
