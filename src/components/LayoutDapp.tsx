import DappNavbar from './DappNavbar';

const LayoutDapp = ({ children }: any) => {
  return (
    <div>
      <DappNavbar />
      {children}
    </div>
  );
};

export default LayoutDapp;
