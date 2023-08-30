import { configureStore } from "@reduxjs/toolkit";
import { campaignReducer } from "./slices/campaigns";
import { authReducer } from "./slices/auth";

const store = configureStore({
    reducer: {
        campaigns: campaignReducer,
        auth: authReducer
    }
});

export default store;