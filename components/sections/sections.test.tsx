import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { galleryPhotos } from "@/data/gallery";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import { processSteps } from "@/data/steps";
import { team } from "@/data/team";
import { Contact } from "./Contact";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Services } from "./Services";
import { Team } from "./Team";

describe("Hero", () => {
  it("renders the headline word by word, both CTAs and the service promises", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(`${site.headline.lead} ${site.headline.highlight}`);
    expect(screen.getByRole("link", { name: /book a grooming/i })).toHaveAttribute("href", "/booking");
    expect(screen.getByRole("link", { name: /view services/i })).toHaveAttribute("href", "/#services");
    expect(screen.getByText("Gentle, low-stress handling")).toBeInTheDocument();
    expect(screen.queryByText(/reviews|★/i)).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: site.heroImage.alt })).toBeInTheDocument();
  });
});

describe("Services", () => {
  it("renders a card with price, duration and booking link for every service", () => {
    render(<Services />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(services.length + 1);
    expect(screen.getByRole("link", { name: /start booking/i })).toHaveAttribute("href", "/booking");
    for (const service of services) {
      const card = screen.getByRole("heading", { name: service.name }).closest("li")!;
      expect(within(card).getByText(formatPrice(service.startingPrice))).toBeInTheDocument();
      expect(within(card).getByRole("link", { name: /book this/i })).toHaveAttribute(
        "href",
        `/booking?service=${service.id}`,
      );
    }
  });
});

describe("HowItWorks", () => {
  it("renders the numbered steps in order", () => {
    render(<HowItWorks />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(processSteps.length);
    processSteps.forEach((step, index) => {
      expect(within(items[index]).getByRole("heading", { name: step.title })).toBeInTheDocument();
      expect(within(items[index]).getByText(String(index + 1))).toBeInTheDocument();
    });
  });
});

describe("Gallery", () => {
  it("opens a photo in the lightbox, navigates and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Gallery />);

    expect(screen.getByRole("slider")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: `Open photo: ${galleryPhotos[0].alt}` }));
    const dialog = await screen.findByRole("dialog", { name: galleryPhotos[0].alt });
    expect(dialog).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next photo/i }));
    expect(await screen.findByRole("dialog", { name: galleryPhotos[1].alt })).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}");
    expect(await screen.findByRole("dialog", { name: galleryPhotos[0].alt })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});

describe("Team", () => {
  it("renders each groomer with their years of experience", () => {
    render(<Team />);

    for (const member of team) {
      expect(screen.getByRole("heading", { name: member.name })).toBeInTheDocument();
      expect(screen.getByText(`${member.yearsExperience} yrs`)).toBeInTheDocument();
    }
  });
});

describe("Contact", () => {
  it("renders address, phone, email, hours and the maps link", () => {
    render(<Contact />);

    expect(screen.getByText(/Cebu City, Cebu 6000/)).toBeInTheDocument();
    expect(screen.getByText(/Cebu City, Philippines/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: site.phone })).toHaveAttribute("href", site.phoneHref);
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
    expect(screen.getByText("Closed")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open in google maps/i })).toHaveAttribute("target", "_blank");
  });
});
