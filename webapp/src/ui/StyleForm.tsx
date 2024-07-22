import React from 'react';
import { Resume, Style } from '../gen';

interface Props {
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const DEFAULT_STYLES: Style = {
    primary_color: '#000000',
    secondary_color: '#ffffff',
    text_color: '#000000',
    header_text_color: '#ffffff',
    font_family: 'Arial, sans-serif',
};

const SYSTEM_FONTS = [
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'Verdana, sans-serif',
    'Georgia, serif',
    'Palatino, serif',
    'Garamond, serif',
    'Bookman, serif',
    'Comic Sans MS, cursive',
    'Trebuchet MS, sans-serif',
    'Arial Black, sans-serif',
    'Impact, sans-serif'
];

const StyleForm: React.FC<Props> = ({ resume, setResume }) => {
    const updateStyle = (field: keyof Style, value: string) => {
        setResume(prev => ({
            ...prev,
            style: {
                ...(prev.style || DEFAULT_STYLES),
                [field]: value
            },
        }));
    };

    const currentStyle = resume.style || DEFAULT_STYLES;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Resume Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['primary_color', 'secondary_color', 'text_color', 'header_text_color'] as const).map((colorField) => (
                    <div key={colorField}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {colorField.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </label>
                        <div className="flex">
                            <input
                                type="color"
                                value={currentStyle[colorField]}
                                onChange={(e) => updateStyle(colorField, e.target.value)}
                                className="h-10 w-10 rounded-l-md border border-gray-300 dark:border-gray-600"
                            />
                            <input
                                type="text"
                                value={currentStyle[colorField]}
                                onChange={(e) => updateStyle(colorField, e.target.value)}
                                className="input flex-grow rounded-l-none"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Family</label>
                <select
                    value={currentStyle.font_family}
                    onChange={(e) => updateStyle('font_family', e.target.value)}
                    className="input w-full"
                >
                    {SYSTEM_FONTS.map((font) => (
                        <option key={font} value={font}>{font.split(',')[0]}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default StyleForm;