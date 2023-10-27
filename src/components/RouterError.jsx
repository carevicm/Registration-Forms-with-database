import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  if (error) {
    console.error(error);
  }

  return (
    <main 
      id="error-page" 
      aria-labelledby="errorTitle"
    >
      <h1 id="errorTitle">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </main>
  );
}

export default ErrorPage;
