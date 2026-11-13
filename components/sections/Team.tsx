"use client";

import { motion, useReducedMotion } from "motion/react";
import { team } from "@/data/team";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamCard } from "@/components/cards/TeamCard";

export function Team() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="team" aria-labelledby="team-heading" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <AnimatedSection>
          <SectionHeading
            id="team-heading"
            eyebrow="Meet the groomers"
            title="Gentle hands, serious skills"
            description="Certified, pet-first-aid trained, and genuinely obsessed with your pet."
          />
        </AnimatedSection>
        <motion.ul
          variants={staggerContainer(0.1)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
        >
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
