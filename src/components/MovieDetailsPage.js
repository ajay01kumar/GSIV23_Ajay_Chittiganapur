import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MovieDetailsById } from '../redux/action';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';

const MovieDetailsPage = ({ data, loading, error, MovieDetailsById }) => {

    const location = useLocation();
    console.log(location.state.movie.id)
    const movieId = location.state.movie.id;
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/');
    };
    console.log(data)
    useEffect(() => {

        if (movieId) {
            MovieDetailsById(movieId); // Fetch data when the component mounts
        }
    }, [MovieDetailsById, movieId]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const { title, vote_average, release_date, runtime, overview, credits } = data;
    const director = credits?.crew.find(crewMember => crewMember.job === 'Director');
    const cast = credits?.cast?.map(actor => actor.name).join(', ');



    return (
        <>
            <Paper elevation={4} sx={{ m: 1, p: 1  }}>

                <Grid container spacing={2}>
                    <Grid item sm={6} align='left'></Grid>
                    <Grid item sm={6} align="right">
                        <button onClick={goBack}>Go Back</button>
                    </Grid>
                    <Grid item sm={3}>
                        <img style={{ width: '98%', height: '350px' }} src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`} alt={data.title} />
                    </Grid>
                    <Grid item sm>
                        <Typography variant='h4'>{title}</Typography>
                        <p>Rating: {vote_average}</p>
                        <p>Year of Release: {release_date?.slice(0, 4)}</p>
                        <p>Length: {Math.floor(runtime / 60)}h {runtime % 60}min</p>
                        <p>Director: {director ? director.name : 'N/A'}</p>
                        <p>Cast: {cast}</p>
                        <p>{overview}</p>
                    </Grid>
                </Grid>
            </Paper>
            <div>



            </div>
        </>
    );
};

const mapStateToProps = state => ({
    data: state.data,
    loading: state.loading,
    error: state.error
});

const mapDispatchToProps = {
    MovieDetailsById
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
