import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "../store/store";
import { InputDate } from "../components/forms/InputDate/InputDate";
import { Form } from "../components/forms/Form";
import { InputSelect } from "../components/forms/InputSelect/InputSelect";
import { EVENTS_TYPES } from "../constants/_features/events/eventsTypes";
import moment from "moment";
import { PHRASES } from "../constants/phrases";
import {InputSubmit} from "../components/forms/InputSubmit/InputSubmit";

type Inputs = {
  date: Date;
  type: any;
  typeVariation: any;
};

const optionsTime = [
  {
    label: "Matin",
  },
  {
    label: "Midi",
  },
  {
    label: "Après-midi",
  },
  {
    label: "Soir",
  },
];

const optionsType = EVENTS_TYPES;

export default function ModalScreen() {
  const currentDate = useAppSelector((s) => s?.agenda?.currentDate);

  const defaultValues = {
    date: moment(currentDate).toDate(),
  };
  const [form, setForm] = React.useState<Inputs>(defaultValues);

  const onSelectType = () => {
    setForm((prev) => {
      return {
        ...prev,
        typeVariation: null,
      };
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
        />

        <InputSubmit id={"submit"} />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
