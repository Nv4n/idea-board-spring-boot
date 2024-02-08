import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Link } from "@tanstack/react-router";

export const NavMenu = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link to="/">
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}
						>
							Home
						</NavigationMenuLink>
					</Link>
					<Link to="/about">
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}
						>
							About
						</NavigationMenuLink>
					</Link>
					<Link to="/chat">
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}
						>
							Home
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
