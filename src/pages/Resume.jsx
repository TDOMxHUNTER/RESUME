import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ResumePreview from '../components/resume/ResumePreview';
import ResumeEditorModal from '../components/resume/ResumeEditorModal';

const INITIAL_DATA = {
    personal: { 
        name: "Fazal ur Rehman", 
        role: "Vibe Coder & AI Architect" 
    },
    contact: { 
        phone: "", 
        email: "fazalur1004@gmail.com", 
        location: "The Cloud (India)" 
    },
    socials: [
        { label: "LinkedIn", value: "linkedin.com/in/fazalurrehman", url: "https://www.linkedin.com/in/fazal-ur-rehman-b1296b256/" },
        { label: "GitHub", value: "github.com/TDOMxHUNTER", url: "https://github.com/TDOMxHUNTER" },
        { label: "X", value: "_fazalurrehman0", url: "https://x.com/_fazalurrehman0" }
    ],  
    summary: "I don't just type code; I orchestrate it. As a 'Vibe Coder', I partner with advanced AI tools like Antigravity and Gemini to turn abstract ideas into deployed reality at the speed of thought. I believe in radical honesty: I might not memorize every syntax rule, but I know exactly how to guide AI to build scalable, beautiful apps. I bridge the gap between human creativity and machine intelligence.",
    hobbies: ["Prompt Engineering", "exploring LLMs", "Building Cool Stuff", "TechTwitter"],
    skills: [
        { name: "Antigravity / AI Tools", level: 100 },
        { name: "Gemini / LLMs", level: 95 },
        { name: "Prompt Engineering", level: 90 },
        { name: "React / Next.js", level: 85 },
        { name: "Vibe Coding", level: 100 },
        { name: "Rapid Prototyping", level: 90 },
        { name: "Debugging with AI", level: 95 },
        { name: "Modern Web Stack", level: 80 }
    ],
    languages: [
        { name: "English", level: 95 },
        { name: "Urdu", level: 100 },
        { name: "Hindi", level: 100 },
        { name: "Promptish", level: 100 }
    ],
    backgroundColor: "#EEF0E5" 
};


const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#050505', color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}>
       
       <ResumeEditorModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialData={INITIAL_DATA} 
       />

       {/* CLASSIC RESUME PREVIEW */}
       <div className="classic-wrapper no-print" style={{ 
           minHeight: '100vh', 
           padding: '4rem 2rem', 
           backgroundColor: '#050505', 
           position: 'relative',
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center'
       }}>
            
            {/* Visual Preview */}
            <ResumePreview data={INITIAL_DATA} />

            {/* Floating Action Button at Bottom */}
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                 <p className="font-mono text-gold" style={{ marginBottom: '1.5rem', opacity: 0.7 }}>READY TO EXPORT?</p>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="font-display"
                    style={{ 
                        fontSize: '1.2rem', 
                        padding: '1rem 2.5rem', 
                        backgroundColor: '#C5A059', 
                        border: 'none', 
                        borderRadius: '50px', 
                        cursor: 'pointer',
                        color: '#000',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        boxShadow: '0 10px 30px -10px rgba(197, 160, 89, 0.5)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(197, 160, 89, 0.6)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(197, 160, 89, 0.5)'; }}
                 >
                    OPEN EDITOR & DOWNLOAD PDF
                 </button>
            </div>

       </div>
    </div>
  );
};

export default Resume;
