import {configureStore} from '@reduxjs/toolkit';
import globalSlice from './globalSlice';

const store = configureStore({
    reducer: {
        [globalSlice.name]: globalSlice.reducer,
    },
    devTools: !import.meta.env.ENV_PROD,
});

export default store;