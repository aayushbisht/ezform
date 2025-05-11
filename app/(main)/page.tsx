import Link from 'next/link';
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import CTA from '@/components/landing/cta';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <Hero />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <Features />
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <CTA />
      </section>
    </div>
  );
} 

