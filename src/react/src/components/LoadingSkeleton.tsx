import { Skeleton } from "@/components/ui/skeleton";

export const LoadinSkeleton = () => {
	return (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-16 w-16 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-6 w-[300px]" />
				<Skeleton className="h-6 w-[250px]" />
			</div>
		</div>
	);
};
