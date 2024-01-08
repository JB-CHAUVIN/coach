export type TYPE_MEDIA = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: null | string;
    width: number;
    height: number;
    size: number;
    url: string;
};

type Image = {
    id: number;
    name: string;
    alternativeText: null | string;
    caption: null | string;
    width: number;
    height: number;
    formats: {
        thumbnail: TYPE_MEDIA;
        small: TYPE_MEDIA;
        medium: TYPE_MEDIA;
        large: TYPE_MEDIA;
        [key: string]: TYPE_MEDIA; // additional formats can be added dynamically
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null | string;
    provider: string;
    provider_metadata: null | any; // assuming it can be any type of metadata
    createdAt: string;
    updatedAt: string;
};

export type TYPE_IMAGE_API_RESULT = Image[];