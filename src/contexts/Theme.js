import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { defaultProps } from 'recompose'

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton2: {
      // Name of the rule
      root: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
})

export const ThemeProvider = defaultProps({ theme })(MuiThemeProvider)
