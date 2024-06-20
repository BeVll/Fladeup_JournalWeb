import {AuthUserActionType, IAuthUser, ISidebar, IUser, SidebarActionType} from "./types.ts";

const initState = {
    isVisible: false
}

export const SidebarReducer = (state=initState, action: any) : ISidebar => {

    switch(action.type) {
        case SidebarActionType.SET_VISIBLE: {
            const isVisible = action.payload as boolean;
            return {
                isVisible: isVisible
            };
        }
    }
    return state;
}