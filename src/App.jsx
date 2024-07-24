import '@/assets/style/components/app.scss';
import { RouterProvider } from 'react-router-dom';
import PropTypes from 'prop-types';
App.propTypes = {
  router: PropTypes.object,
};

function App({ router }) {
  return (
    <div className="wrapper">
      <div className="content">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
