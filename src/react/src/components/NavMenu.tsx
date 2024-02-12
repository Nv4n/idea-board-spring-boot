import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Link } from "@tanstack/react-router";
import { type AuthContext } from "../utils/auth";

interface NavMenuProps {
	auth: AuthContext;
}

export const NavMenu = ({ auth }: NavMenuProps) => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{(!!auth.isAuthenticated
					? ([
							["/", "Boards"],
							["/about", "About"],
							["/auth/logout", "Logout"],
						] as const)
					: ([["/auth/login", "Login"]] as const)
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
