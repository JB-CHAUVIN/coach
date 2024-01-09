import React from "react";
import { ClubSettingsI } from "./ClubSettings.props";
import { View } from "react-native";
import { s } from "./ClubSettings.styles";
import { InputImage } from "../../../../../forms/InputImage/InputImage";
import { Input } from "../../../../../forms/Input/Input";
import { PHRASES } from "../../../../../../constants/phrases";
import { InputSubmit } from "../../../../../forms/InputSubmit/InputSubmit";
import { Form } from "../../../../../forms/Form";
import { getImageUrl } from "../../../../../../hooks/useQuery";
import { useClubSettings } from "./ClubSettings.hooks";

type Inputs = {
  logo: {
    uri: string | null;
  };
  name: string;
};

export const ClubSettings = (p: ClubSettingsI) => {
  const { form, setForm, club, handleSubmit, isLoadingUpload, isLoading } =
    useClubSettings<Inputs>();

  return (
    <View style={s.container}>
      <Form<Inputs> form={form} setForm={setForm}>
        <Input id={"name"} placeholder={PHRASES.FR.CLUB_NAME} />

        <InputImage
          id={"logo"}
          placeholder={PHRASES.FR.PLACEHOLDER_IMAGE_LOGO}
          defaultUrl={
            club?.attributes?.logo?.data?.attributes?.url
              ? getImageUrl(club?.attributes?.logo?.data?.attributes?.url)
              : null
          }
        />

        <InputSubmit
          id={"submit"}
          onPress={handleSubmit}
          isLoading={isLoadingUpload && isLoading}
          label={PHRASES.FR.UPDATE_CLUB}
        />
      </Form>
    </View>
  );
};
