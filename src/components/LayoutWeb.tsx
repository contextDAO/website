import WebNavbar from '@/components/WebNavbar';

const LayoutDapp = ({ children }: any) => {
  return (
    <div>
      <WebNavbar />
      {children}
    </div>
  );
};

export default LayoutDapp;
