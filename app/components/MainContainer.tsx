import MainContent from "./MainContent";

const MainContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="flex flex-col flex-grow h-full w-full">
      <MainContent>{children}</MainContent>
    </main>
  );
};

export default MainContainer;
