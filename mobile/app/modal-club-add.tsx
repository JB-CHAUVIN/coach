import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch } from "../store/store";
import { Form } from "../components/forms/Form";
import { PHRASES } from "../constants/phrases";
import { InputSubmit } from "../components/forms/InputSubmit/InputSubmit";
import { API_ENDPOINTS, useQuery } from "../hooks/useQuery";
import { useNavigation } from "expo-router";
import { TYPE_EVENTS } from "../../types/Events";
import { TYPE_STRAPI_RESULT } from "../../types/_Strapi";
import { Input } from "../components/forms/Input/Input";
import { FORM_VALIDATIONS_FN } from "../components/forms/Form.utils";
import { TYPE_USER } from "../../types/User";
import { setUser } from "../store/slices/userSlice";

type Inputs = {
  name?: string;
};

export default function ModalScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  let defaultValues: Inputs = {
    name: "",
  };

  const [form, setForm] = React.useState<Inputs>(defaultValues);

  const { handleQuery, isLoading } = useQuery(API_ENDPOINTS.CLUB_CRUD);
  const { handleQuery: handleQueryUser, isLoading: isLoadingUser } = useQuery(
    API_ENDPOINTS.USER_ME,
  );

  const handleSubmit = () => {
    handleQuery("POST", {
      body: {
        name: form?.name,
      },
      onSuccess: (i: TYPE_STRAPI_RESULT<TYPE_EVENTS>) => {
        handleQueryUser("GET", {
          onSuccess: (data: TYPE_USER) => {
            dispatch(setUser(data));
            navigation.goBack();
          },
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <Form<Inputs> form={form} setForm={setForm}>
        <Input
          id={"name"}
          placeholder={PHRASES.FR.CLUB_NAME}
          icon={"card-text"}
          validation={FORM_VALIDATIONS_FN.string}
        />

        <InputSubmit
          id={"submit"}
          onPress={handleSubmit}
          isLoading={isLoading || isLoadingUser}
          label={PHRASES.FR.NO_CLUB_BUTTON}
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
