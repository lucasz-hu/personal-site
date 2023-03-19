import React, { useState, useRef, useEffect } from "react";

const CommandLine = () => {
    const [input, setInput] = useState("");
    const [lines, setLines] = useState([
        {
            type: "output",
            content: `
\nWelcome to my personal command line website! Type 'help' for a list of available commands. Just begin typing and press enter to execute a command.`,
        },
    ]);
    const inputRef = useRef(null);
    const lastLineRef = useRef(null);

    useEffect(() => {
        if (lastLineRef.current) {
            lastLineRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [lines]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!inputRef.current.contains(e.target)) {
                inputRef.current.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add the user's input to the lines array
        setLines((prevLines) => [
            ...prevLines,
            { type: "input", content: input },
        ]);

        // Process the command
        let output;
        switch (input.trim().toLowerCase()) {
            case "help":
                output = `
Note this project is still WIP and some commands may not be fully functional or up-to-date yet.

about            About me
help              Open this menu
projects        View my projects
resume         View my resume
clear             Clear all lines
email            Email me
blog             Read my public diary
website        How I built this`;

                break;
            case "projects":
                output = "List of projects...";
                break;
            case "resume":
                output = "Opening resume...";
                window.open("./Resume.pdf");
                break;
            case "ping":
                output = "Pong!";
                break;
            case "clear":
                setLines([]);
                break;
            case "email":
                output = "Email me at 'im@lucasz.hu'";
                window.open("mailto:im@lucasz.hu");
                break;
            case "about":
                output =
                    "Hi, I'm Lucas. I'm a software developer from Philadelphia, USA. I'm currently a student at the University of Pittsburgh studying Computer Science. I spent roughly 10 months working full-stack at Mobius Materials, and then joined Amazon's internship program for Summer 2022 and 2023. I'm mainly interested in web development, specifically in performance and accessability, but I love discussing all CS topics. I'm also a huge fan of F1, weightlifting and the Philadelphia Eagles (Go Birds!).";
                break;
            case "website":
                output =
                    "This website was built using Astro + React and Tailwind CSS. The source code is available on GitHub.";
                break;
            case "blog":
                output = "Opening blog...";
                window.open("https://blog.lucasz.hu");
                break;
            default:
                output = `Command not found: ${input}`;
        }

        // Add the command output to the lines array
        setLines((prevLines) => [
            ...prevLines,
            { type: "output", content: output },
        ]);

        // Clear the input field
        setInput("");
    };

    return (
        <div
            className="CommandLine w-full md:w-2/3 bg-[#232627] p-4 rounded-lg mt-8 text-left"
            role="document"
        >
            <div className="lines">
                {lines.map((line, index) => (
                    <div
                        key={index}
                        ref={index === lines.length - 1 ? lastLineRef : null}
                        className={`${
                            line.type === "input"
                                ? "text-blue-400"
                                : "text-white"
                        }`}
                        style={{ whiteSpace: "pre-wrap" }}
                    >
                        {line.type === "input" ? "> " : ""}
                        <span
                            className={`${
                                line.type === "input"
                                    ? "text-shadow shadow-blue-400 text-blue-400"
                                    : "text-white"
                            }`}
                        >
                            {line.content}
                        </span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-blue-400 mr-2">admin@lucasz.hu:$ </span>{" "}
                <span className="text-white mr-2">~</span>{" "}
                <div className="relative flex-grow">
                    <input
                        ref={inputRef}
                        autoFocus
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-[#232627] text-white outline-none border-none focus:ring-0 focus:outline-none"
                        role="textbox"
                        aria-label="Input command, type 'help' for a list of available commands."
                    />
                </div>
            </form>
        </div>
    );
};

export default CommandLine;
