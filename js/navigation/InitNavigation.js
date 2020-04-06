import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import MainNavigation from './MainNavigation';
import WelcomePage from '../pages/WelcomePage'
import LoginPage from '../pages/loginPage';

const InitNavigation = createSwitchNavigator(
    {
        welcome:{
            screen:WelcomePage
        },
        main:{
            screen:MainNavigation,
        }
    },
    {
        
    }
);


export default createAppContainer(InitNavigation);