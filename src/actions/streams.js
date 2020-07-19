import server from "../apis/server";

export const fetchStream = (id, query) => async (dispatch) => {
  const response = await server.get(`/streams/${id}`, query);

  dispatch({ type: "FETCH_STREAM", payload: response.data });
};

export const fetchMultipleStreams = (query) => async (dispatch) => {
  const response = await server.get("/streams", query);

  dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const createStream = (query) => async (dispatch) => {
  const response = await server.post("/streams", query);

  dispatch({ type: "CREATE_STREAM", payload: response.data });
};

export const editStream = (id, query) => async (dispatch) => {
  const response = await server.put(`/streams/${id}`, query);

  dispatch({ type: "EDIT_STREAM", payload: response.data });
};

export const deleteStream = (id, query) => async (dispatch) => {
  await server.delete(`/streams/${id}`, query);

  dispatch({ type: "DELETE_STREAM", payload: id });
};


