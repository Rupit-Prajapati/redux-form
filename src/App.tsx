import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import Form from './components/Form.tsx';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Form />
    </Provider>
  );
};

export default App;
