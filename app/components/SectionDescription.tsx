
const SectionDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <p className="text-gray-500 tracking-wide text-sm mb-2">{children}</p>
  );
}

export default SectionDescription;