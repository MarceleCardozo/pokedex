import { Provider } from 'react-redux';
import { persistor, store } from './store';
import AppRoutes from './routes/AppRoutes';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
