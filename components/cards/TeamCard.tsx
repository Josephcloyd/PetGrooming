"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { TeamMember } from "@/data/types";
import { springSoft } from "@/lib/animations";
import { Badge } from "@/components/ui/Badge";

/* Polaroids are pinned at a slight angle and straighten up when you hover them. */
const TILTS = [-3, 2, -1.5, 2.5];

const polaroid: Variants = {
  hidden: { opacity: 0, y: 40, rotate: 0 },
  visible: (tilt: number) => ({
    opacity: 1,
    y: 0,
    rotate: tilt,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  }),
  hover: { rotate: 0, y: -10, scale: 1.04, transition: springSoft },
};

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export function TeamCard({ member, index }: TeamCardProps) {
  const reduceMotion = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];

  return (
    <motion.li
      custom={tilt}
      variants={polaroid}
      whileHover={reduceMotion ? undefined : "hover"}
      className="relative flex h-full flex-col rounded-md bg-white p-3 pb-6 shadow-lift"
    >
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 rounded-sm bg-sunny/70"
      />
      <div className="relative aspect-square overflow-hidden rounded-sm">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <Badge tone="sunny" className="absolute bottom-3 left-3">
          {member.yearsExperience} yrs
        </Badge>
      </div>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="text-2xl font-semibold text-navy">{member.name}</h3>
        <p className="text-sm font-semibold text-coral-dark">{member.role}</p>
        <p className="mt-2 text-sm text-navy-soft">
          <span className="font-semibold text-navy">Specialty:</span> {member.specialty}
        </p>
      </div>
    </motion.li>
  );
}
