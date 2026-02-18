// src/User/Components/Sections/Stats.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Award, Building2, Briefcase, Smile } from 'lucide-react';

const Stats = () => {
  const stats = [
    { 
      icon: <Award className="w-6 h-6 text-teal-600" />, 
      target: 15, 
      suffix: "+", 
      label: "Years Experience" 
    },
    { 
      icon: <Building2 className="w-6 h-6 text-teal-600" />, 
      target: 200, 
      suffix: "+", 
      label: "Projects Completed" 
    },
    { 
      icon: <Briefcase className="w-6 h-6 text-teal-600" />, 
      target: 500, 
      suffix: "M", 
      prefix: "$", 
      label: "Value Managed" 
    },
    { 
      icon: <Smile className="w-6 h-6 text-teal-600" />, 
      target: 100, 
      suffix: "%", 
      label: "Client Satisfaction" 
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-10 border-b border-gray-100 relative z-20 shadow-sm">
      <div className="container mx-auto px-6">
        
        {/* ADDED: md:divide-x md:divide-gray-200 for subtle vertical lines on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-gray-200">
          
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-row items-center justify-center gap-4 p-3 transition-all hover:bg-gray-50 group cursor-default"
            >
              {/* Icon Bubble */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors">
                {stat.icon}
              </div>

              {/* Text Container */}
              <div className="flex flex-col items-start">
                <h3 className="text-3xl font-bold text-gray-900 font-display tracking-tight leading-none">
                  {stat.prefix}
                  <Counter target={stat.target} duration={2000} isVisible={isVisible} />
                  {stat.suffix}
                </h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1 group-hover:text-teal-700 transition-colors">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

const Counter = ({ target, duration, isVisible }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = parseInt(target);
    const totalFrames = Math.round(duration / 16);
    const increment = end / totalFrames;
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isVisible]);
  return <span>{count}</span>;
};

export default Stats;