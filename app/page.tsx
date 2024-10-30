import { Button } from "@/components/ui/button";
import { Building2, FileCheck, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Secure Land Registration System
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            A modern platform for transparent and efficient land registration,
            verification, and management.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" className="gap-2">
                <Building2 className="w-5 h-5" />
                Explore Properties
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="gap-2">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title="Secure & Transparent"
              description="Advanced security measures and transparent processes ensure your property records are safe and accessible."
            />
            <FeatureCard
              icon={<FileCheck className="w-10 h-10" />}
              title="Easy Verification"
              description="Streamlined document verification process with real-time status updates and notifications."
            />
            <FeatureCard
              icon={<Users className="w-10 h-10" />}
              title="User-Friendly"
              description="Intuitive interface for landowners, buyers, and government officials to manage properties efficiently."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Manage Your Property?
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Join thousands of users who trust our platform for their land
            registration needs.
          </p>
          <Link href="/auth/register">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}