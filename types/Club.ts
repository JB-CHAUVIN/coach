import {TYPE_USER} from "./User";
import {TYPE_STRAPI_POPULATE_MANY, TYPE_STRAPI_RESULT} from "./_Strapi";

export type TYPE_CLUB = {
    id: number;
    name: string;
    logo: any;
    users?: TYPE_STRAPI_POPULATE_MANY<TYPE_USER>
}
