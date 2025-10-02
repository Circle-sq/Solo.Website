import React, { type ReactNode, type SVGProps } from "react";
import { SPORT_ICONS_SVG } from "./sport-icons";

interface SportIconProps extends SVGProps<SVGSVGElement> {
  sport: string;
  defaultIcon?: ReactNode;
}

const SportIcon: React.FC<SportIconProps> = ({ sport, defaultIcon, ...props }) => {
    const Icon = SPORT_ICONS_SVG[sport] ?? defaultIcon ?? SPORT_ICONS_SVG.default;

    return <Icon {...props} />;
};

export default SportIcon;