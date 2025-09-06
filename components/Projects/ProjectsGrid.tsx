import { FC } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import parse from "html-react-parser";
import { LuBrain, LuGithub } from "react-icons/lu";
import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";
import ProjectLink from "@/lib/confirmationVisit";
import ViewDetails from "@/lib/visitDetailsRestriction";

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

interface ProjectsGridProps { 
    filteredProjects: Project[];
    getProjectIcon: (category: string) => FC<React.SVGProps<SVGSVGElement>>;
    setSelectedCategory: (category: string) => void;
    setSearchTerm: (term: string) => void;
    setSortBy: (sortBy: string) => void;
}

const ProjectsGrid: FC<ProjectsGridProps> = ({
    filteredProjects,
    getProjectIcon,
    setSelectedCategory,
    setSearchTerm,
    setSortBy
}) => {
    return (
        <section className="pb-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => {
                        const IconComponent = getProjectIcon(project.category);
                        return (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group cursor-pointer"
                            >
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden h-full hover:bg-white/10 transition-all duration-500 relative rounded-2xl">
                                    {/* Background Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Project Image */}
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={project.gallery[0]}
                                            width={400}
                                            height={300}
                                            alt={project.title}
                                            className={`w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-700 ${project.covered ? 'blur-lg' : 'blur-none'}`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                        {project.covered && (
                                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
                                                <p className="text-white font-bold text-lg mb-2">Sensitive Content</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 relative z-10">
                                        {/* Category and Icon */}
                                        <div className="flex items-center justify-between mb-4">
                                            <p
                                                className="border-purple-500/30 text-purple-400 bg-purple-500/10 px-3 py-px rounded-2xl text-sm ca"
                                            >
                                                {project.category}
                                            </p>
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-2">
                                                <IconComponent className="w-4 h-4 text-white" />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl text-white group-hover:text-blue-300 mb-3 transition-colors duration-300">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <div className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-3">
                                            {parse(`${project.description}`)}
                                        </div>

                                        {/* AI Features */}
                                        <div className="mb-4">
                                            <h4 className="text-xs text-gray-500 mb-2 uppercase tracking-wider flex items-center">
                                                <LuBrain className="w-3 h-3 mr-1" />
                                                Key Features
                                            </h4>
                                            <div className="flex flex-wrap gap-1">
                                                {project?.keyFeatures?.slice(0, 3)?.map((feature, featureIndex) => (
                                                    <p
                                                        key={featureIndex}
                                                        className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs px-2 py-0.5 rounded-2xl capitalize"
                                                    >
                                                        {feature}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Technologies */}
                                        <div className="mb-6">
                                            <div className="flex flex-wrap gap-2">
                                                {project?.technologies?.slice(0, 3)?.map((tech, techIndex) => (
                                                    <p
                                                        key={techIndex}
                                                        className="border-blue-500/30 text-blue-400 bg-blue-500/10 text-xs px-2 py-0.5 rounded-2xl capitalize"
                                                    >
                                                        {tech}
                                                    </p>
                                                ))}
                                                {project?.technologies?.length > 4 && (
                                                    <p
                                                        className="border-gray-500/30 text-gray-400 bg-gray-500/10 text-xs"
                                                    >
                                                        +{project.technologies.length - 4}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                {project.link && (
                                                    <ProjectLink link={project.link} covered={project?.covered } />
                                                )}
                                                {project?.githubLink && (
                                                    <Link
                                                        className="hover:bg-white/10 text-gray-400 hover:text-gray-300 p-0 px-3 py-1 text-sm flex items-center border border-gray-400/30 rounded-lg"
                                                        href={project.githubLink} target="_blank"
                                                    >
                                                        <LuGithub className="w-3 h-3 mr-1" />
                                                        Code
                                                    </Link>
                                                )}
                                            </div>

                                            <ViewDetails covered={project?.covered} link={`/projects/${project._id}`} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <FiAlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl text-white mb-4">No projects found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters.</p>
                        <button
                            onClick={() => {
                                setSelectedCategory("All");
                                setSearchTerm("");
                                setSortBy("newest");
                            }}
                            className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default ProjectsGrid;