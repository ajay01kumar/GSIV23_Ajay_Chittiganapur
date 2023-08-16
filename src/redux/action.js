import axios from 'axios';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const FETCH_MovieId_REQUEST = 'FETCH_MovieId_REQUEST';
export const FETCH_MovieId_SUCCESS = 'FETCH_MovieId_SUCCESS';
export const FETCH_MovieId_FAILURE = 'FETCH_DATA_FAILURE';


export const fetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST
});

export const fetchDataSuccess = data => ({
    type: FETCH_DATA_SUCCESS,
    payload: data
});

export const fetchDataFailure = error => ({
    type: FETCH_DATA_FAILURE,
    payload: error
});




// Thunk action creator
export const fetchData = () => {
    return async dispatch => {
        dispatch(fetchDataRequest());
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=7426638854526acbcbeee04b541684a4&language=en-US&page=1`);
            dispatch(fetchDataSuccess(response.data.results));
        } catch (error) {
            dispatch(fetchDataFailure(error.message));
        }
    };
};
export const MovieDetailsById = (movieId) => {
    return async dispatch => {
        dispatch(fetchDataRequest());
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7426638854526acbcbeee04b541684a4`);
            dispatch(fetchDataSuccess(response.data));
        } catch (error) {
            dispatch(fetchDataFailure(error.message));
        }
    };
}
