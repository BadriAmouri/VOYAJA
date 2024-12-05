import React from "react";
import {
  AnchorProvider,
  AnchorLink,
  AnchorSection,
} from "react-anchor-navigation";
import '../../Style/ProfileStyle.css'

function ProfilePage() {
  return (
    <AnchorProvider>
      <nav style={{ position: "fixed", top: 0, width: "100%", background: "#333", zIndex: 1000 }}>
        <AnchorLink href="#about" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>
          About
        </AnchorLink>
        <AnchorLink href="#skills" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>
          Skills
        </AnchorLink>
       
      </nav>

      <div style={{ marginTop: "50px" }}>
        <AnchorSection id="about" style={{ height: "100vh", background: "lightcoral", padding: "20px" }}>
          <h1>About Me</h1>
          <p>Welcome to my profile! Here's a bit about me.</p>
        </AnchorSection>
        <AnchorSection id="skills" style={{ height: "100vh", background: "lightblue", padding: "20px" }}>
          <h1>Skills</h1>
          <p>Here are some of my key skills and technologies.</p>
        </AnchorSection>
       
      </div>
    </AnchorProvider>
  );
}

export default ProfilePage;
