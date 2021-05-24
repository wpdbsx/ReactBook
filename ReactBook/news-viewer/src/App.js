import './App.css';

import NewsList from './components/NewsList';
import Categories from './components/Categories';
import { useCallback, useState } from 'react';
import { Route } from 'react-router';
import NewsPage from './page/NewsPage';

function App() {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      <Route path="/:category?" component={NewsPage} />;
    </>
  );
}

export default App;
