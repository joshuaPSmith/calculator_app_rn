import * as React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import SideBar from '../../components/sidebar/Sidebar';
import {
  VancomycinEmpiricDosing
} from '../../components/calculators/VancomycinEmpiricDosing/VancomycinEmpiricDosing';
import HomeScreen from './Home';

const HomeScreenStack = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    VancomycinEmpiricDosing: { screen: VancomycinEmpiricDosing }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const HomeScreenRouter = createAppContainer(HomeScreenStack);

export default HomeScreenRouter;
