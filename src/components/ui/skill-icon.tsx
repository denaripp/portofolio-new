"use client";

import * as React from "react";
import { resolveSkillIconUrl } from "@/lib/icon-resolver";
import { Layers } from "lucide-react";

interface SkillIconProps {
  icon?: string | null;
  name?: string;
  className?: string;
  fallbackClassName?: string;
}

export function SkillIcon({
  icon,
  name = "Skill",
  className = "w-full h-full object-contain p-1.5",
  fallbackClassName = "w-5 h-5 text-orange-500",
}: SkillIconProps) {
  const [hasError, setHasError] = React.useState(false);
  const resolvedUrl = React.useMemo(() => resolveSkillIconUrl(icon), [icon]);

  React.useEffect(() => {
    setHasError(false);
  }, [icon]);

  if (!resolvedUrl || hasError) {
    return <Layers className={fallbackClassName} />;
  }

  return (
    <img
      src={resolvedUrl}
      alt={name}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}
