import Navbar from './Navbar';
import Contractbar from './Contractbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Contractbar />
      {children}
    </div>
  );
};

export default Layout;
