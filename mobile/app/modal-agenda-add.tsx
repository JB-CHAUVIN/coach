import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { InputDate } from "../components/forms/InputDate/InputDate";
import { Form } from "../components/forms/Form";
import { InputSelect } from "../components/forms/InputSelect/InputSelect";
import { EVENTS_TYPES } from "../constants/_features/events/eventsTypes";
import moment from "moment";
import { PHRASES } from "../constants/phrases";
import { InputSubmit } from "../components/forms/InputSubmit/InputSubmit";
import { API_ENDPOINTS, QUERY_IDS, useQuery } from "../hooks/useQuery";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { TYPE_EVENTS } from "../../types/Events";
import { addStoreItem, updateStoreItem } from "../store/slices/querySlices";
import { TYPE_STRAPI_RESULT } from "../../types/_Strapi";
import { Input } from "../components/forms/Input/Input";

type Inputs = {
  date: Date;
  time?: {
    value: string;
  };
  type?: {
    value: string;
    variations?: any;
  };
  typeVariation?:
    | {
        label: string;
      }
    | undefined;
  distance?: number;
};

const optionsTime = [
  {
    label: "Matin",
    value: "matin",
  },
  {
    label: "Midi",
    value: "midi",
  },
  {
    label: "Après-midi",
    value: "apres-midi",
  },
  {
    label: "Soir",
    value: "soir",
  },
];

const optionsType = EVENTS_TYPES;

type TypeLocalSearchParams = {
  item?: TYPE_EVENTS;
};

export default function ModalScreen() {
  const currentDate = useAppSelector((s) => s?.agenda?.currentDate);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // @ts-ignore...
  const { item } = useLocalSearchParams<TypeLocalSearchParams>();

  let isUpdate = false;
  let defaultValues: Inputs = {
    date: moment(currentDate).toDate(),
    distance: 0,
  };

  console.log('item', item);

  if (item) {
    isUpdate = true;
    defaultValues = {
      ...defaultValues,
      date: moment(item.date).toDate(),
      distance: item?.distance,
      time: {
        value: item.time,
      },
      type: {
        value: item.seance,
      },
      typeVariation: {
        label: item.seance_variation,
      },
    };
  }

  const [form, setForm] = React.useState<Inputs>(defaultValues);

  const { handleQuery, isLoading } = useQuery(API_ENDPOINTS.EVENT_CRUD);

  const onSelectType = () => {
    setForm((prev) => {
      return {
        ...prev,
        typeVariation: undefined,
      };
    });
  };

  const handleSubmit = () => {
    handleQuery(isUpdate ? "PUT" : "POST", {
      body: {
        id: item?.id,
        date: moment(form?.date)
          .add(1, "hour")
          .toISOString(), // fix date adding on wrong date
        time: form?.time?.value,
        seance: form?.type?.value,
        seance_variation: form?.typeVariation?.label,
        done: typeof item?.done !== "undefined" ? item?.done : false,
        distance: form?.distance || 0,
      },
      onSuccess: (i: TYPE_STRAPI_RESULT<TYPE_EVENTS>) => {
        if (!isUpdate) {
          dispatch(addStoreItem({ key: QUERY_IDS.HOME_ITEMS, value: i }));
        } else {
          dispatch(updateStoreItem({ key: QUERY_IDS.HOME_ITEMS, value: i }));
        }
        navigation.goBack();
      },
    });
  };

  return (
    <View style={styles.container}>
      <Form<Inputs> form={form} setForm={setForm}>
        <InputDate id={"date"} />

        <InputSelect
          id={"time"}
          options={optionsTime}
          horizontal={true}
          placeholder={PHRASES.FR.PLACEHOLDER_FORM_EVENT_ADD_TIME}
          icon={"clock-in"}
        />

        <InputSelect
          id={"type"}
          options={Object.values(optionsType)}
          onSelect={onSelectType}
          placeholder={PHRASES.FR.PLACEHOLDER_FORM_TYPE}
        />

        <InputSelect
          id={"typeVariation"}
          options={form["type"]?.variations}
          placeholder={PHRASES.FR.PLACEHOLDER_FORM_TYPE_VARIATION}
          icon={"information-variant"}
        />

        <Input
          id={"distance"}
          placeholder={PHRASES.FR.PLACEHOLDER_FORM_DISTANCE}
          icon={"map-marker-distance"}
          keyboardType={"numeric"}
        />

        <InputSubmit
          id={"submit"}
          onPress={handleSubmit}
          isLoading={isLoading}
          label={
            isUpdate
              ? PHRASES.FR.PLACEHOLDER_FORM_EDIT
              : PHRASES.FR.PLACEHOLDER_FORM_SUBMIT
          }
        />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
