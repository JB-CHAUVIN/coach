import React, { useState } from "react";
import { ClubSettingsI } from "./ClubSettings.props";
import { Platform, View } from "react-native";
import { s } from "./ClubSettings.styles";
import { InputImage } from "../../../../../forms/InputImage/InputImage";
import { Input } from "../../../../../forms/Input/Input";
import { PHRASES } from "../../../../../../constants/phrases";
import { InputSubmit } from "../../../../../forms/InputSubmit/InputSubmit";
import { Form } from "../../../../../forms/Form";
import {
  API_ENDPOINTS,
  getImageUrl,
  useQuery,
} from "../../../../../../hooks/useQuery";
import { useAppSelector } from "../../../../../../store/store";
import { TYPE_IMAGE_API_RESULT } from "../../../../../../../types/Media";
import { useNavigation } from "expo-router";
import { TYPE_STRAPI_RESULT } from "../../../../../../../types/_Strapi";
import { TYPE_CLUB } from "../../../../../../../types/Club";
import { SELECTOR_CLUBS_QUERY } from "../../../../../../store/selectors/selectorClubs";

type Inputs = {
  logo: {
    uri: string | null;
  };
  name: string;
};

export const ClubSettings = (p: ClubSettingsI) => {
  const club: TYPE_STRAPI_RESULT<TYPE_CLUB> =
    useAppSelector(SELECTOR_CLUBS_QUERY);

  const [form, setForm] = useState<Inputs>({
    name: club?.attributes?.name,
    logo: {
      uri: null,
    },
  });

  const navigation = useNavigation();
  const { handleQuery, isLoading } = useQuery(
    API_ENDPOINTS.CLUB_CRUD + "/" + club?.id,
  );
  const { handleQuery: handleQueryUpload, isLoading: isLoadingUpload } =
    useQuery(API_ENDPOINTS.UPLOAD);

  const handleUpdateClub = (logoId: number | null) => {
    const body = {
      name: form?.name,
    };

    if (logoId) {
      body["logo"] = logoId;
    }

    handleQuery("PUT", {
      body,
      onSuccess: (i: any) => {
        navigation.goBack();
      },
    });
  };

  const handleSubmit = async () => {
    let formData = new FormData();

    const hasImage = form?.logo?.uri;
    if (typeof hasImage === "string") {
      formData.append("files", {
        name: "test.jpg",
        uri:
          Platform.OS === "ios"
            ? form?.logo?.uri.replace("file://", "")
            : form?.logo?.uri,
      });
    }

    if (hasImage) {
      handleQueryUpload("POST", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        extraFetchOptions: {
          body: formData,
        },
        onSuccess: (i: TYPE_IMAGE_API_RESULT) => {
          if (i?.[0]?.id) {
            handleUpdateClub(i?.[0]?.id);
          }
        },
      });
    } else {
      handleUpdateClub(null);
    }
  };

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
