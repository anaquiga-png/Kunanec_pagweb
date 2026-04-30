import { Seo } from '@/components/Seo'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { EmotionalStatement } from '@/components/sections/EmotionalStatement'
import { FinalCta } from '@/components/sections/FinalCta'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Problem } from '@/components/sections/Problem'
import { Solution } from '@/components/sections/Solution'
import { UseCases } from '@/components/sections/UseCases'
import { ValueCards } from '@/components/sections/ValueCards'

function App() {
  return (
    <>
      <Seo />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <ValueCards />
        <HowItWorks />
        <UseCases />
        <EmotionalStatement />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
