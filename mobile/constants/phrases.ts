export const PHRASES = {
  FR: {
    PLACEHOLDER_FORM_EVENT_ADD_TIME: "Moment de la journée",
    PLACEHOLDER_FORM_TYPE: "Type de séance",
    PLACEHOLDER_FORM_TYPE_VARIATION: "Plus de détails sur la séance",
    PLACEHOLDER_FORM_DISTANCE: "Distance (en km)",
    PLACEHOLDER_FORM_DESC: "Plus d'infos",
    PLACEHOLDER_FORM_SUBMIT: "Soumettre",
    PLACEHOLDER_FORM_CANCEL: "Annuler",
    PLACEHOLDER_FORM_EDIT: "Modifier",
    AGENDA_HEADER_TITLE: "Votre semaine",
    AGENDA_HEADER_TOTAL: "Entraînements : ",
    AGENDA_HEADER_TOTAL_DISTANCE: "Volume : ",
    AGENDA_EMPTY:
      "Votre semaine d'entraînement est vide.\nVous pouvez programmer des entraînements en cliquant sur le bouton + en bas à droite.",
    LOGIN_USERNAME: "Login (adresse email)",
    LOGIN_PASSWORD: "Mot de passe",
    LOGIN_SUBMIT: "M'identifier",
    TAB1_TITLE: "Planning",
    TAB2_TITLE: "Configuration",
    CONNECT_WITH_STRAVA: "Lier mon compte Strava",
    CONNECT_WITH_STRAVA_OK: "Vous avez lié votre compte Strava et 400m.coach",
    CONNECT_WITH_STRAVA_DESC:
      "En vous connectant à votre compte Strava, nous pourrons automatiquement lié vos activités effectuées avec vos entraînements programmés.",
    CONNECT_WITH_STRAVA_DESC_OK:
      "Vous pouvez déconnecter votre compte Strava en cliquant sur le bouton ci-dessous.",
    LOGOUT: "Déconnexion",
    DISABLE_STRAVA: "Supprimer le lien Strava",
    REGISTER: "M'inscrire",
    USERNAME: "Nom d'utilisateur (pseudonyme)",
    ERROR_TITLE: "Oops...",
    ERROR_DESC: "Une erreur est survenue, veuillez réessayer plus tard.",
    SEE_BALANCE: "Analyse",
    ANNUAL_STATS: "Statistiques annuelles",
    OK: "OK",
    CANCEL: "Annuler",
    CONFIRM: "Souhaitez-vous continuer ?",
    DELETE_EVENT: "Souhaitez-vous supprimer cet entraînement ?",
    alcohol: "Alcool",
    tobacco: "Tabac",
    drugs: "Drogues",
    ADDICTION_CONTROL: "Detox",
    ADDICTION_CONTROL_DESC:
      "Améliorez vos performances en réduisant votre consommation de drogues, tabac et alcool.\n" +
      "Chaque jour sans sera sauvegardé et aura un impact positif sur votre performance.",
    ADDICTION_CONTROL_HEADER: "Jours sans %{name} :",
    TOTAL_DISTANCE: 'Distance totale :',
    EVENTS_DONE: 'Entraînements :',
    FOOTING_DONE: 'Footing : ',
    RENFO_DONE: 'Renfo : ',
    QUALITY_DONE: 'Qualité : ',
    SL_DONE: 'Sorties longues : ',
    JOURS_DETOX: 'Journées detox : ',
    ADDICTION_X: '%{x} :',
  },
};

export const phraseParse = (phrase: string, params: any) => {
  let parsed = phrase;
  for (let i in params) {
    parsed = parsed.replace(`%{${i}}`, params[i]);
  }
  return parsed;
};
