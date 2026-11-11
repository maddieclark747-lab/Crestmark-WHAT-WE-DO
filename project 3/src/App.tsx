import { FormEvent, useEffect, useState } from "react";

const ASSET = "/assets";

const focusAreas = [
  {
    title: "Residential Land Development",
    image: `${ASSET}/26519.png`,
    copy: "Crestmark identifies and advances residential land in markets driven by population growth, housing demand and infrastructure investment. We assess planning conditions, development feasibility, utilities, community context and builder demand to determine each property's potential. We pursue strategies that may include rezoning, entitlements, master planning and infrastructure coordination. Depending on the opportunity, land may be sold following approval, held for further development or advanced into finished lots.",
  },
  {
    title: "Industrial Land Development",
    image: `${ASSET}/4fa07.png`,
    copy: "Crestmark targets industrial land in markets driven by employment growth, infrastructure investment and expanding business activity. Our strategy focuses on acquiring, entitling and positioning well-located properties for sale to industrial developers, businesses and end users. Through collaboration with local professionals and public authorities, we establish clear development pathways and, where appropriate, coordinate infrastructure and site preparation to create market-ready industrial opportunities.",
  },
  {
    title: "Hospitality",
    image: `${ASSET}/059c6.png`,
    copy: "Crestmark selectively pursues hospitality investments where location, market demand and property potential create opportunities for value creation. Our strategy may include renovation, repositioning, rebranding, adaptive reuse or operational improvements. Working with experienced hospitality operators, we evaluate each asset’s competitive position, capital requirements and long-term potential to strengthen performance and maximize value.",
  },
];

const multifamily = [
  {
    title: "Build-to-Rent",
    image: `${ASSET}/03685.png`,
    copy: "Crestmark develops purpose-built rental communities across apartments, single-family homes and townhomes, with projects retained or sold based on market conditions and investment objectives.",
  },
  {
    title: "Multifamily Value-Add",
    image: `${ASSET}/bcd8c.png`,
    copy: "Crestmark targets multifamily properties with potential for improved performance and value. Through renovations and strategy, we enhance value, with properties retained or sold following stabilization.",
  },
  {
    title: "Multifamily Acquisitions",
    image: `${ASSET}/b51cf.png`,
    copy: "Crestmark targets multifamily assets through strategic investment and focused oversight. Properties may be held for long-term value or sold once investment objectives are achieved.",
  },
];

const navItems = [
  ["About", "mandate"],
  ["What We Do", "focus"],
  ["Projects", "multifamily"],
  ["Partner With Us", "opportunity"],
  ["Contact", "footer"],
] as const;

function Button({
  children,
  variant = "gold",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "gold" | "light" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button className={`pill-button pill-button--${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = dialogOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [dialogOpen]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const openOpportunity = () => {
    setSubmitted(false);
    setDialogOpen(true);
    setMenuOpen(false);
  };

  const submitOpportunity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <button
          className="logo-button"
          aria-label="Crestmark Ventures home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={`${ASSET}/8cc49.svg`} alt="Crestmark Ventures" width="177" height="46" />
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, target]) => (
            <button
              key={label}
              className={label === "What We Do" ? "active" : ""}
              onClick={() => goTo(target)}
            >
              {label}
            </button>
          ))}
          <Button onClick={openOpportunity}>Submit an Opportunity</Button>
        </nav>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, target]) => (
            <button key={label} onClick={() => goTo(target)}>
              {label}
            </button>
          ))}
          <Button onClick={openOpportunity}>Submit an Opportunity</Button>
        </nav>
      )}

      <main>
        <section className="hero" aria-labelledby="page-title">
          <img className="hero-image" src={`${ASSET}/3d234.png`} alt="" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div>
              <h1 id="page-title">How We Develop and Invest in Real Estate</h1>
              <p>
                We identify the potential in every opportunity and develop thoughtful strategies to
                bring that vision to life.
              </p>
            </div>
            <div className="button-row">
              <Button onClick={openOpportunity}>Submit an Opportunity</Button>
              <Button variant="light" onClick={() => goTo("mandate")}>
                Learn About Us
              </Button>
            </div>
          </div>
        </section>

        <section className="mandate section-block" id="mandate">
          <h2>Our Mandate</h2>
          <p>
            Crestmark pursues real estate development and investment opportunities where market
            fundamentals, strategic positioning and active execution create lasting value. Each
            opportunity is evaluated based on its property, market, business plan and risk profile,
            with a focus on credible demand, value creation and a clear path to execution.
          </p>
        </section>

        <section className="focus-list content-width" id="focus" aria-label="Areas of focus">
          {focusAreas.map((area, index) => (
            <article
              className={`focus-row ${index % 2 ? "focus-row--reverse" : ""}`}
              key={area.title}
            >
              <div className="focus-copy">
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
              </div>
              <img src={area.image} alt={`${area.title} property`} />
            </article>
          ))}
        </section>

        <section className="multifamily content-width" id="multifamily">
          <div className="section-heading">
            <h3>Multifamily</h3>
            <p>
              Crestmark approaches multifamily through complementary strategies suited to different
              properties, market conditions and paths to value creation.
            </p>
          </div>
          <div className="strategy-grid">
            {multifamily.map((strategy) => (
              <article className="strategy-card" key={strategy.title}>
                <div className="image-wrap">
                  <img src={strategy.image} alt={`${strategy.title} community`} />
                </div>
                <h4>{strategy.title}</h4>
                <p>{strategy.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="opportunity content-width" id="opportunity">
          <img
            src={`${ASSET}/b9ca9.png`}
            alt="A Crestmark professional reviewing a real estate opportunity with a client"
          />
          <div className="opportunity-copy">
            <div>
              <h2>Have an Opportunity We Should Review?</h2>
              <p>
                We will identify the key considerations, share our initial perspective and explore
                whether there is a practical basis to move forward together.
              </p>
              <p>
                Crestmark welcomes development, investment and partnership opportunities within our
                areas of focus. Share the essential details and available supporting materials, and
                we will review and provide a timely initial response.
              </p>
            </div>
            <div className="button-row">
              <Button onClick={openOpportunity}>Submit an Opportunity</Button>
              <Button variant="outline" onClick={() => goTo("footer")}>
                Contact Crestmark
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={`${ASSET}/7f617.svg`} alt="Crestmark Ventures" width="230" height="60" />
            <p>Land development and real estate investment across U.S. growth markets.</p>
          </div>
          <FooterColumn
            title="Company"
            items={["About", "What We Do", "Our Approach", "Projects & Experience"]}
          />
          <FooterColumn
            title="Connect"
            items={["Partner With Us", "Submit an Opportunity", "Contact"]}
            onOpportunity={openOpportunity}
          />
          <FooterColumn
            title="Legal"
            items={["Legal Disclaimer", "Privacy Policy", "Terms of Use"]}
          />
        </div>
        <div className="copyright">© 2026 Crestmark Ventures. All rights reserved.</div>
      </footer>

      {dialogOpen && (
        <div
          className="dialog-backdrop"
          role="presentation"
          onMouseDown={() => setDialogOpen(false)}
        >
          <section
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="dialog-close"
              aria-label="Close dialog"
              onClick={() => setDialogOpen(false)}
            >
              ×
            </button>
            {submitted ? (
              <div className="success-message">
                <span>Thank you</span>
                <h2 id="dialog-title">Your opportunity has been received.</h2>
                <p>Our team will review the information and provide a timely initial response.</p>
                <Button onClick={() => setDialogOpen(false)}>Close</Button>
              </div>
            ) : (
              <>
                <span className="eyebrow">Partner with Crestmark</span>
                <h2 id="dialog-title">Submit an Opportunity</h2>
                <p>Share the essential details and our team will be in touch.</p>
                <form onSubmit={submitOpportunity}>
                  <label>
                    Name
                    <input name="name" required autoFocus />
                  </label>
                  <label>
                    Email
                    <input name="email" type="email" required />
                  </label>
                  <label>
                    Opportunity details
                    <textarea name="details" rows={4} required />
                  </label>
                  <Button type="submit">Send Opportunity</Button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function FooterColumn({
  title,
  items,
  onOpportunity,
}: {
  title: string;
  items: string[];
  onOpportunity?: () => void;
}) {
  return (
    <div className="footer-column">
      <h5>{title}</h5>
      {items.map((item) => (
        <button key={item} onClick={item === "Submit an Opportunity" ? onOpportunity : undefined}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default App;
