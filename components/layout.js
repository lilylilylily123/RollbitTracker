import Navbar from "/components/Navbar/Bar/fullbar";

export default function Layout({ children }) {
  return (
      <>
      <Navbar />
        <main>{children}</main>
      </>
  )
}