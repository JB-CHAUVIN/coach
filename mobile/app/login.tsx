import React, { useLayoutEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SIZES } from "../constants/sizes";
import { PHRASES } from "../constants/phrases";
import { FONTS } from "../constants/fonts";
import { COLORS } from "../constants/colors";
import { Input } from "../components/forms/Input/Input";
import { InputSubmit } from "../components/forms/InputSubmit/InputSubmit";
import { Form } from "../components/forms/Form";
import { useNavigation } from "expo-router";
import { TYPE_STRAPI_IDENTIFICATION } from "../../types/_Strapi";
import { API_ENDPOINTS, useQuery } from "../hooks/useQuery";
import { setToken, setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/store";
import * as Updates from "expo-updates"

type Inputs = {
  identifier: string;
  password: string;
};

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Inputs>({
    identifier: "",
    password: "",
  });
  const isLoading = false;

  const { handleQuery } = useQuery(API_ENDPOINTS.LOGIN);

  const navigation = useNavigation();
  const handleSubmit = () => {
    handleQuery("POST", {
      body: {
        identifier: form.identifier,
        password: form.password,
      },
      onSuccess: (i: TYPE_STRAPI_IDENTIFICATION) => {
        dispatch(setUser(i?.user));
        dispatch(setToken(i?.jwt));

        alert('TODO - reload')
        Updates.reloadAsync();
      },
      isStrapi: false,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={s.container}>
      <Image
        style={s.image}
        resizeMode={"contain"}
        source={require("../assets/images/logo/logo-transaprent-small-res.png")}
      />

      <View style={s.containerForm}>
        <Form<Inputs> form={form} setForm={setForm}>
          <Input
            id={"identifier"}
            placeholder={PHRASES.FR.LOGIN_USERNAME}
            icon={"email"}
            autoCapitalize={"none"}
          />

          <Input
            id={"password"}
            placeholder={PHRASES.FR.LOGIN_PASSWORD}
            icon={"form-textbox-password"}
            secureTextEntry={true}
            autoCapitalize={"none"}
          />

          <InputSubmit
            id={"submit"}
            onPress={handleSubmit}
            isLoading={isLoading}
            label={PHRASES.FR.LOGIN_SUBMIT}
          />
        </Form>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  containerForm: {
    width: "100%",
  },

  textTitle: {
    fontSize: 30,
    color: COLORS.text,
    fontFamily: FONTS.Bold,
  },

  image: {
    width: SCREEN_WIDTH - SIZES.PADDING_PAGE * 2,
    marginBottom: -40,
  },
});
