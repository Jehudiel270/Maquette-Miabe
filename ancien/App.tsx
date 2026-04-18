import {
  BookOpen,
  Brain,
  BarChart,
  Users,
  MessageCircle,
  Globe,
  Lightbulb,
} from "lucide-react";
import { Hero } from "./components/accueil/Hero";
import Button from "./components/ui/Button";
import { Section } from "./components/accueil/Section";
import { FeatureCard } from "./components/accueil/FeatureCard";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/Navbar";
import HeroAnimation from "./components/animations/HeroAnimation";

function App() {
  type variant =
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "accent"
    | "warning"
    | "error";
  const features_pb = [
    {
      icon: <BookOpen />,
      title: "Cours organisés",
      description: "Accède à des cours structurés par niveau",
      variant: "primary",
    },
    {
      icon: <Brain />,
      title: "Quiz interactifs",
      description: "Teste tes connaissances facilement",
      variant: "accent",
    },
    {
      icon: <BarChart />,
      title: "Suivi personnalisé",
      description: "Visualise ta progression",
      variant: "success",
    },
    {
      icon: <Users />,
      title: "Collaboration",
      description: "Travaille avec d'autres étudiants",
      variant: "error",
    },
    {
      icon: <MessageCircle />,
      title: "Q&A enseignants",
      description: "Pose tes questions directement",
      variant: "info",
    },
  ];

  const features_solutions = [
    {
      icon: <Globe />,
      title: "Compatible avec connexion limitée",
      description: "Fonctionne même avec une connexion internet lente.",
      variant: "success",
    },
    {
      icon: <BookOpen />,
      title: "Contenu adapté localement",
      description: "Cours alignés avec les programmes scolaires africains.",
      variant: "info",
    },
    {
      icon: <Lightbulb />,
      title: "Méthodes modernes et efficaces",
      description: "Une pédagogie simple, interactive et motivante.",
      variant: "error",
    },
  ];

  return (
    <div className="   ">
      <Navbar />
      <Hero
        title={"Apprends, progresse et réussis avec LearnUp"}
        subtitle={
          "La plateforme éducative interactive conçue pour aider les étudiants africains à apprendre efficacement, même avec une connexion limitée."
        }
        primaryAction={
          <Button
            variant="primary"
            className=" btn-soft btn-sm sm:btn-md lg:btn-lg sm:w-auto "
          >
            Commencer gratuitement
          </Button>
        }
        secondaryAction={
          <Button
            variant="primary"
            className=" btn-sm sm:btn-md lg:btn-lg sm:w-auto "
          >
            {" "}
            Explorer les cours{" "}
          </Button>
        }
        image={<HeroAnimation />}
      />
      <div className=" ">
        <Section
          title="Le problème"
          description="Beaucoup d'étudiants africains ont un accès limité à des ressources éducatives de qualité. LearnUp rend l'éducation interactive, accessible et motivante, partout et pour tous."
          className=" "
        />
      </div>
      <Section title="La solution">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {features_pb.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant as variant}
            />
          ))}
        </div>
      </Section>
      <Section
        title="Notre approche locale"
        description="Une plateforme conçue spécialement pour les réalités africaines."
      >
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {features_solutions.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant as variant}
            />
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}

export default App;
