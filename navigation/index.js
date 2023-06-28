import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import JobDetail from '../Screens/JobDetail';
import Search from '../Screens/Search';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={({route}) => ({
          title: `jobDetail ${route.params.jobId}`,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={({route}) => ({
          title: `${route.params.searchTerm}`,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
export default MyStack;
