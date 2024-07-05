
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h2 className="text-2xl font-medium mb-2">{children}</h2>
  );
}

export default SectionTitle;