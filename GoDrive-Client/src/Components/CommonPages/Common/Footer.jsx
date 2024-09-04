import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io";
import constants from '../../../Utils/constant';

function Footer() {
  const companyLinks = [
    "About us", "Our offerings", "Newsroom", "Investors", 
    "Blog", "Careers", "AI", "Gift cards"
  ];

  const productsLinks = [
    "Footer", "Drive", "Deliver", "Eat", 
    "GoDrive for Business", "GoDrive Freight"
  ];

  const citizenshipLinks = [
    "Safety", "Diversity and Inclusion", "Sustainability"
  ];

  const travelLinks = [
    "Reserve", "Airports", "Cities"
  ];

  const socialIcons = [
    <FaFacebook />, <FaXTwitter />, <IoLogoYoutube />, 
    <SiLinkedin />, <BsInstagram />
  ];

  const renderLinks = (links) => (
    links.map((link, index) => <li key={index} className="mb-2">{link}</li>)
  );

  return (
    <div>
      <footer className="bg-black text-white p-8 mt-4">
        <div className="flex mb-8">
          <img src={constants.logo_white} alt="Company Logo" className="h-10 px-8" />
        </div>
        <div className="flex flex-wrap justify-around">
          <div className="m-4">
            <h2 className="text-lg mb-4">Company</h2>
            <ul>{renderLinks(companyLinks)}</ul>
          </div>
          <div className="m-4">
            <h2 className="text-lg mb-4">Products</h2>
            <ul>{renderLinks(productsLinks)}</ul>
          </div>
          <div className="m-4">
            <h2 className="text-lg mb-4">Global citizenship</h2>
            <ul>{renderLinks(citizenshipLinks)}</ul>
          </div>
          <div className="m-4">
            <h2 className="text-lg mb-4">Travel</h2>
            <ul>{renderLinks(travelLinks)}</ul>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-12 pl-4">
            {socialIcons.map((icon, index) => (
              <span key={index}>{icon}</span>
            ))}
          </div>
          <div className="flex space-x-4">
            <span>English</span>
            <span>Chennai</span>
          </div>
        </div>
        <div className="text-center mt-8">
          <p><span>© 2024&nbsp;</span>Go Drive Technologies Inc.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
