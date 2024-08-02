import '@/routes/error/error.scss';
import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  return (
    <>
      <div className="error">
        <div className="noise"></div>
        <div className="overlay"></div>
        <div className="terminal">
          <h1>
            Error <span className="errorcode">404</span>
          </h1>
          <p className="output">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
          <p className="output">
            Please try to{' '}
            <span className="link" onClick={() => navigate(-1)}>
              go back
            </span>{' '}
            or{' '}
            <span className="link" onClick={() => navigate('/')}>
              return to the homepage
            </span>
            .
          </p>
          <p className="output">Good luck.</p>
        </div>
      </div>
    </>
  );
}
