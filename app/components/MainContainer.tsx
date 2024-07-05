import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const MainContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="flex-grow flex flex-col">
      <div className="w-full flex-grow h-full flex">
        <div className="min-w-[24rem]">
          <Sidebar />
        </div>
        <div className="bg-blue-200 w-full">
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </main>
  );
};

export default MainContainer;
