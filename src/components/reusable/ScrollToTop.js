import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // As soon as the route (pathname) changes, scroll to top-left
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
