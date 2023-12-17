import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "../store/store";
import { InputDate } from "../components/forms/InputDate/InputDate";
import { Form } from "../components/forms/Form";
import { InputSelect } from "../components/forms/InputSelect/InputSelect";
import { EVENTS_TYPES } from "../constants/_features/events/eventsTypes";
import moment from "moment";
import { PHRASES } from "../constants/phrases";
import { InputSubmit } from "../components/forms/InputSubmit/InputSubmit";
import { API_ENDPOINTS, useQuery } from "../hooks/useQuery";
import {useNavigation} from "expo-router";

type Inputs = {
  date: Date;
  time?: {
    value: string;
  };
  type?: {
    value: string;
    variations: any;
  };
  typeVariation?:
    | {
        label: string;
      }
    | undefined;
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

export default function ModalScreen() {
  const currentDate = useAppSelector((s) => s?.agenda?.currentDate);
  const navigation = useNavigation();

  const defaultValues = {
    date: moment(currentDate).toDate(),
  };
  const [form, setForm] = React.useState<Inputs>(defaultValues);

  const { handleQuery, isLoading } = useQuery(API_ENDPOINTS.EVENT);

  const onSelectType = () => {
    setForm((prev) => {
      return {
        ...prev,
        typeVariation: undefined,
      };
    });
  };

  const handleSubmit = () => {
    handleQuery("POST", {
      body: {
        date: moment(form?.date).add(1, 'day').toISOString(), // fix date adding on wrong date
        time: form?.time?.value,
        seance: form?.type?.value,
        seanceVariation: form?.typeVariation?.label,
      },
      onSuccess: () => {
        navigation.goBack();
      }
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

        <InputSubmit
          id={"submit"}
          onPress={handleSubmit}
          isLoading={isLoading}
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
