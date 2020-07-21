import server from "../apis/server";

export const fetchStream = (id, query) => async (dispatch) => {
  const response = await server.get(`/streams/${id}`, query);

  dispatch({ type: "FETCH_STREAM", payload: response.data });
};

export const fetchMultipleStreams = (query) => async (dispatch) => {
  const response = await server.get("/streams", query);

  dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const createStream = (query, history) => async (dispatch) => {
  const response = await server.post("/streams", query);

  await dispatch({ type: "CREATE_STREAM", payload: response.data });
  history.push("/");
};

export const editStream = (id, query, history) => async (dispatch) => {
  const response = await server.put(`/streams/${id}`, query);
  console.log(response)
  // await dispatch({ type: "EDIT_STREAM", payload: response.data });
  history.push("/")
};

export const deleteStream = (query) => async (dispatch) => {
  console.log("delete action hit: ", query);
  await server
    .delete(
      `/streams/${query.streamId}/${query.userId}/${query.userInstance}`,
      query
    )
    .then(() => dispatch({ type: "DELETE_STREAM", payload: query.streamId }))
    .catch((err) => console.log("there was an error: ", err));
};
