export default function reducer(state, action) {
  switch (action.type) {
    case "NEW_DRAWER": {
      return {
        ...state,
        drawers: [
          ...state.drawers,
          {
            name: action.name,
            id: Date.now()
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

function newDrawer({ name }) {
  return {
    type: "NEW_DRAWER",
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
