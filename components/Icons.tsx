import { AnimationConfig, Icon } from "@ui-kitten/components";
import { IconAnimationRegistry } from "@ui-kitten/components/ui/icon/iconAnimation";
import { useEffect, useRef } from "react";

export function MyIcon({
  icon,
  size = 20,
  color = "black",
}: {
  icon: string;
  size?: number;
  color?: string;
}) {
  return (
    <Icon
      pack="font-awesome"
      name={icon}
      style={[{ width: size, height: size, color: color }]}
    />
  );
}

export function MyAnimatedIcon({
  icon,
  size = 20,
  color = "black",
  animation,
  animationConfig = {
    cycles: Infinity,
    useNativeDriver: false,
  },
  playToggle,
}: {
  icon: string;
  size?: number;
  color?: string;
  animation: keyof IconAnimationRegistry | null | undefined;
  animationConfig?: AnimationConfig;
  playToggle: boolean;
}) {
  const errIconAni = useRef<any>();
  useEffect(() => {
    if (errIconAni && errIconAni.current) errIconAni.current!.startAnimation();
  }, []);
  return (
    <Icon
      pack="font-awesome"
      name={icon}
      style={[{ width: size, height: size, color: color }]}
      ref={errIconAni}
      animation={animation}
      animationConfig={animationConfig}
    />
  );
}
