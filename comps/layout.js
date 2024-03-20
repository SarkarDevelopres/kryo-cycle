import Footer from './Footer'
 
export default function Layout({ children }) {
  return (
    <>
      <main style={{overflow:'hidden'}}>{children}</main>
      <Footer />
    </>
  )
}