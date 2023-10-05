import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;