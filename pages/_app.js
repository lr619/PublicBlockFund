import AuthProvider from '../contexts/AuthContext'
import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../components/NavBar'
import "../flow/config.js";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className='bg-[#011E30] flex flex-col min-h-screen'>
          <Navbar />
          <Head>
            <title>BlockFund</title>
            <meta name="description" content="BlockFund the World" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        <footer>
          
        </footer>
      </div>
    </AuthProvider>
  )
}

export default MyApp
