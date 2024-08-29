import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

// Ignore specific warnings if needed
LogBox.ignoreLogs(['Warning: ...']); // Replace 'Warning: ...' with specific warnings to ignore

AppRegistry.registerComponent(appName, () => App);
