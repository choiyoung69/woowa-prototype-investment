import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ConceptSection } from "@/components/ConceptSection";
import { ScrollFeatureShowcase } from "@/components/ScrollFeatureShowcase";
import { ExpansionSection } from "@/components/ExpansionSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <ScrollFeatureShowcase />
        <ConceptSection />
        <ExpansionSection />
        <ComparisonSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
