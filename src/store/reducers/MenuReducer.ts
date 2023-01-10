/**
 * Author: Hong Hee Rim
 * Description: This reducer file has come from template.
 * Since template is based on "*.js" format, type & interfaces won't be changed
 */

// type & interfaces

// state
const INIT_MENU_STATE: any = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true
};

// action type
const HEADER = "MenuReducer";
const TYPE = {
    SET_ACTIVE_ITEM: `${HEADER}/SET_ACTIVE_ITEM` as const,
    SET_ACTIVE_COMPONENT: `${HEADER}/SET_ACTIVE_COMPONENT` as const,
    SET_OPEN_DRAWER: `${HEADER}/SET_OPEN_DRAWER` as const,
    SET_OPEN_COMPONENT_DRAWER: `${HEADER}/SET_OPEN_COMPONENT_DRAWER` as const,
}

// action creator
export const MenuAction = {
    activeItem: (openItem: any) => ({
        type: TYPE.SET_ACTIVE_ITEM,
        payload: openItem
    }),
    activeComponent: (openComponent: any) => ({
        type: TYPE.SET_ACTIVE_COMPONENT,
        payload: openComponent
    }),
    openDrawer: (drawerOpen: any) => ({
        type: TYPE.SET_OPEN_DRAWER,
        payload: drawerOpen
    }),
    openComponentDrawer: (componentDrawerOpen: any) => ({
        type: TYPE.SET_OPEN_COMPONENT_DRAWER,
        payload: componentDrawerOpen
    })
};

// reducer
export default function MenuReducer(
    state: any = INIT_MENU_STATE,
    action: any
): any {
    switch (action.type) {
        case TYPE.SET_ACTIVE_ITEM:
            return { ...state, openItem: action.payload };
        case TYPE.SET_ACTIVE_COMPONENT:
            return { ...state, openComponent: action.payload };
        case TYPE.SET_OPEN_DRAWER:
            return { ...state, drawerOpen: action.payload };
        case TYPE.SET_OPEN_COMPONENT_DRAWER:
            return { ...state, componentDrawerOpen: action.payload };
        default:
            return state;
    }
}