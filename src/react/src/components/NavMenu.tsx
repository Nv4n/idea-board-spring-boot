import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Link } from "@tanstack/react-router";

export const NavMenu = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{(
					[
						["/", "Home"],
						["/about", "About"],
						["/boards", "Boards"],
					] as const
				).map(([to, label]) => {
					return (
						<NavigationMenuItem key={to}>
							<Link to={to}>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									{label}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
