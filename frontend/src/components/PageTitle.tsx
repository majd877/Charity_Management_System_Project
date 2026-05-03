import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const location = useLocation();
  const data="مشروع خيري"
  useEffect(() => {
    document.title = data;
  }, [location, title]);

  return null; // This component doesn't render anything
};

export default PageTitle;
