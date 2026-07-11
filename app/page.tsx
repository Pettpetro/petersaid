const links = {
  portfolio: "https://drive.google.com/drive/folders/1HTFiWbSzn6kARaQTQXgI8Mrbn5zL0Ujc",
  cv: "https://drive.google.com/drive/folders/1vxJRNq7kXAgwKekPwcZQARs0iFcwLUc6",
  motion: "https://drive.google.com/drive/folders/14EFdOp_zC9N1ThoEyNxz_8KDhMHab-0n?usp=sharing",
  instagram: "https://www.instagram.com/petrodesigner?igsh=cWhyNHljNWN4bzRs",
  bio: "https://bio.site/Peter.Said",
};

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Peter Said home">P<span>●</span>S</a>
        <div className="navLinks">
          <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
        </div>
        <a className="miniCta" href={links.cv} target="_blank" rel="noreferrer">My CV <Arrow /></a>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><i /> Visual Designer · Cairo, Egypt</div>
        <h1>DESIGNING<br />IDEAS THAT <em>MOVE.</em></h1>
        <div className="heroBottom">
          <p>I&apos;m Peter Said — a visual designer crafting bold identities, social visuals, and motion that make brands impossible to ignore.</p>
          <a className="circleLink" href="#work" aria-label="Explore selected work">↓</a>
        </div>
        <div className="orbit orbitOne">BRAND<br />DESIGN</div>
        <div className="orbit orbitTwo">MOTION<br />GRAPHICS</div>
      </section>

      <section className="ticker" aria-label="Design specialties"><div>BRANDING ✦ SOCIAL MEDIA ✦ MOTION GRAPHICS ✦ VISUAL DESIGN ✦ BRANDING ✦ SOCIAL MEDIA ✦</div></section>

      <section className="work section" id="work">
        <div className="sectionHead"><span>01 / SELECTED WORK</span><p>A growing collection of identity, digital, and motion projects.</p></div>
        <a className="featureCard" href={links.portfolio} target="_blank" rel="noreferrer">
          <div className="cardNumber">01</div>
          <div className="cardVisual"><span>PE<br />TER</span><b>VISUAL<br />ARCHIVE</b></div>
          <div className="cardCopy"><small>BRANDING · SOCIAL · DIGITAL</small><h2>THE<br />PORTFOLIO</h2><p>Explore the full collection of selected design projects, concepts, and visual experiments.</p><strong>VIEW PROJECTS <Arrow /></strong></div>
        </a>
        <div className="splitCards">
          <a className="motionCard" href={links.motion} target="_blank" rel="noreferrer"><small>02 / SHOWREEL</small><div className="play">▶</div><h3>MOTION<br />IN ACTION</h3><span>WATCH THE REEL <Arrow /></span></a>
          <a className="cvCard" href={links.cv} target="_blank" rel="noreferrer"><small>03 / EXPERIENCE</small><div className="cvMark">CV</div><h3>MY STORY,<br />ON PAPER.</h3><span>OPEN MY CV <Arrow /></span></a>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="sectionHead"><span>02 / ABOUT</span><p>Good design looks sharp. Great design makes you feel something.</p></div>
        <div className="aboutGrid"><h2>VISUAL THINKER.<br /><em>STORY BUILDER.</em></h2><div><p>I blend clear thinking with expressive visuals to turn ideas into memorable experiences. My work moves between brand identity, social content, and motion — always with purpose, energy, and a sharp eye for detail.</p><a href={links.bio} target="_blank" rel="noreferrer">MORE ABOUT ME <Arrow /></a></div></div>
      </section>

      <footer id="contact">
        <p>HAVE A PROJECT IN MIND?</p><h2>LET&apos;S MAKE<br /><em>IT HAPPEN.</em></h2>
        <div className="footerLinks"><a href={links.instagram} target="_blank" rel="noreferrer">INSTAGRAM <Arrow /></a><a href={links.bio} target="_blank" rel="noreferrer">ALL MY LINKS <Arrow /></a></div>
        <div className="footerBottom"><span>© {new Date().getFullYear()} PETER SAID</span><span>VISUAL DESIGNER · CAIRO</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
