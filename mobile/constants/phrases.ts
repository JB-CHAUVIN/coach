export const PHRASES = {
  FR: {
    PLACEHOLDER_FORM_EVENT_ADD_TIME: "Moment de la journée",
    PLACEHOLDER_FORM_TYPE: "Type de séance",
    PLACEHOLDER_FORM_TYPE_VARIATION: "Plus de détails sur la séance",
    PLACEHOLDER_FORM_TYPE_VARIATION_RACE: "Plus de détails sur cet objectif",
    PLACEHOLDER_FORM_DISTANCE: "Distance (en km)",
    PLACEHOLDER_FORM_DESC: "Plus d'infos",
    PLACEHOLDER_FORM_DESC_RACE: "Nom de la course ou plus d'infos",
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
    TOTAL_DISTANCE: "Distance totale :",
    EVENTS_DONE: "Entraînements :",
    FOOTING_DONE: "Footing : ",
    RENFO_DONE: "Renfo : ",
    QUALITY_DONE: "Qualité : ",
    SL_DONE: "Sorties longues : ",
    JOURS_DETOX: "Journées detox : ",
    ADDICTION_X: "%{x} :",
    GOALS: "Objectifs hebdomadaire",
    GOALS_DESC:
      "Définissez vos objectifs hebdomadaires pour chaque type d'entraînement (en nombre de séances).",
    ACCOUNT_WHO: "Rôle",
    ACCOUNT_DEFAULT: "Utilisateur",
    ACCOUNT_COACH: "Coach",
    NO_CLUB: "Votre club",
    NO_CLUB_SUBTITLE:
      "Bienvenue coach ! Vous ne disposez pour le moment d'aucun club.",
    NO_CLUB_BUTTON: "Créer un club",
    CLUB_NAME: "Nom du club",
    WELCOME_COACH_X: "Bienvenue coach %{name} !",
    WELCOME_MORE_INFO:
      "Planifiez les entraînements de vos athlètes. Chaque événement apparaîtra dans leur agenda.",
    JOINCLUB: "Rejoindre un club",
    MY_CLUB: "Mon club",
    JOIN_A_CLUB: "Rejoindre un club",
    JOIN_THIS_CLUB: "Rejoindre '%{clubName}'",
    SEARCH_CLUB: "Rechercher un club",
    CLUB_NAME_FIND: "Clubs",
    PENDING_CLUB_X:
      "Votre demande pour rejoindre le club %{name} est en attente.",
    LABEL_ROLE2_default: "Athlètes",
    LABEL_ROLE2_coach: "Coachs",
    CLUB_SETTINGS: "Paramètres",
    CLUB_USER_MANAGEMENT: "Membres",
    CLUB_USER_GOALS: "Objectifs",
    PLACEHOLDER_IMAGE: "Image",
    PLACEHOLDER_IMAGE_LOGO: "Logo du club",
    UPDATE_CLUB: "Mettre à jour mon club",
    ADD_MORE_GOALS:
      "Vous pouvez ajouter plus d'objectifs pour vos athéltes depuis le calendrier.\n\nTout événement de type 'course' sera considéré comme un objectif.",
  },
};

export const phraseParse = (phrase: string, params: any) => {
  let parsed = phrase;
  for (let i in params) {
    parsed = parsed.replace(`%{${i}}`, params[i]);
  }
  return parsed;
};
