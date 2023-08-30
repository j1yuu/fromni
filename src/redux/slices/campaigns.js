import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCampaigns = createAsyncThunk('/', async () => {
    const { data } = await axios.get('/campaigns');
    return data;
});

export const fetchRemoveCampaign = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
    const { data } = await axios.delete(`/campaigns/${id}`);
    return data;
});


const initialState = {
    campaigns: {
        items: [],
        status: 'loading'
    },
}

const campaignSlices = createSlice({
    name: 'campaigns',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение кампаний
        [fetchCampaigns.pending]: (state) => {
            state.campaigns.items = [];
            state.campaigns.status = 'loading';
        },
        [fetchCampaigns.fulfilled]: (state, action) => {
            state.campaigns.items = action.payload;
            state.campaigns.status = 'loaded';
        },
        [fetchCampaigns.rejected]: (state) => {
            state.campaigns.items = [];
            state.campaigns.status = 'error';
        },
        //Удаление кампании
        [fetchRemoveCampaign.pending]: (state, action) => {
            state.campaigns.items = state.campaigns.items.filter((obj) => obj._id !== action.meta.arg);
        },
    }
});

export const campaignReducer = campaignSlices.reducer;