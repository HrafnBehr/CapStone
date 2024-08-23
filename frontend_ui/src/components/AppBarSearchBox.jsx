import { alpha, InputBase, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSearch } from '../hooks/useSearch'

export function AppBarSearchBox() {
  const { search, setSearch } = useSearch()

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Search>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    flexGrow: 1,
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
  },
}))
