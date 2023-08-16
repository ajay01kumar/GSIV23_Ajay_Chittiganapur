import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

const Movies = ({ data, loading, error, fetchData }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [more, setMore] = useState()
    const [MovieList, setMovieList] = useState([])

    const navigate = useNavigate();
    const apiKey = "7426638854526acbcbeee04b541684a4"
    const Movie = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
            );
            setMovieList(response.data.results)
            // dispatch(fetchDataSuccess(response.data.results));
        } catch (error) {
            // dispatch(fetchDataFailure(error.message));
        }
    }

    useEffect(() => {

        console.log("Movies")

        Movie()
        // fetchData(); // Fetch data when the component mounts
    }, []);

    const loadMoreNews = () => {
        const load = rowsPerPage + 5
        console.log("load:", load, "rowsPerPage:", rowsPerPage)
        setRowsPerPage(load)
    }

    return (
        <div className='movieDiv'>

            <div className="movie-list">
                {
                    (rowsPerPage > 0
                        ? MovieList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : MovieList
                    )
                        ?.map(movie => (
                            <div key={movie.id} className="movie-card" onClick={() => navigate(`/details`, { state: { movie } })}>
                                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                                <Grid container sx={{ p: 1 }}
                                //  className="movie-info"
                                >
                                    <Grid sm={12} xs={12} align='right'>
                                        <Typography sx={{ fontSize: '0.8em' }}>Rating: {movie.vote_average}/10</Typography>
                                    </Grid>
                                    <Grid sm={12} xs={12} className='movieTital' >
                                        <Typography variant='h6'>{movie.title}</Typography>
                                    </Grid>

                                    <p className="movie-description">{movie.overview}</p>
                                </Grid>
                            </div>
                        ))}

                {MovieList.length <= rowsPerPage ?

                    <Grid item sm={12} md={12} xs={12} lg={12} className='more'>
                        <Typography>No More Movie</Typography>
                        {/* <Button className='more' onClick={loadMoreNews}>Load More</Button> */}
                    </Grid>
                    : <Grid item sm={12} md={12} xs={12} lg={12} className='more'>
                        <Button className='more' onClick={loadMoreNews}>Load More</Button>
                    </Grid>
                }

            </div>
        </div>
    );
};

// const mapStateToProps = state => ({
//     data: state.data,
//     loading: state.loading,
//     error: state.error
// });

// const mapDispatchToProps = {
//     fetchData
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Movies);
export default Movies