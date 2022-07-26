import WebNavbar from '@/components/WebNavbar';

const LayoutDapp = ({ children }: any) => {
  return (
    <div className="layoutWeb">
      <div className="webNavbar">
        <WebNavbar />
      </div>
      <div className="page">{children}</div>
    </div>
  );
};

export default LayoutDapp;
