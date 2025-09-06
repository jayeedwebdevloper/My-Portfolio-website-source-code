"use client";

import ProjectDetails from "@/components/Projects/ProjectDetails";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Project {
    _id: string;
    title: string;
    description: string;
    category: string;
    gallery: string[];
    link: string;
    tags: string[];
    client: string;
    covered: boolean;
    technologies: string[];
    duration: string;
    keyFeatures: string[];
    githubLink?: string;
}


const ProjectsDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<Project>({} as Project);

    const fetchProject = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/projects/${id}`);
            if (res.data) {
                setProject(res.data);
            } else {
                setProject({} as Project);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            fetchProject();
        }
    }, [id, fetchProject]);


    useEffect(() => {
        if (project) {
            document.title = project.title;
        }
    }, [project]);

    return (
        <div className="min-h-screen pt-32">
            {
                loading ?
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="flex items-center space-x-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-blue-400 to-purple-500"></div>
                            <span className="text-lg text-gray-200">Loading Project...</span>
                        </div>
                    </div>
                    :
                    <ProjectDetails project={project} />
            }
        </div>
    );
};

export default ProjectsDetails;