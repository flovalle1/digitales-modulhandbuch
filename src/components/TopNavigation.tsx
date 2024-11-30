"use client";
import theme from '@/app/theme';
import { paths } from '@/paths';
import { Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import * as React from 'react';

const pages = [
    { name: 'Zuordnungstabelle', link: paths.zuordnungstabelle },
    { name: 'Veranstaltunsverzeichnisse', link: paths.veranstaltungsverzeichnis },
    { name: 'Dozenten', link: paths.dozenten }
];

const demoAutocomplete = [
    { title: 'Grundlagen der Informatik', id: "1994" },
    { title: 'Kursname 3', id: "fasd" },
    { title: 'Testkurs', id: "asd" },
    { title: 'Das ist ein Kursname', id: "afsdp" }
]

export default function TopNavigation() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(Autocomplete)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <AppBar position="static" sx={{ backgroundColor: '#272727' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', lg: 'flex' } }}>
                        <Image src="/Universitaet_Tuebingen.png" alt="Universität Tübingen" width={200} height={50} />
                    </Box>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4, }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                href={page.link}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', ":hover": { backgroundColor: theme.palette.primary.main } }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Search>
                            <Autocomplete
                                disablePortal
                                options={demoAutocomplete}
                                sx={{ width: 300, my: 2 }}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => <TextField {...params} label="Kurs suchen" />}
                            />
                        </Search>
                    </Box>
                    <Button href={paths.dashboard} sx={{ ml: 2 }} variant="contained" startIcon={<Person />}>
                        Login
                    </Button>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
