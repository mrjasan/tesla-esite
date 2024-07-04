
interface SectionTitleProps {
  title: string;
}
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h2 className="text-xl font-semibold mb-4">{children}</h2>
  );
}

export default SectionTitle;