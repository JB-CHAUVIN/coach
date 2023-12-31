import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reactotronRedux } from "reactotron-redux";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

// swizzle the old one
const yeOldeConsoleLog = console.log

// make a new one
console.log  = (...args) => {
    // always call the old one, because React Native does magic swizzling too
    yeOldeConsoleLog(...args)

    // send this off to Reactotron.
    Reactotron.display({
        name: 'CONSOLE.LOG',
        value: args,
        // @ts-ignore
        preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
    })
}

const reactotron = Reactotron.configure({
    host: 'localhost',
    port: 9090
})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
    // @ts-ignore
  .use(reactotronRedux())
  .connect();

export default reactotron;
