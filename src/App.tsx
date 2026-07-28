import {
  Causes,
  ChatBand,
  Footer,
  Hero,
  Nav,
  Offers,
  Products,
  Stages,
  StickyCta,
  Timeline,
} from './components/home'
import './styles/home.css'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Causes />
      <Offers />
      <Stages />
      <Timeline />
      <Products />
      <ChatBand />
      <Footer />
      <StickyCta />
    </>
  )
}
