export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto flex justify-center my-20">
      {children}
    </div>
  );
}
