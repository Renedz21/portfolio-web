import dynamic from "next/dynamic";
import MainContainer from "@/components/containers/main-container";
import Manifesto from "@/components/sections/manifesto";

const ProjectGallery = dynamic(
  () => import("@/components/sections/project-gallery"),
);
const AboutMinimal = dynamic(() => import("@/components/sections/about"));
const ContactMinimal = dynamic(() => import("@/components/sections/contact"));

export default function Home() {
  return (
    <MainContainer>
      <Manifesto />
      <ProjectGallery />
      <AboutMinimal />
      <ContactMinimal />
    </MainContainer>
  );
}
