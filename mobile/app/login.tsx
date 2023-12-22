import React, { useLayoutEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
import * as Updates from "expo-updates";
import { Text } from "../components/atoms/Text";
import { FORM_VALIDATIONS_FN } from "../components/forms/Form.utils";

type Inputs = {
  identifier: string;
  email?: string;
  password: string;
  username?: string;
};

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Inputs>({
    identifier: "",
    password: "",
    email: "",
    username: "",
  });
  const isLoading = false;

  const [isRegister, setIsRegister] = useState(false);

  const { handleQuery } = useQuery(
    !isRegister ? API_ENDPOINTS.LOGIN : API_ENDPOINTS.REGISTER,
  );

  const navigation = useNavigation();
  const handleSubmit = () => {
    let body: Inputs = {
      identifier: form.identifier,
      password: form.password,
    };

    if (isRegister) {
      body = {
        username: form.username,
        email: form?.identifier,
        password: form?.password,
        identifier: "",
      };
    }

    handleQuery("POST", {
      body,
      onSuccess: (i: TYPE_STRAPI_IDENTIFICATION) => {
        dispatch(setUser(i?.user));
        dispatch(setToken(i?.jwt));

        // should work in production
        setTimeout(() => {
          Updates.reloadAsync();
        }, 100);
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
            validation={FORM_VALIDATIONS_FN.email}
          />

          {isRegister ? (
            <Input
              id={"username"}
              placeholder={PHRASES.FR.USERNAME}
              icon={"contacts"}
              autoCapitalize={"none"}
              validation={FORM_VALIDATIONS_FN.username}
            />
          ) : (
            <View />
          )}

          <Input
            id={"password"}
            placeholder={PHRASES.FR.LOGIN_PASSWORD}
            icon={"form-textbox-password"}
            secureTextEntry={true}
            autoCapitalize={"none"}
            validation={FORM_VALIDATIONS_FN.password}
          />

          <InputSubmit
            id={"submit"}
            onPress={handleSubmit}
            isLoading={isLoading}
            label={!isRegister ? PHRASES.FR.LOGIN_SUBMIT : PHRASES.FR.REGISTER}
          />
        </Form>
      </View>

      <TouchableOpacity
        style={s.buttonRegister}
        onPress={() => setIsRegister((prev) => !prev)}
      >
        <Text style={s.textRegister}>
          {isRegister ? PHRASES.FR.LOGIN_SUBMIT : PHRASES.FR.REGISTER}
        </Text>
      </TouchableOpacity>
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

  // texts
  textRegister: {
    textDecorationLine: "underline",
    color: COLORS.text,
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

  // buttons
  buttonRegister: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
