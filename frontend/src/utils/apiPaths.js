// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://ai-vent-planner.onrender.com";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/getcurrentuser",
  },
  AI: {
    GENERATE_PLAN: "/api/ai/generate-plan"
  },
  EVENT: {
    SAVE_EVENT_DETAILS: "/api/event/event-details",
    GET_EVENT_DETAILS: "api/event/get-all-events",
    DELETE_EVENT: "/api/event/delete-event"
  },
};
