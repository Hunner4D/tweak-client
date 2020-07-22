let activeItemGuide = {
  "/": "streams",
  "/streams/new": "create stream",
  "/streams/owned": "my streams",
};

export const changePath = (path) => {
    return {
      type: "CHANGE_PATH",
      payload: activeItemGuide[path]
    };
  };