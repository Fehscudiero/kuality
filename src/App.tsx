import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SocialProof from './components/SocialProof'
import About from './components/About'
import Products from './components/Products'
import Quality from './components/Quality'
import Contact from './components/Contact'
import Footer from './components/Footer'

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = 70
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: 'smooth'
    })
  }
}

function App() {
  return (
    // A mágica acontece aqui: adicionamos o overflow-x-hidden no wrapper principal
    <div className="min-h-screen overflow-x-hidden bg-abyss">
      <Navbar scrollToSection={scrollToSection} />
      <main>
        <HeroSection />
        <SocialProof />
        <About />
        <Products />
        <Quality />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App