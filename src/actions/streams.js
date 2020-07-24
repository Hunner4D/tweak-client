import server from "../apis/server";


export const fetchStream = (id, query) => async (dispatch) => {
  const response = await server.get(`/streams/${id}`, query);

  dispatch({ type: "FETCH_STREAM", payload: response.data });
};

export const fetchMultipleStreams = () => async (dispatch) => {
  const response = await server.get("/rtmp");
  
  dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const fetchMyStreams = (idToken, userInstance) => async (dispatch) => {
  const response = await server.post(`/streams/my/streams`, {
    idToken,
    userInstance,
  });
  dispatch({ type: "FETCH_MY_STREAMS", payload: response.data });
};

export const createStream = (query) => async (dispatch) => {
  const response = await server.post("/streams", query);

  await dispatch({ type: "CREATE_STREAM", payload: response.data });
};

export const editStream = (query) => async (dispatch) => {
  await server.put("/streams", query);
};

export const deleteStream = (query) => async (dispatch) => {
  await server.delete("/streams", {data: query})
  .then(() => dispatch({ type: "DELETE_STREAM", payload: query.streamId }))
  .catch((err) => console.log("there was an error deleting stream"));
};
