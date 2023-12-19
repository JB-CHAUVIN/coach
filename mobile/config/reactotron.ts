import Reactotron from "reactotron-react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({}).setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    overlay: false, // just turning off overlay
  })
  .use(reactotronRedux())
  .connect();

export default reactotron;
