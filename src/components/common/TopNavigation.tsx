"use client";
import theme from '@/app/theme';
import { paths } from '@/paths';
import { CourseWithLecturer } from '@/types';
import { Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Autocomplete, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const pages = [
    { name: 'Zuordnungstabelle', link: paths.zuordnungstabelle },
    { name: 'Veranstaltungsverzeichnisse', link: paths.veranstaltungsverzeichnis },
    { name: 'Dozenten', link: paths.dozenten }
];

interface TopNavigationProps {
    courses: CourseWithLecturer[];
}

export default function TopNavigation({ courses }: TopNavigationProps) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const router = useRouter();
    const pathname = usePathname();

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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                href={page.link}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    mx: 1,
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    backgroundColor: pathname === page.link ? theme.palette.primary.main : 'inherit',
                                    ":hover": { backgroundColor: theme.palette.primary.main }
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Search>
                            <Autocomplete
                                disablePortal
                                options={courses}
                                sx={{ width: 300, my: 2 }}
                                getOptionLabel={(option) => option.title}
                                onChange={(event, value) => {
                                    if (value) {
                                        router.push(paths.course(value.id.toString()));
                                    }
                                }}
                                renderOption={(props, option) => {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { key, ...rest } = props;
                                    return (
                                        <Box component="li" key={option.id} {...rest}>
                                            <Box>
                                                <Typography>{option.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {option.code} • {option.ects} ECTS • {option.lecturer?.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )
                                }}
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
