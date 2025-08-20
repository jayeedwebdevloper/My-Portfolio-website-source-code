import HomeAbout from "@/components/About/HomeAbout";
import Banner from "@/components/Banner/Banner";
import ContactForm from "@/components/Contact/ContactForm/ContactForm";
import FeaturedProjects from "@/components/Projects/FeaturedProjects";
import ShortServices from "@/components/Services/ShortServices";

export default function Home() {
  return (
    <div className="w-full">
      <Banner />
      <HomeAbout />
      <ShortServices />
      <FeaturedProjects />
      <ContactForm />
    </div>
  );
}
