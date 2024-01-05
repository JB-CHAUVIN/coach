import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch } from "../store/store";
import { Form } from "../components/forms/Form";
import { phraseParse, PHRASES } from "../constants/phrases";
import { InputSubmit } from "../components/forms/InputSubmit/InputSubmit";
import { API_ENDPOINTS, useQuery } from "../hooks/useQuery";
import { useNavigation } from "expo-router";
import { TYPE_EVENTS } from "../../types/Events";
import { TYPE_STRAPI_RESULT } from "../../types/_Strapi";
import { Input } from "../components/forms/Input/Input";
import { FORM_VALIDATIONS_FN } from "../components/forms/Form.utils";
import { TYPE_USER } from "../../types/User";
import { setUser } from "../store/slices/userSlice";
import { InputSelect } from "../components/forms/InputSelect/InputSelect";
import { TYPE_CLUB } from "../../types/Club";
import { formatStrapiResultsForSelect } from "../components/forms/InputSelect/InputSelect.utils";
import { TYPE_SELECT_ITEMS } from "../components/forms/InputSelect/InputSelect.props";

type Inputs = {
  name?: string;
  clubChoices?: {
    value: string;
    label: string;
  };
};

type TYPE_RESULT_SEARCH = Array<TYPE_STRAPI_RESULT<TYPE_CLUB>>;

export default function ModalScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [clubs, setClubs] = useState<TYPE_SELECT_ITEMS>([]);

  let defaultValues: Inputs = {
    name: "",
    clubChoices: undefined,
  };

  const [form, setForm] = React.useState<Inputs>(defaultValues);

  const { handleQuery, isLoading } = useQuery(
    API_ENDPOINTS.CLUB_CRUD + "?filters[name][$containsi]=" + form?.name,
  );
  const { handleQuery: handleQueryJoinClub, isLoading: isLoadingJoinClub } =
    useQuery(API_ENDPOINTS.CLUB_JOIN);
  const { handleQuery: handleQueryUser, isLoading: isLoadingUser } = useQuery(
    API_ENDPOINTS.USER_ME,
  );

  const clubName = form?.clubChoices?.label;

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        clubChoices: undefined,
      };
    });

    handleQuery("GET", {
      onSuccess: (data: TYPE_RESULT_SEARCH) => {
        setClubs(
          formatStrapiResultsForSelect<TYPE_CLUB>(
            data,
            "attributes.name",
            "id",
          ),
        );
      },
    });
  }, [form?.name]);

  const handleSubmit = () => {
    handleQueryJoinClub("PUT", {
      body: {
        clubId: form?.clubChoices?.value,
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
          placeholder={PHRASES.FR.SEARCH_CLUB}
          icon={"text-box-search-outline"}
          validation={FORM_VALIDATIONS_FN.string}
        />

        {clubs && clubs.length > 0 ? (
          <InputSelect
            id={"clubChoices"}
            options={clubs}
            placeholder={PHRASES.FR.CLUB_NAME_FIND}
            icon={"card-text"}
            validation={FORM_VALIDATIONS_FN.select}
            keepOpen={true}
          />
        ) : (
          <View />
        )}

        <InputSubmit
          id={"submit"}
          onPress={handleSubmit}
          isLoading={isLoading || isLoadingUser}
          label={
            clubName
              ? phraseParse(PHRASES.FR.JOIN_THIS_CLUB, { clubName })
              : PHRASES.FR.JOIN_A_CLUB
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
