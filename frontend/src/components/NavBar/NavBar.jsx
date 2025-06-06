"use client";
import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	NavbarLogo,
	NavbarButton,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
} from "../ui/resizable-navbar";
import { useState } from "react";
import { ColourfulText } from "../ui/colourful-text";
import { Link } from "react-router-dom";
export function NavbarDemo() {
	const navItems = [
		{
			name: "Discussion Section",
			link: "/discussion",
		},
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="fixed left-0 top-0 z-50 w-full ">
			<Navbar>
				{/* Desktop Navigation */}
				<NavBody>
					<div className="font-bold text-3xl">
						Contest
						<ColourfulText text="Board" />
					</div>
					<NavItems items={navItems} className={"text-base"} />
				</NavBody>

				{/* Mobile Navigation */}
				<MobileNav>
					<MobileNavHeader>
						<div className="font-bold text-3xl">
							Contest
							<ColourfulText text="Board" />
						</div>
						{navItems?.length > 0 && (
							<MobileNavToggle
								isOpen={isMobileMenuOpen}
								onClick={() =>
									setIsMobileMenuOpen(!isMobileMenuOpen)
								}
							/>
						)}
					</MobileNavHeader>

					<MobileNavMenu
						isOpen={isMobileMenuOpen}
						onClose={() => setIsMobileMenuOpen(false)}
					>
						{navItems.map((item, idx) => (
							<Link
								key={`mobile-link-${idx}`}
								to={item.link}
								onClick={() => setIsMobileMenuOpen(false)}
								className="relative text-neutral-600 dark:text-neutral-300"
							>
								<span className="block">{item.name}</span>
							</Link>
						))}
					</MobileNavMenu>
				</MobileNav>
			</Navbar>
		</div>
	);
}
