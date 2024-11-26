import { Link, useLocation } from 'react-router-dom';

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav
      className="absolute top-[60px] mt-4 z-10 bg-white px-2 shadow-sm"
      aria-label="breadcrumb"
    >
      <ol className="list-reset flex">
        {pathnames.length > 0 && (
          <li className="text-gray-500" aria-current="page">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="mx-2">/</span>
          </li>
        )}

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to}>
              {index === pathnames.length - 1 ? (
                <span className="text-gray-500">{value.replace('-', ' ')}</span>
              ) : (
                <>
                  <Link to={to} className="text-blue-600 hover:underline">
                    {value.replace('-', ' ')}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DynamicBreadcrumbs;
