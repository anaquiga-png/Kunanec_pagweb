import { Seo } from '@/components/Seo'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { EmotionalStatement } from '@/components/sections/EmotionalStatement'
import { FinalCta } from '@/components/sections/FinalCta'
import { StrategicPartners } from '@/components/sections/StrategicPartners'
import { Testimonials } from '@/components/sections/Testimonials'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { OurBenefits } from '@/components/sections/OurBenefits'
import { Problem } from '@/components/sections/Problem'
import { UseCases } from '@/components/sections/UseCases'

function App() {
  return (
    <>
      <Seo />
      <Header />
      <main>
        <Hero />
        <Problem />
        <OurBenefits />
        <HowItWorks />
        <UseCases />
        <StrategicPartners />
        <Testimonials />
        <EmotionalStatement />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
