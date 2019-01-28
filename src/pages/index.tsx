import * as React from 'react';
import { DrawerNavigator } from 'react-navigation';
import SideBar from '../components/sidebar/Sidebar';
import HomeScreen from './Home';
import {
  VancomycinEmpiricDosing
} from '../components/calculators/VancomycinEmpiricDosing/VancomycinEmpiricDosing';
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    VancomycinEmpiricDosing: { screen: VancomycinEmpiricDosing }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
