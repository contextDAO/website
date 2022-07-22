import WebNavbar from '@/components/WebNavbar';
import HomeSection from '@/components/HomeSection';

const LayoutDapp = ({ children }: any) => {
  return (
    <div>
      <WebNavbar />
      {children}
    </div>
  );
};

export default LayoutDapp;
