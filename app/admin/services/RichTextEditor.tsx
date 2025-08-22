"use client";

import React, { useRef, useEffect } from 'react';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaLink } from 'react-icons/fa';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const executeCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            executeCommand('createLink', url);
        }
    };

    const setColor = (color: string) => {
        executeCommand('foreColor', color);
    };

    return (
        <div className="border border-white/20 rounded-lg bg-white/10 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-3 border-b border-white/20 bg-white/5">
                <button
                    type="button"
                    onClick={() => executeCommand('bold')}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                    <FaBold className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => executeCommand('italic')}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                    <FaItalic className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => executeCommand('underline')}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                    <FaUnderline className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-white/20 mx-1"></div>

                <button
                    type="button"
                    onClick={() => executeCommand('insertUnorderedList')}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                    <FaListUl className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => executeCommand('insertOrderedList')}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                    <FaListOl className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={insertLink}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                    <FaLink className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-white/20 mx-1"></div>

                {/* Color buttons */}
                <button
                    type="button"
                    onClick={() => setColor('#3b82f6')}
                    className="w-6 h-6 bg-blue-500 rounded border border-white/20 hover:scale-110 transition-transform"
                ></button>

                <button
                    type="button"
                    onClick={() => setColor('#10b981')}
                    className="w-6 h-6 bg-green-500 rounded border border-white/20 hover:scale-110 transition-transform"
                ></button>

                <button
                    type="button"
                    onClick={() => setColor('#f59e0b')}
                    className="w-6 h-6 bg-yellow-500 rounded border border-white/20 hover:scale-110 transition-transform"
                ></button>

                <button
                    type="button"
                    onClick={() => setColor('#ef4444')}
                    className="w-6 h-6 bg-red-500 rounded border border-white/20 hover:scale-110 transition-transform"
                ></button>

                <button
                    type="button"
                    onClick={() => setColor('#8b5cf6')}
                    className="w-6 h-6 bg-purple-500 rounded border border-white/20 hover:scale-110 transition-transform"
                ></button>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="min-h-[120px] p-4 text-gray-200 focus:outline-none prose prose-invert prose-sm max-w-none"
                style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                }}
                data-placeholder={placeholder}
            />

            <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};

export default RichTextEditor;