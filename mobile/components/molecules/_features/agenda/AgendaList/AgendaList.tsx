import React, { useCallback, useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { AgendaDay } from "../AgendaDay/AgendaDay";
import { s } from "./AgendaList.styles";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import { AgendaHeader } from "../AgendaHeader/AgendaHeader";
import { AgendaHeaderCoach } from "../AgendaHeaderCoach/AgendaHeaderCoach";
import { AgendaEmpty } from "../AgendaEmpty/AgendaEmpty";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import Swiper from "react-native-swiper";
import moment, { Moment } from "moment";
import { enumerateDaysBetweenDates } from "../../../../../utils/date";
import { setCurrentDate } from "../../../../../store/slices/agendaSlice";

type AgendaListProps = {
  agendaItems: {
    items: {
      [key: string]: TYPE_EVENTS[];
    };
  };
};

const AgendaList: React.FC<AgendaListProps> = (p) => {
  const { agendaItems: agenda } = p || {};
  const dispatch = useAppDispatch();

  const items = Object.values(agenda?.items);

  const isCoach = useAppSelector((s) => s?.user?.isCoach);
  const HeaderComponent = isCoach ? AgendaHeaderCoach : AgendaHeader;

  // placeholder purpose
  const placeholderDates = useMemo(() => {
    const oneOfTheWeekDate = items?.[0]?.[0]?.date;
    const dateBeforeWeek = moment(oneOfTheWeekDate).clone().subtract(7, "days");
    const weekBefore = {
      start: dateBeforeWeek.clone().startOf("week"),
      end: dateBeforeWeek.clone().endOf("week"),
    };
    const dateAfterWeek = moment(oneOfTheWeekDate).clone().add(7, "days");
    const weekAfter = {
      start: dateAfterWeek.clone().startOf("week"),
      end: dateAfterWeek.clone().endOf("week"),
    };

    return {
      weekBefore,
      weekAfter,
    };
  }, [items?.[0]?.[0]?.date]);

  const renderSkeleton = useCallback(
    (from: moment.Moment, to: moment.Moment) => {
      const dates = enumerateDaysBetweenDates(from, to);
      const items = dates.map(
        (d) =>
          [
            {
              fake: true,
              date: d,
            },
          ] as any,
      );

      return (
        <View style={[s.container, { opacity: 0.5 }]}>
          <FlatList
            data={items}
            renderItem={(item) => <AgendaDay item={item?.item} />}
          />
        </View>
      );
    },
    [JSON.stringify(placeholderDates)],
  );

  const onIndexChanged = (index: number) => {
    let date: boolean | Moment = false;
    if (index === 0) {
      date = placeholderDates.weekBefore.start;
    } else if (index === 2) {
      date = placeholderDates.weekAfter.start;
    }

    if (typeof date !== "boolean") {
      dispatch(setCurrentDate(moment(date)));
    }
  };

  return (
    <View style={s.container}>
      <Swiper
        index={1}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={onIndexChanged}
      >
        <View style={s.slide}>
          {renderSkeleton(
            placeholderDates.weekBefore.start,
            placeholderDates.weekBefore.end,
          )}
        </View>
        <View style={s.slide}>
          <FlatList
            ListHeaderComponent={() =>
              items.length > 0 ? <HeaderComponent /> : null
            }
            ListEmptyComponent={() => <AgendaEmpty />}
            ListFooterComponent={() => <View style={s.containerFooter} />}
            data={items}
            renderItem={(item) => <AgendaDay item={item?.item} />}
          />
        </View>
        <View style={s.slide}>
          {renderSkeleton(
            placeholderDates.weekAfter.start,
            placeholderDates.weekAfter.end,
          )}
        </View>
      </Swiper>
    </View>
  );
};

export { AgendaList };
