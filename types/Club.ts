import {TYPE_USER} from "./User";
import {TYPE_STRAPI_POPULATE_MANY, TYPE_STRAPI_POPULATE_ONE, TYPE_STRAPI_RESULT} from "./_Strapi";
import {TYPE_MEDIA} from "./Media";

export type TYPE_CLUB = {
    id: number;
    name: string;
    logo: TYPE_STRAPI_POPULATE_ONE<TYPE_MEDIA>;
    users?: TYPE_STRAPI_POPULATE_MANY<TYPE_USER>
}
