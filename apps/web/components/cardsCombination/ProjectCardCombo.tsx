"use client";

import { ProjectCard, ProjectCardData } from "@/components/cards/ProjectCard";
import { useFetch } from "@/hooks/useFetch";

export default function ProjectPage() {
    const { data: projects, loading } = useFetch<ProjectCardData[]>("/api/projects");

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <ProjectCard key={i} variant="skeleton" />
                ))}
            </div>
        );
    }

    if (!projects?.length) {
        return (
            <p className="col-start-2 col-span-4 text-gray-500 italic">
                No project posts yet. Check back soon...
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((item) => (
                <ProjectCard key={item.id} data={item} />
            ))}
        </div>
    );
}
