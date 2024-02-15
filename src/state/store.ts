import { configureStore } from "@reduxjs/toolkit";
import controlsReducer from "./controls";
import irqReducer from "./irqSlice";

export const store = configureStore({
  reducer: {
    irq: irqReducer,
    controls: controlsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
