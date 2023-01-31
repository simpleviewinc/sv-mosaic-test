export default function reducer(state, action) {
  switch (action.type) {
    case "NEW_DRAWER": {
      return {
        ...state,
        drawers: [
          ...state.drawers,
          {
            name: action.name,
            id: Date.now().toString(),
            type: action.drawerType
          }
        ]
      };
    }
    case "CLOSE_DRAWER": {
      const newDrawers = state.drawers.slice(0, -1);

      return {
        ...state,
        drawers: newDrawers
      };
    }
  }
}

function newDrawer({ type, name }: { type?: string; name: string }) {
  return {
    type: "NEW_DRAWER",
    drawerType: type,
    name
  };
}

function closeDrawer() {
  return {
    type: "CLOSE_DRAWER"
  };
}

export const actions = {
  newDrawer,
  closeDrawer
};
