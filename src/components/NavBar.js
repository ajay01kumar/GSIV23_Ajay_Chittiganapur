import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Input, InputAdornment, InputBase, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResponsiveAppBar() {
    const navigate = useNavigate()
    const loc = useLocation()
    console.log(loc)
    // const [query, setQuery] = React.useState('');
    const [movies, setMovies] = React.useState([]);

    const apiKey = "7426638854526acbcbeee04b541684a4"

    const searchMovies = async (query) => {
        if (query) {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
                );

                setMovies(response.data.results);
            } catch (error) {
                console.error('Error searching movies:', error);
            }
        } else {
            setMovies([]);
        }
    };
    console.log("movies", movies)

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar className="draw" position="fixed" >
                <Toolbar>
                    {" "}
                    {
                        loc.pathname === '/' ?
                            <Typography noWrap component="div" className="font-face-gm" sx={{ flexGrow: 1, fontSize: "40px" }}>
                                {/* <img src={logo} alt="evaidya" width="180" /> */}
                                <Input type='search' variant='outlined'
                                    size='small' style={{ Width: "20px" }}
                                    onChange={(e) => searchMovies(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    }
                                />
                            </Typography>
                            : <Typography sx={{ flexGrow: 1, fontSize: "40px", color: "black" }} > Movie Details</Typography>
                    }


                    <br>
                    </br>
                    <HomeIcon onClick={() => { navigate('/') }} color="action" />

                </Toolbar>
            </AppBar>

            {/* <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                <Outlet />
            </Box> */}
        </Box>
    );
}
export default ResponsiveAppBar;