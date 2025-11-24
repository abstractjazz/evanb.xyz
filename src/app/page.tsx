import MainPage from "@/components/MainPage";
import Services from "@/components/Services";
import About from "@/components/About";
import Work from "@/components/Work"; 
import Contact from "@/components/contact";

export default function Main() {  
  return (
    <div className="bg-black">
      <div id="main-hero" className="bg-black" style={{ cursor: "url('/whitepencil.png') -50 45,auto" }}>
        <MainPage />
      </div>
      <Services />
      <About />
      <Work />
      <Contact />
    </div>
  );
}
