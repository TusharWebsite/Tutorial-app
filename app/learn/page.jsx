'use client'
import React, { useState, useEffect } from 'react';
import { BookOpen, Code, FileText, Sun, Moon } from 'lucide-react';

const PythonLearningPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/python-topics');
        const data = await response.json();
        setTopics(data.topics);
        if (data.topics.length > 0) {
          setSelectedTopic(data.topics[0]);
          setSelectedSubtopic(data.topics[0].subtopics[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleSubtopicClick = (topic, subtopic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(subtopic);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4 bg-blue-600 dark:bg-blue-700">
          <h1 className="text-xl font-bold flex items-center gap-2 text-white">
            <BookOpen size={24} />
            Python Tutorial
          </h1>
        </div>
        
        <nav className="p-4">
          {topics.map((topic) => (
            <div key={topic.id} className="mb-4">
              <h2 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                {topic.title}
              </h2>
              <ul className="space-y-2">
                {topic.subtopics.map((subtopic) => (
                  <li 
                    key={subtopic.id}
                    onClick={() => handleSubtopicClick(topic, subtopic)}
                    className={`cursor-pointer ${
                      selectedSubtopic?.id === subtopic.id 
                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <a className="flex items-center gap-2 text-sm pl-4 hover:text-blue-600 dark:hover:text-blue-400">
                      <FileText size={14} />
                      {subtopic.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {selectedSubtopic ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                {selectedSubtopic.title}
              </h1>
              
              <div className="rounded-lg shadow-md p-6 mb-6 bg-white dark:bg-gray-800">
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  {selectedSubtopic.content}
                </p>
                
                {selectedSubtopic.examples.map((example, index) => (
                  <div key={index} className="rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-700">
                    <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                      {example.description}
                    </h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="whitespace-pre text-green-500 dark:text-green-400">
                        {example.code}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">
              Select a topic from the sidebar to begin learning
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PythonLearningPage;