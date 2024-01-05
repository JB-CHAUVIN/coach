import {TYPE_USER} from "./User";

export type TYPE_STRAPI_RESULT<T> = {
    id: number;
    attributes: T;
}

export type TYPE_STRAPI_POPULATE_MANY<T> = {
    data: Array<TYPE_STRAPI_RESULT<T>>;
}

export type TYPE_STRAPI_IDENTIFICATION = {
    jwt: string;
    user: TYPE_USER;
}
