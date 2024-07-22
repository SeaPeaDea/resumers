import React, {useCallback, useEffect, useState} from "react";
import ResumeForm from './ui/ResumeForm'
import {generateResume, loadDefaultResume, OutputFormat, Resume} from './utils/resume'

import {ArrowDownTrayIcon, ArrowUpTrayIcon, DocumentPlusIcon, MoonIcon, SunIcon} from '@heroicons/react/24/outline'

function App() {
    const [resume, setResume] = useState<Resume>(() => {
        const savedResume = localStorage.getItem('currentResume');
        return savedResume ? JSON.parse(savedResume) : {
            name: '',
            title: '',
            location: '',
            linkedin: '',
            email: '',
            phone: '',
            summary: '',
            skills: [],
            experience: [],
            education: [],
            certifications: [],
            made_with: '',
            style: {
                primary_color: '#C45508',
                secondary_color: '#4E657E',
                font_family: 'Roboto, sans-serif',
                text_color: '#333333',
                header_text_color: '#FFFFFF',
            },
        };
    });

    const [outputFormat, setOutputFormat] = useState<OutputFormat>(OutputFormat.Html);
    const [savedResumes, setSavedResumes] = useState<string[]>([]);
    const [selectedResume, setSelectedResume] = useState<string>('');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [generatingResume, setGeneratingResume] = useState(false);

    useEffect(() => {
        loadDefaultResume();
        const savedResumeNames = JSON.parse(localStorage.getItem('savedResumeNames') || '[]');
        setSavedResumes(savedResumeNames);

        if (savedResumeNames.length === 0) {
            const johnDoeResume = JSON.parse(localStorage.getItem('resume_John Doe') || '{}');
            setResume(johnDoeResume);
            setSelectedResume('John Doe');
        }
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme as 'light' | 'dark');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    useEffect(() => {
        localStorage.setItem('currentResume', JSON.stringify(resume));
    }, [resume]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }, []);

    const handleFileImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                try {
                    const importedResume = JSON.parse(content);
                    setResume(importedResume);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    }, []);

    const handleSaveToLocalStorage = useCallback(() => {
        const defaultName = `${resume.name || 'Untitled'}_${new Date().toISOString().split('T')[0]}`;
        const resumeName = prompt('Enter a name for this resume:', defaultName);
        if (resumeName) {
            localStorage.setItem(`resume_${resumeName}`, JSON.stringify(resume));
            const updatedNames = [...savedResumes, resumeName];
            localStorage.setItem('savedResumeNames', JSON.stringify(updatedNames));
            setSavedResumes(updatedNames);
            alert(`Resume saved as "${resumeName}"`);
        }
    }, [resume, savedResumes]);

    const handleLoadFromLocalStorage = useCallback(() => {
        if (selectedResume) {
            const loadedResume = localStorage.getItem(`resume_${selectedResume}`);
            if (loadedResume) {
                setResume(JSON.parse(loadedResume));
                alert(`Resume "${selectedResume}" loaded successfully`);
            } else {
                alert(`No resume found with name "${selectedResume}"`);
            }
        }
    }, [selectedResume]);

    const handleDownloadJSON = useCallback(() => {
        const defaultName = `${resume.name || 'resume'}_${new Date().toISOString().split('T')[0]}.json`;
        const fileName = prompt('Enter a file name for the JSON download:', defaultName);
        if (fileName) {
            const dataStr = JSON.stringify(resume, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', fileName);
            linkElement.click();
        }
    }, [resume]);

    const handleView = useCallback(async () => {
        setGeneratingResume(true);
        try {
            const content = await generateResume(resume, outputFormat);

            const newWindow = window.open('', '_blank', 'width=800,height=600');
            if (newWindow) {
                const mimeType = outputFormat === OutputFormat.Html ? 'text/html' : 'text/markdown';
                const blob = new Blob([content], {type: mimeType});
                const blobUrl = URL.createObjectURL(blob);

                newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${resume.name} - Resume</title>
                    <style>
                        body { 
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                            line-height: 1.6; 
                            margin: 0; 
                            padding: 0; 
                        }
                        .container { 
                            max-width: 800px; 
                            margin: 0 auto; 
                            padding: 20px; 
                        }
                        #exportInstructions { 
                            background-color: #f0f0f0;
                            padding: 15px; 
                            margin-bottom: 20px; 
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        #exportInstructions h2 { 
                            margin-top: 0; 
                        }
                        #exportButton {
                            background-color: #4299E1;
                            color: white;
                            border: none;
                            padding: 10px 15px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 16px;
                            transition: background-color 0.3s ease;
                        }
                        #exportButton:hover {
                            background-color: #3182CE;
                        }
                        iframe { 
                            width: 100%; 
                            height: calc(100vh - 200px); 
                            border: none;
                            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                            border-radius: 8px;
                        }
                        @media print { 
                            @page {
                                margin: 0;
                            }
                            body {
                                margin: 0;
                                -webkit-print-color-adjust: exact;
                                print-color-adjust: exact;
                            }
                            #exportInstructions, #exportButton { 
                                display: none; 
                            }
                            .container {
                                max-width: none;
                                padding: 0;
                            }
                            iframe {
                                height: 100vh;
                                width: 100vw;
                                position: absolute;
                                top: 0;
                                left: 0;
                                margin: 0;
                                padding: 0;
                                border: none;
                                box-shadow: none;
                                border-radius: 0;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div id="exportInstructions">
                            <h2>Export as PDF</h2>
                            <button id="exportButton">Export to PDF</button>
                            <p>Click the button above to save as PDF, or use your browser's print functionality (usually Ctrl+P or Cmd+P).</p>
                        </div>
                        <iframe id="resumeContent" src="${blobUrl}" title="Resume"></iframe>
                    </div>
                    <script>
                        document.getElementById('exportButton').addEventListener('click', function() {
                            window.print();
                        });

                        window.addEventListener('unload', function() {
                            URL.revokeObjectURL('${blobUrl}');
                        });
                    </script>
                </body>
                </html>
            `);
                newWindow.document.close();
            } else {
                console.error('Failed to open new window. Pop-up might be blocked.');
                alert('Please allow pop-ups to view the generated resume.');
            }
        } catch (error) {
            console.error("Failed to generate resume:", error);
            alert('An error occurred while generating the resume. Please try again.');
        } finally {
            setGeneratingResume(false);
        }
    }, [resume, outputFormat]);

    const handleDownload = useCallback(async () => {
        setGeneratingResume(true);
        try {
            const content = await generateResume(resume, outputFormat);
            const mimeType = outputFormat === OutputFormat.Html ? 'text/html' : 'text/markdown';
            const extension = outputFormat === OutputFormat.Html ? 'html' : 'md';
            const blob = new Blob([content], {type: mimeType});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${resume.name.replace(/\s+/g, '_')}_resume.${extension}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to generate resume:", error);
            alert('An error occurred while generating the resume. Please try again.');
        } finally {
            setGeneratingResume(false);
        }
    }, [resume, outputFormat]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <div className="sticky top-0 z-10 bg-primary-50 dark:bg-primary-900 shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0">
                        <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100">Resume Generator</h1>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <div className="group relative">
                                <button onClick={toggleTheme}
                                        className="p-2 rounded-full bg-primary-200 dark:bg-primary-700 text-primary-800 dark:text-primary-200 hover:bg-primary-300 dark:hover:bg-primary-600 transition-colors duration-200">
                                    {theme === 'light' ? <MoonIcon className="h-5 w-5"/> :
                                        <SunIcon className="h-5 w-5"/>}
                                </button>
                                <span
                                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
                                Toggle theme
                            </span>
                            </div>

                            <div className="group relative">
                                <label
                                    className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition-colors duration-200 inline-flex items-center justify-center">
                                    <ArrowUpTrayIcon className="h-5 w-5"/>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".json"
                                        onChange={handleFileImport}
                                        aria-label="Import resume from JSON"
                                    />
                                </label>
                                <span
                                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
                                    Import resume from JSON
                                </span>
                            </div>

                            <div className="group relative">
                                <button onClick={handleSaveToLocalStorage}
                                        className="p-2 rounded-full bg-accent-600 hover:bg-accent-700 text-white transition-colors duration-200">
                                    <DocumentPlusIcon className="h-5 w-5"/>
                                </button>
                                <span
                                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
                                Save to local storage
                            </span>
                            </div>

                            <div className="group relative">
                                <button onClick={handleDownloadJSON}
                                        className="p-2 rounded-full bg-accent-600 hover:bg-accent-700 text-white transition-colors duration-200">
                                    <ArrowDownTrayIcon className="h-5 w-5"/>
                                </button>
                                <span
                                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
                                Download JSON
                            </span>
                            </div>

                            <select
                                value={selectedResume}
                                onChange={(e) => setSelectedResume(e.target.value)}
                                className="px-3 py-2 rounded-md bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 border-primary-300 dark:border-primary-600 focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
                            >
                                <option value="">Select a saved resume</option>
                                {savedResumes.map((name) => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>

                            <button
                                onClick={handleLoadFromLocalStorage}
                                disabled={!selectedResume}
                                className="px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 text-white font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Load
                            </button>

                            <select
                                value={outputFormat}
                                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                                className="px-3 py-2 rounded-md bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 border-primary-300 dark:border-primary-600 focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
                            >
                                <option value={OutputFormat.Html}>HTML</option>
                                <option value={OutputFormat.Markdown}>Markdown</option>
                            </select>

                            <div className="group relative">
                                <button
                                    onClick={handleView}
                                    className={`px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 text-white font-bold transition-colors duration-200 ${generatingResume ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={generatingResume}
                                >
                                    {generatingResume ? 'Processing...' : 'View'}
                                </button>
                                <span
                                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
                                View generated resume
                            </span>
                            </div>

                            <div className="group relative">
                                <button
                                    onClick={handleDownload}
                                    className={`px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 text-white font-bold transition-colors duration-200 ${generatingResume ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={generatingResume}
                                >
                                    {generatingResume ? 'Processing...' : 'Download'}
                                </button>
                                <span
                                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
                                Download generated resume
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-6 mt-4">
                <ResumeForm resume={resume} setResume={setResume}/>
                {generatingResume && (
                    <div className="mt-4 text-center">
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Generating resume...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App