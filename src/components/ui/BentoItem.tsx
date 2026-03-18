import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { cn } from '../../lib/utils';

export const BentoItem = ({
  className,
  title,
  description,
  header,
  icon,
  image,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(6, 182, 212, 0.15),
    rgba(124, 58, 237, 0.05),
    transparent 80%
  )`;

  return (
    <motion.div
      onMouseMove={onMouseMove}
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-[#0B0F1A] dark:border-white/[0.1] bg-white border border-transparent justify-between flex flex-col space-y-4 relative overflow-hidden",
        className
      )}
    >
      {/* Dynamic Gradient Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover/bento:opacity-100 transition duration-300"
        style={{ background }}
      />

      {image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt="" 
            className="w-full h-full object-cover opacity-20 group-hover/bento:opacity-40 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/50 to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-200 mt-auto">
          {icon}
          <div className="font-sans font-bold text-white mb-2 mt-2 text-xl">
            {title}
          </div>
          <div className="font-sans font-normal text-gray-400 text-sm">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
