import { useNavigation } from "expo-router";
import { API_ENDPOINTS, useQuery } from "../../../../../../hooks/useQuery";
import { Platform } from "react-native";
import { TYPE_IMAGE_API_RESULT } from "../../../../../../../types/Media";
import { TYPE_STRAPI_RESULT } from "../../../../../../../types/_Strapi";
import { TYPE_CLUB } from "../../../../../../../types/Club";
import { useAppSelector } from "../../../../../../store/store";
import { SELECTOR_CLUBS_QUERY } from "../../../../../../store/selectors/selectorClubs";
import { useClub } from "../../../../../../hooks/useClub";
import { useState } from "react";

export const useClubSettings = <Inputs>() => {
  const club: TYPE_STRAPI_RESULT<TYPE_CLUB> =
    useAppSelector(SELECTOR_CLUBS_QUERY);

  const { handleQuery: handleQueryRefetchClub, isLoading: isLoadingFetchClub } =
    useClub();

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
    const body: { name?: string; logo?: any } = {
      name: form?.name,
    };

    if (logoId) {
      body["logo"] = logoId;
    }

    handleQuery("PUT", {
      body,
      onSuccess: (i: any) => {
        navigation.goBack();
        handleQueryRefetchClub("GET");
      },
    });
  };

  const handleSubmit = async () => {
    let formData = new FormData();

    const hasImage = form?.logo?.uri;
    if (typeof hasImage === "string") {
      // @ts-ignore
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

  return { form, setForm, club, handleSubmit, isLoadingUpload, isLoading };
};
