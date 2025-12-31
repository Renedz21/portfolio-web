import MainContainer from "@/components/containers/main-container";
import AboutMinimal from "@/components/sections/about";
import ContactMinimal from "@/components/sections/contact";
import Manifesto from "@/components/sections/manifesto";
import ProjectGallery from "@/components/sections/project-gallery";

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
