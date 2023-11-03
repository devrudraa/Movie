import Nav from "@/component/Navbar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="px-5 py-3">{children}</div>
    </>
  );
}
