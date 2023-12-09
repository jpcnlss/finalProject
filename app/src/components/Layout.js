import Header from "./Header";
import Navigation from "./Navigation";
import { css } from "@leafygreen-ui/emotion";
import { Outlet } from "react-router-dom";
import image from "./home.png";
import image1 from "./chat.png";
import image2 from "./profile.png";
import image3 from "./1.png";

const gridStyle = css`
  display: grid;
  grid-template:
    [header-start] "header header" 80px [header-end body-start]
    "side-nav body" auto [body-end] / auto 1fr;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  min-width: 500px;
  margin: 0px;
  background-image: linear-gradient(to bottom right, darkgreen, gray);
  
`;

const headerStyle = css`
  grid-area: header;
  text-shadow: 4px 2px 0px white;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px;
  box-shadow: 2px 2px 4px 0px white;
  z-index: 1;
  background-image: linear-gradient(to bottom right, lightgreen, gray);
  
 
`;

const sideNavStyle = css`
  grid-area: side-nav;
`;

const headerTextStyle = css`
  color: white;

`;


const jImageStyle = css`
  width: 20px; 
  height: 20px; 
  border-radius: 50%; 
`;

const homeImageStyle = css`
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
`;

const chatImageStyle = css`
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
`;
const profileImageStyle = css`
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
`;
const imageContainerStyle = css`
  margin-left: auto; 
  display: flex;
  align-items: center;
  gap: 5px;
  background-image: linear-gradient(to bottom right, #12E193, gray);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%);
`;



const mainStyle = css`
  grid-area: body;
  padding: px;
`;

export default function Layout(props) {
  return(
    <div className={gridStyle}>
      <section className={headerStyle}>
        <Header title="MySocialHub" className={headerTextStyle}/>
        <div className={imageContainerStyle}>
          <img src={image3} alt="1 Image" className={jImageStyle} />
          <img src={image} alt="home Image" className={homeImageStyle} />
          <img src={image1} alt="chat Image" className={chatImageStyle} />
          <img src={image2} alt="profile Image" className={profileImageStyle} />
        </div>
      </section>
      <Navigation className={sideNavStyle} />

      <section className={mainStyle}>
        <Outlet />
      </section>
    </div>
  )
}
