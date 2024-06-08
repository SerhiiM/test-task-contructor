import { createContext } from "react";
import { GlobalState, BLOCK_TYPES } from "./Types";

const base: GlobalState = {
    tree: {
        key: '',
        type: BLOCK_TYPES.BASE,
        parentKey: null,
    },
    setTree: () => {},

    selectedBranch: null,
    setSelectedBranch: () => {}
}

export const Context = createContext<GlobalState>(base);
